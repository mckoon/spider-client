module.exports = function (config) {
    "use strict";

    config.set(
        {
            basePath: "",
            frameworks: [
                "jasmine"
            ],
            files: [
                "node_modules/angular/angular.js",
                "node_modules/angular-animate/angular-animate.js",
                "node_modules/angular-aria/angular-aria.js",
                "node_modules/angular-messages/angular-messages.js",
                "node_modules/angular-mocks/angular-mocks.js",
                "node_modules/angular-resource/angular-resource.js",
                "node_modules/@uirouter/angularjs/release/angular-ui-router.js",
                "node_modules/angular-material/angular-material.js",
                "node_modules/elasticsearch-browser/elasticsearch.angular.js",
                "**/*.module.js",
                "src/**/*.js",
                "src/**/*.spec.js"
            ],
            colors: true,
            reporters: [
                "progress",
                "kjhtml",
                "junit",
                "coverage",
                "threshold"
            ],
            plugins: [
                "jasmine-core",
                "karma-coverage",
                "karma-jasmine",
                "karma-junit-reporter",
                "karma-threshold-reporter",
                "karma-chrome-launcher",
                "karma-firefox-launcher",
                "karma-jasmine-html-reporter",
                "karma-phantomjs-launcher"
            ],
            preprocessors: {
                "./src/**/!(*spec).js": "coverage"
            },
            junitReporter: {
                outputDir: "test",
                useBrowserName: true
            },
            coverageReporter: {
                reporters: [
                    {
                        dir: "test/coverage/",
                        type: "html"
                    }
                ]
            },
            thresholdReporter: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80
            },
            browsers: [
                "PhantomJS"
            ],
            logLevel: "debug"
        }
    );
};
