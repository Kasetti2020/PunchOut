({
     /* Phase 2.1 Changes start*/
    createObjectData: function(component, event) {
        var RowItemList = component.get("v.sizechartList");
        RowItemList.push({
            'sobjectType': 'Size_Chart__c',
            'EngSize1__c': '',
            'Size1__c': '',
            'Size1a__c': '',
            'size1b__c': '',
            'Size1c__c': '',
            'Size1d__c': '',
        }); 
        component.set("v.sizechartList", RowItemList);
    },
    validationForSave:function(component, event, helper)
    {
        var sizeSetup = component.get("v.sizechartList");
        var languagesizeEng=component.get("v.langnew1Flag");
        var languagesize1 = component.get("v.langnew1Flag");
        var languagesize2 = component.get("v.langnew2Flag");
        var languagesize3 = component.get("v.langnew3Flag");
        var languagesize4 = component.get("v.langnew4Flag");
        var languagesize5 = component.get("v.langnew5Flag");
        this.retailervalues(component, event, helper);
        for(var i=0; i<sizeSetup.length;i++)
        {
            if(languagesizeEng==true && !sizeSetup[i].EngSize1__c){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Please_enter_value_for_English_language"),
                    type: "warning"
                });
                toastEvent.fire();
                return false;
            }
             if(languagesize1==true && !sizeSetup[i].Size1__c){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.langnew1")+$A.get("$Label.c.Language"),
                    type: "warning"
                });
                toastEvent.fire();
                return false;
            }
                if(languagesize2==true && !sizeSetup[i].Size1a__c){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.langnew2")+$A.get("$Label.c.Language"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return false;
                }
               if(languagesize3==true && !sizeSetup[i].size1b__c){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.langnew3")+$A.get("$Label.c.Language"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return false;
                }
                 if(languagesize4==true && !sizeSetup[i].Size1c__c){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                                title: $A.get("$Label.c.Warning"),
                                message:$A.get("$Label.c.Please_enter_value_for")+component.get("v.langnew4")+$A.get("$Label.c.Language"),
                                type: "warning"
                            });
                            toastEvent.fire();
                            return false;
                        }
                            if(languagesize5==true && !sizeSetup[i].Size1d__c){
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title: $A.get("$Label.c.Warning"),
                                    message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.langnew5")+$A.get("$Label.c.Language"),
                                    type: "warning"
                                });
                                toastEvent.fire();
                                return false;
                            }
        }
        return true;
        
    },
 fetchExistingConfiguration : function(component, event, helper,retailerid)
    {
        //alert('fetchExistingConfiguration');
        var action1 = component.get("c.getSizeChart");
        action1.setParams({retailer:component.get("v.retailerID"),
                           productids:component.get("v.productID")
                          })
        action1.setCallback(this, function(a){
            var result = a.getReturnValue();
            //alert('result>>>>>'+JSON.stringify(a.getReturnValue()));
            if(result.length>0){
               
                component.set("v.sizechartList", result);
                component.set("v.check", false); 
                
            }else{
                component.set("v.check", true);
            }
        });
        $A.enqueueAction(action1); 
    },
    retailervalues : function(component, event, helper,retailerid)
    { 
        var action = component.get("c.retailervals");
        action.setParams({retailer:retailerid})
        action.setCallback(this, function(a){
            var result = a.getReturnValue();
            if(result!=null){
                component.set("v.formflag",false);
                component.set("v.newFlag",true); 
                if(result.Lang_1__c!=null){
                    // alert(' new lang 1'+result.Lang_1__r.Name);
                    component.set("v.langnew1Flag",true);
                    component.set("v.langnew1", result.Lang_1__r.Name);  
                }
                if(result.Lang_2__c!=null){
                    // alert(' new lang 2'+result.Lang_2__r.Name);
                    component.set("v.langnew2Flag",true);
                    component.set("v.langnew2", result.Lang_2__r.Name);  
                }
                if(result.Lang_3__c!=null){
                    // alert(' new lang 3'+result.Lang_3__r.Name);
                    component.set("v.langnew3Flag",true);
                    component.set("v.langnew3", result.Lang_3__r.Name);  
                }
                if(result.Lang_4__c!=null){
                    // alert(' new lang 4'+result.Lang_4__r.Name);
                    component.set("v.langnew4Flag",true);
                    component.set("v.langnew4", result.Lang_4__r.Name);  
                }
                if(result.Lang_5__c!=null){
                    //alert(' new lang 5'+result.Lang_5__r.Name);
                    component.set("v.langnew5Flag",true);
                    component.set("v.langnew5", result.Lang_5__r.Name);  
                }
                this.fetchExistingConfiguration(component, event, helper);
                 
            }
            
        });
        $A.enqueueAction(action); 
    },
    saveTheSizeSetup : function(component, event, helper)
    {
        var sizeSetup = component.get("v.sizechartList");
        //alert('sizeSetup>>>'+ JSON.stringify(sizeSetup));      
        for (var i = 0; i < sizeSetup.length; i++) {
            sizeSetup[i].Name=component.get("v.retailerName")+'_'+sizeSetup[i].EngSize1__c ;
            sizeSetup[i].Retailer__c=component.get("v.retailerID");
            sizeSetup[i].Product__c=component.get("v.productID");      
        }
        component.set("v.sizechartList", sizeSetup);
        //alert('NEW>>'+JSON.stringify(component.get("v.sizechartList")));
        var action = component.get("c.saveSizeSetup");
        //alert(JSON.stringify(component.get("c.saveSizeSetup")));
        action.setParams({
            'sizeData':component.get("v.sizechartList")
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
                component.set('v.sizechartList',{'sobjectType': 'Size_Chart__c'});
                component.set("v.newFlag",false); 
                component.set("v.formflag",false); 
                //component.set("v.retailerID",null); 
                component.set("v.productID",null);
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
        //  }
    },
     /* Phase 2.1 Changes End*/
    validateContactForm: function(component) {
        var validContact = true;
        // Show error messages if required fields are blank
        var allValid = component.find('contactField').reduce(function (validFields, inputCmp) {
            inputCmp.showHelpMessageIfInvalid();
            return validFields && inputCmp.get('v.validity').valid;
        }, true);
        
        if (allValid) {
            // Verify we have an account to attach it to
            var account = component.get("v.retailerID");
            if($A.util.isEmpty(account)) {
                validContact = false;
                console.log("Quick action context doesn't have a valid account.");
            }
            return(validContact);
        }  
        
    }       
})