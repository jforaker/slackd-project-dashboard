var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var resources = [
    {
        name: 'foobar.com',
        createdAt: new Date(),
        lastModifiedAt: new Date()
    },
    {
        name: 'bazzboo.com',
        createdAt: new Date(),
        lastModifiedAt: new Date()
    }
];
var dataSource = app.dataSources.pgDs;

dataSource.automigrate('Resource', function (err) {
    if (err) console.log(err);

    var Resource = app.models.Resource;
    var count = resources.length;

    resources.forEach(function (resource) {
        Resource.create(resource, function (err, record) {
            if (err) return console.log(err);

            console.log('Record created:', record);

            count--;

            if (count === 0) {
                console.log('done');
                dataSource.disconnect();
            }
        });
    });
});
