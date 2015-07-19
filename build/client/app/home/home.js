angular.module('jakt-admin-dashboard.home', [
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
                projects: function (Projects) {
                    return Projects.findAll().then(function (res) {
                        if(res.length){
                            return res;
                        } else {
                            return Projects.float().then(function (data) {
                                _.each(data.data, function (item) {
                                    _.extend(item, {
                                        daysearly: null,
                                        daysover: null,
                                        percent_complete: null,
                                        status: null,
                                        task_id: null
                                    });
                                });
                                return data.data;
                            });
                        }
                    });
                }
            }
        });
    })

    .controller('HomeCtrl', function HomeController($scope, projects, Projects, socket) {

        var vm = this;
        vm.projects = [];
        $scope.groups = [];

        angular.copy(projects, vm.projects);

        console.log('projects', projects);

        $scope.groups = projects;

        vm.addProject = function (data) {
            Projects.add(data.name).then(function (response) {
                vm.projects.unshift(response);
            })
        };

        $scope.float = function () {
            return Projects.float().then(function (res) {
                $scope.groups = res.data;
                return res;
            });
        };

        socket.on('update:success', function (msg) {
            console.log('received from server:', msg);
            var proj = _.findWhere($scope.groups, {project_name: msg.project_name});
            _.extend(proj, {daysleft: msg.daysleft});
        });

        //$scope.float();
    })

;

