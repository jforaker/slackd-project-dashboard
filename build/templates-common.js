(function(module) {
try { module = angular.module("templates-common"); }
catch(err) { module = angular.module("templates-common", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("partials/modal.tpl.html",
    "<div class=\"modal\" tabindex=\"-1\" role=\"dialog\" aria-hidden=\"true\">\n" +
    "    <div class=\"modal-dialog\">\n" +
    "        <div class=\"modal-content\">\n" +
    "            <div class=\"modal-header\" ng-show=\"title\">\n" +
    "                <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"$hide()\"><span\n" +
    "                    aria-hidden=\"true\">&times;</span></button>\n" +
    "                <h4 class=\"modal-title\">asfas</h4>\n" +
    "            </div>\n" +
    "            <div class=\"modal-body\" ng-bind=\"content\"></div>\n" +
    "            <div class=\"modal-footer\">asfas\n" +
    "                <button type=\"button\" class=\"btn btn-default\" ng-click=\"$hide()\">CloseClose</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates-common"); }
catch(err) { module = angular.module("templates-common", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("some-directive/some-directive.tpl.html",
    "<span>&nbsp;</span>\n" +
    "");
}]);
})();
