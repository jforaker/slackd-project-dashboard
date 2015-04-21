(function(module) {
try { module = angular.module("templates-common"); }
catch(err) { module = angular.module("templates-common", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("some-directive/some-directive.tpl.html",
    "<span>&nbsp;</span>\n" +
    "");
}]);
})();
