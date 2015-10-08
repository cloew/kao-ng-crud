$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.record", ["kao.crud.api", "kao.crud.frontend", "kao.loading"]).factory("KaoRecord", function($routeParams, CrudApiService, FrontEndCrudService) {
    var KaoRecord = function(dataType) {
      if (typeof dataType !== "undefined" && dataType !== null) {
        this.frontEndCrud = FrontEndCrudService.getFrontEndFor(dataType);
      } else {
        this.frontEndCrud = FrontEndCrudService.getCurrentCrud();
      }
      this.crudApi = CrudApiService.getApiFor(this.frontEndCrud.name);
      this.data = {};
    };
    KaoRecord.prototype.load = function() {
      var self = this;
      this.crudApi.get($routeParams.id).success(function(data) {
        self.data = data.record;
      }).error(function(error) {
        console.log(error);
      });
    };
    return KaoRecord;
  });
  return {};
});

//# sourceMappingURL=kao_crud_record.map
