/* Results View */
define(function (require) {

    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');
    var Parse = require('parse');
    var CountModel = require('app/model/count');

    return Backbone.View.extend({

        el: '#results',

        template: _.template("<li><p><%= percentage %>%<br /><span><%= count %> votes</span></p></li>"),

        initialize: function () {
            var self = this;
            var query = new Parse.Query(CountModel);
            query.find({
                success: _.bind(function (results) {
                    this.counts = results[0].attributes;
                    this.render();
                }, self),
                error: this.countError
            });
        },

        render: function () {
            var total = _.pick(this.counts, 'total')['total'];
            var results = _.toArray(_.omit(this.counts, 'total')).reverse();
            console.log(results);
            _.each(results, _.bind(function (value) {
                this.$el.append(this.template({
                    count: value,
                    percentage: Math.floor((value / total * 100))
                }));
            }, this));
            return this;
        },

        countError: function (error) {
            window.alert('Something went wrong grabbing the results.', error);
        }

    });
});
