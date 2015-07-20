/* Router */
define(['backbone', 'app/view/vote', 'app/view/results'], function (Backbone, VoteView, ResultsView) {
    "use strict";

    return Backbone.Router.extend({

        initialize: function () {
            Backbone.history.start();
        },

        routes: {
            "/*": "home"
                // "results": "results"
        },

        home: function () {
            this.view = new VoteView();
        },

        results: function () {
            this.resultsView = new ResultsView();
        }

    });

});
