({
    fetchExistingConfiguration : function(component, event, helper)
    { 
        
        var action = component.get("c.toCheckExistingConfiguration");
        action.setParams({
            'retailer': component.get('v.retailerID'),
            'product' : component.get('v.productID')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            var configRecord=response.getReturnValue();
          //  alert('configRecord>>>'+JSON.stringify(configRecord));
           // alert('configRecord>>>'+state);
            if(configRecord!=null){
           // alert('configRecord.proid>>>'+configRecord.proid);
           /* if(configRecord.proid!=null){
                component.set("v.proids",configRecord.proid);
            }*/
            
            if (state === "SUCCESS" ) 
            {
                //alert('Inside');
                component.set("v.config",configRecord); 
                component.set("v.configuratorFlag",true);
            }
            else if(state==="ERROR" ){
               //component.set("v.proids",configRecord.proid);
                component.set("v.config", {'sobjectType': 'Item_Master__c' }); 
               component.set("v.configuratorFlag",true);
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
            }else{
                
                 if(component.get('v.productID')!=null  && component.get('v.retailerID')!=null )
            {
                
                 component.set("v.config", {'sobjectType': 'Item_Master__c' }); 
                 component.set("v.configuratorFlag",true);
            }
               // alert('testing');
            }
        });
        $A.enqueueAction(action);
    },
    saveTheConfigurations : function(component, event, helper)
    {
        var config = component.get("v.config");
      // alert('config>>>>>>>>>>11'+JSON.stringify(config));
        if(config!=undefined){
         if((config.Free_Text__c===false | config.Free_Text__c===undefined) && (config.Style_Number__c===false |config.Style_Number__c===undefined) && (config.Lot_Number__c===false | config.Lot_Number__c===undefined) && (config.RN_Number__c===false | config.RN_Number__c===undefined) && (config.Care_Instruction__c===false | config.Care_Instruction__c===undefined ) && (config.Brand_Icon__c===false | config.Brand_Icon__c===undefined) && (config.Size_Chart__c===false |config.Size_Chart__c===undefined) && (config.Country_Of_Origin__c===false |config.Country_Of_Origin__c===undefined) && (config.Fabric_Component__c===false |config.Fabric_Component__c===undefined )&& (config.Wash_Instruction__c===false | config.Wash_Instruction__c===undefined) && (config.Wash_Modifiers__c===false | config.Wash_Modifiers__c===undefined)&& (config.Bleaching_Dry_Cleaning_Instructions__c===false|config.Bleaching_Dry_Cleaning_Instructions__c===undefined )&& (config.Drying_Instructions__c===false |config.Drying_Instructions__c===undefined) && (config.Drying_Modifiers__c===false |config.Drying_Modifiers__c===undefined)&& (config.Ironing_Instructions__c===false |config.Ironing_Instructions__c===undefined)&& (config.Special_Instructions__c===false |config.Special_Instructions__c=== undefined )) 
        {
         //  alert('Inside');
         
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                mode: 'sticky',
                message: $A.get("$Label.c.Required_alteast_One_Instruction"),
                messageTemplate: ''
            });
            toastEvent.fire();
            component.set("v.configuratorFlag",true);
            
        }else{
            if(config.Free_Text__c===true){
                if((config.Style_Number__c===false |config.Style_Number__c===undefined) && (config.Lot_Number__c===false | config.Lot_Number__c===undefined) && (config.RN_Number__c===false | config.RN_Number__c===undefined) && (config.Care_Instruction__c===false | config.Care_Instruction__c===undefined ) && (config.Season_Month__c===false | config.Season_Month__c===undefined )
                   && (config.Season_Year__c===false | config.Season_Year__c===undefined ) && (config.Supplier_Number__c===false | config.Supplier_Number__c===undefined ) && (config.Labelling_Code__c===false | config.Labelling_Code__c===undefined ) && (config.Item_Number__c===false | config.Item_Number__c===undefined )&& (config.Packaging_Code__c===false | config.Packaging_Code__c===undefined ))
                                                                                                                                                                                                                                                                                                                                       
                {
                    //alert('test1');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        mode: 'sticky',
                        message: $A.get("$Label.c.Required_alteast_One_freeText"),
                        messageTemplate: ''
                    });
                    toastEvent.fire();
                    return;
                    component.set("v.configuratorFlag",true);
                }else{
                    
                    config.Retailer__c = component.get("v.retailerID");
                   // alert('proids>>'+component.get("v.proids"));
                     config.Item_Name__c = component.get("v.productID");
                    config.Name=component.get("v.retailerName")+'_'+component.get("v.productName");
                    var action = component.get("c.saveConfiguration");
                   // alert('config>>>'+JSON.stringify(config));
                    action.setParams({
                        'configData':config
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
                            component.set("v.configuratorFlag",false);
                          //  component.set("v.productID",' ');
                           component.set("v.proids",'');
                           // component.set("v.productName",'');
                           // alert('after>> '+component.get("v.productID"));
                          //  component.set("v.retailerID",'');
                            toastEvent.fire();
                        }
                        else
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "type":"error",
                                "title": $A.get("$Label.c.Error"),
                                "message":  $A.get("$Label.c.Error_Occured")
                            });
                            toastEvent.fire();
                        }
                        var spinner = component.find('spinner');
                        $A.util.addClass(spinner, 'slds-hide');
                    });
                    $A.enqueueAction(action);
                    
                }
                
            }
            else{
                config.Retailer__c = component.get("v.retailerID");
                // config.Item_Name__c = 'a03p0000009EYmtAAG';
                config.Name=component.get("v.retailerName")+'_'+component.get("v.productName");
                config.Item_Name__c = component.get("v.productID");
                var action = component.get("c.saveConfiguration");
                action.setParams({
                    'configData':config
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
                        component.set("v.configuratorFlag",false);
                        component.set("v.productID",'');
                        component.set("v.productName",'');
                        component.set("v.retailerID",'');
                        // component.set("v.proids",'');
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
        }
        else{
             var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "type":"error",
                                "title": $A.get("$Label.c.Error"),
                                "message": $A.get("$Label.c.Please_fil_Configurator_Details")
                            });
                            toastEvent.fire();
        }
    },
    
    
      saveTheConfigurations : function(component, event, helper)
    {
        var config = component.get("v.config");
      // alert('config>>>>>>>>>>11'+JSON.stringify(config));
        if(config!=undefined){
         if((config.Free_Text__c===false | config.Free_Text__c===undefined) && (config.Style_Number__c===false |config.Style_Number__c===undefined) && (config.Lot_Number__c===false | config.Lot_Number__c===undefined) && (config.RN_Number__c===false | config.RN_Number__c===undefined) && (config.Care_Instruction__c===false | config.Care_Instruction__c===undefined ) && (config.Brand_Icon__c===false | config.Brand_Icon__c===undefined) && (config.Size_Chart__c===false |config.Size_Chart__c===undefined) && (config.Country_Of_Origin__c===false |config.Country_Of_Origin__c===undefined) && (config.Fabric_Component__c===false |config.Fabric_Component__c===undefined )&& (config.Wash_Instruction__c===false | config.Wash_Instruction__c===undefined) && (config.Wash_Modifiers__c===false | config.Wash_Modifiers__c===undefined)&& (config.Bleaching_Dry_Cleaning_Instructions__c===false|config.Bleaching_Dry_Cleaning_Instructions__c===undefined )&& (config.Drying_Instructions__c===false |config.Drying_Instructions__c===undefined) && (config.Drying_Modifiers__c===false |config.Drying_Modifiers__c===undefined)&& (config.Ironing_Instructions__c===false |config.Ironing_Instructions__c===undefined)&& (config.Special_Instructions__c===false |config.Special_Instructions__c=== undefined )) 
        {
         //  alert('Inside');
         
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                mode: 'sticky',
                message: $A.get("$Label.c.Required_alteast_One_Instruction"),
                messageTemplate: ''
            });
            toastEvent.fire();
            component.set("v.configuratorFlag",true);
            
        }else{
            if(config.Free_Text__c===true){
                if((config.Style_Number__c===false |config.Style_Number__c===undefined) && (config.Lot_Number__c===false | config.Lot_Number__c===undefined) && (config.RN_Number__c===false | config.RN_Number__c===undefined) && (config.Care_Instruction__c===false | config.Care_Instruction__c===undefined ) && (config.Season_Month__c===false | config.Season_Month__c===undefined )
                   && (config.Season_Year__c===false | config.Season_Year__c===undefined ) && (config.Supplier_Number__c===false | config.Supplier_Number__c===undefined ) && (config.Labelling_Code__c===false | config.Labelling_Code__c===undefined ) && (config.Item_Number__c===false | config.Item_Number__c===undefined )&& (config.Packaging_Code__c===false | config.Packaging_Code__c===undefined ))
                                                                                                                                                                                                                                                                                                                                       
                {
                    //alert('test1');
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        mode: 'sticky',
                        message: $A.get("$Label.c.Required_alteast_One_Instruction"),
                        messageTemplate: ''
                    });
                    toastEvent.fire();
                    return;
                    component.set("v.configuratorFlag",true);
                }else{
                    
                    config.Retailer__c = component.get("v.retailerID");
                   // alert('proids>>'+component.get("v.proids"));
                     config.Item_Name__c = component.get("v.productID");
                    config.Name=component.get("v.retailerName")+'_'+component.get("v.productName");
                    var action = component.get("c.saveConfiguration");
                   // alert('config>>>'+JSON.stringify(config));
                    action.setParams({
                        'configData':config
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
                            component.set("v.configuratorFlag",false);
                          //  component.set("v.productID",' ');
                           component.set("v.proids",'');
                           // component.set("v.productName",'');
                           // alert('after>> '+component.get("v.productID"));
                          //  component.set("v.retailerID",'');
                            toastEvent.fire();
                        }
                        else
                        {
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "type":"error",
                                "title":$A.get("$Label.c.Error"),
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
            else{
                config.Retailer__c = component.get("v.retailerID");
                // config.Item_Name__c = 'a03p0000009EYmtAAG';
                config.Name=component.get("v.retailerName")+'_'+component.get("v.productName");
                config.Item_Name__c = component.get("v.productID");
                var action = component.get("c.saveConfiguration");
                action.setParams({
                    'configData':config
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
                        component.set("v.configuratorFlag",false);
                        component.set("v.productID",'');
                        component.set("v.productName",'');
                        component.set("v.retailerID",'');
                        // component.set("v.proids",'');
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
        }
        else{
             var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                "type":"error",
                                "title": $A.get("$Label.c.Error"),
                                "message": $A.get("$Label.c.Please_fil_Configurator_Details")
                            });
                            toastEvent.fire();
        }
    },
})