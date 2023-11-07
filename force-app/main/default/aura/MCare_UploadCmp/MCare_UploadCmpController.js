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
             alert('Please Select a Valid File');
        }
        //alert(component.find("fileId").get("v.files"));
        else if (component.find("fileId").get("v.files").length > 0) {
            
            helper.uploadHelper(component, event);
        } else {
            alert('Please Select a Valid File');
        }
    },
   
    deleteRecord : function(component, event, helper) {
        if(confirm('Are you sure?'))
            helper.deleteRow(component, event);
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        
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