sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("bcg.casaberlim.controller.MembersList", {
        onOpenReserveDialog : function (oEvent) {
            var oView = this.getView();

            var oSource = oEvent.getSource(),
                oSelected = oSource.getSelectedItem(),
                oModel = oSelected.getBindingContext("members").getModel(),
                oSelectedData = oModel.getProperty(oSelected.getBindingContext("members").getPath()),
                oJSONModel = new JSONModel(oSelectedData);
            oView.setModel(oJSONModel, "selectedMember");

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

        onSaveReserveDialog : function (evt) {
            this.getView().byId("reserveDialog").close();
            this.getView().getModel("members").refresh(true);

            var oData = this.getView().getModel("selectedMember").oData;
            var oChangedMember = '{'
                + '"Name": "'        + oData['Name'] + '",'
                + '"Comment": "'     + oData['Comment'] + '",'
                + '"ArrivalTime": "' + oData['ArrivalTime'] + '",'
                + '"LeaveTime": "'   + oData['LeaveTime'] + '",'
                + '"isGoing": '      + oData['isGoing'] + ','
                + '"isThere": '      + oData['isThere']
                + '}';

            var aData = jQuery.ajax({
                url : "/server/RestServer.php",
                //url : "localhost:8081",
                type : "POST",
                dataType : "json",
                data: oChangedMember,
                async: false,
                complete : function(output) {
                    console.log(output);
                }
            });

        }
    });
});
