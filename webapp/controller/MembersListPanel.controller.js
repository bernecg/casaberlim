sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";
    return Controller.extend("bcg.casaberlim.controller.MembersListPanel", {
        onShowHello : function () {
            // read msg from i18n model
            var oBundle = this.getView().getModel("i18n").getResourceBundle();
            var sRecipient = this.getView().getModel().getProperty("/recipient/name");
            var sMsg = oBundle.getText("helloMsg", [sRecipient]);
            // show message
            MessageToast.show(sMsg);
        },
        onOpenReserveDialog : function () {
            var oView = this.getView();
            var oDialog = oView.byId("reserveDialog");

            // Create dialog lazily
            if (!oDialog) {
                // create dialog via fragment factory
                oDialog = sap.ui.xmlfragment(oView.getId(), "bcg.casaberlim.view.ReserveDialog",
                    this);
                oView.addDependent(oDialog);
            }

            oDialog.open();
        },
        onCloseReserveDialog : function () {
            this.getView().byId("reserveDialog").close();
        }
    });
});
