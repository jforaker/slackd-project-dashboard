var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.pgDs;

dataSource.discoverSchema('resource', {schema: 'public'},
    function (err, schema) {
        if (err) throw err;

        console.log(JSON.stringify(schema, null, '  '));

        dataSource.disconnect();
    });