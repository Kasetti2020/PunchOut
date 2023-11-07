({
    doInit : function(component, event, helper) {
        // helper.fetchPickValues(component, event, helper);
    },
    handleLookupEvent : function(component, event, helper) 
    {
        if(component.get('v.retailerID')!=null && component.get('v.productID')!=null )
        {
            // alert('test1');
            helper.fetchPickValues(component, event, helper);
        }
    },
    checkingExist : function(component, event, helper) 
    {         var instructdetails= component.find("instructid").get("v.value");
    // alert('instructdetails>>'+instructdetails);
     if(component.get('v.retailerID')!=null && component.get('v.productID')!=null && instructdetails!=null && instructdetails!='NONE' )
     {
         // alert('instructdetails>>2');
         helper.ExistingData(component, event, helper);    
         // component.set("v.isEditOpenModal",true);
     }
     else if(instructdetails==='NONE'){
         
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
            //component.set("v.spinner",false);
         
     }
     else{
     }
    },
    closeBrandModel: function(component, event, helper) {
        component.set("v.isEditOpenModal", false);
        component.set("v.Imageid", null);
        //component.set("v.Brandclose", true);
    },
    
    checkingNewcomp:function(component, event, helper) {
        helper.checknewFabricComponent(component, event, helper);        
    },
    selectingval : function(component, event, helper) 
    {
        var inst=component.find("instructid").get("v.value");
        if(inst==='NONE'){
            component.set("v.DataFlag",false); 
            //component.set("v.CareInstructionDetail",'');
        }
        
        else{
            
            //  alert('inst>>>>'+inst);
            if(component.get('v.retailerID')!=null &&  component.find("instructid").get("v.value")!=null )
            {
                helper.retailerlangs(component, event, helper);
                
            }
        }
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.fileName", fileName);
    },
    submitSetup : function(component, event, helper) 
    {
        var careinstruct = component.get("v.CareInstructionDetail");
        //alert('careinstruct'+JSON.stringify(careinstruct));
        var rid=component.get('v.retailerID');
        var Pid=component.get('v.productID');
        var cid=component.find("carecodeid").get("v.value");
        var inst=component.find("instructid").get("v.value");
        if(cid===undefined || cid=='""' || cid===''){
            
             cid=null;
        }
          
        if(rid!=null && Pid!=null  && inst!=null )
        {
            var action = component.get("c.checkduplicatedCareid");
            action.setParams({
                'rid':rid,
                'Pid':Pid,
                'cid':cid,
                'inst':inst
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                var returnval=response.getReturnValue();
                if(returnval!=null){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({

                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Care_code_should_not_allow_Duplicate"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'dismissible'
                    });
                    toastEvent.fire(); 
                    
                }else{
                    var files=component.find("fileId").get("v.files");
                     var filename=component.get('v.fileName');
                    //alert('files>>>>>>>>>>'+files);
                    if(files!=undefined &&  files!=null && files.length!=undefined && filename!=null && filename!='')
                    {
                        if (component.find("fileId").get("v.files").length > 0) {
                            component.set("v.spinner",true);
                            helper.uploadHelper(component, event,helper);
                        } else {
                            alert($A.get('$Label.c.Please_Select_a_Valid_File'));
                        }
                    }else{
                        component.set("v.spinner",true);
                        helper.saveinstruct(component, event, helper);
                    }
                }});
            $A.enqueueAction(action);
        }
        else{
             var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Fill_the_CareInstruction_details"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();  
        }       
    },
    retailerChangeEvent : function(component, event, helper)
    {
        // alert('testopen');
        component.set("v.SetupFlag",false);
        component.set("v.productID", null);
        if(component.get('v.retailerID')==null || component.get('v.retailerID')=='' || component.get('v.retailerID')==undefined )
        {
            component.set("v.lang1Flag",false);
            component.set("v.lang2Flag",false);
            component.set("v.lang3Flag",false);
            component.set("v.lang4Flag",false);
            component.set("v.lang5Flag",false);
            component.set("v.DataFlag",false);
        }else{
            
            component.set("v.CareInstructionDetail",{'sobjectType': 'Care_Instruction_Detail__c'});
            
        }
    },
    cancelmethod : function(component, event, helper) 
    {
        component.set("v.SetupFlag",false);
        component.set("v.fileName", '');
        component.set("v.CareInstructionDetail",{'sobjectType': 'Care_Instruction_Detail__c'});
    },
    checkingcode : function(component, event, helper) 
    {
        var code=component.find("carecodeid").get("v.value");
        if(code=='1' || code=='2' ||  code=='3' || code=='4'||code=='5'|| code=='0' ){
            //  alert('code>>'+code);   
        }else{
            component.set('v.CareInstructionDetail.Carecode__c',''); 
        }
        
    },
    productChangeEvent : function(component, event, helper)
    {
        // alert('test'+component.get('v.productName'));
        if(component.get('v.productName'))
        {
            
            component.set("v.DataFlag",false);
            
        }
    },
    updatingrecord : function(component, event, helper)
    {
         var CareList = component.get("v.CareList");
      //  alert('CareList>>>'+JSON.stringify(CareList));
        var isBlank=false;
         for(var i=0;i<CareList.length;i++){
        
           if((JSON.stringify(CareList[i].Description__c)==null || JSON.stringify(CareList[i].Description__c)=='""' ||JSON.stringify(CareList[i].Description__c)==undefined)){
                        isBlank=true;
               var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_care_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                      // return;
                    }
              
              else if(component.get("v.lang1Flag ")===true && (JSON.stringify(CareList[i].CareInstructLang1__c)==null || JSON.stringify(CareList[i].CareInstructLang1__c)=='""' || JSON.stringify(CareList[i].CareInstructLang1__c)==undefined)){
                         isBlank=true;
                  var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_care_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                 //  return;
                    }
              else if(component.get("v.lang2Flag ")===true && (JSON.stringify(CareList[i].CareInstructLang2__c)==null || JSON.stringify(CareList[i].CareInstructLang2__c)=='""' || JSON.stringify(CareList[i].CareInstructLang2__c)==undefined)){
                         isBlank=true;
                  var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_care_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                 //  return;
                    }
               else if(component.get("v.lang3Flag ")===true && (JSON.stringify(CareList[i].CareInstructLang3__c)==null || JSON.stringify(CareList[i].CareInstructLang3__c)=='""' || JSON.stringify(CareList[i].CareInstructLang3__c)==undefined)){
                          isBlank=true;
                   var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_care_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                   // return;
                    }
               else if(component.get("v.lang4Flag ")===true && (JSON.stringify(CareList[i].CareInstructLang4__c)==null || JSON.stringify(CareList[i].CareInstructLang4__c)=='""' || JSON.stringify(CareList[i].CareInstructLang4__c)==undefined)){
                          isBlank=true;
                   var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_care_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                   // return;
               }
           else if(component.get("v.lang5Flag ")===true && (JSON.stringify(CareList[i].CareInstructLang5__c)==null || JSON.stringify(CareList[i].CareInstructLang5__c)=='""' || JSON.stringify(CareList[i].CareInstructLang5__c)==undefined)){
                          isBlank=true;
               var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_care_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
              // return;
               }
                
         }
         if(isBlank===false)
         {
                helper.updateinstruct(component, event, helper);
         }
    },
    onchangedSelected : function(component, event,helper) { 
        
        var checkimagevalue = component.find("checkimageNames");
        var selectedId=event.getSource().get("v.text");
        component.set("v.Imageid",selectedId);
        var resetCheckboxValue = false;
        if (Array.isArray(checkimagevalue)) {
            checkimagevalue.forEach(function(checkbox) {
                checkbox.set('v.value', resetCheckboxValue);
            });  
        }
        else {
            checkimagevalue.set('v.value', resetCheckboxValue);
        }
        event.getSource().set("v.value",true);
    }, 
    Editimagemodel : function(component, event, helper)
    {
        // alert('inside');
        var imgfield =component.get("v.Imageid");
        if(imgfield!=null){
            component.set("v.isEditImageModal",true);
        }else{
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Select_Image_Edit_Record"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();  
            
        }
    },
     Deleteimagemodel : function(component, event, helper)
    {
       
        var imgfield =component.get("v.Imageid");
       //  alert('imgfield>>>'+imgfield);
        if(imgfield!=null){
          helper.deleteimage(component, event, helper);  
         // helper.updateinstruct2(component, event, helper);
            
        }else{
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Select_Image_Delete_Record"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();  
        }   
    },
     Deleterecord : function(component, event, helper)
    {
        var imgfield =component.get("v.Imageid");
       //  alert('imgfield>>>'+imgfield);
        if(imgfield!=null){
          helper.deleteinstruct(component, event, helper);  
        }else{
            
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Info_Message"),
                message: $A.get("$Label.c.Select_Deleting_Record"),
                duration:'3000',
                key: 'info_alt',
                type: 'info',
                mode: 'dismissible'
            });
            toastEvent.fire();  
        }   
    },
   
    handleFilesChange1: function(component, event, helper) {
        var fileName = 'No File Selected..';
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        component.set("v.ImagefileName", fileName);
    },
    
    submitSetup1 : function(component, event, helper) 
    {   
        var imgfield =component.get("v.Imageid");
        //alert('imgfield>>>>'+imgfield);
        var files=component.find("fileId1").get("v.files");
        if(files!=undefined &&  files!=null && files.length!=undefined )
        {
            if (component.find("fileId1").get("v.files").length > 0) {
                helper.uploadHelper1(component, event,helper);
                helper.updateinstruct1(component, event, helper);
            } else {
                alert($A.get('$Label.c.Please_Select_a_Valid_File'));
            }
        }else{
            alert($A.get('$Label.c.Please_Select_a_Valid_File')); 
        }   
    },
    closeimageModel: function(component, event, helper) {
        component.set("v.isEditImageModal", false);
       // component.set("v.Imageid", null);
        //component.set("v.Brandclose", true);
       component.set("v.ImagefileName", '');
    },
})