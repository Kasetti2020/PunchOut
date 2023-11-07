({
    navToRecord : function (component, event, helper) {
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId": component.get("v.property.Id")
        });
        navEvt.fire();
    },
    editRecord : function(component, event, helper) {
        helper.showHide(component);
    },
    handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.success"),
            "message": $A.get("$Label.c.The_property_s_info_has_been_updated"),
            "type": "success"
        });
        toastEvent.fire();
        var recUpdate = $A.get("e.c:recordUpdated");
        recUpdate.fire();	
        helper.showHide(component);
    },
    handleCancel : function(component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
    }
})