(function (angular) {
    "use strict";

    var module = angular.module("spider.home");

    /**
     * Registers the home view's URL, template, and controller.
     *
     * @param $stateProvider
     */
    function registerHomeRoute(
        $stateProvider
    ) {
        $stateProvider.state(
            "home",
            {
                url: "/views/home",
                component: "spiderHome"
            }
        );
    }

    /* Inject dependencies for view registration. */
    registerHomeRoute.$inject = [
        "$stateProvider"
    ];

    /* Register route to view. */
    module.config(registerHomeRoute);

}(window.angular));
