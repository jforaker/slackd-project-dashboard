var inspect = require('eyespect').inspector(),
    request = require('request'),
    $ = require('jquery-deferred'),
    utils = require('./util'),
    _ = require('lodash')
    ;

function Slack(channel) {
    this.channel = channel;
}

Slack.prototype.postMessage = function (info) {

    var def = $.Deferred();
    var _that = this;

    inspect(info, 'info Slack.prototype.postMessage');

    var options = {
        body: {
            text: "thanks for the update. I will tell the boss " + info.name
                + (info.daysLeft ? ' has ' : 'is')
                + (info.daysLeft ? info.daysLeft + ' days left' : '')
                + (info.daysOver ? ' and is ' + info.daysOver + ' days over' : '')
            ,
            channel: _that.channel
        },
        json: true,
        url: utils.slackurl
    };

    var callBack = function (error, response, body) {
        if (error) {
            def.reject({status: 500, data: {error: error.message}});
        } else if (response.statusCode == 200) {
            inspect(body, 'Slack success body');
            def.resolve(body);
        } else {
            def.reject(body);
        }
    };

    request.post(options, callBack);
    return def.promise();
};

module.exports = Slack;
