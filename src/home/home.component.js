(function (angular) {
    "use strict";

    var module = angular.module("spider.home");

    /**
     * Controller for the spiderHome component.
     *
     * @param $log
     * @constructor
     */
    function HomeController(
        $log
    ) {
        var home = this;

        /**
         * Sets the value of results.
         *
         * @param results
         */
        function setResults(
            results
        ) {
            home.results = results;
        }

        /**
         * Initializes the controller.
         */
        function activate() {
            home.results = [];
            $log.debug("Home Controller loaded", home);
        }

        /* Expose functions. */
        home.setResults = setResults;

        /* Run activate when component is loaded. */
        home.$onInit = activate;
    }

    /* Inject dependencies. */
    HomeController.$inject = [
        "$log"
    ];

    /* Create spiderHome component. */
    module.component(
        "spiderHome",
        {
            templateUrl: "home.html",
            controller: HomeController,
            controllerAs: "home"
        }
    );

}(window.angular));
