(function (angular, jasmine, beforeEach, describe, it) {
    "use strict";

    describe("spider.search module", function () {

        beforeEach(
            function () {
                /* Load the module to test. */
                angular.mock.module("spider.search");
            }
        );

        describe("searchService", function () {

            var searchService;

            beforeEach(
                function () {

                    /* Inject dependencies. */
                    angular.mock.inject(
                        function ($injector) {
                            searchService = $injector.get("searchService");
                        }
                    );
                }
            );

            it("should exist", function () {
                expect(searchService).toEqual(jasmine.any(Object));
            });

        });

    });

}(window.angular, window.jasmine, window.beforeEach, window.describe, window.it));
