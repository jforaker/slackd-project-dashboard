var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.pgDs;

dataSource.discoverAndBuildModels('resource', {schema: 'public'},
    function (err, models) {
        if (err) throw err;

        models.Resource.find(function (err, accounts) {
            if (err) return console.log(err);

            console.log(accounts);

            dataSource.disconnect();
        });
    });