/* Results View */
define(function (require) {

    "use strict";

    var _ = require('underscore');
    var Backbone = require('backbone');
    var $ = require('jquery');
    var Parse = require('parse');
    var CountModel = require('app/model/count');

    return Backbone.View.extend({

        el: '#results',

        template: _.template("<li class='<%= name %>'><%= count %></li>"),

        /*
        <dt>IceCream</dt>
            <dd class="icecream"><%= votes.icecream %></dd>
        <dt>Gelato</dt>
            <dd class="gelato"><%= votes.gelato %></dd>
        */

        initialize: function () {
            var self = this;
            var query = new Parse.Query(CountModel);
            query.find({
                success: _.bind(function (results) {
                    this.results = results[0].attributes;
                    this.render();
                }, self),
                error: this.countError
            });
        },

        render: function () {
            _.each(this.results, _.bind(function(result, index) {
                this.$el.append(this.template({ name: index, count: result }));
            }, this));
            return this;
        },

        countError: function (error) {
            alert('Something went wrong grabbing the results.', error);
        }

    });
});
