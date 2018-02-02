(function (angular) {
    "use strict";

    var module = angular.module("spider.search");

    /**
     * Creates service for submitting search queries.
     *
     * @param $window
     * @param esFactory
     * @returns searchService.
     */
    function searchServiceFactory(
        $window,
        esFactory
    ) {
        /* Return instance of elasticsearch client. */
        return esFactory(
            {
                host: $window.location.hostname + ":9200",
                apiVersion: "5.6"
            }
        );
    }

    /* Inject dependencies. */
    searchServiceFactory.$inject = [
        "$window",
        "esFactory"
    ];

    /* Create service. */
    module.factory(
        "searchService",
        searchServiceFactory
    );

}(window.angular));
