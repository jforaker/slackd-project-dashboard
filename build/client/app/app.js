window.apiUrl = 'https://still-hollows-2130.herokuapp.com/api';//'http://localhost:3000/api/Resources'

angular.module('ngbp-gulp', [
	//Core
	'templates-app',
	'templates-common',

	//Modules
	'ngbp-gulp.home',
	'ngbp-gulp.about',
	'ngbp-gulp.someDirective',
    'Resources',
    //'ngResource',
    //'lbServices',

	//3rd Party
	'ui.router'
])

	.config(function myAppConfig($stateProvider, $urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/home');
        //$locationProvider.html5Mode(true);
    })

	.run(function run() {

	})

	.controller('AppCtrl', function AppCtrl($scope, $location) {
		$scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
			if (angular.isDefined(toState.data.pageTitle)) {
				$scope.pageTitle = toState.data.pageTitle + ' | ngbp-gulp';
			}
		});
	})

;

