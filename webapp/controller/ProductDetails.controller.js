sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"manage_products/ManageProducts/model/formatter"
	],function(Controller,formatter){
		"use strict";
		return Controller.extend("manage_products.ManageProducts.controller.ProductDetails",{
			formatter: formatter,
			onInit: function(){
				this.byId("CategoryLabel").setVisible(false);
				this.byId("Category").setVisible(false);
			}
		} );
	});