$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.directives", ["kao.crud.api", "kao.crud.buttons", "kao.crud.select", "kao.utils", "kao.loading"]).directive("listHeader", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div>     <kao-header header-title=\"{{pluralDataType}}\">         <to-new-page class=\"pull-right\" fills-transclude=\"right\"></to-new-page>     </kao-header> </div>"
    };
  }).directive("newHeader", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div>     <kao-header header-title=\"New {{dataType}}\">{{listUrl}}         <to-list-page fills-transclude=\"left\" class=\"btn-lg pull-left\"></to-list-page>     </kao-header> </div>"
    };
  }).directive("editHeader", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div>     <kao-header header-title=\"Edit {{dataType}}\">         <to-list-page fills-transclude=\"left\" class=\"btn-lg pull-left\"></to-list-page>         <delete-button fills-transclude=\"right\" class=\"btn-lg pull-right\"></delete-button>     </kao-header> </div>"
    };
  }).directive("modelTable", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div><dynamic-directive directive=\"{{tableDirective}}\"></dynamic-directive></div>"
    };
  }).directive("modelForm", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<div><dynamic-directive directive=\"{{formDirective}}\"></dynamic-directive></div>"
    };
  }).directive("toListPage", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<a ng-href=\"{{listUrl}}\" class=\"btn btn-lg btn-primary\"><span class=\"glyphicon glyphicon-arrow-left\" aria-hidden=\"true\"></span><span> To List</span></a>"
    };
  }).directive("toNewPage", function() {
    return {
      restrict: "E",
      replace: true,
      template: "<a ng-href=\"{{newUrl}}\" class=\"btn btn-lg btn-primary\"><span class=\"glyphicon glyphicon-plus\" aria-hidden=\"true\"></span><span class=\"sr-only\">New {{dataType}}</span></a>"
    };
  });
  return {};
});
