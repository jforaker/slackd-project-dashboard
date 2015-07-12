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
                        return res;
                    });
                }
            }
        });
    })

    .controller('HomeCtrl', function HomeController($scope, projects, Projects, socket) {

        var vm = this;
        vm.projects = [];

        angular.copy(projects, vm.projects);

        vm.addProject = function (data) {
            Projects.add(data.name).then(function (response) {
                vm.projects.unshift(response);
            })
        };

        $scope.data = [];

        socket.on('update:success', function (msg) {
            console.log('received from server:', msg);
            var proj = _.findWhere(vm.projects, { id: msg.id})
            angular.copy(msg, proj);
        });

        $scope.getdata = function (id) {
            var arr = [];
            _.each(vm.projects, function (proj) {
                if (proj.percent_complete) {
                    random(proj.percent_complete);
                    arr.push([proj.percent_complete, 25]);
                } else {
                    arr.push([30, 40]);
                }
            });
            $scope.data = arr;
        };

        $scope.getdata();

        var arr = [];

        function getDupes(people){
            _.each(people, function (person) {
                _.each(_.uniq(person.tasks, 'task_id'), function (task) {
                    arr.push({
                        project_name: task.project_name,
                        task_id: task.task_id,
                        man_days: task.task_days
                    });
                });
            });
        }

        function calcManDays(g){
            _.each(g, function (projecto) {
                projecto.TOTAL_MAN_DAYS = 0;
                _.each(projecto, function (item) {
                    projecto.TOTAL_MAN_DAYS += +item.man_days;
                })
            });
        }

        $scope.float = function () {
            return Projects.float()
                .then(function (res) {
                    return res;
                }).then(function (res) {
                    getDupes(res.data.people);
                    var group = _.groupBy(arr, function (a, b) {
                        return a.project_name.replace(/\s+/g, '');
                    });
                    calcManDays(group);
                    $scope.groups = group;
                });
        }
    })

;

