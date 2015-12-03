$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.buttons", ["kao.crud.api", "kao.loading"]).directive("deleteButton", function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        dataType: "@type",
        action: "&"
      },
      link: function(scope, element, attrs) {
        scope.useAction = attrs instanceof Array ? attrs.indexOf("action") !== -1 : "action" in attrs;
      },
      controller: function($scope) {
        $scope.dataType = $scope.dataType == null ? $scope.$parent.dataType : $scope.dataType;
        $scope.perform = function() {
          if ($scope.useAction) {
            $scope.action();
          } else {
            $scope.$parent.delete($scope.$parent.record);
          }
        };
      },
      template: "<button ng-click=\"perform()\" class=\"btn btn-primary\">     <span class=\"glyphicon glyphicon-trash\" aria-hidden=\"true\"></span>     <span class=\"sr-only\">Delete {{dataType}}</span> </button>"
    };
  }).directive("saveButton", function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        action: "&",
        tracker: "="
      },
      link: function(scope, element, attrs) {
        scope.useAction = attrs instanceof Array ? attrs.indexOf("action") !== -1 : "action" in attrs;
        scope.useTracker = attrs instanceof Array ? attrs.indexOf("tracker") !== -1 : "tracker" in attrs;
      },
      controller: function($scope) {
        $scope._tracker = $scope.useTracker ? $scope.tracker : $scope.$parent.saveTracker;
        $scope.perform = function() {
          if ($scope.useAction) {
            $scope.action();
          } else {
            $scope.$parent.save();
          }
        };
      },
      template: "<div>     <loading-button tracker=\"_tracker\" data-loading-text=\"Saving\" type=\"submit\" ng-click=\"perform()\" class=\"btn btn-default btn-primary\">Save</loading-button> </div>"
    };
  });
  return {};
});
