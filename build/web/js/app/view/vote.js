/* Vote View */
define(function (require) {

    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');
    var $ = require('jquery');
    var Parse = require('parse');
    var VoteModel = require('app/model/vote');
    var CountModel = require('app/model/count');

    var candidates = [
        'Gelato',
        'Ice Cream'
    ];

    return Backbone.View.extend({

        el: '#candidates',

        model: new VoteModel(),

        template: _.template("<li><button id='<%= id %>'>Vote <%= name %></button></li>"),

        events: { 'click': 'submitVote' },

        initialize: function () {
            Parse.initialize("JPfBSjIrpARsxxCQnSVx6PbG27AjGVpABHBeMh9w", "cZfh1Ec60aAOK6T8bfwU6LQrhTrpVT23jGgnkJt8");
            this.render();
        },

        render: function () {
            _.each(candidates, _.bind(function(candidate) {
                var nameToLower = candidate.replace(/\s/g, '').toLowerCase();
                this.$el.append(this.template( { name: candidate, id: nameToLower } ));
            }, this));
            return this;
        },

        submitVote: function (event) {
            this.candidate = $(event.target).attr('id');
            this.model.save({ candidate: this.candidate }, {
                success: _.bind(this.voteSuccess, this, this.candidate),
                error: _.bind(this.voteError, this)
            });
        },

        voteSuccess: function (candidate) {
            this.updateCount(candidate);
        },

        voteError: function (error) {
            alert('something went wrong trying to submit your vote', error);
        },

        updateCount: function (candidate) {
            var query = new Parse.Query(CountModel);
            query.find({
                success: _.bind(function (results) {
                    if (results.length > 0) {
                        // The counter is there, update it
                        results[0].increment(candidate).save();
                    } else {
                        // Create a counter, then update it
                        this.counter = new CountModel();
                        this.counter.increment(candidate).save();
                    }
                    this.updateHash();
                }, this),
                error: this.voteError
            });
        },

        updateHash: function () {
            window.location.href = '/#/results';
        }

    });
});
