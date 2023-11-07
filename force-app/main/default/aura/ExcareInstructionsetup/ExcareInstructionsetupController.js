({
	handleLookupEvent : function(component, event, helper) {
         var retailername=component.get('v.retailerName');
		 var controllingFieldAPI = component.get("v.controllingFieldAPI");
         var dependingFieldAPI = component.get("v.dependingFieldAPI");
         var Excaredetails = component.get("v.ExCareInstructionDetail");
        helper.fetchPicklistValues(component,Excaredetails,controllingFieldAPI, dependingFieldAPI,retailername);
	},
      retailerChangeEvent : function(component, event, helper)
    {
        if(component.get('v.retailerName'))
        {
              component.set("v.bDisabledDependentFld",true);
              component.set("v.listDependingValues",null);
              component.set("v.ExCareInstructionDetail",{'sobjectType' : 'Excare__c'});
              component.set("v.ExCarenewInstructionDetail",{'sobjectType' : 'Excare__c'});
              component.set("v.oldflag",false);
              component.set("v.newflag",false);
        }
    },
     selectInstruction : function(component, event, helper)
    {
        //alert('selectInstruction called');
       var  selectedid=component.find("selectedid").get("v.value");
        var retailerName=component.get('v.retailerName');
        //alert('selectedid'+selectedid);
      //  alert('retailerName'+retailerName);
        if(selectedid!=null && retailerName !=null && selectedid!='--NONE--')
        {
             var rtailerids =component.get('v.retailerName');
            // alert('rtailerids>>'+rtailerids);
             var excareinstructions =component.find("selectedid").get("v.value");
            // alert('rtailerids>>'+excareinstructions);
          //  if(excareinstructions==='--NONE--'){
              //component.set("v.newflag",false);
              //component.set("v.oldflag",true);
            //}
             helper.fetchExistingConfiguration(component, event, helper);
        }else{
             component.set("v.oldflag",false);
             component.set("v.newflag",false);
        }
    },
     submitConfigurations : function(component, event, helper) {
         
         var excareinstruct = component.find("selectedid").get("v.value");
          if(excareinstruct=="--NONE--"){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Please_Select_a_ExcareName"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();
          }else{
              
               if(component.get("v.lang1Flag ")===true && (component.get("v.ExCareInstructionDetail.Language_1__c")==null || component.get("v.ExCareInstructionDetail.Language_1__c")=="" || component.get("v.ExCareInstructionDetail.Language_1__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
              
              else if(component.get("v.lang2Flag ")===true && (component.get("v.ExCareInstructionDetail.Language_2__c")==null || component.get("v.ExCareInstructionDetail.Language_2__c")=="" || component.get("v.ExCareInstructionDetail.Language_2__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
              else if(component.get("v.lang3Flag ")===true && (component.get("v.ExCareInstructionDetail.Language_3__c")==null || component.get("v.ExCareInstructionDetail.Language_3__c")=="" || component.get("v.ExCareInstructionDetail.Language_3__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
               else if(component.get("v.lang4Flag ")===true && (component.get("v.ExCareInstructionDetail.Language_4__c")==null || component.get("v.ExCareInstructionDetail.Language_4__c")=="" || component.get("v.ExCareInstructionDetail.Language_4__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
               else if(component.get("v.lang5Flag ")===true && (component.get("v.ExCareInstructionDetail.Language_5__c")==null || component.get("v.ExCareInstructionDetail.Language_5__c")=="" || component.get("v.ExCareInstructionDetail.Language_5__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
               }
                   else
                     helper.saveTheConfigurations(component, event, helper);
          
          }
       
	},
    submitnewConfigurations : function(component, event, helper) {
        // alert('Test');
         var excareinstruct = component.find("selectedid").get("v.value");
          if(excareinstruct=="--NONE--"){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Please_Select_a_ExcareName"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();
          }else{
              
               if(component.get("v.lang1newFlag ")===true && (component.get("v.ExCarenewInstructionDetail.Language_1__c")==null || component.get("v.ExCarenewInstructionDetail.Language_1__c")=="" || component.get("v.ExCarenewInstructionDetail.Language_1__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
              
              else if(component.get("v.lang2newFlag ")===true && (component.get("v.ExCarenewInstructionDetail.Language_2__c")==null || component.get("v.ExCarenewInstructionDetail.Language_2__c")=="" || component.get("v.ExCarenewInstructionDetail.Language_2__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
              else if(component.get("v.lang3newFlag ")===true && (component.get("v.ExCarenewInstructionDetail.Language_3__c")==null || component.get("v.ExCarenewInstructionDetail.Language_3__c")=="" || component.get("v.ExCarenewInstructionDetail.Language_3__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
               else if(component.get("v.lang4newFlag ")===true && (component.get("v.ExCarenewInstructionDetail.Language_4__c")==null || component.get("v.ExCarenewInstructionDetail.Language_4__c")=="" || component.get("v.ExCarenewInstructionDetail.Language_4__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
               else if(component.get("v.lang5newFlag ")===true && (component.get("v.ExCarenewInstructionDetail.Language_5__c")==null || component.get("v.ExCarenewInstructionDetail.Language_5__c")=="" || component.get("v.ExCarenewInstructionDetail.Language_5__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_Enter_the_Excare_Instruction_details"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
               }
                   else
                     helper.saveThenewConfigurations(component, event, helper);
          
          }
       
	},
})