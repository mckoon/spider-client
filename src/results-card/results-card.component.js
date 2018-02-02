(function (angular) {
    "use strict";

    var module = angular.module("spider.resultsCard");

    /**
     * Controller for the spiderResultsCard component.
     *
     * @param $log
     * @constructor
     */
    function ResultsCardController(
        $log
    ) {
        var resultsCard = this;

        /**
         * Initializes the controller.
         */
        function activate() {
            $log.debug("ResultsCardController loaded", resultsCard);
        }

        /* Run activate when component is loaded. */
        resultsCard.$onInit = activate;
    }

    /* Inject dependencies. */
    ResultsCardController.$inject = [
        "$log"
    ];

    /* Create spiderResultsCard component. */
    module.component(
        "spiderResultsCard",
        {
            templateUrl: "results-card.html",
            controller: ResultsCardController,
            controllerAs: "resultsCard",
            bindings: {
                results: "<"
            }
        }
    );

}(window.angular));
