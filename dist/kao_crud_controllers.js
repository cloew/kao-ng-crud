$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.controllers", ["kao.crud.directives", "kao.crud.record", "kao.loading"]).directive("kaoCrudList", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div class=\"col-md-8 col-md-push-2\" style=\"text-align:center;\">     <list-header class=\"col-md-12\"></list-header>     <loading-div tracker=\"listTracker\">         <model-table></model-table>     </loading-div> </div>",
      scope: {type: "@"},
      controller: function($scope, $location, LoadingTracker, KaoRecords) {
        var recordsHelper = new KaoRecords($scope.type);
        $scope.listTracker = new LoadingTracker();
        $scope.records = [];
        $scope.dataType = recordsHelper.frontEndCrud.name;
        $scope.pluralDataType = recordsHelper.frontEndCrud.pluralName;
        $scope.newUrl = "#" + recordsHelper.frontEndCrud.getNewUrl();
        $scope.tableDirective = recordsHelper.frontEndCrud.tableDirective;
        $scope.goTo = function(path) {
          $location.path(path);
        };
        $scope.delete = function(record) {
          record.delete().success(function(data) {
            $scope.getRecords();
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.getRecords = function() {
          $scope.listTracker.load(recordsHelper.all()).success(function(records) {
            $scope.records = records;
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.getRecords();
      }
    };
  }).directive("kaoCrudNew", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div class=\"col-md-8 col-md-push-2\" style=\"text-align:center;\">     <new-header class=\"col-md-12\"></new-header>     <model-form></model-form> </div>",
      scope: {type: "@"},
      controller: function($scope, $location, KaoRecord, LoadingTracker) {
        $scope.record = new KaoRecord($scope.type);
        $scope.dataType = $scope.record.frontEndCrud.name;
        $scope.formDirective = $scope.record.frontEndCrud.formDirective;
        $scope.listUrl = "#" + $scope.record.getListUrl();
        $scope.saveTracker = new LoadingTracker();
        $scope.save = function() {
          $scope.saveTracker.load($scope.record.create()).success(function(record) {
            $location.path(record.getEditUrl());
          }).error(function(error) {
            console.log(error);
          });
        };
      }
    };
  }).directive("kaoCrudEdit", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div class=\"col-md-8 col-md-push-2\" style=\"text-align:center;\">     <edit-header class=\"col-md-12\"></edit-header>     <model-form></model-form>     <dynamic-directive directive=\"{{afterEditDirective}}\"></dynamic-directive> </div>",
      scope: {type: "@"},
      controller: function($scope, $location, $routeParams, KaoRecord, LoadingTracker) {
        $scope.record = new KaoRecord($scope.type);
        $scope.dataType = $scope.record.frontEndCrud.name;
        $scope.formDirective = $scope.record.frontEndCrud.formDirective;
        $scope.afterEditDirective = $scope.record.frontEndCrud.afterEditDirective;
        $scope.listUrl = "#" + $scope.record.getListUrl();
        $scope.saveTracker = new LoadingTracker();
        $scope.goTo = function(path) {
          $location.path(path);
        };
        $scope.save = function() {
          $scope.saveTracker.load($scope.record.update()).error(function(error) {
            console.log(error);
          });
        };
        $scope.delete = function(record) {
          record.delete().success(function(record) {
            $scope.goTo(record.getListUrl());
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.record.get().error(function(error) {
          console.log(error);
        });
      }
    };
  });
  return {};
});

//# sourceMappingURL=kao_crud_controllers.map
