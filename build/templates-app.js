(function(module) {
try { module = angular.module("templates-app"); }
catch(err) { module = angular.module("templates-app", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("about/about.tpl.html",
    "<div class=\"row\">\n" +
    "    <h1 class=\"page-header\">\n" +
    "        The Elevator Pitch\n" +
    "        <small>For the lazy and impatient.</small>\n" +
    "    </h1>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);
})();

(function(module) {
try { module = angular.module("templates-app"); }
catch(err) { module = angular.module("templates-app", []); }
module.run(["$templateCache", function($templateCache) {
  $templateCache.put("home/home.tpl.html",
    "<div class=\"row\">\n" +
    "    <h1>JAKT Projects </h1>\n" +
    "\n" +
    "    <!--<form name=\"home.resource_form\" class=\"form-inline\"-->\n" +
    "          <!--ng-submit=\"home.addProject(home.resource_form)\">-->\n" +
    "\n" +
    "        <!--<div class=\"form-group\">-->\n" +
    "            <!--<label>Resource name</label>-->\n" +
    "            <!--<input type=\"text\" class=\"form-control\" placeholder=\"Resource name\"-->\n" +
    "                   <!--ng-model=\"home.resource_form.name\">-->\n" +
    "        <!--</div>-->\n" +
    "        <!--<button type=\"submit\" class=\"btn btn-large btn-success\">-->\n" +
    "            <!--<i class=\"fa fa-download\"></i>Submit-->\n" +
    "        <!--</button>-->\n" +
    "\n" +
    "    <!--</form>-->\n" +
    "</div>\n" +
    "<div id=\"wrapper\">\n" +
    "    <div id=\"columns\">\n" +
    "        <ul>\n" +
    "            <li ng-repeat=\"group in groups | orderBy:'project_name'\" class=\"pin\">\n" +
    "                <p>{{ group.project_name }}</p>\n" +
    "\n" +
    "                <p>Time left: {{ group.daysleft || 'n/a' }}</p>\n" +
    "\n" +
    "                <p>Project Duration = {{ group.total_man_days }} days</p>\n" +
    "\n" +
    "                <!--time used diff first day to today?-->\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--foo-->\n" +
    "<a href ng-click=\"float()\">get float</a>\n" +
    "\n" +
    "<div class=\"row\" style=\"display: none;\">\n" +
    "    <div class=\"col-lg-12\">\n" +
    "        <rd-widget>\n" +
    "            <rd-widget-header icon=\"fa-tasks\" title=\"Projects\"></rd-widget-header>\n" +
    "            <rd-widget-body classes=\"medium no-padding\">\n" +
    "                <div class=\"table-responsive\">\n" +
    "                    <table class=\"table\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>#</th>\n" +
    "                            <th>Project</th>\n" +
    "                            <th>Status</th>\n" +
    "                            <th>daysLeft</th>\n" +
    "                            <th>Progress</th>\n" +
    "                            <th>foo</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr ng-repeat=\"r in home.projects\">\n" +
    "                            <td>{{ $index + 1 }}</td>\n" +
    "                            <td>{{ r.name }}</td>\n" +
    "                            <td>{{ r.status }}</td>\n" +
    "                            <td>{{ r.daysLeft }}</td>\n" +
    "                            <td>\n" +
    "                                <progressbar class=\"progress-striped\" value=\"r.daysLeft\" type=\"{{type}}\"></progressbar>\n" +
    "                            </td>\n" +
    "                        </tr>\n" +
    "                        </tbody>\n" +
    "                    </table>\n" +
    "                </div>\n" +
    "            </rd-widget-body>\n" +
    "        </rd-widget>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
})();
