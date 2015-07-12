angular.module('jakt-admin-dashboard.about', [
	'ui.router',
	'placeholders'
])

	.config(function config($stateProvider) {
		$stateProvider.state('about', {
			url: '/about',
			views: {
				"main": {
					controller: 'AboutCtrl',
					templateUrl: 'about/about.tpl.html'
				}
			},
			data: {pageTitle: 'What is It?..'}
		});
	})

	.controller('AboutCtrl', function AboutCtrl($scope) {
		// This is simple a demo for UI Boostrap.
		$scope.dropdownDemoItems = [
			"asdf 2323",
			"And another choice for you.",
			"but wait! A third!"
		];
	})

;
