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
    "    <h1>Projects </h1>\n" +
    "\n" +
    "    <form name=\"home.resource_form\" class=\"form-inline\"\n" +
    "          ng-submit=\"home.addProject(home.resource_form)\">\n" +
    "\n" +
    "        <div class=\"form-group\">\n" +
    "            <label>Resource name</label>\n" +
    "            <input type=\"text\" class=\"form-control\" placeholder=\"Resource name\"\n" +
    "                   ng-model=\"home.resource_form.name\">\n" +
    "        </div>\n" +
    "        <button type=\"submit\" class=\"btn btn-large btn-success\">\n" +
    "            <i class=\"fa fa-download\"></i>Submit\n" +
    "        </button>\n" +
    "\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<ul>\n" +
    "    <li ng-repeat=\"(key,val) in groups\" style=\"width: 200px; display: inline-block;border: 1px solid\">{{key}}:\n" +
    "        <p>Time under/over</p>\n" +
    "\n" +
    "        <p>Time Left (from dev)</p>\n" +
    "        <p>TOTAL_MAN_DAYS = {{ val.TOTAL_MAN_DAYS }}</p>\n" +
    "\n" +
    "        <p>Time used</p>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<!--foo-->\n" +
    "<a href ng-click=\"float()\">hello</a>\n" +
    "\n" +
    "<div class=\"row\">\n" +
    "    <div class=\"col-lg-12\">\n" +
    "        <rd-widget>\n" +
    "            <rd-widget-header icon=\"fa-tasks\" title=\"Projects\">\n" +
    "                <a class=\"btn btn-lg btn-danger\" data-animation=\"am-fade-and-slide-top\"\n" +
    "                        template=\"partials/modal.tpl.html\" bs-modal=\"modal\" data-html=\"true\">Custom Modal\n" +
    "                    <br>\n" +
    "                    <small>Add project</small>\n" +
    "                </a>\n" +
    "            </rd-widget-header>\n" +
    "            <rd-widget-body classes=\"medium no-padding\">\n" +
    "                <div class=\"table-responsive\">\n" +
    "                    <table class=\"table\">\n" +
    "                        <thead>\n" +
    "                        <tr>\n" +
    "                            <th>#</th>\n" +
    "                            <th>Project</th>\n" +
    "                            <th>Status</th>\n" +
    "                            <th>daysLeft</th>\n" +
    "                            <th>Lead</th>\n" +
    "                            <th>Progress</th>\n" +
    "                        </tr>\n" +
    "                        </thead>\n" +
    "                        <tbody>\n" +
    "                        <tr ng-repeat=\"r in home.projects\">\n" +
    "                            <td>{{ $index + 1 }}</td>\n" +
    "                            <td>{{ r.name }}</td>\n" +
    "                            <td>{{ r.status }}</td>\n" +
    "                            <td>{{ r.daysLeft }}</td>\n" +
    "                            <!--<td>{{ r.percent_complete }}</td>-->\n" +
    "                            <!--<td>-->\n" +
    "                                <!--<canvas id=\"doughnut-{{ r.id }}\" legend=\"true\"-->\n" +
    "                                        <!--class=\"chart chart-doughnut\"-->\n" +
    "                                        <!--data=\"data[$index]\"-->\n" +
    "                                        <!--labels=\"labels\">-->\n" +
    "                                <!--</canvas>-->\n" +
    "                            <!--</td>-->\n" +
    "                            <td>leader</td>\n" +
    "                            <td>\n" +
    "                                <progressbar class=\"progress-striped\" value=\"r.percent_complete\" type=\"{{type}}\"></progressbar>\n" +
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
