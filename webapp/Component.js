sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/resource/ResourceModel"
], function (UIComponent, JSONModel, ResourceModel) {
    "use strict";
    return UIComponent.extend("bcg.casaberlim.Component", {
        metadata : {
            manifest: "json"
        },
        init : function() {
            // call the init function of the parent
            UIComponent.prototype.init.apply(this, arguments);

            var oData = {
                recipient : {
                    name : "World"
                }
            };
            var oModel = new JSONModel(oData);
            this.setModel(oModel);

            // set i18n on view
            var i18nModel = new ResourceModel({
                bundleName: "bcg.casaberlim.i18n.i18n"
            });
            this.setModel(i18nModel, "i18n");
        }
    });
});
