(function (angular, jasmine, beforeEach, describe, it, spyOn, expect) {
    "use strict";

    /* All of the spider.resultsCard module's tests. */
    describe("spider.resultsCard module", function () {

        beforeEach(
            function () {
                /* Load the module to test. */
                angular.mock.module("spider.resultsCard");
            }
        );

        describe("ResultsCardController", function () {

            var resultsCard,
                $componentController,
                locals,
                bindings;

            beforeEach(
                function () {

                    /* Reset variables. */
                    locals = {};
                    bindings = {};

                    /* Inject dependencies. */
                    angular.mock.inject(
                        function ($injector) {
                            $componentController = $injector.get("$componentController");
                            locals.$log = $injector.get("$log");
                        }
                    );

                    /* Set bindings. */
                    bindings.results = [];

                    /* Get the controller for the resultsCard component. */
                    resultsCard = $componentController(
                        "spiderResultsCard",
                        locals,
                        bindings
                    );
                }
            );

            it("should exist", function () {
                expect(resultsCard).toEqual(jasmine.any(Object));
            });

            describe("$onInit", function () {

                it("should log loading debug message", function () {
                    spyOn(locals.$log, "debug");
                    resultsCard.$onInit();
                    expect(locals.$log.debug).toHaveBeenCalledWith(
                        jasmine.any(String),
                        resultsCard
                    );
                });

            });

        });

    });

}(window.angular, window.jasmine, window.beforeEach, window.describe, window.it, window.spyOn, window.expect));
