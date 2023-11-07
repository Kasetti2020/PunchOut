({
   doInit:function(component, event, helper){
        helper.GetcustomInfoid(component, event, helper);
        helper.FetchnotesAndAttach(component, event, helper);
        helper.FetchCustomeDocnotesAndAttach(component, event, helper);
        helper.FetchRetailerDocnotesAndAttach(component, event, helper);
        
    },
    doSave: function(component, event, helper) {
        if(component.find("fileId").get("v.files")==null)
        {
             alert($A.get("$Label.c.Please_Select_a_Valid_File"));
        }
        //alert(component.find("fileId").get("v.files"));
        else if (component.find("fileId").get("v.files").length > 0) {
            
            helper.uploadHelper(component, event);
        } else {
            alert($A.get("$Label.c.Please_Select_a_Valid_File"));
        }
    },
   
    deleteRecord : function(component, event, helper) {
        if(confirm($A.get("$Label.c.Are_you_sure")))
            helper.deleteRow(component, event);
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = $A.get("$Label.c.No_File_Selected");
        
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
        component.set("v.fileDrop",true);
    },
    closeFileUploadBox: function(component, event, helper){
        component.set("v.fileDrop",false);
    }
    
})