({
    MAX_FILE_SIZE: 750000,
    
    //code to read Coloumn Names
    uploadFile : function(component) {
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        
        if (file.size > this.MAX_FILE_SIZE) 
        {
            alert('File size cannot exceed ' + this.MAX_FILE_SIZE + ' bytes.\n' +
                  'Selected file size: ' + file.size);
            return;
        }
        
        var fr = new FileReader();
        var self = this;
        
        fr.onload = function()
        {
            var fileContents = fr.result;
            var base64Mark = 'base64,';
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
            
            fileContents = fileContents.substring(dataStart);
            self.upload(component, file, fileContents);
        };
        
        fr.readAsDataURL(file);
    },
    
    upload: function(cmp, file, fileContents) {
        var spinner = cmp.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide"); 
        var action = cmp.get("c.saveTheFile");
        action.setParams(
            { 
                fileName: file.name,
                base64Data: encodeURIComponent(fileContents), 
                contentType: file.type,
            });
        action.setCallback(this, function(response) {
            
            var state = response.getState(); 
            var returnValue=response.getReturnValue();
            if(state == "SUCCESS")
            {
                //alert(JSON.stringify(response.getReturnValue()));
                cmp.set("v.DestinationIndicator",response.getReturnValue());
                $A.util.toggleClass(spinner, "slds-hide");
                cmp.set("v.DisableUpload", true);
                cmp.set("v.DisableCancelbutton", false);
            }   
            else
            {
                $A.util.toggleClass(spinner, "slds-hide"); 
            }
            //alert(cmp.get("v.DestinationIndicator.length"));
        });
        window.setTimeout(
            $A.getCallback(function() {
                $A.enqueueAction(action);
            }), 1000
        );
        
    },
    //up to here to read Coloumn Names
    
    //code to read file Values
    uploadHelper : function(component,evt,helper) {
        var fileNotUploaded=component.get("v.DestinationIndicator.length");
     // alert('destinle'+JSON.stringify(fileNotUploaded));
       // alert(JSON.stringify(component.get("v.DestinationIndicator")));
        if(fileNotUploaded == 0)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "Success!",
                "message": "Please Upload the file before Saving"
            });
            toastEvent.fire();
            return;
        }
        var spinner = component.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide");
        var action = component.get("c.SaveData");
        action.setParams(
            { 
                "ColNameVal":JSON.stringify(component.get("v.DestinationIndicator")),
                "RetailerNames":JSON.stringify(component.get("v.RetailerNames")),
            });
        action.setCallback(this, function(response) {
            
            var state = response.getState(); 
            var returnValue=response.getReturnValue();
           //alert(state);
            if(state == "SUCCESS")
            {
                $A.util.toggleClass(spinner, "slds-hide");
                var toastEvent = $A.get("e.force:showToast");
                //var clearfile=confirm('Are you sure you want to Upload the Data');
                toastEvent.setParams({
                    "type" : "success",
                    "title": "SUCCESS!",
                    //"message": "Please select all picklist Value from the QBO ENTITY and Destination Indicator."
                    "message": "Data Mapping File is Uploaded Successfully"
                });
                toastEvent.fire(); 

                    component.set("v.DestinationIndicator",undefined);
                    component.set("v.RetailerNames.FileHeader",undefined);
                    //component.set("v.RetailerNames.ActiveTemp",undefined);
                    component.set("v.RetailerNames.Excaretid",undefined);
                    component.set("v.RetailerNames.ProductVertical",'None');
                    component.find("file").getElement().value='';
                    component.set("v.fileName",'');
                	component.set("v.DisableUpload",false);
                return;
                //alert(JSON.stringify(response.getReturnValue())); 
            }   
            else
            {
                $A.util.toggleClass(spinner, "slds-hide");
            }
        });
        $A.enqueueAction(action);
    },
    DisplayFileName : function(component, event, helper) {
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        if(file)
        component.set("v.fileName", file.name);
        else
            component.set("v.fileName", '');
        
    },
    activeTemp : function(component, event, helper) {
        if(component.get("v.RetailerNames.ActiveTemp") == true && !component.get("v.RetailerNames.Excaretid")){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": "ERROR!",
                "message": "Please select Retailer"
            });
            toastEvent.fire();
            component.set("v.RetailerNames.ActiveTemp",false);
            return;
            
        }
        if(component.get("v.RetailerNames.ActiveTemp") == true){
            var getRetailer = component.get("c.TemplateDataActive");
            getRetailer.setParams(
                { 
                    "RetailedId" : component.get("v.RetailerNames.Excaretid"),
                });
            getRetailer.setCallback(this, function(a) {
               // alert(a.getReturnValue());
               if(a.getReturnValue() == '')
               {
                   component.set("v.ActiveTemplateFlag",false);
                   return;
               }
                component.set("v.ExistingTemplateName",a.getReturnValue());
                component.set("v.ActiveTemplateFlag",true);  
            });
            $A.enqueueAction(getRetailer); 
        }
    },
    getVerticles : function(component, event, helper) {
        var action = component.get("c.getVerticals");
         action.setCallback(this, function(a) {
             component.set("v.RetailNamesNProdVertical", a.getReturnValue());
         });
         $A.enqueueAction(action);
     },
})