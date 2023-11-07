({
    doInit : function(component, event, helper) {
        var ReviseRecords = component.get("v.RORecords");
       // alert('ReviseRecords in doinit >>'+JSON.stringify(ReviseRecords));
        var whattorevise =  component.get("v.RORecords.RO.What_to_Revise__c");
		if(whattorevise =='Ship To')
		{
		component.set("v.shipto",true);
		}
		else if(whattorevise =='Ship Date')
		{
		component.set("v.shipdate",true);
		}
		else if(whattorevise =='Factory Internal PO')
		{
		component.set("v.Factory",true);
		}
		else if(whattorevise =='Shipping Mark/Special Instruction')
		{
		component.set("v.shippingmark",true);
		}
		else if(whattorevise =='Forwarder/Transportation Details')
		{
		component.set("v.forwarder",true);
		}
		else if(whattorevise =='Quantity' || whattorevise =='Cancel Line Item')
		{
		component.set("v.quantity",true);
		}
		else if(whattorevise =='Cancel Order')
		{
		component.set("v.cancel",true);
		}
        /*else if(whattorevise =='Cancel Line Item')
        {
            component.set("v.cancelLineItem",true);
        }*/
		},
    handleChange: function (component, event) {
        var checkvalue = component.find("checkbox");
        var rowIndex = component.get("v.rowIndex");
        
        var selectedContacts = [];
        if(!Array.isArray(checkvalue)){
            if (checkvalue.get("v.value") == true) {
                selectedContacts.push(checkvalue.get("v.text"));
                var ReviseRecords = component.get("v.RORecords");
                ReviseRecords.Checked = true;
                component.set("v.RORecords",ReviseRecords);
                console.log('RORecords>>'+JSON.stringify(component.get("v.RORecords")));
            }
            else if(checkvalue.get("v.value") == false) 
            {
                //selectedContacts.push(checkvalue.get("v.text"));
                var ReviseRecords = component.get("v.RORecords");
                ReviseRecords.Checked = null;
                component.set("v.RORecords",ReviseRecords);
                console.log('RORecords>>'+JSON.stringify(component.get("v.RORecords")));
            }
            console.log('selectedContacts-' + selectedContacts);
        }
    }
})