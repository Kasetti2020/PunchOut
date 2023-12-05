({
	 submitForm: function(component) {
        // Get form and submit
        var submitFormEvent = component.getEvent("submitFormEvent");
        submitFormEvent.setParams({
            "buyerFormPostUrl": component.get("v.buyerFormPostUrl"),
            "xmlData": component.get("v.xmlData")
        });
        submitFormEvent.fire();
    }
})