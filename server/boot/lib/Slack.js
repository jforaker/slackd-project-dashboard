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

    var projs = _.map(utils.projects, function (proj) {
        return proj.project_name
    });

    inspect(info, 'info Slack.prototype.postMessage');

    var options = {
        body: {
            channel: _that.channel,
            "attachments": [
                {
                    "fallback": "Required text summary of the attachment that is shown by clients that understand attachments but choose not to show them.",
                    "color": "#1abc9c",
                    "fields": [
                        {
                            "title": "thanks for the update.",
                            "value": "I will tell the boss " + info.project_name
                            + (info.daysleft ? ' has ' : 'is')
                            + (info.daysleft ? info.daysleft + ' days left' : '')
                            + (info.daysover ? ' and is ' + info.daysover + ' days over' : '')
                            ,
                            "short": false
                        }
                    ]
                }
            ]
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
            inspect(body, 'Slack Error body');
            def.reject(body);
        }
    };

    request.post(options, callBack);
    return def.promise();
};

module.exports = Slack;
