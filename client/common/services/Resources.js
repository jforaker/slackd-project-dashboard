angular.module('Resources', [])

    .factory('Resources', function ResourcesService($http, $q) {

        var resources = {};

        resources.deleteOne = function (assignment, type) {
            var config = {
                method: 'DELETE',
                //url: apiUrl + '/Resources',
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
                url: apiUrl + '/api/Resources',
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


        resources.findAll = function () {
            var config = {
                method: 'GET',
                url: apiUrl + '/api/Resources'
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
