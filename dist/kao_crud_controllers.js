$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.controllers", ["kao.crud.directives", "kao.crud.record", "kao.loading"]).directive("kaoCrudList", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div class=\"col-md-8 col-md-push-2\" style=\"text-align:center;\">     <list-header class=\"col-md-12\"></list-header>     <loading-div loading=\"list\">         <model-table></model-table>     </loading-div> </div>",
      scope: {type: "@"},
      controller: function($scope, $location, CrudApiService, FrontEndCrudService, LoadingTrackerService) {
        var frontEndCrud;
        if ($scope.type) {
          frontEndCrud = FrontEndCrudService.getFrontEndFor($scope.type);
        } else {
          frontEndCrud = FrontEndCrudService.getCurrentCrud();
        }
        var crudApi = CrudApiService.getApiFor(frontEndCrud.name);
        var tracker = LoadingTrackerService.get("list");
        $scope.records = [];
        $scope.dataType = frontEndCrud.name;
        $scope.pluralDataType = frontEndCrud.pluralName;
        $scope.newUrl = "#" + frontEndCrud.getNewUrl();
        $scope.tableDirective = frontEndCrud.tableDirective;
        $scope.goTo = function(path) {
          $location.path(path);
        };
        $scope.getRecordEditUrl = function(record) {
          return "#" + frontEndCrud.getEditUrl(record.id);
        };
        $scope.delete = function(id) {
          crudApi.delete(id).success(function(data) {
            $scope.getRecords();
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.getRecords = function() {
          tracker.load(crudApi.getAll()).success(function(data) {
            $scope.records = data.records;
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
      controller: function($scope, $location, KaoRecord, LoadingTrackerService) {
        $scope.record = new KaoRecord($scope.type);
        $scope.dataType = $scope.record.frontEndCrud.name;
        $scope.formDirective = $scope.record.frontEndCrud.formDirective;
        $scope.listUrl = "#" + $scope.record.frontEndCrud.getListUrl();
        console.log($scope.listUrl);
        var tracker = LoadingTrackerService.get("saving");
        $scope.save = function() {
          tracker.load($scope.record.crudApi.create($scope.record.data)).success(function(data) {
            $location.path($scope.record.frontEndCrud.getEditUrl(data.record.id));
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
      controller: function($scope, $location, $routeParams, KaoRecord, LoadingTrackerService) {
        $scope.record = new KaoRecord($scope.type);
        $scope.dataType = $scope.record.frontEndCrud.name;
        $scope.formDirective = $scope.record.frontEndCrud.formDirective;
        $scope.afterEditDirective = $scope.record.frontEndCrud.afterEditDirective;
        $scope.listUrl = "#" + $scope.record.frontEndCrud.getListUrl();
        var tracker = LoadingTrackerService.get("saving");
        $scope.goTo = function(path) {
          $location.path(path);
        };
        $scope.save = function() {
          tracker.load($scope.record.crudApi.update($scope.record)).success(function(data) {
            $scope.record.data = data.record;
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.delete = function(id) {
          $scope.record.crudApi.delete($routeParams.id).success(function(data) {
            $scope.goTo($scope.record.frontEndCrud.getListUrl());
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.record.load();
      }
    };
  });
  return {};
});

//# sourceMappingURL=kao_crud_controllers.map
