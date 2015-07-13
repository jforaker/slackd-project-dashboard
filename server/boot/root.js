var inspect = require('eyespect').inspector();
var request = require('request');
var Slack = require('./lib/Slack');
var Update = require('./lib/Update');
var utils = require('./lib/util');

module.exports = function (server) {

    /*
     so you’d enter /update project=alta daysLeft=5

     but if on track /udpate project=Alta status=ontrack`

     or maybe /update project=alta daysOver=5

     and /update project=alta daysEarly=2

     ME
     /update project:alta, daysLeft:7
     */



    var router = server.loopback.Router();


    router.get('/float', function (req, results) {

        var options = {
            method: 'get',
            json: true,
            url: 'https://api.floatschedule.com/api/v1/tasks',
            headers: {
                'User-Agent': 'JAKT Dashboard app (jake.foraker@byjakt.com)',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + process.env['FLOAT_API_KEY']
            }
        };

        request(options, function (err, res, body) {
            if (err) {
                inspect(err, 'error posting json');
                return
            }
            var headers = res.headers;
            var statusCode = res.statusCode;
            inspect(headers, 'headers');
            inspect(statusCode, 'statusCode');
            inspect(body, 'body');

            results.json(utils.stashFloatData(body.people));
        });
    });

    router.post('/update', function (req, res) {

        inspect(req.body, 'req.body');

        if (req.body.text) {

            var updateText = req.body.text;
            var channel = req.body.channel_id;
            var update = new Update();

            update.sendUpdate(updateText).then(function (response) {
                cb(response);
            });

            function cb(slackdata){
                var slacker = new Slack(channel);
                return slacker.postMessage(slackdata);
            }
        }
    });

    server.use(router);
};


