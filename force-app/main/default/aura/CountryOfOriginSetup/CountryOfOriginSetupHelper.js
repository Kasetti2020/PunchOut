({
    fetchPickValues : function(component, event, helper) {
        
        var action = component.get("c.getcountryvalues");
        action.setCallback(this, function(a) {
            // alert('a.getReturnValue()'+a.getReturnValue());
            component.set("v.countries", a.getReturnValue());
            
        });
        $A.enqueueAction(action); 
    },
    ExistingValues : function(component, event, helper) {
        var retailerid =component.get("v.retailerID");
        var country  =component.find("ctry").get("v.value");
        var action = component.get("c.getcountrys");
        action.setParams({retailer:retailerid,
                          countryvals:country})
        action.setCallback(this, function(a){
            var result = a.getReturnValue();
            //component.set("v.config",result);
            component.set("v.newfile",false);   
            component.set("v.closeflag",true);
            //component.set("v.lang1Flag",true);
            //alert('country>>>'+country);
            var engdata='Made in ' + country;
            component.set("v.config.EnglishLanguage__c",engdata);
            ///  alert('testing'+component.get("v.config.EnglishLanguage__c"));
            if(result!=null){
                component.set("v.config",result);
                component.set("v.config.EnglishLanguage__c",engdata);
                //  alert('ids'+result.Id);
                component.set("v.cooId", result.Id);
                if(result.Retailer_Code__r.Lang_1__c!=null){
                    component.set("v.lang1Flag",true);
                    component.set("v.ctry1", result.Retailer_Code__r.Lang_1__r.Name);
                    // var l1=result.Language1__c;
                    //alert('l1>>'+l1);
                }
                if(result.Retailer_Code__r.Lang_2__c!=null){
                    component.set("v.lang2Flag",true);
                    component.set("v.ctry2", result.Retailer_Code__r.Lang_2__r.Name);
                }
                if(result.Retailer_Code__r.Lang_3__c!=null){
                    component.set("v.lang3Flag",true);
                    component.set("v.ctry3", result.Retailer_Code__r.Lang_3__r.Name);
                }
                if(result.Retailer_Code__r.Lang_4__c!=null){
                    component.set("v.lang4Flag",true);
                    component.set("v.ctry4", result.Retailer_Code__r.Lang_4__r.Name);
                }
                if(result.Retailer_Code__r.Lang_5__c!=null){
                    component.set("v.lang5Flag",true);
                    component.set("v.ctry5", result.Retailer_Code__r.Lang_5__r.Name);
                }
            }
            else{
                
                component.set("v.newfile",true);   
                component.set("v.closeflag",false);
                component.set("v.lang1newFlag",false);
                component.set("v.config", { 'sobjectType': 'Country_Of_Origin__c'});
                
                this.retailervalues(component, event, helper,retailerid);
            }
        });
        $A.enqueueAction(action);  
    },
    retailervalues : function(component, event, helper,retailerid)
    { 
        
        var action = component.get("c.retailervals");
        action.setParams({retailer:retailerid })
        action.setCallback(this, function(a){
            var result = a.getReturnValue();
            var country  =component.find("ctry").get("v.value");
            var engdata='Made in ' + country;
            component.set("v.config.EnglishLanguage__c",engdata);
            // alert('result'+JSON.stringify(result));
            if(result!=null){
                component.set("v.closeflag",false);
                if(result.Lang_1__c!=null){
                    component.set("v.lang1newFlag",true);
                    component.set("v.ctrynew1", result.Lang_1__r.Name);  
                }
                if(result.Lang_2__c!=null){
                    component.set("v.lang2newFlag",true);
                    component.set("v.ctrynew2", result.Lang_2__r.Name);  
                }
                if(result.Lang_3__c!=null){
                    component.set("v.lang3newFlag",true);
                    component.set("v.ctrynew3", result.Lang_3__r.Name);  
                }
                if(result.Lang_4__c!=null){
                    component.set("v.lang4newFlag",true);
                    component.set("v.ctrynew4", result.Lang_4__r.Name);  
                }
                if(result.Lang_5__c!=null){
                    component.set("v.lang5newFlag",true);
                    component.set("v.ctrynew5", result.Lang_5__r.Name);  
                }      
            }
        });
        $A.enqueueAction(action); 
    },
    SavecountryOrigin : function(component, event, helper)
    { 
        var Countrysetup = component.get("v.config");
        if((Countrysetup.Language1__c===undefined | Countrysetup.Language1__c==='') && (Countrysetup.Language2__c===undefined | Countrysetup.Language2__c==='') && (Countrysetup.Language3__c===undefined | Countrysetup.Language3__c==='') && (Countrysetup.Language4__c===undefined | Countrysetup.Language4__c==='') && (Countrysetup.Language5__c===undefined | Countrysetup.Language5__c==='') && (Countrysetup.EnglishLanguage__c===undefined | Countrysetup.EnglishLanguage__c===''))
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                mode: 'sticky',
                message: $A.get("$Label.c.Fill_the_country_of_origin_details"),
                messageTemplate: ''
            });
            toastEvent.fire();
        }else{
            component.set("v.spinner",true);  
            //  alert('Countrysetup>>'+JSON.stringify(Countrysetup));
            Countrysetup.Country__c=component.find("ctry").get("v.value");
            //alert('Countrysetup>>>'+JSON.stringify(Countrysetup));
            //Countrysetup.Country__c=component.find("countryid").get("v.value")
            Countrysetup.Retailer_Code__c=component.get("v.retailerID");
            Countrysetup.Name=component.get("v.retailerName")+'_'+Countrysetup.Country__c ;
            var action = component.get("c.savecountryoforigin");
            action.setParams({
                'countryorigin':Countrysetup
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") 
                {
                    var toastEvent = $A.get("e.force:showToast");
                    //$A.get('e.force:refreshView').fire();
                    toastEvent.setParams({
                        "type":"success",
                        "title": $A.get("$Label.c.success"),
                        "message": $A.get("$Label.c.The_record_has_been_saved_successfully")
                    });
                    // component.set("v.SetupFlag",false);
                    component.set("v.newfile",false); 
                    component.set("v.closeflag",false);
                    component.set("v.retailerID",null);
                    component.set("v.retailerName",null);
                    // component.set("v.countryval",'--None--');
                    component.set("v.config", { 'sobjectType': 'Country_Of_Origin__c'});
                    toastEvent.fire();
                     component.set("v.spinner",false);
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