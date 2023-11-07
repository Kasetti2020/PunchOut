({
    selectUserRecord : function(component, event, helper){      
        // get the selected record from list
        var getSelectUserRecord = component.get("v.oUser");  
        alert('getSelectUserRecord :'+getSelectUserRecord);
        // call the event   
        var compEvent = component.getEvent("oRetailerdataEvent");
        alert('compEvent :'+compEvent);
        // set the Selected sObject Record to the event attribute.  
        compEvent.setParams({
                             "recordUserByEvent" : getSelectUserRecord
                            });  
        // fire the event  
        compEvent.fire();
    },
})