$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.record", ["kao.crud.api", "kao.crud.frontend", "kao.loading", "kao.utils"]).service("KaoRecords", function(KaoRecord, KaoDefer) {
    this.all = function(type, crudApi) {
      var deferred = KaoDefer();
      crudApi.getAll().success(function(data) {
        var records = [];
        for (var $__0 = data.records[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__1; !($__1 = $__0.next()).done; ) {
          var recordData = $__1.value;
          {
            records.push(new KaoRecord(type, recordData));
          }
        }
        deferred.resolve(records);
      }).error(function(error) {
        deferred.reject(error);
      });
      return deferred.promise;
    };
  }).factory("KaoRecord", function($routeParams, CrudApiService, FrontEndCrudService, KaoPromise) {
    var KaoRecord = function(dataType, data) {
      if (typeof dataType !== "undefined" && dataType !== null) {
        this.frontEndCrud = FrontEndCrudService.getFrontEndFor(dataType);
      } else {
        this.frontEndCrud = FrontEndCrudService.getCurrentCrud();
      }
      this.crudApi = CrudApiService.getApiFor(this.frontEndCrud.name);
      this.data = typeof data === "undefined" || data == null ? {} : data;
    };
    KaoRecord.prototype.promiseBuilder = function(promise) {
      var self = this;
      return KaoPromise(promise.success(function(data) {
        self.data = data.record;
      }), function(data) {
        return self;
      });
    };
    KaoRecord.prototype.get = function() {
      return this.promiseBuilder(this.crudApi.get($routeParams.id));
    };
    KaoRecord.prototype.create = function() {
      return this.promiseBuilder(this.crudApi.create(this.data));
    };
    KaoRecord.prototype.update = function() {
      return this.promiseBuilder(this.crudApi.update(this.data));
    };
    KaoRecord.prototype.delete = function() {
      var self = this;
      return KaoPromise(this.crudApi.get(this.data.id).success(function(data) {
        self.data = {};
      }), function(data) {
        return self;
      });
    };
    KaoRecord.prototype.getListUrl = function() {
      return this.frontEndCrud.getListUrl();
    };
    KaoRecord.prototype.getNewUrl = function() {
      return this.frontEndCrud.getNewUrl();
    };
    KaoRecord.prototype.getEditUrl = function() {
      return this.frontEndCrud.getEditUrl(this.data.id);
    };
    return KaoRecord;
  });
  return {};
});

//# sourceMappingURL=kao_crud_record.map
