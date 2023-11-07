({
    fetchPicklistValues : function(component, event,Excaredetails,controllingFieldAPI, dependingFieldAPI,retailername) {
        var action = component.get("c.Mapvalues");
        action.setParams({
            'retailerNames':component.get('v.retailerName'),
            'objectdata':JSON.stringify(Excaredetails),
            'contrfieldApiName':controllingFieldAPI,
            'depfieldApiName':dependingFieldAPI 
        });
        action.setCallback(this, function(response) {
            if (response.getState() == "SUCCESS") {
                var StoreResponse = response.getReturnValue();
                component.set("v.listDependingValues",StoreResponse);
                component.set("v.bDisabledDependentFld",false);
            }else{
                alert('Something went wrong..');
            }
        });
        $A.enqueueAction(action);
    },
    fetchExistingConfiguration : function(component, event, helper)
    {
        var action = component.get("c.toCheckExistinexcares");
        action.setParams({
            'retailer': component.get('v.retailerName'),
            'Excaredetails' : component.find("selectedid").get("v.value")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
           // alert('state'+state);
            var configRecord=response.getReturnValue();
           // alert('configRecord>>'+configRecord);
            if (state === "SUCCESS" && configRecord!=null) 
            {
                //alert('test'+state);
                if(configRecord!=null){
                    component.set("v.oldflag",true);
                     component.set("v.newflag",false);
                    component.set("v.updateflag",true);
                    //component.set('v.ExCareInstructionDetail',configRecord);
                     component.set('v.ExCareInstructionDetail.Description__c',component.find("selectedid").get("v.value"));
                    if(configRecord.Retailer__r.Lang_1__c!=null){
                        component.set("v.lang1Flag",true);
                        component.set("v.lang1",configRecord.Retailer__r.Lang_1__r.Name);
                        component.set("v.ExCareInstructionDetail.Language_1__c", configRecord.Language_1__c);
                    }
                    if(configRecord.Retailer__r.Lang_2__c!=null){
                        component.set("v.lang2Flag",true);
                        component.set("v.lang2",configRecord.Retailer__r.Lang_2__r.Name);
                        component.set("v.ExCareInstructionDetail.Language_2__c", configRecord.Language_2__c);
                    }
                    if(configRecord.Retailer__r.Lang_3__c!=null){
                        component.set("v.lang3Flag",true);
                        component.set("v.lang3",configRecord.Retailer__r.Lang_3__r.Name);
                        component.set("v.ExCareInstructionDetail.Language_3__c", configRecord.Language_3__c);
                    }
                    if(configRecord.Retailer__r.Lang_4__c!=null){
                        component.set("v.lang4Flag",true);
                        component.set("v.lang4",configRecord.Retailer__r.Lang_4__r.Name);
                        component.set("v.ExCareInstructionDetail.Language_4__c", configRecord.Language_4__c);
                    }
                    if(configRecord.Retailer__r.Lang_5__c!=null){
                        component.set("v.lang5Flag",true);
                        component.set("v.lang5",configRecord.Retailer__r.Lang_5__r.Name);
                        component.set("v.ExCareInstructionDetail.Language_5__c", configRecord.Language_5__c);
                    }
                    if(configRecord.Retailer__r.Lang_1__c==null && configRecord.Retailer__r.Lang_2__c==null && configRecord.Retailer__r.Lang_3__c==null && configRecord.Retailer__r.Lang_4__c==null && configRecord.Retailer__r.Lang_5__c==null){
                        
                       component.set("v.updateflag",false);  
                        component.set("v.oldflag",false);
                         component.set("v.newflag",false);
                    }
                    
                }
                else{
                    alert('finish');
                }
                
            }
            else if(state==="ERROR" && configRecord==null ){
               // alert('comminginside');
                this.retailervalues(component, event); 
                
            }
                
        });
        $A.enqueueAction(action);
    },
    retailervalues : function(component, event)
    {
      //alert('testing'+component.get('v.retailerName'));
        var retailer=component.get('v.retailerName');
        var action = component.get("c.tonewcares");
        action.setParams({
            'retailerNames':retailer
        });
       
        action.setCallback(this, function(response) {
             var result = response.getReturnValue();
         // alert('result>>'+result);
            if (response.getState() == "SUCCESS" && result!=null) {
                if(result!=null){
                     component.set("v.oldflag",false);
                     component.set("v.newflag",true);
                     component.set("v.insertflag",true);
                    if(result.Lang_1__c!=null){
                        component.set("v.lang1newFlag",true);
                        component.set("v.langnew1", result.Lang_1__r.Name);  
                          component.set("v.ExCareInstructionDetail.Language_1__c", '');
                    }
                    if(result.Lang_2__c!=null){
                        component.set("v.lang2newFlag",true);
                        component.set("v.langnew2", result.Lang_2__r.Name);  
                         component.set("v.ExCareInstructionDetail.Language_2__c", '');
                    }
                    if(result.Lang_3__c!=null){
                        component.set("v.lang3newFlag",true);
                        component.set("v.langnew3", result.Lang_3__r.Name);  
                         component.set("v.ExCareInstructionDetail.Language_3__c", '');
                    }
                    if(result.Lang_4__c!=null){
                        component.set("v.lang4newFlag",true);
                        component.set("v.langnew4", result.Lang_4__r.Name);  
                         component.set("v.ExCareInstructionDetail.Language_4__c", '');
                    }
                    if(result.Lang_5__c!=null){
                        component.set("v.lang5newFlag",true);
                        component.set("v.langnew5", result.Lang_5__r.Name);  
                         component.set("v.ExCareInstructionDetail.Language_5__c", '');
                    } 
                    if(result.Lang_1__c==null && result.Lang_2__c==null && result.Lang_3__c==null && result.Lang_4__c==null && result.Lang_5__c==null){
                        
                         component.set("v.insertflag",false);
                         component.set("v.oldflag",false);
                         component.set("v.newflag",false);
                    }
                }
            }
            
            else{
                alert('Something went wrong..');
            }
        });
        $A.enqueueAction(action);
        
    },
    saveTheConfigurations : function(component, event, helper)
    {
        var Exconfig = component.get("v.ExCareInstructionDetail");
        Exconfig.Name=component.get("v.retailerName");
        Exconfig.Retailer__c=component.get("v.retailerID");
        Exconfig.Retailer_Code__c=component.get("v.retailerName");
        Exconfig.Description__c=component.find("selectedid").get("v.value");
       /* alert('Exconfig1'+Exconfig.Language_1__c);
         alert('Exconfig2'+Exconfig.Language_2__c);
         alert('Exconfig3'+Exconfig.Language_3__c);
         alert('Exconfig4'+Exconfig.Language_4__c);
         alert('Exconfig5'+Exconfig.Language_5__c);*/
        var lang1=component.get("v.lang1Flag ");
        var lang2=component.get("v.lang2Flag ");
        var lang3=component.get("v.lang3Flag ");
        var lang4=component.get("v.lang4Flag ");
        var lang5=component.get("v.lang5Flag ");
        var flag1;
         if((lang1===true && Exconfig.Language_1__c!="" || Exconfig.Language_1__c!=undefined) || (lang2===true && Exconfig.Language_2__c!="" && Exconfig.Language_2__c!=undefined) || (lang3===true && Exconfig.Language_3__c!="" && Exconfig.Language_3__c!=undefined) || (lang4===true && Exconfig.Language_4__c!="" && Exconfig.Language_4__c!=undefined) || (lang5===true && Exconfig.Language_5__c!="" && Exconfig.Language_5__c!=undefined))
         {
          flag1=true; 
             
         }else{
             
              var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                    mode: 'sticky',
                    message: $A.get("$Label.c.Enter_the_Excare_Instructions"),
                    messageTemplate: ''
                  });
                   toastEvent.fire();
             
         }
        if(flag1===true)
        {
        
        var action = component.get("c.saveExcareconfig");
        action.setParams({
            'ExconfigData':Exconfig
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert("state: " + response.getState());
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"success",
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.The_record_has_been_updated_successfully")
                });
                 component.set("v.newflag",false);
                  component.set("v.oldflag",false);
                 component.set("v.ExCareInstructionDetail",{'sobjectType' : 'Excare__c'});
                 toastEvent.fire();
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Error_Occured")
                });
                toastEvent.fire();
            }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);
       }
    },
     saveThenewConfigurations : function(component, event, helper)
    {
        var Exconfig = component.get("v.ExCarenewInstructionDetail");
        Exconfig.Name=component.get("v.retailerName");
        Exconfig.Retailer__c=component.get("v.retailerID");
        Exconfig.Retailer_Code__c=component.get("v.retailerName");
        Exconfig.Description__c=component.find("selectedid").get("v.value");
        var flag ;
        /* alert('Exconfig1'+JSON.stringify(Exconfig.Language_1__c));
         alert('Exconfig2'+Exconfig.Language_2__c);
         alert('Exconfig3'+Exconfig.Language_3__c);
         alert('Exconfig4'+Exconfig.Language_4__c);
        alert('lang1'+component.get("v.lang1newFlag "));
        alert('lang2'+component.get("v.lang2newFlag "));
        alert('lang3'+component.get("v.lang3newFlag "));
        alert('lang4'+component.get("v.lang4newFlag "));*/
        var lang1=component.get("v.lang1newFlag ");
        var lang2=component.get("v.lang2newFlag ");
        var lang3=component.get("v.lang3newFlag ");
        var lang4=component.get("v.lang4newFlag ");
        var lang5=component.get("v.lang5newFlag ");
        if((lang1===true && Exconfig.Language_1__c!="") || (lang2===true && Exconfig.Language_2__c!="") || (lang3===true && Exconfig.Language_3__c!="") || (lang4===true && Exconfig.Language_4__c!="") || (lang5===true && Exconfig.Language_5__c!=""))
        {
           flag=true; 
        }else{
            var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                    mode: 'sticky',
                    message: $A.get("$Label.c.Enter_the_Excare_Instructions"),
                    messageTemplate: ''
                  });
                   toastEvent.fire();
        }
        if(flag===true){
       // alert('Exconfig'+Exconfig.Language_1__c);
        var action = component.get("c.saveExcareconfig");
        action.setParams({
            'ExconfigData':Exconfig
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert("state: " + response.getState());
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"success",
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                });
                 component.set("v.newflag",false);
                  component.set("v.oldflag",false);
                 component.set("v.ExCarenewInstructionDetail",{'sobjectType' : 'Excare__c'});
                 toastEvent.fire();
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Error_Occured")
                });
                toastEvent.fire();
            }
            var spinner = component.find('spinner');
            $A.util.addClass(spinner, 'slds-hide');
        });
        $A.enqueueAction(action);
        }     
    }
})