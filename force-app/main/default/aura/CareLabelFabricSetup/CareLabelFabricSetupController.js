({
    doInit : function(component, event, helper)
    {
        helper.fetchPickValues(component, event, helper);
    },
    handleLookupEvent : function(component, event, helper) 
    {
        if(component.get('v.retailerID')!=null)
        {
            component.set("v.FabricSetup.Retailer_Code__c",component.get('v.retailerID'));
            helper.fetchExistingConfiguration(component, event, helper);
            
        }
    },
    retailerChangeEvent : function(component, event, helper)
    {
      
        if(component.get('v.retailerID')=='' || component.get('v.retailerID')==undefined || component.get('v.retailerID')==null){
            var fabricObject = component.get("v.FabricSetup");
            
            fabricObject.Component_Lang_1__c = '';
            fabricObject.Component_Lang_2__c = '';
            fabricObject.Component_Lang_3__c = '';
            fabricObject.Component_Lang_4__c = '';
            fabricObject.Component_Lang_5__c = '';
            
            fabricObject.Material_Lang_1__c = '';
            fabricObject.Material_Lang_2__c = '';
            fabricObject.Material_Lang_3__c = '';
            fabricObject.Material_Lang_4__c = '';
            fabricObject.Material_Lang_5__c = '';
            
            component.set("v.FabricSetup",fabricObject);
        }
        if(component.get('v.retailerName'))
        {
            component.set("v.SetupFlag",false);
            component.set("v.fabType",'--None--');
            component.set("v.FabricSetup.Component_Name__c",'--NONE--');
            component.set("v.FabricSetup.Material__c",'--NONE--');
            component.set("v.FabricSetup.Component_Lang_1__c",'');
            component.set("v.FabricSetup.Component_Lang_2__c",'');
            component.set("v.FabricSetup.Component_Lang_3__c",'');
            component.set("v.FabricSetup.Component_Lang_4__c",'');
            component.set("v.FabricSetup.Component_Lang_5__c",'');
            
        }
    },
    closeConfigurator : function(component, event, helper) 
    {
        component.set("v.SetupFlag",false);
    },
    submitSetup : function(component, event, helper) 
    {
        var pickValue = component.find("selectedType").get("v.value");
        
        if(component.get('v.retailerID')=='' || component.get('v.retailerID')==undefined || component.get('v.retailerID')==null){
            var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title : $A.get("$Label.c.Info_Message"),
                    message: $A.get("$Label.c.Please_Select_a_Retailer"),
                    duration:'3000',
                    key: 'info_alt',
                    type: 'error',
                    mode: 'dismissible'
                });
                toastEvent.fire();
        }
        else{
            if(pickValue=='Component Name'){
                var componentName = component.find("selectedComp").get("v.value");
                if(componentName=="--NONE--"){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Please_Select_a_Component_Name"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();
                }
                else{
                    if(component.get("v.retailerLang.Lang_1__c")!=null && (component.get("v.FabricSetup.Component_Lang_1__c")==null || component.get("v.FabricSetup.Component_Lang_1__c")=='' || component.get("v.FabricSetup.Component_Lang_1__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_1__r.Name"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
                    else if(component.get("v.retailerLang.Lang_2__c")!=null && (component.get("v.FabricSetup.Component_Lang_2__c")==null || component.get("v.FabricSetup.Component_Lang_2__c")=='' || component.get("v.FabricSetup.Component_Lang_2__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_2__r.Name"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
                        else if(component.get("v.retailerLang.Lang_3__c")!=null && (component.get("v.FabricSetup.Component_Lang_3__c")==null || component.get("v.FabricSetup.Component_Lang_3__c")=='' || component.get("v.FabricSetup.Component_Lang_3__c")==undefined)){
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title : $A.get("$Label.c.Info_Message"),
                                message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_3__r.Name"),
                                duration:'3000',
                                key: 'info_alt',
                                type: 'info',
                                mode: 'dismissible'
                            });
                            toastEvent.fire();
                        }
                            else if(component.get("v.retailerLang.Lang_4__c")!=null && (component.get("v.FabricSetup.Component_Lang_4__c")==null || component.get("v.FabricSetup.Component_Lang_4__c")=='' || component.get("v.FabricSetup.Component_Lang_4__c")==undefined)){
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title : $A.get("$Label.c.Info_Message"),
                                    message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_4__r.Name"),
                                    duration:'3000',
                                    key: 'info_alt',
                                    type: 'info',
                                    mode: 'dismissible'
                                });
                                toastEvent.fire();
                            }
                                else if(component.get("v.retailerLang.Lang_5__c")!=null && (component.get("v.FabricSetup.Component_Lang_5__c")==null || component.get("v.FabricSetup.Component_Lang_5__c")=='' || component.get("v.FabricSetup.Component_Lang_5__c")==undefined)){
                                    var toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        title : $A.get("$Label.c.Info_Message"),
                                        message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_5__r.Name"),
                                        duration:'3000',
                                        key: 'info_alt',
                                        type: 'info',
                                        mode: 'dismissible'
                                    });
                                    toastEvent.fire();
                                }
                                    else
                                        helper.saveFabricComponent(component, event, helper);
                }
            }
            if(pickValue=='Material Name'){
                var material = component.find("Materialid").get("v.value");
                if(material=="--NONE--"){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Info_Message"),
                        message: $A.get("$Label.c.Please_Select_a_Material_Name"),
                        duration:'3000',
                        key: 'info_alt',
                        type: 'error',
                        mode: 'dismissible'
                    });
                    toastEvent.fire();
                }
                else{
                    if(component.get("v.retailerLang.Lang_1__c")!=null && (component.get("v.FabricSetup.Material_Lang_1__c")==null || component.get("v.FabricSetup.Material_Lang_1__c")=='' || component.get("v.FabricSetup.Material_Lang_1__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_1__r.Name"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
                    else if(component.get("v.retailerLang.Lang_2__c")!=null && (component.get("v.FabricSetup.Material_Lang_2__c")==null || component.get("v.FabricSetup.Material_Lang_2__c")=='' || component.get("v.FabricSetup.Material_Lang_2__c")==undefined)){
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title : $A.get("$Label.c.Info_Message"),
                            message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_2__r.Name"),
                            duration:'3000',
                            key: 'info_alt',
                            type: 'info',
                            mode: 'dismissible'
                        });
                        toastEvent.fire();
                    }
                        else if(component.get("v.retailerLang.Lang_3__c")!=null && (component.get("v.FabricSetup.Material_Lang_3__c")==null || component.get("v.FabricSetup.Material_Lang_3__c")=='' || component.get("v.FabricSetup.Material_Lang_3__c")==undefined)){
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title : $A.get("$Label.c.Info_Message"),
                                message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_3__r.Name"),
                                duration:'3000',
                                key: 'info_alt',
                                type: 'info',
                                mode: 'dismissible'
                            });
                            toastEvent.fire();
                        }
                            else if(component.get("v.retailerLang.Lang_4__c")!=null && (component.get("v.FabricSetup.Material_Lang_4__c")==null || component.get("v.FabricSetup.Material_Lang_4__c")=='' || component.get("v.FabricSetup.Material_Lang_4__c")==undefined)){
                                var toastEvent = $A.get("e.force:showToast");
                                toastEvent.setParams({
                                    title : $A.get("$Label.c.Info_Message"),
                                    message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_4__r.Name"),
                                    duration:'3000',
                                    key: 'info_alt',
                                    type: 'info',
                                    mode: 'dismissible'
                                });
                                toastEvent.fire();
                            }
                                else if(component.get("v.retailerLang.Lang_5__c")!=null && (component.get("v.FabricSetup.Material_Lang_5__c")==null || component.get("v.FabricSetup.Material_Lang_5__c")=='' || component.get("v.FabricSetup.Material_Lang_5__c")==undefined)){
                                    var toastEvent = $A.get("e.force:showToast");
                                    toastEvent.setParams({
                                        title : $A.get("$Label.c.Info_Message"),
                                        message: $A.get("$Label.c.Please_enter_value_for")+component.get("v.retailerLang.Lang_5__r.Name"),
                                        duration:'3000',
                                        key: 'info_alt',
                                        type: 'info',
                                        mode: 'dismissible'
                                    });
                                    toastEvent.fire();
                                }
                                    else
                                        helper.saveFabricComponent(component, event, helper);
                }
            }
        }
    },
    checkingNewcomp:function(component, event, helper) {
        helper.checknewFabricComponent(component, event, helper);        
    },
    
    onTypeChange:function(component, event, helper) {
        var pickValue = component.find("selectedType").get("v.value");
        if(pickValue=='--NONE--'){
            component.set("v.SetupFlag",false);
            component.set("v.CompTypeFlag",false);
            component.set("v.MatTypeFlag",false);
            component.set("v.FabricSetup.Component_Name__c",'--NONE--');
            component.set("v.FabricSetup.Material__c",'--NONE--');
            
            component.set('v.FabricSetup',{'sobjectType': 'Fabric_Component__c'});
            var fabricObject = component.get("v.FabricSetup");
            
            fabricObject.Component_Lang_1__c = '';
            fabricObject.Component_Lang_2__c = '';
            fabricObject.Component_Lang_3__c = '';
            fabricObject.Component_Lang_4__c = '';
            fabricObject.Component_Lang_5__c = '';
            
            fabricObject.Material_Lang_1__c = '';
            fabricObject.Material_Lang_2__c = '';
            fabricObject.Material_Lang_3__c = '';
            fabricObject.Material_Lang_4__c = '';
            fabricObject.Material_Lang_5__c = '';
            
            component.set("v.FabricSetup",fabricObject);
            
        }
        if(pickValue=='Component Name'){
            if(component.get('v.retailerName'))
                component.set("v.SetupFlag",true);
            component.set("v.CompTypeFlag",true);
            component.set("v.MatTypeFlag",false);
        }
        if(pickValue=='Material Name'){
            if(component.get('v.retailerName'))
                component.set("v.SetupFlag",true);
            component.set("v.MatTypeFlag",true);
            component.set("v.CompTypeFlag",false);
        }
    },
    
    onComponentChange:function(component, event, helper) {
        var componentName = component.find("selectedComp").get("v.value");
        if(componentName!='--None--'){
            component.set("v.disableSave",false);
            helper.getExsistingFabValues(component, event, helper,componentName,'');
        }
    },
    
    onMaterialChange:function(component, event, helper) {
        var material = component.find("Materialid").get("v.value");
        if(material!='--None--'){
            component.set("v.disableSave",false);
            helper.getExsistingFabValues(component, event, helper,'',material);
        }
    },
    
    checkboxSelect: function(component, event, helper) {
        // get the selected checkbox value  
        var selectedRec = event.getSource().get("v.value");
        // get the selectedCount attrbute value(default is 0) for add/less numbers. 
        var getSelectedNumber = component.get("v.selectedCount");
        // check, if selected checkbox value is true then increment getSelectedNumber with 1 
        // else Decrement the getSelectedNumber with 1     
        if (selectedRec == true) {
            getSelectedNumber++;
        } else {
            getSelectedNumber--;
        }
        // set the actual value on selectedCount attribute to show on header part. 
        component.set("v.selectedCount", getSelectedNumber);
    },
    
    // For select all Checkboxes 
    selectAll: function(component, event, helper) {
        //get the header checkbox value  
        var selectedHeaderCheck = event.getSource().get("v.value");
        // get all checkbox on table with "boxPack" aura id (all iterate value have same Id)
        // return the List of all checkboxs element 
        var getAllId = component.find("boxPack");
        // If the local ID is unique[in single record case], find() returns the component. not array   
        if(! Array.isArray(getAllId)){
            if(selectedHeaderCheck == true){ 
                component.find("boxPack").set("v.value", true);
                component.set("v.selectedCount", 1);
            }else{
                component.find("boxPack").set("v.value", false);
                component.set("v.selectedCount", 0);
            }
        }else{
            
            if (selectedHeaderCheck == true) {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("boxPack")[i].set("v.value", true);
                    component.set("v.selectedCount", getAllId.length);
                }
            } else {
                for (var i = 0; i < getAllId.length; i++) {
                    component.find("boxPack")[i].set("v.value", false);
                    component.set("v.selectedCount", 0);
                }
            } 
        }  
        
    }
   
})