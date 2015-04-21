var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var dataSource = app.dataSources.pgDs;

dataSource.autoupdate(function () {
    dataSource.disconnect();
});