var inspect = require('eyespect').inspector(),
    request = require('request'),
    $ = require('jquery-deferred'),
    utils = require('./util'),
    _ = require('lodash')
    ;

function Update (text) {}

Update.prototype.sendUpdate = function (update) {

    var def = $.Deferred();

    var val = update;

    var one = val.substr(val.indexOf("project=") + 8);
    var name = one.split(',')[0];
    var project_name = name.split(' ')[0];
    var daysLeft = val.substr(val.indexOf("daysleft=") + 9);
    var daysover = val.substr(val.indexOf("daysover=") + 9);
    var daysearly = val.substr(val.indexOf("daysearly=") + 10);

    var properties = val.split(', ');
    var obj = {};
    properties.forEach(function (property) {
        var tup = property.split(':');
        obj[tup[0]] = tup[1];
    });

    var projectToFind = utils.findByProjectName(obj.project);

    return projectToFind.then(function (res) {

        var options = {
            body: _.pick(obj, 'daysearly', 'daysover', 'daysleft', 'percent_complete', 'status'),
            json: true,
            uri: utils.API_URL + res.project.id
        };

        var callBack = function (error, response, body) {
            if (error) {
                def.reject({status: 500, data: {error: error.message}});
            } else if (response.statusCode == 200) {
                inspect(body, 'Update.prototype.sendUpdate');
                utils.getSocket().emit('update:success', body);
                def.resolve(body);
            } else {
                inspect(body, 'Update reject');
                def.reject(body);
            }
        };

        request.put(options, callBack);
        return def.promise();

    }, function (err) {
        inspect(body, 'Err findByTaskId Promise');
    });


};

module.exports = Update;
