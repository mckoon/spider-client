(function (angular, jasmine, beforeEach, describe, it) {
    "use strict";

    /* All of the spider module's tests. */
    describe("spider module", function () {

        it("should resolve dependencies and load", function () {
            angular.mock.module("spider");
        });

    });

}(window.angular, window.jasmine, window.beforeEach, window.describe, window.it));
