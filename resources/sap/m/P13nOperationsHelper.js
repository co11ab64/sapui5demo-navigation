/*
 * ! OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library"],function(t){"use strict";var e=function(){this.init()};var n=t.P13nConditionOperation;e.prototype.oIncludeOperations={default:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],string:[n.Contains,n.EQ,n.BT,n.StartsWith,n.EndsWith,n.LT,n.LE,n.GT,n.GE],date:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],time:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],datetime:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],numeric:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],numc:[n.Contains,n.EQ,n.BT,n.EndsWith,n.LT,n.LE,n.GT,n.GE],boolean:[n.EQ]};e.prototype.oExcludeOperationsDefault={default:[n.EQ]};e.prototype.oExcludeOperationsExtended={default:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],string:[n.Contains,n.EQ,n.BT,n.StartsWith,n.EndsWith,n.LT,n.LE,n.GT,n.GE],date:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],time:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],datetime:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],numeric:[n.EQ,n.BT,n.LT,n.LE,n.GT,n.GE],numc:[n.Contains,n.EQ,n.BT,n.EndsWith,n.LT,n.LE,n.GT,n.GE],boolean:[n.EQ]};e.prototype.init=function(){this.oExcludeOperations=this.oExcludeOperationsDefault};e.prototype.setUseExcludeOperationsExtended=function(){this.oExcludeOperations=this.oExcludeOperationsExtended};e.prototype.getIncludeOperationsByType=function(t){if(!t){t="default"}return this.oIncludeOperations[t].map(function(t){return t})};e.prototype.getExcludeOperationsByType=function(t){if(!t){t="default"}return this.oExcludeOperations[t].map(function(t){return t})};e.prototype.getIncludeTypes=function(){return Object.keys(this.oIncludeOperations)};e.prototype.getExcludeTypes=function(){return Object.keys(this.oExcludeOperations)};return e},true);