(function (angular) {
    "use strict";

    var module = angular.module("spider.errorHandling");

    /**
     * Creates service for handling errors.
     *
     * @param $mdToast
     * @returns errorHandlingService.
     */
    function errorHandlingServiceFactory(
        $mdToast
    ) {

        /**
         * Handles an error by showing a toast.
         *
         * @param message {string} to show in toast.
         * @returns {promise} of toast.
         */
        function handleError(message) {

            var toast;

            toast = $mdToast.simple().textContent(
                message
            ).position(
                "top right"
            );

            return $mdToast.show(
                toast
            );
        }

        /* Return instance of service. */
        return {
            handleError: handleError
        };
    }

    /* Inject dependencies. */
    errorHandlingServiceFactory.$inject = [
        "$mdToast"
    ];

    /* Create errorHandlingService. */
    module.factory(
        "errorHandlingService",
        errorHandlingServiceFactory
    );

}(window.angular));
