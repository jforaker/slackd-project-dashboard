var inspect = require('eyespect').inspector(),
    request = require('request'),
    $ = require('jquery-deferred'),
    utils = require('./util'),
    _ = require('lodash')
    ;

function Update (text) {
    console.log('this Update', text);
    this.text = text;
}

Update.prototype.sendUpdate = function (update) {

    var def = $.Deferred();

    var val = update;

    var one = val.substr(val.indexOf("project=") + 8);
    var name = one.split(',')[0];
    var project = name.split(' ')[0];
    var daysLeft = val.substr(val.indexOf("daysLeft=") + 9);
    var daysOver = val.substr(val.indexOf("daysOver=") + 9);
    var daysEarly = val.substr(val.indexOf("daysEarly=") + 10);

    var properties = val.split(', ');
    var obj = {};
    properties.forEach(function (property) {
        var tup = property.split(':');
        obj[tup[0]] = tup[1];
    });

    inspect(obj, 'obj');

    //todo fix mapping issue



    var options = {
        body: _.pick(obj, 'daysEarly', 'daysOver', 'daysLeft', 'percent_complete', 'status'),
        json: true,
        uri: utils.API_URL + utils.maps[obj.project]
    };

    inspect(options, 'options');


    var callBack = function (error, response, body) {
        if (error) {
            def.reject({status: 500, data: {error: error.message}});
        } else if (response.statusCode == 200) {
            inspect(body, 'Update.prototype.sendUpdate') ;
            utils.getSocket().emit('update:success', body);
            def.resolve(body);
        } else {
            def.reject(body);
        }
    };
    request.put(options, callBack);
    return def.promise();
};

module.exports = Update;
