(function (angular, jasmine, beforeEach, describe, it, spyOn) {
    "use strict";

    /* All of the spider.searchCard module's tests. */
    describe("spider.searchCard module", function () {

        beforeEach(
            function () {
                /* Load the module to test. */
                angular.mock.module("spider.searchCard");
            }
        );

        describe("SearchCardController", function () {

            var searchCard,
                $componentController,
                $q,
                $rootScope,
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
                            $q = $injector.get("$q");
                            $rootScope = $injector.get("$rootScope");
                            locals.$log = $injector.get("$log");
                            locals.errorHandlingService = $injector.get("errorHandlingService");
                            locals.searchService = $injector.get("searchService");
                        }
                    );

                    bindings.setResults = jasmine.createSpy("setResults");

                    /* Get the controller for the searchCard component. */
                    searchCard = $componentController(
                        "spiderSearchCard",
                        locals,
                        bindings
                    );
                }
            );

            it("should exist", function () {
                expect(searchCard).toEqual(jasmine.any(Object));
            });

            describe("$onInit", function () {

                it("should log loading debug message", function () {
                    spyOn(locals.$log, "debug");
                    searchCard.$onInit();
                    expect(locals.$log.debug).toHaveBeenCalledWith(
                        jasmine.any(String),
                        searchCard
                    );
                });

            });

            describe("clear", function () {

                it("should exist", function () {
                    expect(searchCard.clear).toEqual(jasmine.any(Function));
                });

                it("should blank-out searchText", function () {
                    /* Set up test so we know it cleared. */
                    searchCard.searchText = "some text";

                    /* Make the call. */
                    searchCard.clear();

                    /* Verify results. */
                    expect(searchCard.searchText).toEqual("");
                });

            });

            describe("search", function () {

                beforeEach(
                    function () {
                        spyOn(locals.searchService, "search");
                        spyOn(locals.errorHandlingService, "handleError");
                        spyOn(locals.$log, "error");
                    }
                );

                it("should exist", function () {
                    expect(searchCard.search).toEqual(jasmine.any(Function));
                });

                it("should log, handle error, and set empty results on search failure", function () {
                    var deferred,
                        searchPromise;

                    deferred = $q.defer();
                    searchPromise = deferred.promise;
                    searchCard.searchText = "some text";

                    locals.searchService.search.and.returnValue(searchPromise);

                    searchCard.search();

                    deferred.reject("Search error");

                    $rootScope.$apply();

                    expect(locals.errorHandlingService.handleError).toHaveBeenCalledWith(jasmine.any(String));
                    expect(locals.$log.error).toHaveBeenCalled();
                    expect(bindings.setResults).toHaveBeenCalledWith(jasmine.objectContaining([]));
                });

                it("should log, handle error, and set no results when response has no hits property", function () {
                    var deferred,
                        searchPromise;

                    deferred = $q.defer();
                    searchPromise = deferred.promise;
                    searchCard.searchText = "some text";

                    locals.searchService.search.and.returnValue(searchPromise);

                    searchCard.search();

                    deferred.resolve(
                        {
                            invalid: "response"
                        }
                    );

                    $rootScope.$apply();

                    expect(locals.errorHandlingService.handleError).toHaveBeenCalledWith(jasmine.any(String));
                    expect(locals.$log.error).toHaveBeenCalled();
                    expect(bindings.setResults).toHaveBeenCalledWith(jasmine.objectContaining([]));
                });

                it("should log, handle error, & set no results when response.hits has no hits array", function () {
                    var deferred,
                        searchPromise;

                    deferred = $q.defer();
                    searchPromise = deferred.promise;
                    searchCard.searchText = "some text";

                    locals.searchService.search.and.returnValue(searchPromise);

                    searchCard.search();

                    deferred.resolve(
                        {
                            hits: {
                                invalid: "response"
                            }
                        }
                    );

                    $rootScope.$apply();

                    expect(locals.errorHandlingService.handleError).toHaveBeenCalledWith(jasmine.any(String));
                    expect(locals.$log.error).toHaveBeenCalled();
                    expect(bindings.setResults).toHaveBeenCalledWith(jasmine.objectContaining([]));
                });

                it("should set results on search success", function () {
                    var deferred,
                        searchPromise,
                        expected;

                    deferred = $q.defer();
                    searchPromise = deferred.promise;
                    searchCard.searchText = "some text";

                    expected = [
                        {
                            trackId: "abc"
                        },
                        {
                            trackId: "def"
                        },
                        {
                            trackId: "ghi"
                        }
                    ];

                    locals.searchService.search.and.returnValue(searchPromise);

                    searchCard.search();

                    deferred.resolve(
                        {
                            hits: {
                                hits: [
                                    {
                                        /* eslint-disable no-underscore-dangle */
                                        _source: expected[0]
                                    },
                                    {
                                        /* eslint-disable no-underscore-dangle */
                                        _source: expected[1]
                                    },
                                    {
                                        /* eslint-disable no-underscore-dangle */
                                        _source: expected[2]
                                    }
                                ]
                            }
                        }
                    );

                    $rootScope.$apply();

                    expect(locals.errorHandlingService.handleError).not.toHaveBeenCalled();
                    expect(searchCard.pageResults).toEqual(expected);
                    expect(bindings.setResults).toHaveBeenCalledWith(expected);
                });

            });

        });

    });

}(window.angular, window.jasmine, window.beforeEach, window.describe, window.it, window.spyOn));
