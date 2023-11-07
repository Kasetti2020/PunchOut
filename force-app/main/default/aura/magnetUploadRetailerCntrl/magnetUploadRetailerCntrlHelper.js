({
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000,      //Chunk Max size 750Kb 
    
    uploadHelper: function(component, event) {
        // start/show the loading spinner   
        var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        component.set("v.showLoadingSpinner", true);
        // get the selected files using aura:id [return array of files]
        var fileInput = component.find("fileId").get("v.files");
        // get the first file using array index[0]  
        var file = fileInput[0];
        var self = this;
        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a alert msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
            var spinner = component.find("mySpinner");
        $A.util.addClass(spinner, "slds-hide");
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", $A.get("$Label.c.Alert_File_size_cannot_exceed") + self.MAX_FILE_SIZE + $A.get("$Label.c.bytes") + '\n' + $A.get("$Label.c.Selected_file_size") + file.size);
            return;
        }
        
        // create a FileReader object 
        var objFileReader = new FileReader();
        // set onload function of FileReader object   
        objFileReader.onload = $A.getCallback(function() {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
            var dataStart = fileContents.indexOf(base64) + base64.length;
            
            fileContents = fileContents.substring(dataStart);
            // call the uploadProcess method 
            self.uploadProcess(component, file, fileContents);
        });
        
        objFileReader.readAsDataURL(file);
    },
   
    uploadProcess: function(component, file, fileContents) {
        // set a default size or startpostiton as 0 
        var startPosition = 0;
        // calculate the end size or endPostion using Math.min() function which is return the min. value   
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        
        // start with the initial chunk, and set the attachId(last parameter)is null in begin
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
    },
    
    
    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        // call the apex method 'saveChun
        //alert('Save  inside method chunk');
        //alert('file'+JSON.stringify(file));
        var getchunk = fileContents.substring(startPosition, endPosition);
        var action = component.get("c.saveChunk");
        action.setParams({
            parentId: component.get("v.parentId"),
            fileName: file.name,
            base64Data: encodeURIComponent(getchunk),
            contentType: file.type,
            fileId: attachId
        });
        
        // set call back 
        action.setCallback(this, function(response) {
            // store the response / Attachment Id   
            attachId = response.getReturnValue();
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") {
                // update the start position with end postion
                //alert('Save  inside method');
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                // check if the start postion is still less then end postion 
                // then call again 'uploadInChunk' method , 
                // else, diaply alert msg and hide the loading spinner
                if (startPosition < endPosition) {
                    this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                } else {
                    component.set("v.showLoadingSpinner", false);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.The_file_is_uploaded_successfully"),
                        type: "success"
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
                }
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
                //alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
    },
     FetchnotesAndAttach:function(component, event,helper) 
    {
        var action = component.get("c.getnotesAndAttinfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert('Fetch>>>>>'+state);
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                //alert(JSON.stringify(storeResponse));
                component.set("v.ListNotesAttachment",storeResponse);
            }
        });
        $A.enqueueAction(action);  
    },
     FetchCustomeDocnotesAndAttach:function(component, event,helper) 
    {
        var action = component.get("c.getDocCustomNotesAttach");
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert('Fetch>>>>>'+state);
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                //alert(JSON.stringify(storeResponse));
                component.set("v.ListofFiles",storeResponse);
            }
        });
        $A.enqueueAction(action);  
    },
    FetchRetailerDocnotesAndAttach:function(component, event,helper) 
    {
        var action = component.get("c.getDocCustomNotesAttachRetailer");
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert('Fetch>>>>>'+state);
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
                //alert(JSON.stringify(storeResponse));
                component.set("v.ListofFilesRetailer",storeResponse);
            }
        });
        $A.enqueueAction(action);  
    },
    /*getSalesBaseUrlhelper:function(component, event,helper) 
    {
        var action = component.get("c.getSalesBaseUrl");
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert('Fetch>>>>>'+state);
            if (state === "SUCCESS") {
                var storeResponse = response.getReturnValue();
               // alert(JSON.stringify(storeResponse));
                component.set("v.Baseurl",storeResponse);
            }
        });
        $A.enqueueAction(action);  
    },*/
    GetcustomInfoid: function(component, event,helper) {
        //alert('hello');
        var action = component.get("c.getcostomerinfo");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var storeResponse = response.getReturnValue();
                //alert(storeResponse);
                // set current user information on userInfo attribute
                component.set("v.parentId", storeResponse);
            }
        });
        $A.enqueueAction(action);
    },
    deleteRow : function(component, event) {
        var action = component.get("c.deleteUploadedRow"); //Calling Apex Method
        action.setParams({deleteid:event.target.id});
        action.setCallback(this, function(response) {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.success"),
                message: $A.get("$Label.c.The_file_is_Deleted_successfully"),
                type: "success"
            });
            toastEvent.fire();
            component.set("v.ListNotesAttachment",response.getReturnValue());
            $A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);
    },
    
})