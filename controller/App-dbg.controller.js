sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/demo/basicTemplate/model/formatter"
], function(Controller, formatter) {
	"use strict";

	return Controller.extend("sap.ui.demo.basicTemplate.controller.App", {

		formatter: formatter,

		onInit: function () {
			console.log("App controller init");
		},

		//Helper method to get the router instance
		getRouter:function(){
			return sap.ui.core.UIComponent.getRouterFor(this);
		}
	});
});