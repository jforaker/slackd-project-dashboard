var _ = require('lodash');
var inspect = require('eyespect').inspector();
var request = require('request');
var $ = require('jquery-deferred');

module.exports = {

    socket: null,
    arr: [],
    groups: [],
    projects: [],

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

    API_URL: process.env['NODE_ENV'] === 'production' ? 'https://jakt-admin-dashboard.herokuapp.com/' : 'http://0.0.0.0:3000/api/projects/',

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

    stashFloatData: function (data, body) {
        var _that = this;
        this.getDupes(data);
        this.groups = _.groupBy(_that.arr, function (a, b) {
            return a.project_name.replace(/\s+/g, '');
        });
        return this.strip(this.groups);
    },

    strip: function (data) {
        var that = this;
        var o = _.each(data, function (item) {
            var count = 0;
            _.each(item, function (project) {
                count = (count + +project.man_days);
                _.extend(project, {total_man_days: count});
            });
        });

        var foo = _.map(_.toArray(o), function (arr) {
            that.projects.push(_.last(arr));
            return _.last(arr);
        });

        this.checkExisting(foo);
        return foo;
    },

    checkExisting: function (projects) {
        var that = this;
        var def = $.Deferred();

        _.each(projects, function (proj) {

            var options = {
                body: _.pick(proj, 'project_name', 'task_id', 'man_days', 'total_man_days'),
                json: true,
                uri: that.API_URL + '/checkExisting?task_id=' + proj.task_id
            };

            var callBack = function (error, response, body) {
                if (error) {
                    def.reject({status: 500, data: {error: error.message}});
                } else if (response.statusCode == 200) {

                    def.resolve(body).then(function (res) {
                        if (!res.project) {
                            that.postNew(proj);
                        }
                    });
                } else {
                    inspect(body, 'checkExisting reject');
                    def.reject(body);
                }
            };
            request.get(options, callBack);
            return def.promise;
        });
    },

    findByProjectName: function (name) {
        var that = this;
        var def = $.Deferred();
        var options = {
            json: true,
            uri: that.API_URL + 'findByProjectName?project_name=' + name
        };
        var callBack = function (error, response, body) {
            if (error) {
                def.reject({status: 500, data: {error: error.message}});
            } else if (response.statusCode == 200) {
                inspect(body, 'projects/findByTaskId sucess');
                def.resolve(body);
            } else {
                inspect(body, 'projects/findByTaskId reject');
                def.reject(body);
            }
        };
        request.get(options, callBack);
        return def.promise();
    },

    postNew: function (project) {
        var that = this;
        var def = $.Deferred();

        var options = {
            body: project,
            json: true,
            uri: that.API_URL
        };

        var callBack = function (error, response, body) {
            if (error) {
                def.reject({status: 500, data: {error: error.message}});
            } else if (response.statusCode == 200) {
                inspect(body, 'postNew success');
                def.resolve(body);
            } else {
                inspect(body, 'postNew reject');
                def.reject(body);
            }
        };
        request.post(options, callBack);
    }
};
