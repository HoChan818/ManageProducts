sap.ui.define([
	"./BaseController",
	"sap/ui/core/routing/History",
	"sap/m/MessageToast"
	],function(BaseController,History,MessageToast){
	"use strict";
	
	return BaseController.extend("manage_products.ManageProducts.controller.Add",{
		/* =========================================================== */
		/* lifecycle methods                                           */
		/* =========================================================== */
		
		/* =========================================================== */
		/* event handlers                                              */
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
		
		/**
		 * Event handler for the cancel action
		 * @public
		 */
		onCancel: function(){
			this.onNavBack();
		},
		
		/**
		 * Event handler for the save action
		 * @public
		 */
		onSave: function(){
			this.getModel().submitChanges();
		},
		
		onNavBack: function(){
			// discard new product from model.
			this.getModel().deleteCreatedEntry(this._oContext);
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if(sPreviousHash !== undefined){
				history.go(-1);
			}else{
				var bReplace = true;
				this.getRouter().navTo("worklist",{},bReplace);
			}
		},
		
		
		
		/* =========================================================== */
		/* internal methods                                            */
		/* =========================================================== */
		
		_onRouteMatched: function(){
			// register for metadata loaded events
			var oModel = this.getModel();
			oModel.metadataLoaded().then(this._onMetadataLoaded.bind(this));
		},
		
		_onMetadataLoaded: function () {
			// create default properties
			var oProperties = {
				ProductID: "" + parseInt(Math.random() * 1000000000, 10),
				TypeCode: "PR",
				TaxTarifCode: 1,
				CurrencyCode: "EUR",
				MeasureUnit: "EA"
			};

			// create new entry in the model
			this._oContext = this.getModel().createEntry("/ProductSet", {
				properties: oProperties,
				success: this._onCreateSuccess.bind(this)
			});
			
			// bind the view to the new entry
			this.getView().setBindingContext(this._oContext);
		},
		
		_onCreateSuccess: function(oProduct){
			// navigate to the new product's object view
			var sId = oProduct.ProductID;
			this.getRouter().navTo("object", {objectId:sId}, true);
			
			// unbind the view to not show this object again
			this.getView().unbindObject();
			
			// show success messge
			var sMessage = this.getResourceBundle().getText("newObjectCreated",
						 [oProduct.Name]);
			MessageToast.show(sMessage,{closeOnBrowserNavigation:false});
		}
		
	});
});