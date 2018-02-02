(function (angular) {
    "use strict";

    var module;

    /**
     * Configures the locationProvider.
     *
     * @param $locationProvider
     */
    function configureLocationProvider(
        $locationProvider
    ) {
        $locationProvider.html5Mode(false);
    }

    /* Inject dependencies. */
    configureLocationProvider.$inject = [
        "$locationProvider"
    ];

    /**
     * Sets the default view URL.
     *
     * @param $urlRouterProvider
     */
    function configureUrlProvider(
        $urlRouterProvider
    ) {
        $urlRouterProvider.otherwise(
            "/views/home"
        );
    }

    /* Inject dependencies. */
    configureUrlProvider.$inject = [
        "$urlRouterProvider"
    ];

    /**
     * Configures the angular-material color theme.
     *
     * @param $mdThemingProvider
     */
    function configureMdTheme($mdThemingProvider) {
        $mdThemingProvider.theme(
            "default"
        ).primaryPalette(
            "teal"
        ).accentPalette(
            "deep-purple"
        );
    }

    /* Inject dependencies. */
    configureMdTheme.$inject = [
        "$mdThemingProvider"
    ];

    /* Create module. */
    module = angular.module(
        "spider",
        [
            "ngAnimate",
            "ngAria",
            "ngMaterial",
            "ngMessages",
            "ngResource",
            "ui.router",
            "spider.home"
        ]
    );

    /* Load configuration. */
    module.config(configureLocationProvider);
    module.config(configureUrlProvider);
    module.config(configureMdTheme);

}(window.angular));
