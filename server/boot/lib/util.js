/**
 * helpers, etc.
 */

var _ = require('lodash');
var inspect = require('eyespect').inspector();

module.exports = {

    socket: null,
    arr: [],
    groups: [],

    parseJSON: function (str) {
        var obj;
        try {
            obj = JSON.parse(str || '');
        } catch (error) {
            obj = {error: error};
        }
        return obj;
    },

    slackurl: process.env['SLACK_URL'],

    ROOT_URL: 'http://0.0.0.0:3000/',

    API_URL: 'http://0.0.0.0:3000/api/projects/',

    maps: {
        "AltaIpsum-Frontend": 1,
        "alta-api": 2,
        "crashr-ios": 3,
        "definition": 4,
        "crashr-backend": 5,
        "triggers": 6,
        'RentalTree Design': 15
    },

    getSocket: function () {
        return this.socket;
    },

    setSocket: function (sock) {
        return this.socket = sock;
    },

    getDupes: function (people) {
        var _that = this;
        _.each(people, function (person) {
            _.each(_.uniq(person.tasks, 'task_id'), function (task) {
                _that.arr.push({
                    project_name: task.project_name,
                    task_id: task.task_id,
                    man_days: task.task_days
                });
            });
        });
    },

    stashFloatData: function (data) {
        var _that = this;
        this.getDupes(data);
        this.groups = _.groupBy(_that.arr, function (a, b) {
            return a.project_name.replace(/\s+/g, '');
        });
        return this.strip(this.groups);
    },

    strip: function (data) {
        var o = _.each(data, function (item) {
            var count = 0;
            _.each(item, function (project) {
                count = (count + +project.man_days);
                _.extend(project, {total_man_days: count});
            });
        });
        return _.map(_.toArray(o), function (arr) {
            return _.last(arr);
        });
    }

};
