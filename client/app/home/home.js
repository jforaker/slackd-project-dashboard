angular.module('ngbp-gulp.home', [
    'ui.router'
])


    .config(function config($stateProvider) {
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    controllerAs: 'home',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data: {pageTitle: 'Home'},
            resolve: {
                resources: function (Resources) {
                    return Resources.findAll().then(function (res) {
                        return res;
                    });
                }
            }
        });
    })


    .controller('HomeCtrl', function HomeController($scope, resources, Resources) {

        var vm = this;
        vm.resources = [];

        angular.copy(resources, vm.resources);

        vm.addResource = function (data) {
            console.log('data ', data);

            Resources.add(data.name, data.url).then(function (response) {
                console.log('response ', response);
                vm.resources.unshift(response);
            })
        }
    })

;

