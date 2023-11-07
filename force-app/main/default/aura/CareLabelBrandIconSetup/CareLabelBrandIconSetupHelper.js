({
     ExistingData : function(component, event, helper) {
        // alert('healpercalling');
        var retailersids=component.get("v.retailerID");
        // alert('retailersids>>>'+retailersids);
        var productsids=component.get("v.productID");
        //alert('productsids>>>'+productsids);
        var action = component.get("c.getExistingBrandicondata");
        action.setParams({
            'retailer':retailersids,
            'productvals' : productsids
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
           //alert('configRecord>>>>>'+JSON.stringify(configRecord));
            if(configRecord!=null){
                if (state === "SUCCESS") 
                { 
                    //alert('state>>'+state);
                    component.set('v.BrandIconlist',configRecord);
                    component.set("v.isEditOpenModal",true);
                }
            }else{
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Insert_Careinstruction_Details"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
                component.set("v.isEditOpenModal",false);
            }
        });
        $A.enqueueAction(action);
    },
    helperdata : function(component, event, helper) {
       var brandSetup = component.get("v.BrandIconsetup");
        var art=brandSetup.Art_Code__c;
        var files=component.find("fileId").get("v.files");
        // alert('art>> before if '+JSON.stringify(art));
        if(files!=undefined &&  files!=null && files.length!=undefined && brandSetup.Art_Code__c!=null && brandSetup.Art_Code__c!=undefined && art!=" " && art!='')
        {
            // alert('art>>'+art);
            if (files.length > 0)
            {
                // alert('test1');
                this.uploadHelper(component, event,helper);
            } else {
                alert($A.get('$Label.c.Please_Select_a_Valid_File'));
            } 
        }else{
            var brandSetup = component.get("v.BrandIconsetup");
            brandSetup.Retailer_Code__c = component.get("v.retailerID");
            brandSetup.Product__c = component.get("v.productID");
            var artcode=component.find("acodeid").get("v.value");
            //alert('artcode>>>'+JSON.stringify(artcode));
                if(artcode===" " || artcode===""){
                    component.set("v.BrandIconsetup.Art_Code__c", null); 
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                    mode: 'sticky',
                    message: $A.get("$Label.c.Fill_Icon_Details"),
                    messageTemplate: ''
                  });
                   toastEvent.fire();
                 }
            else{
            if(brandSetup.Retailer_Code__c!=null && brandSetup.Art_Code__c!=null && brandSetup.Brand_Icon__c!=null && brandSetup.Art_Code__c!=undefined && brandSetup.Art_Code__c!=" " && brandSetup.Art_Code__c!="" && brandSetup.Product__c!=""  && brandSetup.Product__c!=null ){
                var brandlist=component.get("v.Brands");
                var flag = true;
                if(brandlist.length>0){
                    for(var i=0;i<brandlist.length;i++)
                    {
                        var long1= JSON.stringify(brandlist[i].Art_Code__c);
                        var long2= JSON.stringify(brandSetup.Art_Code__c);
                        if(long1===long2)
                        {
                            alert('dont allow duplicates');
                            component.set("v.showLoadingSpinner", false);
                            component.set("v.fileName", '');
                            return;
                        }
                        flag=false;
                    }}else{
                        flag=false;
                    }                
                
                if(flag==false){
                    var action = component.get("c.saveBrandicon");
                    action.setParams({
                        parentId: component.get("v.parentId"),
                        'BrandData':brandSetup
                    });
                    action.setCallback(this, function(response) {
                        var attachId = response.getReturnValue();
                        var state = response.getState();
                        if (state === "SUCCESS") {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "type":"success",
                                "title": $A.get("$Label.c.success"),
                                "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                            });
                            toastEvent.fire();
                            component.set("v.showLoadingSpinner", false);
                            component.set("v.BrandIconsetup", '');
                            component.set("v.fileName", ''); 
                            component.set("v.Brands", '--None--'); 
                            component.set("v.BrandIconsetup.Art_Code__c", '');
                           component.set("v.retailerID",null); 
                            component.set("v.productID",null); 
                        } else if (state === "INCOMPLETE") {
                            alert("From server: " + response.getReturnValue());
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
                    
                    $A.enqueueAction(action);  
                } 
            }  
            else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    mode: 'sticky',
                    message: $A.get("$Label.c.Fill_Icon_Details"),
                    messageTemplate: ''
                });
                toastEvent.fire();
            }}
        }
        
    },
    
    /*SaveBrandIcon : function(component, event, helper) {
       
		var brandSetup = component.get("v.BrandIconsetup");
        brandSetup.Retailer_Code__c = component.get("v.retailerID");
       var action = component.get("c.saveBrandicon");
        action.setParams({
            'BrandData':brandSetup
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            alert("state: " + response.getState());
            if (state === "SUCCESS") 
            {
                alert(response.getReturnValue());
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"success",
                    "title": "Success!",
                    "message": "The record has been saved successfully."
                });
                toastEvent.fire();
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": "Error!",
                    "message": 'Error Occured'
                });
                toastEvent.fire();
            }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);
	  },*/
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000,      //Chunk Max size 750Kb 
    uploadHelper: function(component, event) {
        // start/show the loading spinner   
        component.set("v.showLoadingSpinner", true);
        // get the selected files using aura:id [return array of files]
        var fileInput = component.find("fileId").get("v.files");
        //alert('fileInput>>'+fileInput);
        // get the first file using array index[0]  
        var file = fileInput[0];
        var self = this;
        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a alert msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
             alert('test2'); 
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", $A.get('$Label.c.Alert_File_size_cannot_exceed') + self.MAX_FILE_SIZE + $A.get('$Label.c.bytes') +'\n' + $A.get('$Label.c.Selected_file_size') + file.size);
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
    geticons: function(component, file, fileContents) {
        var action = component.get("c.getBrands");  
        action.setParams({
            'retailer': component.get('v.retailerID'),
            'product' : component.get('v.productID')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            // alert("configRecord: " + JSON.stringify(configRecord));
            if (state === "SUCCESS") 
            {
                //var configRecord=response.getReturnValue();
                component.set("v.Brands",configRecord);
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": response.getReturnValue()
                });
                toastEvent.fire();
            }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);  
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
        var getchunk = fileContents.substring(startPosition, endPosition);
        var brandSetup = component.get("v.BrandIconsetup");
        var brandlist=component.get("v.Brands");
        var flag = true;
        if(brandlist.length>0){
        for(var i=0;i<brandlist.length;i++)
        {
            var long1= JSON.stringify(brandlist[i].Brand_Icon__c);
            var long2= JSON.stringify(brandSetup.Brand_Icon__c);
            if(long1!=undefined && long2!=undefined){
               if(long1===long2)
            {
                alert('dont allow duplicates');
                component.set("v.showLoadingSpinner", false);
                component.set("v.fileName", '');
                return;
            }
            }
          flag=false;  
        }}else{
            flag=false;
        }
       // alert('flag>>'+flag);
        if(flag==false){
           // alert('test4');
            var action = component.get("c.saveBrandicon");
            //alert('brandlist>>>'+JSON.stringify(brandlist));
            brandSetup.Retailer_Code__c = component.get("v.retailerID");
            brandSetup.Product__c = component.get("v.productID");
            //alert('brandSetup.Product__c>>>'+JSON.stringify(brandSetup.Product__c));
            if( brandSetup.Product__c!="" && brandSetup.Product__c!=null){
        
            //  Var brandlist = component.get("v.Brands");
            action.setParams({
                parentId: component.get("v.parentId"),
                fileName: file.name,
                base64Data: encodeURIComponent(getchunk),
                contentType: file.type,
                fileId: attachId,
                'BrandData':brandSetup
            });
            // set call back 
            action.setCallback(this, function(response) {
                // store the response / Attachment Id   
                attachId = response.getReturnValue();
                var state = response.getState();
                if (state === "SUCCESS") {
                    // update the start position with end postion
                    startPosition = endPosition;
                    endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                    if (startPosition < endPosition) {
                        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                    } else {
                        var toastEvent = $A.get("e.force:showToast");
                        //$A.get('e.force:refreshView').fire();
                        toastEvent.setParams({
                            "type":"success",
                            "title": $A.get("$Label.c.success"),
                            "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                        });
                        toastEvent.fire();
                        component.set("v.showLoadingSpinner", false);
                        component.set("v.Brands", '--None--');
                        component.set("v.BrandIconsetup.Art_Code__c", '');
                        component.set("v.fileName", '');
                       // component.set("v.SetupFlag",false);
                        //component.set("v.retailerID",null);
                    }
                    // handel the response errors        
                } else if (state === "INCOMPLETE") {
                    alert("From server: " + response.getReturnValue());
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
            $A.enqueueAction(action);
            }else{
               var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    mode: 'sticky',
                    message: $A.get("$Label.c.Please_Select_the_Label"),
                    messageTemplate: ''
                });
                toastEvent.fire();
                 component.set("v.showLoadingSpinner", false);
            }
        
        
        }
    },
    uploadHelper1: function(component, event) {
        component.set("v.showLoadingSpinner1", true);
        var fileInput = component.find("fileId1").get("v.files");
        var file = fileInput[0];
        var self = this;
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.showLoadingSpinner1", false);
            component.set("v.fileName1", $A.get('$Label.c.Alert_File_size_cannot_exceed') + self.MAX_FILE_SIZE + $A.get('$Label.c.bytes') + '\n' + $A.get('$Label.c.Selected_file_size') + file.size);
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
            self.uploadProcess1(component, file, fileContents);
        });
        objFileReader.readAsDataURL(file);
    },
      uploadProcess1: function(component, file, fileContents) {
        var startPosition = 0;
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
        this.uploadInChunk1(component, file, fileContents, startPosition, endPosition, '');
    },
    uploadInChunk1: function(component, file, fileContents, startPosition, endPosition, attachId,helper) {
        var getchunk = fileContents.substring(startPosition, endPosition); 
        var action = component.get("c.EditbrandiconImage");
        action.setParams({
            recId: component.get("v.Imageid"),
            fileName: file.name,
            base64Data: encodeURIComponent(getchunk),
            contentType: file.type,
            fileId: attachId
        });
        action.setCallback(this, function(response) {
            attachId = response.getReturnValue();
            var state = response.getState();
            if (state === "SUCCESS") {
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                if (startPosition < endPosition) {
                    this.uploadInChunk1(component, file, fileContents, startPosition, endPosition, attachId);
                } else {
                    var toastEvent = $A.get("e.force:showToast");
                    //$A.get('e.force:refreshView').fire();
                    toastEvent.setParams({
                        "type":"success",
                        "title": $A.get("$Label.c.success"),
                        "message": $A.get("$Label.c.The_Image_has_been_updated_successfully")
                    });
                    toastEvent.fire();
                    this.ExistingData(component, event, helper);
                    component.set("v.Imageid", null);
                     component.set("v.ImagefileName", null);
                    component.set("v.isEditImageModal", false);
                    component.set("v.showLoadingSpinner1", false);
                    component.set("v.showLoadingSpinner1", false);
                    //  component.set("v.CareInstructionDetail", { 'sobjectType': 'Care_Instruction_Detail__c'});
                    component.set("v.fileName1", '');
                }
            }
        });
        $A.enqueueAction(action);
    },
    
     deletebrand : function(component, event, helper) {
        //to get Washinstruction pick values
        var action = component.get("c.deletebrandicons");
        var Brandid =component.get("v.Imageid");
        // alert('imgfield>>>'+imgfield);
        action.setParams({
            'instructid':Brandid,
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            // alert('configRecord'+configRecord);
            if (state === "SUCCESS") 
            { 
                var toastEvent = $A.get("e.force:showToast");
                                                //$A.get('e.force:refreshView').fire();
                                                toastEvent.setParams({
                                                    "type":"success",
                                                    "title": $A.get("$Label.c.success"),
                                                    "message": $A.get("$Label.c.The_record_has_been_deleted_successfully")
                                                });
                                                toastEvent.fire();
                // this.updateinstruct2(component, event, helper);
                 component.set("v.Imageid", null);
                
                 this.ExistingData(component, event, helper);
            }
        });
        $A.enqueueAction(action);
    }
})