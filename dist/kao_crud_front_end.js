$traceurRuntime.ModuleStore.getAnonymousModule(function() {
  "use strict";
  angular.module("kao.crud.frontend", ["kao.crud.api", "kao.utils"]).provider("FrontEndCrudConfig", function() {
    var crudConfigs = [];
    this.add = function(config) {
      crudConfigs.push(config);
    };
    this.$get = function() {
      return crudConfigs;
    };
  }).factory("FrontEndCrud", function(NestedRouteService) {
    function CrudFrontEnd(config) {
      this.name = config.name;
      this.pluralName = config.pluralName;
      if (!this.pluralName && !!this.name) {
        this.pluralName = this.name + "s";
      }
      this.nested = config.nested;
      this.primaryPaths = config.primaryPaths;
      this.listUrl = config.listUrl;
      this.newUrl = config.newUrl;
      this.editUrl = config.editUrl;
      this.tableDirective = config.tableDirective;
      this.formDirective = config.formDirective;
      this.afterEditDirective = config.afterEditDirective;
    }
    CrudFrontEnd.prototype.getProperNestedConfig = function(varName) {
      var nested = this.nested;
      var newNested = [];
      if (nested) {
        for (var $__0 = nested[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__1; !($__1 = $__0.next()).done; ) {
          var config = $__1.value;
          {
            if (config[varName]) {
              config = {
                param: config[varName],
                provider: config.provider
              };
            }
            newNested.push(config);
          }
        }
      }
      return newNested;
    };
    CrudFrontEnd.prototype.getListUrl = function() {
      return NestedRouteService.getUrl(this.listUrl, this.getProperNestedConfig("list"));
    };
    CrudFrontEnd.prototype.getNewUrl = function() {
      return NestedRouteService.getUrl(this.newUrl, this.getProperNestedConfig("new"));
    };
    CrudFrontEnd.prototype.getEditUrl = function(id) {
      return NestedRouteService.getUrl(this.editUrl, this.getProperNestedConfig("edit")).replace(":id", id);
    };
    return CrudFrontEnd;
  }).factory("FrontEndCrudService", function($route, FrontEndCrud, FrontEndCrudConfig) {
    var dataTypeToWrapper = {};
    var pathToWrappers = {};
    var getCurrentCrud = function() {
      return pathToWrappers[$route.current.$$route.path];
    };
    var getFrontEndFor = function(dataType) {
      return dataTypeToWrapper[dataType];
    };
    var service = {
      addCrud: function(config) {
        dataTypeToWrapper[config.name] = config;
        var paths;
        if (config.primaryPaths) {
          paths = config.primaryPaths;
        } else {
          paths = [config.listUrl, config.newUrl, config.editUrl];
        }
        for (var $__0 = paths[$traceurRuntime.toProperty(Symbol.iterator)](),
            $__1; !($__1 = $__0.next()).done; ) {
          var path = $__1.value;
          {
            if (typeof path !== "undefined" && path !== null) {
              pathToWrappers[path] = config;
            }
          }
        }
      },
      retrieve: function(dataType) {
        if (typeof dataType !== "undefined" && dataType !== null) {
          return getFrontEndFor(dataType);
        } else {
          return getCurrentCrud();
        }
      },
      getCurrentCrud: getCurrentCrud,
      getFrontEndFor: getFrontEndFor
    };
    for (var $__0 = FrontEndCrudConfig[$traceurRuntime.toProperty(Symbol.iterator)](),
        $__1; !($__1 = $__0.next()).done; ) {
      var config = $__1.value;
      {
        service.addCrud(new FrontEndCrud(config));
      }
    }
    return service;
  });
  return {};
});
