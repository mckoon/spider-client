(function (angular) {
    "use strict";

    var module = angular.module("spider.searchCard");

    /**
     * Controller for the spiderSearchCard component.
     *
     * @param $log
     * @param $q
     * @param errorHandlingService
     * @param searchService
     * @constructor
     */
    function SearchCardController(
        $log,
        $q,
        errorHandlingService,
        searchService
    ) {
        var searchCard = this;

        /**
         * Clears the suggested path field.
         */
        function clear() {
            searchCard.searchText = "";
        }

        /**
         * Finds page search results that match provided query string.
         * Sets searchCard.pageResults.
         */
        function search() {
            /* Fetch from server, then resolve promise with search hits array. */
            searchCard.pageResults = searchService.search(
                {
                    index: "web",
                    body: {
                        query: {
                            /* eslint-disable camelcase */
                            multi_match: {
                                query: searchCard.searchText,
                                fields: [
                                    "title",
                                    "text"
                                ]
                            }
                        }
                    }
                }
            ).then(
                function (results) {
                    $log.debug("Search results received", results);

                    if (!angular.isObject(results.hits) ||
                        !angular.isArray(results.hits.hits)) {
                        /* Invalid server response. */
                        return $q.reject(results);
                    }

                    /* Convert to WebPage object from search result. */
                    searchCard.pageResults = results.hits.hits.map(
                        function (searchResult) {
                            /* eslint-disable no-underscore-dangle */
                            return searchResult._source;
                        }
                    );
                }
            ).catch(
                function (error) {
                    $log.error("WebPage search error", error);
                    errorHandlingService.handleError(
                        "Failed to find page results."
                    );
                    return [];
                }
            ).finally(
                function () {
                    searchCard.setResults(searchCard.pageResults);
                }
            );
        }

        /**
         * Initializes the controller.
         */
        function activate() {
            $log.debug("SearchCardController loaded", searchCard);
        }

        /* Expose functions. */
        searchCard.clear = clear;
        searchCard.search = search;

        /* Run activate when component is loaded. */
        searchCard.$onInit = activate;
    }

    /* Inject dependencies. */
    SearchCardController.$inject = [
        "$log",
        "$q",
        "errorHandlingService",
        "searchService"
    ];

    /* Create spiderSearchCard component. */
    module.component(
        "spiderSearchCard",
        {
            templateUrl: "search-card.html",
            controller: SearchCardController,
            controllerAs: "searchCard",
            bindings: {
                setResults: "<"
            }
        }
    );

}(window.angular));
