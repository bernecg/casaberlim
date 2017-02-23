sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("bcg.casaberlim.controller.MembersList", {
        onOpenReserveDialog : function (oEvent) {
            var oView = this.getView();
            var oDialog = oView.byId("reserveDialog");

            // Create dialog lazily
            if (!oDialog) {
                // create dialog via fragment factory
                oDialog = sap.ui.xmlfragment(oView.getId(), "bcg.casaberlim.view.ReserveDialog",
                    this);
                oView.addDependent(oDialog);
            }

            var oSource = oEvent.getSource(),
                oSelected = oSource.getSelectedItem(),
                oModel = oSelected.getBindingContext("members").getModel(),
                oSelectedData =oModel.getProperty(oSelected.getBindingContext("members").getPath()),
                oJSONModel = new JSONModel(oSelectedData);
            this.getView().setModel(oJSONModel, "selectedMember");
            oDialog.open();
        },

        onCloseReserveDialog : function (evt) {
            this.getView().byId("reserveDialog").close();
        },

        onGoingSwitchChange : function (evt) {
            MessageToast.show("Changed!" + evt);
        }
    });
});
