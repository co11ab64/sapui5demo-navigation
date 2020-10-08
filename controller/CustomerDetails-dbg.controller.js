sap.ui.define([
    "sap/ui/demo/basicTemplate/controller/BaseController",
], function (BaseController) {
    return BaseController.extend("sap.ui.demo.basicTemplate.controller.App", {
        onInit: function () {
            var that = this;
            console.log("Details view controller init");

            //Attach route matched handler
            var oRouter = that.getRouter();
            oRouter.getRoute("detailRoute").attachMatched(that._onRouteMatched, that);

        },

        _onRouteMatched: function (oEvent) {
            var that = this,
                oArgs = oEvent.getParameter("arguments"),
                id = oArgs.id,
                sPath = "mockdata>/d/results/" + id;
            console.log("Path to item", sPath);

            that.getView().bindElement(sPath);
        },

        onBackPress: function () {
            var that = this,
                oRouter = that.getRouter();
            oRouter.navTo("home");
        }
    });
});