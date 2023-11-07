({
	 showSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.success"),
            message: $A.get("$Label.c.Attachment_has_been_added_successflly"),
            duration:' 5000',
            key: 'info_alt',
            type: 'success',
            mode: 'pester'
        });
        toastEvent.fire();
    },
    showError : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : $A.get("$Label.c.Error"),
            message:$A.get("$Label.c.Something_went_wrong_please_try_again_later"),
            duration:' 5000',
            key: 'info_alt',
            type: 'error',
            mode: 'pester'
        });
        toastEvent.fire();
    },
})