(function (require, dirname) {
    "use strict";

    var destination = dirname + "/dist/",
        srcRoot = dirname + "/src/",
        concat = require("gulp-concat"),
        del = require("del"),
        gulp = require("gulp"),
        KarmaServer = require("karma").Server,
        eslint = require("gulp-eslint"),
        htmlMin = require("gulp-htmlmin"),
        flatten = require("gulp-flatten"),
        templatecache = require("gulp-angular-templatecache"),
        cssNano = require("gulp-cssnano"),
        sass = require("gulp-sass"),
        sourcemaps = require("gulp-sourcemaps"),
        order = require("gulp-order"),
        rename = require("gulp-rename"),
        uglify = require("gulp-uglify"),
        webserver = require("gulp-webserver"),
        config = {};

    /**
     * Configures the Karma plugin.
     */
    function configureKarma() {
        config.karma = {
            conf: dirname + "/karma.conf.js"
        };
        config.karma.single = {
            configFile: config.karma.conf,
            singleRun: true
        };
        config.karma.tdd = {
            configFile: config.karma.conf
        };
    }

    /**
     * Configures the gulp-cssnano plugin.
     */
    function configureCssNano() {
        config.cssNano = {
            safe: true
        };
    }

    /**
     * Configures the gulp-htmlmin plugin.
     */
    function configureHtmlMin() {
        config.htmlMin = {
            collapseWhitespace: true,
            removeComments: true
        };
    }

    /**
     * Configures the gulp-angular-templatecache plugin.
     */
    function configureTemplateCache() {
        config.templateCache = {
            file: "template.cache.js",
            options: {
                module: "spider.templates",
                standalone: false
            }
        };
    }

    /**
     * Configures the gulp-sourcemaps plugin.
     */
    function configureSourceMaps() {
        config.sourcemaps = {};
    }

    /**
     * Configures the gulp-rename plugin.
     */
    function configureRename() {
        config.rename = {
            extname: ".min.js"
        };
    }

    /**
     * Configures the gulp-webserver plugin.
     */
    function configureWebserver() {
        config.webserver = {
            host: "0.0.0.0",
            port: "8000",
            fallback: "index.html",
            livereload: true
        };
    }

    /**
     * Builds config object to configure gulp plugins and tasks.
     */
    function configure() {
        configureKarma();
        configureCssNano();
        configureHtmlMin();
        configureTemplateCache();
        configureSourceMaps();
        configureRename();
        configureWebserver();
    }

    /**
     * Deletes the destination directory before we repopulate it.
     */
    function cleanDestination() {
        return del.sync(
            [
                destination
            ]
        );
    }

    /**
     * Copies all source files unaltered to destination.
     */
    function copySource() {
        return gulp.src(
            [
                srcRoot + "**/*.*",
                "!" + srcRoot + "**/*.spec.js"
            ]
        ).pipe(
            gulp.dest(destination)
        );
    }

    /**
     * Run test once and exit.
     */
    function test(done) {
        new KarmaServer(
            config.karma.single,
            done
        ).start();
    }

    /**
     * Runs ESLint on all project JS files.
     */
    function lint() {
        return gulp.src(
            [
                srcRoot + "**/*.js"
            ]
        ).pipe(
            eslint()
        ).pipe(
            eslint.format()
        ).pipe(
            eslint.failAfterError()
        );
    }

    /**
     * Processes all SASS files to create a single CSS file.
     */
    function processStyles() {
        return gulp.src(
            [
                srcRoot + "**/*.scss"
            ]
        ).pipe(
            sourcemaps.init()
        ).pipe(
            sass().on(
                "error",
                sass.logError
            )
        ).pipe(
            cssNano(config.cssNano)
        ).pipe(
            concat("spider.all.min.css")
        ).pipe(
            sourcemaps.write("./")
        ).pipe(
            gulp.dest(destination)
        );
    }

    /**
     * Processes all HTML files, converting them into JavaScript to store them in Angular's templateCache.
     * Also minifies the HTML files and flattens the path to the template.
     */
    function processHtml() {
        return gulp.src(
            [
                srcRoot + "**/*.html"
            ]
        ).pipe(
            flatten()
        ).pipe(
            htmlMin(
                config.htmlMin
            )
        ).pipe(
            templatecache(
                config.templateCache.file,
                config.templateCache.options
            )
        ).pipe(
            gulp.dest(destination + "components/templates/")
        );
    }

    /**
     * Minifies and concats all JS files in destination folder.
     * Builds Source Maps.
     *
     * Ensures each module is defined prior to any components being added to it.
     *
     * Added code to output both the non-minified concatenated and the minified concatenated files:
     * https://github.com/gulpjs/gulp/blob/master/docs/recipes/minified-and-non-minified.md
     */
    function processScripts() {
        return gulp.src(
            [
                destination + "**/*.js"
            ]
        ).pipe(
            sourcemaps.init(
                config.sourcemaps
            )
        ).pipe(
            order(
                [
                    "**/*.module.js",
                    "**/*.js"
                ]
            )
        ).pipe(
            concat("spider.all.js")
        ).pipe(
            /* Write just the concatenated version to "spider.all.js". */
            gulp.dest(destination)
        ).pipe(
            uglify()
        ).pipe(
            /* The minified version will be written to "spider.all.min.js". */
            rename(
                config.rename
            )
        ).pipe(
            sourcemaps.write("./")
        ).pipe(
            gulp.dest(destination)
        );
    }

    /**
     * Creates a web server serving the application.
     */
    function serve() {
        gulp.src(
            '.'
        ).pipe(
            webserver(config.webserver)
        );
    }

    gulp.task(
        "cleanDestination",
        cleanDestination
    );

    gulp.task(
        "copySource",
        [
            "cleanDestination"
        ],
        copySource
    );

    gulp.task(
        "test",
        [
            "cleanDestination"
        ],
        test
    );

    gulp.task(
        "lint",
        [
            "cleanDestination"
        ],
        lint
    );

    gulp.task(
        "processStyles",
        [
            "cleanDestination"
        ],
        processStyles
    );

    gulp.task(
        "processHtml",
        [
            "cleanDestination"
        ],
        processHtml
    );

    gulp.task(
        "processScripts",
        [
            "copySource",
            "processHtml"
        ],
        processScripts
    );

    gulp.task(
        "build",
        [
            "copySource",
            "lint",
            "test",
            "processStyles",
            "processHtml",
            "processScripts"
        ]
    );

    gulp.task(
        "serve",
        [
            "build"
        ],
        serve
    );

    gulp.task(
        "default",
        [
            "serve"
        ]
    );

    /* Set up all configs. */
    configure();

}(require, __dirname));
