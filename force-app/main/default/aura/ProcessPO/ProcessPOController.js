({
    doInit : function(component, event, helper) 
    {
        var recordId = component.get("v.recordId"); 
		//alert('recordId>>>'+recordId);
        //alert('CloseCurrentWindow>>>'+component.get("v.CloseCurrentWindow"));
        
        helper.SendVariableUploadId(component,event, helper);
	},
    closeModal : function(component, event, helper) 
    {
       // alert(component.get("v.CloseCurrentWindow"));
        if(component.get("v.CloseCurrentWindow"))
        {
             window.close();
        }else
        {
            window.close();
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "success",
                "title": $A.get("$Label.c.success"),
                "message": $A.get("$Label.c.Successfully_Converted_to_PO")
            });
            toastEvent.fire();
            var closeQuickAction =$A.get("e.force:closeQuickAction");
            if(closeQuickAction)
            {
                closeQuickAction.fire()
            }
            location.reload();
        }
       
    },
    cancel:function(component, event, helper){
        component.set("v.Next",false);
        

    },
})