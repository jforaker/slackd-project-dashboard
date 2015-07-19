angular.module('Projects', [])

    .factory('Projects', function ResourcesService($http, $q) {

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


        resources.add = function (name) {
            var config = {
                method: 'POST',
                url: apiUrl + '/Projects',
                data: {
                    name: name
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
                url: apiUrl + '/Projects'
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

        resources.float = function () {
            var config = {
                method: 'GET',
                url: apiUrl + '/float'
            };

            return $http(config)
                .then(function (response) {
                    if (response) {
                        return response;
                    }
                }, function (error) {
                    console.warn(error);
                })
                ;
        };

        return resources;
    })

;
