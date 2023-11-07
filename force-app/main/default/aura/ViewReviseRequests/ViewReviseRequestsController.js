({
    doinit : function(component, event, helper) 
    {
        helper.fetchReviseOrder(component, event, helper);
    },
	saveReviseRequest : function(component, event, helper) 
    {
        var revOrderVerWrp = component.get("v.revOrderVerWrp");
        console.log(' revOrderVerWrp 1:::'+JSON.stringify(revOrderVerWrp));
        
        for(var i=0;i<revOrderVerWrp.length;i++)
        {
            //console.log(i+' res:::'+JSON.stringify(res[i]));
            var templist = revOrderVerWrp[i].ReviseReqWrapList;
            //console.log(' length:::'+templist.length);
            for(var j=0;j<templist.length;j++)
            {
                //console.log(j+' ReviseReqWrapList:::'+JSON.stringify(templist[j]));
                //console.log(j+' newVal:::'+JSON.stringify(templist[j].newVal.Status__c));
                if(templist[j].iseditable && templist[j].newVal.What_to_Revise__c == 'Quantity' && (!templist[j].newVal.New_Quantity__c))
                {
                    //alert('qty:'+templist[j].newVal.New_Quantity__c);
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"warning",
                            "title": $A.get("$Label.c.Warning"),
                            "message": $A.get("$Label.c.Quantity_cannot_be_blank")
                        });
                        toastEvent.fire();
                    return;
                }
                if(templist[j].iseditable && templist[j].newVal.What_to_Revise__c == 'Ship To' && (!templist[j].newVal.New_Bill_to_Ship_to_Address__c))
                {
                    //alert('qty:'+templist[j].newVal.New_Quantity__c);
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"warning",
                            "title": $A.get("$Label.c.Warning"),
                            "message": $A.get("$Label.c.Ship_To_cannot_be_blank")
                        });
                        toastEvent.fire();
                    return;
                }
                if(templist[j].iseditable && templist[j].newVal.What_to_Revise__c == 'Ship Date' && (!templist[j].newVal.New_Expected_Delivery_Date__c))
                {
                    
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"warning",
                            "title": $A.get("$Label.c.Warning"),
                            "message": $A.get("$Label.c.Expected_completion_Date_cannot_be_blank")
                        });
                        toastEvent.fire();
                    return;
                }
                if(templist[j].iseditable && templist[j].newVal.What_to_Revise__c == 'Quantity' && templist[j].boxQty)
                {
                    /***/
                    var newqty= templist[j].newVal.New_Quantity__c;
                    var boxqty = templist[j].boxQty;
                    var result = Math.ceil(newqty/boxqty)*boxqty;
                    if(boxqty && result !=newqty )
                    {
                        //alert('inside temp>>'+temp[i].boxquantity);
                        var rem = ((newqty) % boxqty);
                        
                        if (confirm($A.get("Label.c.Entered_quantity_value_is_not_the_multiples_of_Box_quantity") + "\n" + $A.get("$Label.c.Can_system_automatically_change_to_nearest_mutiples_of_box_quantity") + ( result ) + "?")) 
                        {
                            templist[j].newVal.New_Quantity__c = result;
                        }
                        else{
                            templist[j].newVal.New_Quantity__c = templist[j].oldVal.New_Quantity__c;
                            return;
                        }
                    }
                    /***/
                }
            }
            revOrderVerWrp[i].ReviseReqWrapList = templist;
        }
        component.set("v.revOrderVerWrp",revOrderVerWrp);
        
		helper.saveRevision(component, event, helper);
	},
    changeSOLIqty : function(component, event, helper) 
    {
        var soliQty = event.getSource().get("v.value");
        var soliName = event.getSource().get("v.name");
        
        var revOrderVerWrp = component.get("v.revOrderVerWrp");
        
        for(var i=0;i<revOrderVerWrp.length;i++)
        {
            //console.log(i+' res:::'+JSON.stringify(res[i]));
            var templist = revOrderVerWrp[i].ReviseReqWrapList;
            console.log(' length:::'+templist.length);
            for(var j=0;j<templist.length;j++)
            {
                //console.log(j+' ReviseReqWrapList:::'+JSON.stringify(templist[j]));
                //console.log(j+' newVal:::'+JSON.stringify(templist[j].newVal.Status__c));
                if(soliName==templist[j].newVal.Id && templist[j].newVal.What_to_Revise__c == 'Quantity')
                {
                    if(templist[j].newVal.New_Quantity__c<=0)
                    {
                        templist[j].newVal.New_Quantity__c = templist[j].oldVal.New_Quantity__c;
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "type":"warning",
                            "title": $A.get("$Label.c.Warning"),
                            "message": $A.get("$Label.c.Quantity_cannot_be_negative_or_zero")
                        });
                        toastEvent.fire();
                    }
                    
                }
            }
            revOrderVerWrp[i].ReviseReqWrapList = templist;
        }
        component.set("v.revOrderVerWrp",revOrderVerWrp);
        
    },
	changeSOExpDelDate : function(component, event, helper) 
    {
		var dateVal=event.getSource().get("v.value");
        if(!dateVal)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":"warning",
                "title": $A.get("$Label.c.Warning"),
                "message": $A.get("$Label.c.Expected_completion_Date_cannot_be_blank")
            });
            toastEvent.fire();
            return;
        }
        
        var tdate= $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        if(dateVal<$A.localizationService.formatDate(new Date(), "YYYY-MM-DD"))
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"warning",
                    "title": $A.get("$Label.c.Warning"),
                    "message": $A.get("$Label.c.Expected_completion_Date_must_not_be_in_the_past")
                });
                toastEvent.fire();
                event.getSource().set("v.value",tdate);
                return;
            }
	},
	closeReviseRequest : function(component, event, helper) 
    {
		component.set("v.isViewReviseReqEnabled",false);
	},
    displayTableAddress : function(component, event, helper)
    {
        var action = component.get("c.fetchShiptoAddressdetails");
        action.setParams({ 
            "custid":component.get("v.SOObj.Supplier__c"),
            "CurrentAddressid":component.get("v.SOObj.Ship_to_Address__c")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var responcevalue = response.getReturnValue();
                component.set("v.AddressList",responcevalue);
            }
        });
        $A.enqueueAction(action);
        component.set("v.AddressTable",true);  
    },
    closeTableAddress : function(component, event, helper)
    {
        var revOrderVerWrp = component.get("v.revOrderVerWrp");
        
        for(var i=0;i<revOrderVerWrp.length;i++)
        {
            //console.log(i+' res:::'+JSON.stringify(res[i]));
            var templist = revOrderVerWrp[i].ReviseReqWrapList;
            console.log(' length:::'+templist.length);
            for(var j=0;j<templist.length;j++)
            {
                //console.log(j+' ReviseReqWrapList:::'+JSON.stringify(templist[j]));
                //console.log(j+' newVal:::'+JSON.stringify(templist[j].newVal.Status__c));
                if(templist[j].iseditable && templist[j].newVal.What_to_Revise__c == 'Ship To')
                {
                    
                    templist[j].newVal.New_Bill_to_Ship_to_Address__c = templist[j].oldVal.New_Bill_to_Ship_to_Address__c;
                    templist[j].newVal.New_Ship_to_Company__c = templist[j].oldVal.New_Ship_to_Company__c;
                    templist[j].newVal.New_Ship_to_Address1__c = templist[j].oldVal.New_Ship_to_Address1__c;
                    templist[j].newVal.New_Ship_to_State__c = templist[j].oldVal.New_Ship_to_State__c;
                    templist[j].newVal.New_Ship_to_City__c = templist[j].oldVal.New_Ship_to_City__c;
                    templist[j].newVal.New_Ship_to_Country__c = templist[j].oldVal.New_Ship_to_Country__c;
                    templist[j].newVal.New_Ship_to_Postcode__c = templist[j].oldVal.New_Ship_to_Postcode__c;
                    templist[j].newVal.New_Ship_to_Tel__c = templist[j].oldVal.New_Ship_to_Tel__c;
                    templist[j].newVal.New_Ship_to_Email__c = templist[j].oldVal.New_Ship_to_Email__c;
                }
            }
            revOrderVerWrp[i].ReviseReqWrapList = templist;
        }
        component.set("v.revOrderVerWrp",revOrderVerWrp);
        
        component.set("v.AddressTable",false);
    },
    onRadioChange : function(component, event, helper)
    {
        var selected = event.getSource().get('v.value');
        var addressList = component.get("v.AddressList");
        
        var revOrderVerWrp = component.get("v.revOrderVerWrp");
         
        for(var i=0;i<revOrderVerWrp.length;i++)
        {
            //console.log(i+' res:::'+JSON.stringify(res[i]));
            var templist = revOrderVerWrp[i].ReviseReqWrapList;
            console.log(' length:::'+templist.length);
            for(var j=0;j<templist.length;j++)
            {
                if(templist[j].iseditable && templist[j].newVal.What_to_Revise__c == 'Ship To')
                {
                    
                    templist[j].newVal.New_Bill_to_Ship_to_Address__c = selected.Id;
                    templist[j].newVal.New_Ship_to_Company__c = selected.Factory_Name__c;
                    templist[j].newVal.New_Ship_to_Address1__c = selected.Address_1__c;
                    templist[j].newVal.New_Ship_to_State__c = selected.State__c;
                    templist[j].newVal.New_Ship_to_City__c = selected.City__c;
                    templist[j].newVal.New_Ship_to_Country__c = selected.Country__c;
                    templist[j].newVal.New_Ship_to_Postcode__c = selected.Postcode__c;
                    templist[j].newVal.New_Ship_to_Tel__c = selected.Tel_No__c;
                    templist[j].newVal.New_Ship_to_Email__c = selected.Email_Address__c;
                }
            }
            revOrderVerWrp[i].ReviseReqWrapList = templist;
        }
        component.set("v.revOrderVerWrp",revOrderVerWrp);
        component.set("v.shiptoname",selected.Name);
        component.set("v.ROrderheader",reqhead);
    },
    SaveTableAddress : function(component, event, helper)
    {
        component.set("v.AddressTable",false);
    },
    onAbortCancel : function(component, event, helper)
    {
        var checkbox = event.getSource();
        console.log(checkbox.get("v.value"));
        var roId = checkbox.get("v.name")
        if(checkbox.get("v.value"))
        {
            console.log(roId);
            var revOrderVerWrp = component.get("v.revOrderVerWrp");
            for(var i=0;i<revOrderVerWrp.length;i++)
            {
                console.log('res:::'+JSON.stringify(revOrderVerWrp[i].ReviseReqWrapList));
                var templist = revOrderVerWrp[i].ReviseReqWrapList;
                for(var j=0;j<templist.length;j++)
                {
                    if(templist[j].newVal.Id == roId)
                    {
                        templist[j].newVal.Status__c = 'Rejected';
                    }
                }
                revOrderVerWrp[i].ReviseReqWrapList = templist;
            }//end of first for
            component.set("v.revOrderVerWrp",revOrderVerWrp);
            console.log('wrap>>'+JSON.stringify(component.get("v.revOrderVerWrp")));
        }	//end of if
    },
})