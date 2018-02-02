(function (angular, jasmine, beforeEach, describe, it, spyOn, expect) {
    "use strict";

    /* All of the spider.home module's tests. */
    describe("spider.home module", function () {

        beforeEach(
            function () {
                /* Load the module to test. */
                angular.mock.module("spider.home");
            }
        );

        describe("HomeController", function () {

            var home,
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

                    /* Get the controller for the home component. */
                    home = $componentController(
                        "spiderHome",
                        locals,
                        bindings
                    );
                }
            );

            it("should exist", function () {
                expect(home).toEqual(jasmine.any(Object));
            });

            describe("$onInit", function () {

                it("should log loading debug message", function () {
                    spyOn(locals.$log, "debug");
                    home.$onInit();
                    expect(locals.$log.debug).toHaveBeenCalledWith(
                        jasmine.any(String),
                        home
                    );
                });

                it("should default home.results as empty", function () {
                    home.$onInit();
                    expect(home.results).toEqual([]);
                });

            });

            describe("setResults", function () {

                beforeEach(
                    function () {
                        home.$onInit();
                    }
                );

                it("should be exposed", function () {
                    expect(home.setResults).toEqual(jasmine.any(Function));
                });

                it("should set results to the provided value", function () {
                    var results = [
                        "result1",
                        "result2"
                    ];

                    home.setResults(results);

                    expect(home.results).toEqual(results);
                });

            });

        });

    });

}(window.angular, window.jasmine, window.beforeEach, window.describe, window.it, window.spyOn, window.expect));
