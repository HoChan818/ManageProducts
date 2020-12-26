sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History"
	],function(BaseController,History){
	"use strict";
	
	return BaseController.extend("manage_products.ManageProducts.controller.Add",{
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		
		/**
		 * Called when the add controller is instantiated.
		 * @public
		 */
		onInit: function(){
			// Register to the add route matched
			this.getRouter().getRoute("add").attachPatternMatched(
				this._onRouteMatched, this);
		},
		
		_onRouteMatched: function(){
			
		},
		
		onNavBack: function(){
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if(sPreviousHash !== undefined){
				history.go(-1);
			}else{
				var bReplace = true;
				this.getRouter().navTo("worklist",{},bReplace);
			}
		}
		
	});
});