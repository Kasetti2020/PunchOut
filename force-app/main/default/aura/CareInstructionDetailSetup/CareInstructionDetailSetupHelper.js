({
    fetchPickValues : function(component, event, helper) {
        //to get Washinstruction pick values
        var action = component.get("c.getinstructions");
        var retailersids=component.get("v.retailerID");
        // alert('retailersids>>'+retailersids);
        var productsids=component.get("v.productID");
        // alert('productsids>>>'+productsids);
        action.setParams({
            'retailers':retailersids,
            'productvals' : productsids 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            // alert('configRecord'+configRecord);
            if (state === "SUCCESS") 
            { 
                // alert('state>>'+state);
                component.set('v.listOfWashInstruct',configRecord);
            }
            
        });
        $A.enqueueAction(action);
    },
    ExistingData : function(component, event, helper) {
        // alert('healpercalling');
        var retailersids=component.get("v.retailerID");
        // alert('retailersids>>>'+retailersids);
        var productsids=component.get("v.productID");
        //alert('productsids>>>'+productsids);
        var action = component.get("c.getExistinginstructions");
        var instructdetails= component.find("instructid").get("v.value");
        action.setParams({
            'retailer':retailersids,
            'productvals' : productsids,
            'instructions':instructdetails  
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            //  alert('configRecord>>>>>'+JSON.stringify('configRecord'));
            if(configRecord!=null){
                if (state === "SUCCESS") 
                { 
                    //alert('state>>'+state);
                    component.set('v.CareList',configRecord);
                    component.set("v.isEditOpenModal",true);
                }
            }else{
                
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.No_Instructions_To_View"),
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
    retailerlangs : function(component, event, helper)
    {
        // alert('Testing');
        var retailercode=component.get("v.retailerID");
        var action=component.get("c.retailervals");
        action.setParams({
            'retailer':retailercode
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
            if (state === "SUCCESS") 
            { 
                var result = response.getReturnValue();
                if(result!=null){
                    component.set("v.DataFlag",true);
                    if(result.Lang_1__c!=null){
                        component.set("v.lang1Flag",true);
                        component.set("v.instruct1", result.Lang_1__r.Name);  
                    }
                    if(result.Lang_2__c!=null){
                        component.set("v.lang2Flag",true);
                        component.set("v.instruct2", result.Lang_2__r.Name);  
                    }
                    if(result.Lang_3__c!=null){
                        component.set("v.lang3Flag",true);
                        component.set("v.instruct3", result.Lang_3__r.Name);  
                    }
                    if(result.Lang_4__c!=null){
                        component.set("v.lang4Flag",true);
                        component.set("v.instruct4", result.Lang_4__r.Name);  
                    }
                    if(result.Lang_5__c!=null){
                        component.set("v.lang5Flag",true);
                        component.set("v.instruct5", result.Lang_5__r.Name);  
                    }  
                }
                
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
    
    MAX_FILE_SIZE: 4500000, //Max file size 4.5 MB 
    CHUNK_SIZE: 750000,      //Chunk Max size 750Kb 
    uploadHelper: function(component, event) {
        // start/show the loading spinner   
        // 
        component.set("v.showLoadingSpinner", true);
        
        // get the selected files using aura:id [return array of files]
        var fileInput = component.find("fileId").get("v.files");
        // get the first file using array index[0]  
        var file = fileInput[0];
        var self = this;
        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a alert msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
            component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", $A.get('$Label.c.Alert_File_size_cannot_exceed') + self.MAX_FILE_SIZE + $A.get('$Label.c.bytes') + '\n' + $A.get('$Label.c.Selected_file_size') + file.size);
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
        // call the apex method 'saveChunk'
        var getchunk = fileContents.substring(startPosition, endPosition);
        var careinstruct = component.get("v.CareInstructionDetail");
        var cids=component.find("carecodeid").get("v.value");
        //alert('careinstruct>>>'+JSON.stringify(careinstruct));
        var washgroup = component.find("instructid").get("v.value");
        // alert('washgroup>>>>'+washgroup);
      
        careinstruct.Retailer_Code__c = component.get("v.retailerID");
        careinstruct.Product__c = component.get("v.productID");
        careinstruct.Care_Symbol__c =component.find("carecodeid").get("v.value");
        careinstruct.Name =component.get("v.retailerName")+'_'+component.get("v.productName")+'_'+careinstruct.Wash_Instruction_Group__c;
        //  alert('carecode'+careinstruct.Carecode__c);
        //  alert('carecode'+careinstruct.Description__c);
        //  alert('carecode'+careinstruct.Description__c);
        if(component.get("v.lang1Flag")===true && (careinstruct.CareInstructLang1__c===null || careinstruct.CareInstructLang1__c==='' || careinstruct.CareInstructLang1__c===undefined))
        {
            // component.set("v.spinner",false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Please_fill_all_required_fields"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();
            component.set("v.spinner",false);
        }
        else if(careinstruct.Wash_Instruction_Group__c==='NONE')
        {
            // component.set("v.spinner",false);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Required_Wash_Instruction_group"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();
            component.set("v.spinner",false);
        }
            else if((careinstruct.Wash_Instruction_Group__c==='Retailer Care Code') & (cids==null | cids==''| cids==undefined | cids=='""'))
            {
                 //component.set("v.spinner",false);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Required_Care_Code"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
                component.set("v.spinner",false);
            }
        
                else if(component.get("v.lang2Flag")===true && (careinstruct.CareInstructLang2__c===null || careinstruct.CareInstructLang2__c==='' || careinstruct.CareInstructLang2__c===undefined))
                {
                     //component.set("v.spinner",false);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Please_fill_all_required_fields"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();
                    component.set("v.spinner",false);
                }
                    else if(component.get("v.lang3Flag")===true && (careinstruct.CareInstructLang3__c==null || careinstruct.CareInstructLang3__c=='' || careinstruct.CareInstructLang3__c==undefined))
                    {
                        // component.set("v.spinner",false);
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_fill_all_required_fields"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                        component.set("v.spinner",false);
                    }
                        else if(component.get("v.lang4Flag")===true && (careinstruct.CareInstructLang4__c===null || careinstruct.CareInstructLang4__c==='' || careinstruct.CareInstructLang4__c===undefined))
                        {
                            // component.set("v.spinner",false);
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title : $A.get("$Label.c.Info_Message"),
                                message: $A.get("$Label.c.Please_fill_all_required_fields"),
                                duration:'3000',
                                key: 'info_alt',
                                type: 'info',
                                mode: 'dismissible'
                            });
                            toastEvent.fire();
                            component.set("v.spinner",false);
                        }
                            else if(component.get("v.lang5Flag")===true && (careinstruct.CareInstructLang5__c===null || careinstruct.CareInstructLang5__c==='' || careinstruct.CareInstructLang5__c===undefined))
                            {
                                 //component.set("v.spinner",false);
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title : $A.get("$Label.c.Info_Message"),
                                    message: $A.get("$Label.c.Please_fill_all_required_fields"),
                                    duration:'3000',
                                    key: 'info_alt',
                                    type: 'info',
                                    mode: 'dismissible'
                                });
                                toastEvent.fire();
                                component.set("v.spinner",false);
                            }
        
                                else if( (careinstruct.Description__c===null || careinstruct.Description__c==='' || careinstruct.Description__c===undefined) )
                                {
                                    // component.set("v.spinner",false);
                                    var toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        title : $A.get("$Label.c.Info_Message"),
                                        message: $A.get("$Label.c.Required_Care_Instruction_Description"),
                                        duration:'3000',
                                        key: 'info_alt',
                                        type: 'info',
                                        mode: 'dismissible'
                                    });
                                    toastEvent.fire();
                                    component.set("v.spinner",false);
                                }
        
                                    else{
                                        // component.set("v.spinner",false);
                                        //alert('careinstruct>>>'+JSON.stringify(careinstruct));
                                        var action = component.get("c.savecaredata");
                                        action.setParams({
                                            parentId: component.get("v.parentId"),
                                            fileName: file.name,
                                            base64Data: encodeURIComponent(getchunk),
                                            contentType: file.type,
                                            fileId: attachId,
                                            careinstructdata:careinstruct
                                        });
                                        // set call back 
                                        action.setCallback(this, function(response) {
                                            // store the response / Attachment Id   
                                            attachId = response.getReturnValue();
                                            var state = response.getState();
                                            if (state === "SUCCESS") {
                                                //alert('Inside');
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
                                                    component.set("v.showLoadingSpinner", false);
                                                    component.set("v.CareInstructionDetail", { 'sobjectType': 'Care_Instruction_Detail__c'});
                                                    /* component.set("v.lang1Flag", false);
                         component.set("v.lang2Flag", false);
                         component.set("v.lang3Flag", false);
                         component.set("v.lang4Flag", false);
                         component.set("v.lang5Flag", false);
                         component.set("v.DataFlag", false);
                         component.set("v.retailerID", null);
                         component.set("v.productID", null);*/
                                                    // component.set("v.listOfWashInstruct", 'NONE');
                                                    component.set("v.fileName", '');
                                                    component.set("v.spinner",false);
                                                }
                                                
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
                                        //component.set("v.spinner",false);
                                    }
        //  component.set("v.spinner",false);
    },
    saveinstruct: function(component, file, fileContents, startPosition, endPosition, attachId) {
        var careinstruct = component.get("v.CareInstructionDetail");
        var washgroup = component.find("instructid").get("v.value");
        var cids=component.find("carecodeid").get("v.value");
        careinstruct.Retailer_Code__c = component.get("v.retailerID");
        careinstruct.Product__c = component.get("v.productID");
        
        
        careinstruct.Name =component.get("v.retailerName")+'_'+component.get("v.productName")+'_'+careinstruct.Wash_Instruction_Group__c;
        if(component.get("v.lang1Flag")===true && (careinstruct.CareInstructLang1__c===null || careinstruct.CareInstructLang1__c==='' || careinstruct.CareInstructLang1__c===undefined))
        {
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Please_fill_all_required_fields"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();
            component.set("v.spinner",false);
        }
        else if(careinstruct.Wash_Instruction_Group__c==='NONE')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Required_Wash_Instruction_group"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();
            component.set("v.spinner",false);
        }
        
            else if((careinstruct.Wash_Instruction_Group__c==='Retailer Care Code') & (cids==null | cids==''| cids==undefined | cids=='""'))
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Required_Care_Code"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
                component.set("v.spinner",false);
            }
        
                else if(component.get("v.lang2Flag")===true && (careinstruct.CareInstructLang2__c===null || careinstruct.CareInstructLang2__c==='' || careinstruct.CareInstructLang2__c===undefined))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Please_fill_all_required_fields"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();
                    component.set("v.spinner",false);
                }
                    else if(component.get("v.lang3Flag")===true && (careinstruct.CareInstructLang3__c==null || careinstruct.CareInstructLang3__c=='' || careinstruct.CareInstructLang3__c==undefined))
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_fill_all_required_fields"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                        component.set("v.spinner",false);
                    }
                        else if(component.get("v.lang4Flag")===true && (careinstruct.CareInstructLang4__c===null || careinstruct.CareInstructLang4__c==='' || careinstruct.CareInstructLang4__c===undefined))
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title : $A.get("$Label.c.Info_Message"),
                                message: $A.get("$Label.c.Please_fill_all_required_fields"),
                                duration:'3000',
                                key: 'info_alt',
                                type: 'info',
                                mode: 'dismissible'
                            });
                            toastEvent.fire();
                            component.set("v.spinner",false);
                        }
                            else if(component.get("v.lang5Flag")===true && (careinstruct.CareInstructLang5__c===null || careinstruct.CareInstructLang5__c==='' || careinstruct.CareInstructLang5__c===undefined))
                            {
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title : $A.get("$Label.c.Info_Message"),
                                    message: $A.get("$Label.c.Please_fill_all_required_fields"),
                                    duration:'3000',
                                    key: 'info_alt',
                                    type: 'info',
                                    mode: 'dismissible'
                                });
                                toastEvent.fire();
                                component.set("v.spinner",false);
                            }
                                else if( (careinstruct.Description__c===null || careinstruct.Description__c==='' || careinstruct.Description__c===undefined) )
                                {
                                    var toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        title : $A.get("$Label.c.Info_Message"),
                                        message: $A.get("$Label.c.Required_Care_Instruction_Description"),
                                        duration:'3000',
                                        key: 'info_alt',
                                        type: 'info',
                                        mode: 'dismissible'
                                    });
                                    toastEvent.fire();
                                    component.set("v.spinner",false);
                                }
        
                                    else{
                                        var action = component.get("c.savecaredata");
                                        action.setParams({
                                            'careinstructdata':careinstruct
                                        });
                                        // set call back 
                                        action.setCallback(this, function(response) {
                                            // store the response / Attachment Id   
                                            attachId = response.getReturnValue();
                                            var state = response.getState();
                                            if (state === "SUCCESS") {
                                                var toastEvent = $A.get("e.force:showToast");
                                                //$A.get('e.force:refreshView').fire();
                                                toastEvent.setParams({
                                                    "type":"success",
                                                    "title": $A.get("$Label.c.success"),
                                                    "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                                                });
                                                toastEvent.fire();
                                                component.set("v.showLoadingSpinner", false);
                                                component.set("v.showLoadingSpinner", false);
                                                component.set("v.CareInstructionDetail", { 'sobjectType': 'Care_Instruction_Detail__c'});
                                                component.set("v.spinner",false);
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
    },
    
    updateinstruct:function(component, event, helper){
        var careinstruct = component.get("v.CareList");
        // alert('careinstruct>>'+JSON.stringify(careinstruct));
        var flag;
        for(var i=0;i<careinstruct.length;i++){
            
            // alert('careinstruct'+JSON.stringify(careinstruct[i].Description__c));
            if(JSON.stringify(careinstruct[i].Description__c)==undefined){
                flag=false;  
            }else{
                flag=true; 
            }
        }
        // alert('flag>>>'+flag);
        if(flag===true)
        {
            // alert('flag>>>'+flag);  
            var action = component.get("c.updateCareinstruction"); 
            action.setParams({
                'careinstructdata':careinstruct
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var imgfield =component.get("v.Imageid");
                    //alert('imgfield>>>>>'+imgfield);
                    var toastEvent = $A.get("e.force:showToast");
                    //$A.get('e.force:refreshView').fire();
                    toastEvent.setParams({
                        "type":"success",
                        "title": $A.get("$Label.c.success"),
                        "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                    });
                    toastEvent.fire();
                    component.set("v.Imageid", null);
                    component.set("v.isEditOpenModal", false); 
                    ///  component.set("v.CareList", null); 
                    
                }  
                else if (state === "ERROR") {
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
    },
    
    updateinstruct1:function(component, event, helper){
        //alert('update to refresh');
        var careinstruct = component.get("v.CareList");
        var action = component.get("c.updateCareinstruction"); 
        action.setParams({
            'careinstructdata':careinstruct
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                /*   var imgfield =component.get("v.Imageid");
                //alert('imgfield>>>>>'+imgfield);
                    var toastEvent = $A.get("e.force:showToast");
                    //$A.get('e.force:refreshView').fire();
                    toastEvent.setParams({
                        "type":"success",
                        "title": "Success!",
                        "message": "The record has been saved successfully."
                    });
                    toastEvent.fire();
                  //component.set("v.isEditOpenModal", false); */
                component.set("v.isEditImageModal", false);
            }  
            
        });
        $A.enqueueAction(action);
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
        var action = component.get("c.saveeditcareImage");
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
                    //this.updateinstruct1(component, event, helper);
                    // $A.get('e.force:refreshView').fire();
                    component.set("v.Imageid", null);
                    component.set("v.ImagefileName", null);
                    component.set("v.isEditImageModal", false);
                    component.set("v.showLoadingSpinner1", false);
                    //  component.set("v.showLoadingSpinner1", false);
                    //  component.set("v.CareInstructionDetail", { 'sobjectType': 'Care_Instruction_Detail__c'});
                    component.set("v.fileName1", '');
                }
            }
        });
        $A.enqueueAction(action);
    },
    deleteimage : function(component, event, helper) {
        //to get Washinstruction pick values
        var action = component.get("c.deleteinstructions");
        var imgfield =component.get("v.Imageid");
        // alert('imgfield>>>'+imgfield);
        action.setParams({
            'imgfield':imgfield,
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
                    "message": $A.get("$Label.c.The_Image_record_has_been_deleted_successfully")
                });
                toastEvent.fire();
                // this.updateinstruct2(component, event, helper);
                component.set("v.Imageid", null);
                
                this.ExistingData(component, event, helper);
            }
        });
        $A.enqueueAction(action);
        
    },
    deleteinstruct : function(component, event, helper) {
        //to get Washinstruction pick values
        var action = component.get("c.deleteinstructionrecords");
        var instructid =component.get("v.Imageid");
        // alert('imgfield>>>'+imgfield);
        action.setParams({
            'instructid':instructid,
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
                    "message": $A.get("$Label.c.The_Image_record_has_been_deleted_successfully")
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