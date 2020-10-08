sap.ui.define([
	"sap/ui/demo/basicTemplate/controller/BaseController",
	"../model/formatter"
], function (BaseController, formatter) {
	"use strict";

	return BaseController.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			var that = this,
				oModel = that.getOwnerComponent().getModel("mockdata");
			console.log(oModel.getData());
		},
		onCustomerNamePress: function (oEvent) {
			var that = this,
				sPath = oEvent.getSource().getBindingContextPath();
			console.log(sPath);

			//Get router and navigate to the details view
			var oRouter = that.getRouter();
			oRouter.navTo("detailRoute",{
				id: sPath.split("/").pop()
			});
		}
	});
});