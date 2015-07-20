(function () {
    'use strict';

    require.config({
        shim: {
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'parse': {
                exports: 'Parse'
            },
            'underscore': {
                exports: '_'
            }
        },
        paths: {
            "jquery": "../bower_components/jquery/dist/jquery",
            "underscore": "../bower_components/underscore/underscore",
            "backbone": "../bower_components/backbone/backbone",
            "parse": "//www.parsecdn.com/js/parse-1.5.0.min"
        }
    });
    require(['app/router'], function (Router) {
        new Router();
    });
})();

