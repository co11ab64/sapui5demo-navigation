/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/selectors/_Selector","sap/ui/thirdparty/jquery","sap/ui/model/resource/ResourceModel","sap/m/ListBase","sap/m/ListItemBase"],function(e,t,n,i,a){"use strict";var o=e.extend("sap.ui.test.selectors._BindingPath",{_generate:function(e){return Object.keys(e.mBindingInfos).map(function(t){return this._getBindingSelector(e,t)}.bind(this))},_getBindingSelector:function(e,t){var i=this._getBinding(e,t);if(i){return i.map(function(i){var a={};if(i.model.type===n.getMetadata().getName()){this._oLogger.debug("Control "+e+" property "+t+" has i18n binding for model "+i.model.name+" with key "+i.path);a={i18NText:{propertyName:t,key:i.path}};if(i.model.name&&i.model.name!=="i18n"){a.i18NText.modelName=i.model.name}}else{this._oLogger.debug("Control "+e+" property "+t+" has data binding for model "+i.model.name+" with context "+i.contextPath+" and path "+i.path);a={bindingPath:{path:i.contextPath,propertyPath:i.path}};if(i.model.name){a.bindingPath.modelName=i.model.name}}return a}.bind(this))}else{this._oLogger.debug("Control "+e+" does not have data binding for property "+t);return[]}},_getBinding:function(e,t){var n=e.getBinding(t);var i=e.getBindingInfo(t);if(n){if(n.getBindings){this._oLogger.debug("Control "+e+" has composite binding for property "+t);return n.getBindings().map(function(e,t){return this._mapBindingData(e,i.parts[t])}.bind(this))}else{this._oLogger.debug("Control "+e+" has simple binding for property "+t);return[this._mapBindingData(n,i.parts?i.parts[0]:i)]}}},_mapBindingData:function(e,t){var n=e.getModel();var i=e.getContext();return{path:e.getPath(),contextPath:i?i.getPath():"",model:{name:t.model||undefined,type:n.getMetadata().getName(),data:n.getData?n.getData():undefined}}}});return o});