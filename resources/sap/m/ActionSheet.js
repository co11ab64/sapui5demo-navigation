/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Dialog","./Popover","./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/core/InvisibleText","sap/ui/base/ManagedObject","sap/ui/Device","./ActionSheetRenderer","./Button","sap/ui/thirdparty/jquery"],function(t,e,n,i,o,s,a,r,l,p,c){"use strict";var h=n.ButtonType;var u=n.DialogType;var d=n.PlacementType;var f=i.extend("sap.m.ActionSheet",{metadata:{library:"sap.m",properties:{placement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:d.Bottom},showCancelButton:{type:"boolean",group:"Appearance",defaultValue:true},cancelButtonText:{type:"string",group:"Appearance",defaultValue:null},title:{type:"string",group:"Appearance",defaultValue:null}},aggregations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"},_cancelButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_invisibleAriaTexts:{type:"sap.ui.core.InvisibleText",multiple:true,visibility:"hidden"}},defaultAggregation:"buttons",events:{cancelButtonTap:{deprecated:true},beforeOpen:{},afterOpen:{},beforeClose:{parameters:{origin:{type:"sap.m.Button"}}},afterClose:{parameters:{origin:{type:"sap.m.Button"}}},cancelButtonPress:{}},designtime:"sap/m/designtime/ActionSheet.designtime"}});f.prototype.init=function(){this._fnOrientationChange=this._orientationChange.bind(this);this._actionSelected=null};f.prototype.exit=function(){r.resize.detachHandler(this._fnOrientationChange);if(this._parent){this._parent.destroy();this._parent=null}if(this._oCancelButton){this._oCancelButton.destroy();this._oCancelButton=null}this._clearItemNavigation()};f.prototype._clearItemNavigation=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}};f.prototype._setItemNavigation=function(){var t=this._getAllButtons(),e=[],n=this.getDomRef();if(n){this._oItemNavigation.setRootDomRef(n);for(var i=0;i<t.length;i++){if(t[i].getEnabled()&&t[i].getVisible()){e.push(t[i].getFocusDomRef())}}if(this._oCancelButton){e.push(this._oCancelButton.getFocusDomRef())}this._oItemNavigation.setItemDomRefs(e);this._oItemNavigation.setSelectedIndex(0);this._oItemNavigation.setPageSize(5);this._oItemNavigation.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]})}};f.prototype.onmousedown=function(t){if(t.srcControl.isA("sap.m.Button")&&this.getButtons().indexOf(t.srcControl)!==-1){this._actionSelected=t.srcControl}};f.prototype.onBeforeRendering=function(){this._clearItemNavigation();var t=this.getTitle();if(this._parent){if(r.system.phone){this._parent.setTitle(t);this._parent.toggleStyleClass("sapMDialog-NoHeader",!t)}else{this._parent.setPlacement(this.getPlacement())}if(t){this._parent.addStyleClass("sapMActionSheetDialogWithTitle")}else{this._parent.removeStyleClass("sapMActionSheetDialogWithTitle")}}};f.prototype.onAfterRendering=function(){this._oItemNavigation=new o;this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);this._setItemNavigation()};f.prototype.sapfocusleave=function(){this.close()};f.prototype.openBy=function(n){var i=this;if(!this._parent){var o=this.getParent();if(o){this.setParent(null)}if(!r.system.phone){this._parent=new e({placement:this.getPlacement(),showHeader:false,content:[this],beforeOpen:function(){i.fireBeforeOpen()},afterOpen:function(){i.focus();i.fireAfterOpen()},beforeClose:function(){i.fireBeforeClose()},afterClose:function(){if(i.getShowCancelButton()){i.fireCancelButtonTap();i.fireCancelButtonPress()}i._onAfterClose(i._actionSelected);i._actionSelected=null},ariaLabelledBy:this.getPopupHiddenLabelId()||undefined}).addStyleClass("sapMActionSheetPopover");this._parent._setAriaRoleApplication(true);if(r.browser.internet_explorer){this._parent._fnAdjustPositionAndArrow=c.proxy(function(){e.prototype._adjustPositionAndArrow.apply(this);var t=this.$(),n=t.children(".sapMPopoverCont")[0].getBoundingClientRect().width;c.each(t.find(".sapMActionSheet > .sapMBtn"),function(t,e){var i=c(e),o;i.css("width","");o=e.getBoundingClientRect().width;if(o<=n){i.css("width","100%")}})},this._parent)}}else{this._parent=new t({title:this.getTitle(),type:u.Standard,content:[this],beforeOpen:function(){i.fireBeforeOpen()},afterOpen:function(){i.focus();i.fireAfterOpen()},beforeClose:function(t){i.fireBeforeClose({origin:t.getParameter("origin")})},afterClose:function(t){i._actionSelected=t.getParameter("origin");i._onAfterClose(i._actionSelected);i._actionSelected=null;r.resize.detachHandler(i._fnOrientationChange)}}).addStyleClass("sapMActionSheetDialog");if(this.getTitle()){this._parent.addStyleClass("sapMActionSheetDialogWithTitle")}else{this._parent.addAriaLabelledBy(this.getPopupHiddenLabelId()||undefined)}if(!r.system.phone){this._parent.setBeginButton(this._getCancelButton())}if(r.system.phone){this._parent.oPopup.setModal(true);this._parent._setDimensions=function(){t.prototype._setDimensions.apply(this);this.$("cont").css("max-height","")};this._parent._adjustScrollingPane=function(){var t=this.$().height();this.$("cont").css("max-height",t);if(this._oScroller){this._oScroller.refresh()}}}}if(o){o.addDependent(this._parent)}}if(!r.system.phone){this._parent.openBy(n)}else{this._parent.open();r.resize.attachHandler(this._fnOrientationChange)}};f.prototype.close=function(){if(this._parent){this._parent.close()}};f.prototype.isOpen=function(){return!!this._parent&&this._parent.isOpen()};f.prototype._createCancelButton=function(){if(!this._oCancelButton){var t=this.getCancelButtonText()?this.getCancelButtonText():sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACTIONSHEET_CANCELBUTTON_TEXT"),e=this;this._oCancelButton=new p(this.getId()+"-cancelBtn",{text:t,type:h.Reject,press:function(){if(r.system.phone&&e._parent){e._parent._oCloseTrigger=this}e.close();e.fireCancelButtonTap();e.fireCancelButtonPress()}}).addStyleClass("sapMActionSheetButton sapMActionSheetCancelButton sapMBtnTransparent sapMBtnInverted");if(r.system.phone){this.setAggregation("_cancelButton",this._oCancelButton,true)}}return this};f.prototype._getCancelButton=function(){if(r.system.phone&&this.getShowCancelButton()){this._createCancelButton();return this._oCancelButton}return null};f.prototype.setCancelButtonText=function(t){this.setProperty("cancelButtonText",t,true);if(this._oCancelButton){this._oCancelButton.setText(t)}return this};f.prototype._preProcessActionButton=function(t){var e=t.getType();if(e!==h.Accept&&e!==h.Reject){t.setType(h.Transparent)}t.addStyleClass("sapMBtnInverted");if(!t.getIcon()){t.addStyleClass("sapMActionSheetButtonNoIcon")}t.addStyleClass("sapMActionSheetButton");this._parent&&this._parent.invalidate();return this};f.prototype._buttonSelected=function(){if(r.system.phone&&this._parent){this._parent._oCloseTrigger=this}this.close()};f.prototype._orientationChange=function(){this._parent._adjustScrollingPane()};f.prototype._addAriaHiddenTexts=function(t){var e=t.getId(),n;if(sap.ui.getCore().getConfiguration().getAccessibility()){n=new s(e+"-actionSheetHiddenText");this.addAggregation("_invisibleAriaTexts",n,false);t.addAriaLabelledBy(n.getId())}};f.prototype._removeAriaHiddenTexts=function(t){t.getAriaLabelledBy().forEach(function(e){var n=sap.ui.getCore().byId(e);if(n instanceof s&&e.indexOf("actionSheetHiddenText")>-1){this.removeAggregation("_invisibleAriaTexts",n,false);t.removeAriaLabelledBy(n);n.destroy()}},this)};f.prototype.addButton=function(t){this.addAggregation("buttons",t,false);this._addAriaHiddenTexts(t);this._preProcessActionButton(t);t.attachPress(this._buttonSelected,this);return this};f.prototype.insertButton=function(t,e){this.insertAggregation("buttons",t,e,false);this._addAriaHiddenTexts(t);this._preProcessActionButton(t);t.attachPress(this._buttonSelected,this);return this};f.prototype.removeButton=function(t){var e=this.removeAggregation("buttons",t,false);if(e){e.detachPress(this._buttonSelected,this);this._removeAriaHiddenTexts(e)}return e};f.prototype.removeAllButtons=function(){var t=this.removeAllAggregation("buttons",false),e=this;c.each(t,function(t,n){n.detachPress(e._buttonSelected,e);e._removeAriaHiddenTexts(n)});return t};f.prototype.clone=function(){var t=this.getButtons();for(var e=0;e<t.length;e++){t[e].detachPress(this._buttonSelected,this)}var n=i.prototype.clone.apply(this,arguments);for(var o=0;o<t.length;o++){t[o].attachPress(this._buttonSelected,this)}return n};f.prototype._getAllButtons=function(){return this.getButtons()};f.prototype.getPopupHiddenLabelId=function(){return s.getStaticId("sap.m","ACTIONSHEET_AVAILABLE_ACTIONS")};f.prototype._applyContextualSettings=function(){a.prototype._applyContextualSettings.call(this,a._defaultContextualSettings)};f.prototype._onAfterClose=function(t){this.fireAfterClose({origin:t})};return f});