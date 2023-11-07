({ 
    /* Phase 2.1 Changes start*/
     doInit: function(component, event, helper) { 
         helper.createObjectData(component, event);
    },
     // function for create new object Row in Contact List 
    addNewRow: function(component, event, helper) {
        var sizeSetup = component.get("v.sizechartList");
        if(helper.validationForSave(component, event, helper))
        {
        helper.createObjectData(component, event);  
        }
    }, 
    // function for delete the row 
    removeDeletedRow: function(component, event, helper) {
        var index = event.getSource().get("v.value"); 
        var AllRowsList = component.get("v.sizechartList");
        if(AllRowsList[index].Id!=null)
        {
            var action1 = component.get("c.deleteSizeChart");
            action1.setParams({"SizechartId": AllRowsList[index].Id});
            action1.setCallback(this, function(response) {
                var state = response.getState();
                if(state === 'SUCCESS')
                {
                    AllRowsList.splice(index, 1);
                    component.set("v.sizechartList", AllRowsList);
                }
            })
            $A.enqueueAction(action1);
        }
        else
        {
            AllRowsList.splice(index, 1);
            component.set("v.sizechartList", AllRowsList);
        }
    },
    handleLookupEvent : function(component, event, helper) 
    { 
        //alert('Test1');
        if(event.getParam("objectAPIName") == "Retailer_Code__c")
        {
            if(component.get('v.retailerID')!=null )
            {
                component.set("v.SetupFlag",true);
                //component.set('v.sizeSetup',{ 'sobjectType': 'Size_Chart__c'});
            }
        }
    },
     closeConfigurator : function(component, event, helper) 
    {
        component.set("v.SetupFlag",false);
    },
    retailerChangeEvent : function(component, event, helper)
    {
        //var compEvents = component.getEvent("componentEventFired");
       // alert('r id'+component.get('v.retailerID'))
        if(component.get('v.retailerID')==null || component.get('v.retailerID')=='' || component.get('v.retailerID')==undefined )
        {
            component.set("v.SetupFlag",false);
            component.set("v.Flagsetup",false);
            component.set("v.newFlag",false); 
            component.set("v.formflag",false); 
            component.set("v.sizeval", '');
            component.set("v.langnew1Flag",false);
            component.set("v.langnew2Flag",false);
            component.set("v.langnew3Flag",false);
            component.set("v.langnew4Flag",false);
            component.set("v.langnew5Flag",false);
            component.set("v.langnew1", null);
            component.set("v.langnew2", null);
            component.set("v.langnew3", null);
            component.set("v.langnew4", null);
            component.set("v.langnew5", null);
            component.set("v.productID", '');
            component.set("v.productName", '');
        }else{
             //component.find("sizeid").set("v.value", "");
        }
    },
    productChangeEvent : function(component, event, helper)
    {
        if(component.get('v.productID'))
        {   
            var retailercode=component.get("v.retailerID");
            component.set("v.formflag",false);
            helper.retailervalues(component, event, helper,retailercode);   
        }else{
            component.set('v.sizechartList',{'sobjectType': 'Size_Chart__c'});
            component.set("v.Flagsetup",false);
            component.set("v.newFlag",false); 
            component.set("v.formflag",false);
            //component.set("v.retailerID",null); 
            component.set("v.productID",null); 
            //component.find("contactField").set("v.value", "");
        }
    },
    submitSetup : function(component, event, helper) {
        if(helper.validationForSave(component, event, helper))
        {
        helper.saveTheSizeSetup(component, event, helper);
        }
    },
    handleOnSuccess : function(component, event, helper) {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.success"),
            "message": $A.get("$Label.c.The_record_has_been_updated_successfully")
        });
                component.set("v.SetupFlag",false);
                component.set("v.Flagsetup",false);
                component.set("v.newFlag",false); 
                //component.set("v.retailerID",null); 
                component.find("sizeid").set("v.value", "");
        
        toastEvent.fire();
    }
       /* Phase 2.1 Changes End*/
})