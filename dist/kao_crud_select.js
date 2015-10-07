$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.select", ["kao.crud.api"]).directive("kaoSelect", function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        model: "=",
        url: "@",
        displayField: "@"
      },
      controller: function($scope, $http) {
        $scope.records = [];
        $scope.getRecords = function() {
          $http.get($scope.url).success(function(data) {
            $scope.records = data.records;
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.getRecords();
      },
      template: "<select ng-options=\"record as record[displayField] for record in records track by record.id\" ng-model=\"model\" />"
    };
  }).directive("modelSelect", function() {
    return {
      restrict: "E",
      replace: true,
      scope: {
        model: "=",
        type: "@",
        displayField: "@"
      },
      controller: function($scope, CrudApiService) {
        var crudApi = CrudApiService.getApiFor($scope.type);
        $scope.records = [];
        $scope.getRecords = function() {
          crudApi.getAll().success(function(data) {
            $scope.records = data.records;
          }).error(function(error) {
            console.log(error);
          });
        };
        $scope.getRecords();
      },
      template: "<select ng-options=\"record as record[displayField] for record in records track by record.id\" ng-model=\"model\" />"
    };
  });
  return {};
});

//# sourceMappingURL=kao_crud_select.map
