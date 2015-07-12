/**
 * Widget Footer Directive
 */

angular
    .module('jakt-admin-dashboard.rdWidgetFooter', ['jakt-admin-dashboard.rdWidget'])
    .directive('rdWidgetFooter', rdWidgetFooter);

function rdWidgetFooter() {
    var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
};
