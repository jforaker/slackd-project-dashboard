angular.module('Resources', [])

    .factory('Resources', function ResourcesService($http, $q) {

        var resources = {};



        resources.edit = function (data) {
            console.log('data  edit reminder', data);

            var submitEditReminder = function (configs) {
                return $http(configs).then(function (response) {

                    console.log('response from submitEditReminder Service ', response);

                    return response.data;
                })
                    ;
            };

            var config = {
                method: 'PATCH',
                //url: API_URL + 'assignments/' + data.id + '/',
                //data: {
                //    title: data.title,
                //    due: moment(data.due).seconds(0).milliseconds(0).format(),
                //    estimated_time: data.estimated_time
                //}
            };

            return submitEditReminder(config);
        };

        resources.deleteOne = function (assignment, type) {
            var config = {
                method: 'DELETE',
                //url: API_URL + 'assignments/' + assignment.id + '/'
            };

            return $http(config)
                .then(function (response) {
                    if (response && response.status === 204) {

                    }
                    return response.data;
                }, function (error) {
                    console.warn(error);
                })
                ;
        };


        resources.add = function (name, url) {
            var config = {
                method: 'POST',
                url: 'http://localhost:3000/api/Resources',
                data: {
                    name: name,
                    url: url
                }
            };

            return $http(config)
                .then(function (response) {

                    return response.data;
                }, function (error) {
                    console.warn(error);
                })
                ;
        };


        resources.findAll = function (name, url) {
            var config = {
                method: 'GET',
                url: 'http://localhost:3000/api/Resources'
            };

            return $http(config)
                .then(function (response) {
                    if (response) {

                        return response.data;
                    }
                }, function (error) {
                    console.warn(error);
                })
                ;
        };

        return resources;
    })

;