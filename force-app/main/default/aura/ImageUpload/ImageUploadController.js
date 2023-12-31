({
    
    doInit: function(component, event, helper) {
        alert('test');
    },
    
    doSave: function(component, event, helper) {
        if(component.find("fileId").get("v.files")!=null){
            if (component.find("fileId").get("v.files").length > 0)
                helper.uploadHelper(component, event);
        }
        else {
            alert('Please Select a Valid File');
        }
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
    },
    closeModel: function(component, event, helper) {
    	$A.get("e.force:closeQuickAction").fire();
    }
})