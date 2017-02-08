sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function (Controller) {
    "use strict";

    return Controller.extend("bcg.casaberlim.controller.MembersList", {
        onInit : function () {
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
