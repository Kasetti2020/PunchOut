({
    
     doInit: function(component, event, helper) {
         helper.fetchPickValues(component, event, helper);  
    },
       oncountryChange : function(component, event, helper) {
        var selectedsizeval=component.find("ctry").get("v.value");
          // alert('selectedsizeval>>>'+selectedsizeval);
        if(selectedsizeval!='-NONE-' && selectedsizeval!=null && selectedsizeval!=''){
            //  component.set("v.closeflag",true);
            helper.ExistingValues(component, event, helper);   
        }else{
              component.set("v.newfile",false); 
              component.set("v.closeflag",false);  
        }
    },
    handleLookupEvent : function(component, event, helper) 
    {
        // alert('Test1');
        /* var action1 = component.get("c.getcountryoforigin");
        action1.setParams({retailer:component.get("v.retailerID")})
        action1.setCallback(this, function(a) 
                            {
                                component.set("v.cooId", a.getReturnValue());
                            });
        $A.enqueueAction(action1); */
    },
    retailerChangeEvent : function(component, event, helper)
    {
        if(component.get('v.retailerID')==null || component.get('v.retailerID')=='' || component.get('v.retailerID')==undefined )
        {
              component.set("v.newfile",false); 
              component.set("v.closeflag",false);
            component.set("v.countryval",'');
            component.set("v.ctry5", null);
            component.set("v.lang1Flag",false);
            component.set("v.lang2Flag",false);
            component.set("v.lang3Flag",false);
            component.set("v.lang4Flag",false);
            component.set("v.lang5Flag",false);
            component.set("v.ctry1", null);
            component.set("v.ctry2", null);
            component.set("v.ctry3", null);
            component.set("v.ctry4", null);
            component.set("v.ctry5", null);
            component.set("v.lang1newFlag",false);
            component.set("v.lang2newFlag",false);
            component.set("v.lang3newFlag",false);
            component.set("v.lang4newFlag",false);
            component.set("v.lang5newFlag",false);
             component.set("v.ctrynew1", null);
            component.set("v.ctrynew2", null);
            component.set("v.ctrynew3", null);
            component.set("v.ctrynew4", null);
            component.set("v.ctrynew5", null);
            
        }
    },
    handleOnSuccess : function(component, event, helper) {
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": $A.get("$Label.c.success"),
            "message": $A.get("$Label.c.The_record_has_been_updated_successfully")
        });
        toastEvent.fire();
        component.set("v.closeflag", false);
        component.set("v.retailerID",null);
    },
    closeConfigurator : function(component, event, helper) 
    {
        component.set("v.closeflag",false);
    },
    submitSetup : function(component, event, helper) 
    { if(component.get("v.newfile")===true){
            // alert('new');
        if(component.get("v.lang1newFlag")===true && (component.get("v.config.Language1__c")==null || component.get("v.config.Language1__c")=='' || component.get("v.config.Language1__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
         else if(component.get("v.lang2newFlag")===true && (component.get("v.config.Language2__c")==null || component.get("v.config.Language2__c")=='' || component.get("v.config.Language2__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
          else if(component.get("v.lang3newFlag")===true && (component.get("v.config.Language3__c")==null || component.get("v.config.Language3__c")=='' || component.get("v.config.Language3__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
        else if(component.get("v.lang4newFlag")===true && (component.get("v.config.Language4__c")==null || component.get("v.config.Language4__c")=='' || component.get("v.config.Language4__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
        
          else if(component.get("v.lang5newFlag")===true && (component.get("v.config.Language5__c")==null || component.get("v.config.Language5__c")=='' || component.get("v.config.Language5__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
          else
        helper.SavecountryOrigin(component, event, helper);
       
    }else{
       // alert('old');
         if(component.get("v.lang1Flag")===true && (component.get("v.config.Language1__c")==null || component.get("v.config.Language1__c")=='' || component.get("v.config.Language1__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
          else if(component.get("v.lang2Flag")===true && (component.get("v.config.Language2__c")==null || component.get("v.config.Language2__c")=='' || component.get("v.config.Language2__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
        else if(component.get("v.lang3Flag")===true && (component.get("v.config.Language3__c")==null || component.get("v.config.Language3__c")=='' || component.get("v.config.Language3__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields") ,
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
        
          else if(component.get("v.lang4Flag")===true && (component.get("v.config.Language4__c")==null || component.get("v.config.Language4__c")=='' || component.get("v.config.Language4__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
         else if(component.get("v.lang5Flag")===true && (component.get("v.config.Language5__c")==null || component.get("v.config.Language5__c")=='' || component.get("v.config.Language5__c")==undefined)){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Fill_The_All_fields"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'info',
                    mode: 'dismissible'
                });
                toastEvent.fire();
            } 
        else
        helper.SavecountryOrigin(component, event, helper);
    }
    }
})