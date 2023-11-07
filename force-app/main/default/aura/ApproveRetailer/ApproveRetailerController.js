({
    doInit : function(component, event, helper) 
    {
        var recordId = component.get("v.recordId"); 
        //alert('recordId>>>'+recordId);
        var actionAPI = component.find("quickActionAPI").getSelectedActions();
        //alert('actionAPI>>>'+actionAPI);
        // alert('actionAPI.value json>>>'+JSON.stringify(actionAPI));
        helper.SendRetailerDataID(component,event, helper);
    },
    closeModal : function(component, event, helper) 
    {
        //alert('hi');
        //alert('Close Flag>>'+component.get("v.CloseCurrentWindow"));
        if(component.get("v.CloseCurrentWindow"))
        {
            window.close();
        }
        else
        {
            $A.get("e.force:closeQuickAction").fire();
        }
        
    },
    
})