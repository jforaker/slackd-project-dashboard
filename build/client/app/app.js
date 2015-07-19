window.apiUrl = 'https://shrouded-thicket-2291.herokuapp.com'; // 'http://localhost:3000/api';

angular.module('jakt-admin-dashboard', [
	//Core
	'templates-app',
	'templates-common',

	//Modules
	'jakt-admin-dashboard.home',
	'jakt-admin-dashboard.about',
	'jakt-admin-dashboard.someDirective',
    'Resources',
    'Projects',
    //'ngResource',
    //'lbServices',

	//3rd Party
    'ngAnimate',
	'ui.router',
    'ngCookies',
    //'mgcrea.ngStrap',
    'ui.bootstrap',
    //'ui.bootstrap.tpls',
    'jakt-admin-dashboard.rdWidget',
    'jakt-admin-dashboard.rdWidgetBody',
    'jakt-admin-dashboard.rdWidgetFooter',
    'jakt-admin-dashboard.rdWidgetHeader',
    'chart.js',
    'btford.socket-io'
])

	.config(function myAppConfig($stateProvider, $urlRouterProvider, ChartJsProvider) {
		$urlRouterProvider.otherwise('/home');

        ChartJsProvider.setOptions({
            colours: ['#97BBCD', '#DCDCDC', '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
            responsive: true
        });
    })

	.run(function run() {

	})

	.controller('AppCtrl', function AppCtrl($scope, $location, $cookieStore) {
		$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			if (angular.isDefined(toState.data.pageTitle)) {
				$scope.pageTitle = toState.data.pageTitle + ' | jakt-admin-dashboard';
			}
		});

        var mobileView = 992;

        $scope.getWidth = function () {
            return window.innerWidth;
        };

        $scope.$watch($scope.getWidth, function (newValue, oldValue) {
            if (newValue >= mobileView) {
                if (angular.isDefined($cookieStore.get('toggle'))) {
                    $scope.toggle = !$cookieStore.get('toggle') ? false : true;
                } else {
                    $scope.toggle = true;
                }
            } else {
                $scope.toggle = false;
            }

        });

        $scope.toggleSidebar = function () {
            $scope.toggle = !$scope.toggle;
            $cookieStore.put('toggle', $scope.toggle);
        };

        window.onresize = function () {
            $scope.$apply();
        };
	})

    .factory('socket', function (socketFactory) {
        //return socketFactory();
        var myIoSocket = io.connect(apiUrl);

        var mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
    })
;

