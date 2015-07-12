var path = require('path');
var app = require(path.resolve(__dirname, '../server'));

var projects = [
    {
        "name": "AltaIpsum-Frontend",
        "status": "",
        "percent_complete": 0,
        "id": 1
    },
    {
        "name": "alta-api",
        "status": "",
        "percent_complete": 0,
        "id": 2
    },
    {
        "name": "crashr-ios",
        "status": "",
        "percent_complete": 0,
        "id": 3
    },
    {
        "name": "definition",
        "status": "",
        "percent_complete": 0,
        "id": 4
    },
    {
        "name": "crashr-backend",
        "status": "",
        "percent_complete": 0,
        "id": 5
    },
    {
        "name": "triggers",
        "status": "",
        "percent_complete": 0,
        "id": 6
    },
    {
        "name": "trec-ios",
        "status": "",
        "percent_complete": 0,
        "id": 7
    },
    {
        "name": "stagegauge-api",
        "status": "",
        "percent_complete": 0,
        "id": 8
    },
    {
        "name": "dealerdisclosure-android",
        "status": "",
        "percent_complete": 0,
        "id": 9
    },
    {
        "name": "Dealer_Disclosure_ios",
        "status": "",
        "percent_complete": 0,
        "id": 10
    }
];
var dataSource = app.dataSources.postgres;

dataSource.automigrate('project', function (err) {
    if (err) console.log(err);

    var Project = app.models.project;
    var count = projects.length;

    projects.forEach(function (resource) {
        Project.create(resource, function (err, record) {
            if (err) return console.log(err);

            console.log('Project created:', record);

            count--;

            if (count === 0) {
                console.log('done');
                dataSource.disconnect();
            }
        });
    });
});
