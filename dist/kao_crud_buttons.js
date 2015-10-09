$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.buttons", ["kao.crud.api", "kao.loading"]).directive("deleteButton", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<button ng-click=\"delete(record)\" class=\"btn btn-primary\">     <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>     <span class=\"sr-only\">Delete {{dataType}}</span> </button>"
    };
  }).directive("saveButton", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div>     <loading-button tracker=\"saveTracker\" data-loading-text=\"Saving\" type=\"submit\" ng-click=\"save()\" class=\"btn btn-default btn-primary\">Save</loading-button> </div>"
    };
  });
  return {};
});
