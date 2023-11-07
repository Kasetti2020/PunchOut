({
    //This function will handle 'Previous' button Action.
	previousPage : function(component, event, helper) {
         var getCheckAllId = component.get("v.POList.POLIList");
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            if(getCheckAllId[i].IsSelected == true)
            {
                
                var toastEvent = $A.get("e.force:showToast");
            	toastEvent.setParams({
                title : $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Please_confirm_and_click_ADD_PO_before_moving_to_the_previous"),
                duration:' 5000',
                type: 'Warning'
            });
            toastEvent.fire();   
                return;
            }
        }
        
        
        var myEvent = $A.get("e.c:PageChange");
        myEvent.setParams({ "direction": "previous",
                           "sertxt":component.get("v.txt")});
        myEvent.fire();
	},
    //This function will handle 'Next' button Action.
	nextPage : function(component, event, helper) {
        
      var getCheckAllId = component.get("v.POList.POLIList");
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            if(getCheckAllId[i].IsSelected == true)
            {
                
                var toastEvent = $A.get("e.force:showToast");
            	toastEvent.setParams({
                title : $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Please_confirm_and_click_ADD_PO_before_moving_to_the_next"),
                duration:' 5000',
                type: 'Warning'
            });
            toastEvent.fire();   
                return;
            }
        }
        
        var myEvent = $A.get("e.c:PageChange");
        myEvent.setParams({ "direction": "next",
                          "sertxt":component.get("v.txt")});
        myEvent.fire();
	}
})