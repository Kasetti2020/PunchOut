({
    
    MAX_FILE_SIZE: 750000, 
    
    save : function(component) {
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        var file1 = fileInput.Count;
        // alert('file1>>>'+file.size);
        var Verticalname=component.get("v.RetailNamesNProdVertical.ProdVertical");
        var templateName=component.get("v.RetailNamesNProdVertical.Tempalte");
        if(Verticalname == 'None' || templateName =='None')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": $A.get("$Label.c.Error"),
                "message": $A.get("$Label.c.Please_select_vertical_and_template_name_before_uploading")
            });
            toastEvent.fire();
            return;
        }
        if(file == undefined)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": $A.get("$Label.c.Error"),
                "message": $A.get("$Label.c.Please_Select_the_file_before_uploading")
            });
            toastEvent.fire();
            return;
        }
        if (file.size > this.MAX_FILE_SIZE) 
        {
            alert($A.get("$Label.c.File_size_cannot_exceed") + this.MAX_FILE_SIZE + $A.get("$Label.c.bytes") + '\n' +
                  $A.get("$Label.c.Selected_file_size") + file.size);
            return;
        }
        
        
        var fr = new FileReader();
        //var fr2 = new FileReader();
        
        var self = this;
        fr.onload = function()
        {
            var fileContents = fr.result;
            var filetest=fileContents.size;
            // alert('filetest>>>>>'+filetest);
            var base64Mark = 'base64,';
            // alert('filetest>>>>>'+fileContents.indexOf(base64Mark));
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
            
            fileContents = fileContents.substring(dataStart);
            //alert(fileContents);
            
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
                ProductVartical : cmp.get("v.RetailNamesNProdVertical.ProdVertical"),
            });
        action.setCallback(this, function(response) 
                           {
                               var state = response.getState();
                               //alert(JSON.stringify(response.getReturnValue()));
                               if(state == "SUCCESS")
                               {   
                                   var toastEvent = $A.get("e.force:showToast");
                                   var cmpTarget = cmp.find('errorBtn');
                                   var badge = cmp.find('badge');
                                   //new code
                                   //alert('response.getReturnValue() '+response.getReturnValue())
                                   if(response.getReturnValue() == null)
                                   {          
                                       var toastEvent = $A.get("e.force:showToast");
                                       toastEvent.setParams({
                                           "type" : "error",
                                           "title": $A.get("$Label.c.Error"),
                                           "message": $A.get("$Label.c.No_of_Columns_of_Uploading_File_and_Saved_Mappings_are_different_please_Upload_C")
                                       });
                                       toastEvent.fire();
                                       $A.util.toggleClass(spinner, "slds-hide");
                                       return;
                                   }
                                   
                                   if(response.getReturnValue().Status == 'Error')
                                   {   
                                       var toastEvent = $A.get("e.force:showToast");
                                       toastEvent.setParams({
                                           "type" : "error",
                                           "title": $A.get("$Label.c.Error"),
                                           "message": response.getReturnValue().errorMessage
                                       });
                                       toastEvent.fire();
                                       $A.util.toggleClass(spinner, "slds-hide");
                                       return;
                                   }
                                   else if(response.getReturnValue().wrapetails.Polisize != 0)
                                   {
                                       var returnValue=response.getReturnValue().wrapetails;
                                       //alert('test1')
                                       //alert('alert1'+returnValue.VDUId);
                                       //alert('returnValue.Polisize'+returnValue.Polisize);
                                       cmp.set("v.Next",true);
                                       /*toastEvent.setParams({
                    "type":"success",
                    "title": "Success",
                    "message": "Variable Data Upload Records successfully."
                } );
                toastEvent.fire();
                */
                    //('alert1'+returnValue.VDUId);
                    cmp.set("v.filesize",returnValue.size);
                    //alert('returnValue.Polisize'+returnValue.Polisize);
                    cmp.set("v.Polifilesize",returnValue.Polisize);
                    cmp.set("v.VaId",returnValue.VDUId);
                    //alert(cmp.get("v.VaId")+'VUD Id');
                    $A.util.toggleClass(spinner, "slds-hide");
                    console.log(response.getReturnValue()); 
                }
                if(response.getReturnValue().wrapetails.Polisize == 0)
                {          
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "type" : "error",
                        "title": $A.get("$Label.c.Error"),
                        "message": $A.get("$Label.c.Please_upload_the_file_with_proper_records")
                    });
                    toastEvent.fire();
                    $A.util.toggleClass(spinner, "slds-hide");
                    return;
                }
            }
            else if(returnValue === "Incomplete")
            {
                $A.util.addClass(cmpTarget, 'slds-hide');
                $A.util.removeClass(badge, 'slds-hide');
                toastEvent.setParams({
                    "type":"warning",
                    "title": $A.get("$Label.c.Data_uploaded_partially_Check_your_Mail_For_Error_Records"),
                    "message": $A.get("$Label.c.Records_are_Uploaded_Partially")
                } );
                toastEvent.fire();   
                $A.util.toggleClass(spinner, "slds-hide");
                console.log(response.getReturnValue());
            }
            
                else if(returnValue === "Error")
                {
                    $A.util.addClass(cmpTarget, 'slds-hide');
                    $A.util.removeClass(badge, 'slds-hide');
                    toastEvent.setParams({
                        "type":"error",
                        "title": $A.get("$Label.c.Error"),
                        "message": $A.get("$Label.c.Records_are_Not_Uploaded")
                    } );
                    toastEvent.fire();   
                    $A.util.toggleClass(spinner, "slds-hide");
                    console.log(response.getReturnValue());
                }     
        });
         window.setTimeout(
             $A.getCallback(function() {
                 $A.enqueueAction(action);
             }), 1000
         );
     },
    
    DisplayFileName : function(component, event, helper) {
        var fileInput = component.find("file").getElement();
        var file = fileInput.files[0];
        if(file)
            var fileName = $A.get("$Label.c.You_have_selected_file") +file.name+']';
        else
            var fileName = $A.get("$Label.c.Please_select_File_before_uploading");   
        component.set("v.fileName", fileName);
    },
    POHelper: function(component) {
        //alert('POHelper');
        var fileInput1 = component.find("file").getElement();
        var file1 = fileInput1.files[0];
        var file11 = fileInput1.Count;
        // alert('file1>>>'+file.size);
        
        if (file1.size > this.MAX_FILE_SIZE) 
        {
            alert($A.get("$Label.c.File_size_cannot_exceed") + this.MAX_FILE_SIZE + $A.get("$Label.c.bytes") +'\n' +
                  $A.get("$Label.c.Selected_file_size") + file1.size);
            return;
        }
        
        var fr1 = new FileReader();
        //var fr2 = new FileReader();
        
        var self = this;
        fr1.onload = function()
        {
            var fileContents = fr1.result;
            var filetest=fileContents.size;
            // alert('filetest>>>>>'+filetest);
            var base64Mark = 'base64,';
            // alert('filetest>>>>>'+fileContents.indexOf(base64Mark));
            var dataStart = fileContents.indexOf(base64Mark) + base64Mark.length;
            
            fileContents = fileContents.substring(dataStart);
            //alert(fileContents);
            
            self.uploadPO(component, file1, fileContents);
            
        };
        
        fr1.readAsDataURL(file1);
    },
    uploadPO: function(cmp, file1, fileContents) {
        
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var spinner = cmp.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide"); 
        var action = cmp.get("c.SavePOdetails");
        action.setParams(
            { 
                VUDId : cmp.get("v.VaId"),
                ProductVartical:cmp.get("v.RetailNamesNProdVertical.ProdVertical"),
                UserId:userId,
                ShowError : false
                
            });
        action.setCallback(this, function(response) 
                           {
                               var state = response.getState(); 
                               var toastEvent = $A.get("e.force:showToast");
                               var cmpTarget = cmp.find('errorBtn');
                               var badge = cmp.find('badge');
                               //new code
                               var returnValue=response.getReturnValue();
                               //alert(JSON.stringify(returnValue));
                               if(state == "SUCCESS")
                               {
                                   cmp.set("v.Next",false);
                                   if(returnValue.Status=="OK")
                                   {
                                       cmp.set("v.Next",false);
                                       cmp.set("v.Success",true);
                                       /* toastEvent.setParams({
                    "type":"success",
                    "title": "Success",
                    "message": "Variable Data Upload Records successfully1."
                    } );
                    toastEvent.fire();
                    */
                    $A.util.toggleClass(spinner, "slds-hide");
                    console.log(response.getReturnValue()); 
                }
                else
                {
                    var message = returnValue.errorMessage;
                    if(returnValue.rowNumber!=null)
                        message += ' at line number '+returnValue.rowNumber;
                    if(returnValue.colName!=null)
                        message += ' and column '+returnValue.colName;
                    
                    $A.util.addClass(cmpTarget, 'slds-hide');
                    $A.util.removeClass(badge, 'slds-hide');
                    toastEvent.setParams({
                        "type":"error",
                        "title": $A.get("$Label.c.Error"),
                        "message": message
                    } );
                    toastEvent.fire();   
                    $A.util.toggleClass(spinner, "slds-hide");
                    console.log(response.getReturnValue());
                }
                
                
                
            }
            else if(returnValue === "Incomplete")
            {
                cmp.set("v.Next",false);
                $A.util.addClass(cmpTarget, 'slds-hide');
                $A.util.removeClass(badge, 'slds-hide');
                toastEvent.setParams({
                    "type":"warning",
                    "title": $A.get("$Label.c.Data_uploaded_partially_Check_your_Mail_For_Error_Records"),
                    "message": $A.get("$Label.c.Records_are_Uploaded_Partially")
                } );
                toastEvent.fire();   
                $A.util.toggleClass(spinner, "slds-hide");
                console.log(response.getReturnValue());
            }
            
                else if(returnValue === "Error")
                {
                    cmp.set("v.Next",false);
                    $A.util.addClass(cmpTarget, 'slds-hide');
                    $A.util.removeClass(badge, 'slds-hide');
                    toastEvent.setParams({
                        "type":"error",
                        "title": $A.get("$Label.c.Error"),
                        "message": $A.get("$Label.c.Records_are_Not_Uploaded")
                    } );
                    toastEvent.fire();   
                    $A.util.toggleClass(spinner, "slds-hide");
                    console.log(response.getReturnValue());
                }     
        });
         window.setTimeout(
             $A.getCallback(function() {
                 $A.enqueueAction(action);
             }), 1000
         );
     },    
    getVerticles : function(component, event, helper) {
        var action = component.get("c.getVerticals");
        action.setCallback(this, function(a) {
            component.set("v.RetailProdVertical", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    fetchTemplate : function(component, event, helper) {
        var Verticalname=component.get("v.RetailNamesNProdVertical.ProdVertical");
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        component.set("v.RetailNamesNProdVertical.Tempalte",'None');
        var action = component.get("c.getTemplate");
        action.setParams(
            { 
                //UserId : UserIds,
                ProdVertical : component.get("v.RetailNamesNProdVertical.ProdVertical"),
            });
        action.setCallback(this, function(a) {
            component.set("v.RetailTemplate", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    getTemplateData : function(component, event, helper) {
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var Verticalname=component.get("v.RetailNamesNProdVertical.ProdVertical");
        var templateName=component.get("v.RetailNamesNProdVertical.Tempalte");
        //alert('Verticalname '+Verticalname + ' templateName '+templateName);
        if(Verticalname == 'None' || templateName =='None')
        {          
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type" : "error",
                "title": $A.get("$Label.c.Error"),
                "message": $A.get("$Label.c.please_Select_Vertical_and_Template_Name")
            });
            toastEvent.fire();
            return;
        }
        var action = component.get("c.getTemplateDat");
        action.setParams(
            { 
                // UserId : UserIds,
                ProdVertical : component.get("v.RetailNamesNProdVertical.ProdVertical"),
                TemplateName : component.get("v.RetailNamesNProdVertical.Tempalte"),
            });
        
        action.setCallback(this, function(a) { 
            var returnValues=a.getReturnValue();
            // alert('returnValues :::'+JSON.stringify(returnValues));
            component.set("v.selectedTemplate", returnValues.MappingId); 
        });
        
        component.set("v.createContactFlag",true);
        $A.enqueueAction(action);
    },
    CancelUpload: function(component, event, helper) {
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var spinner = component.find("spinner");
        $A.util.toggleClass(spinner, "slds-hide"); 
        var action = component.get("c.cancelUpload");
        action.setParams(
            { 
                VId : component.get("v.VaId"),    
            });
        action.setCallback(this, function(response) 
                           {
                               var state = response.getState(); 
                               var toastEvent = $A.get("e.force:showToast");
                               var cmpTarget = component.find('errorBtn');
                               var badge = component.find('badge');
                               var returnValue=response.getReturnValue();
                               if(state == "SUCCESS")
                               {
                                   if(returnValue)
                                   {
                                       toastEvent.setParams({
                                           "type":"warning",
                                           "title": $A.get("$Label.c.Warning"),
                                           "message": $A.get("$Label.c.File_uploading_is_cancelled_Please_Re_upload_the_file")
                                       } );
                                       toastEvent.fire();   
                                       $A.util.toggleClass(spinner, "slds-hide");
                                       console.log(response.getReturnValue()); 
                                   }   
                               }
                               
                           });
        $A.enqueueAction(action);
    }, 
    convertArrayOfObjectsToCSV : function(component,objRecords) {
        console.log('objRecords ::'+JSON.stringify(objRecords));
        var csvStringResult,counter,keys,lineDivider,columnDivider;
        /* if(objRecords==null || !objRecords.length)
        {
   return null;         
        }*/
         alert('objRecords ::'+objRecords);
         columnDivider=',';
         lineDivider='\n';
         keys=['Id','Retailer_Codes__c','Name','No_of_Columns__c','File_Column_A__c','File_Column_B__c','File_Column_C__c','File_Column_A_Destination_Indicator__c'];
         alert('keys ::'+keys);
         csvStringResult='';
         csvStringResult+=keys.join(columnDivider);
         csvStringResult+=lineDivider;
         alert('csvStringResult ::'+csvStringResult);
         for(var i=0;i<=objRecords.length;i++)
         {
             console.log('objRecords1 ::'+JSON.stringify(objRecords));
             counter=0;
             for(var tempKey in keys)
             {
                 var skey=keys[tempKey];
                 alert('skey ::'+skey);
                 if(counter>0)
                 {
                     csvStringResult+=columnDivider;
                 }
                 // Querying standard related object field
                 /* if(typeof objRecords[i][skey]==='object' ){
                            csvStringResult+='"'+objRecords[i][skey].Name+'"';
                            counter ++;
                        }
                        // Querying custom related object field
                        else if(typeof objRecords[i][skey]==='object'){
                            csvStringResult+='"'+objRecords[i][skey].Status__c+'"';
                            counter ++;
                        }*/
                        // Querying same object field
                        else{
                            alert('objRecords[i][skey] ::'+objRecords[i][skey]);
                            csvStringResult+='"'+objRecords[i][skey]+'"';
                            counter ++;
                        }
                        
                    }
                csvStringResult+=lineDivider;
                alert('csvStringResult1 ::'+csvStringResult);
            }
         
         return csvStringResult
     },
    
})