({
    
    validateEmail : function(elementValue)
    {    
        //alert('Inside Helpers validateEmail>>>>'+elementValue);
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var controllerValueKey = eval(elementValue );
        //alert(emailPattern.test(elementValue));
        return emailPattern.test(controllerValueKey); 
    }, 
    
    validateEmail1 : function(elementValue)
    {    
        //alert('Inside Helpers validateEmail>>>>'+elementValue);
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // var controllerValueKey = eval(elementValue );
        //alert(emailPattern.test(elementValue));
        return emailPattern.test(elementValue); 
    }, 
    
    getAllRetailerCodeOrderToCompanyMap : function (cmp,event, helper){   
        //alert('Inside getAllRetailerCodeOrderToCompanyMap>>>');    
        var action = cmp.get("c.getDependentMap");
        var objDetails = cmp.get("v.objDetail");
        
        action.setParams({
            'objDetail' : objDetails,
            'contrfieldApiName': 'Retailer_Code_Hidden__c',
            'depfieldApiName': 'Order_Country__c' 
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //alert('state>>'+state);
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                
                //store the return response from server (map<string,List<string>>)  
                var StoreResponse = response.getReturnValue();
                
                // once set #StoreResponse to depnedentFieldMap attribute 
                cmp.set("v.depnedentFieldMap",StoreResponse);
                //alert('depnedentFieldMap>>>'+cmp.get("v.depnedentFieldMap"));
                // create a empty array for store map keys(@@--->which is controller picklist values) 
                var listOfkeys = []; // for store all map keys (controller picklist values)
                var ControllerField = []; // for store controller picklist value to set on lightning:select. 
                
                // play a for loop on Return map 
                // and fill the all map key on listOfkeys variable.
                for (var singlekey in StoreResponse) {
                    //alert('singlekey>>>'+singlekey);
                    listOfkeys.push(singlekey);
                }
                
                //set the controller field value for lightning:select
                if (listOfkeys != undefined && listOfkeys.length > 0) {
                    ControllerField.push('--- None ---');
                }
                
                for (var i = 0; i < listOfkeys.length; i++) {
                    ControllerField.push(listOfkeys[i]);
                }  
                // set the ControllerField variable values to country(controller picklist field)
                cmp.set("v.listControllingValues", ControllerField);
                
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    
    
    getAllOrderToCompanyPreferredCurrencyMap : function (cmp,event, helper){   
        //alert('Inside getAllOrderToCompanyPreferredCurrencyMap>>>');    
        var action = cmp.get("c.getDependentMap");
        var objDetails = cmp.get("v.objDetail");
        
        action.setParams({
            'objDetail' : objDetails,
            'contrfieldApiName': 'Order_Country__c',
            'depfieldApiName': 'Preferred_Currency__c' 
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //alert('state>>'+state);
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                
                //store the return response from server (map<string,List<string>>)  
                var StoreResponse = response.getReturnValue();
                
                // once set #StoreResponse to depnedentFieldMap attribute 
                cmp.set("v.SubDepnedentFieldMap",StoreResponse);
                //alert('SubDepnedentFieldMap>>>'+cmp.get("v.SubDepnedentFieldMap"));
                // create a empty array for store map keys(@@--->which is controller picklist values) 
                var listOfkeys = []; // for store all map keys (controller picklist values)
                var ControllerField = []; // for store controller picklist value to set on lightning:select. 
                
                // play a for loop on Return map 
                // and fill the all map key on listOfkeys variable.
                for (var singlekey in StoreResponse) {
                    //alert('singlekey>>>'+singlekey);
                    listOfkeys.push(singlekey);
                }
                
                //set the controller field value for lightning:select
                if (listOfkeys != undefined && listOfkeys.length > 0) {
                    ControllerField.push('--- None ---');
                }
                
                for (var i = 0; i < listOfkeys.length; i++) {
                    ControllerField.push(listOfkeys[i]);
                }  
                // set the ControllerField variable values to country(controller picklist field)
                cmp.set("v.listOrderToCompanyControllingValues", ControllerField);
                
            } else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    
    
    fetchDepValues: function(component, ListOfDependentFields) {
        // create a empty array var for store dependent picklist values for controller field  
        //alert('ListOfDependentFields>>>'+ListOfDependentFields);
        var dependentFields = [];
        dependentFields.push('--- None ---');
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            //alert('Inside For loop>>>'+ListOfDependentFields[i]);
            dependentFields.push(ListOfDependentFields[i]);
        }
        // set the dependentFields variable values to store(dependent picklist field) on lightning:select
        component.set("v.listDependingValues", dependentFields);
        //alert('Final Values>>>'+ component.get("v.listDependingValues"));
        
    },
    
    fetchDepPreferredCurrencyValues:function(component, ListOfDependentFields) {
        
        //alert('Inside fetchDepPreferredCurrencyValues>>>'+ListOfDependentFields);
        var dependentFields = [];
        dependentFields.push('--- None ---');
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            //alert('Inside For loop>>>'+ListOfDependentFields[i]);
            dependentFields.push(ListOfDependentFields[i]);
        }
        // set the dependentFields variable values to store(dependent picklist field) on lightning:select
        component.set("v.listPreferredCurrencyDependingValues", dependentFields);
        //alert('Final Values>>>'+ component.get("v.listPreferredCurrencyDependingValues"));
        
    },
    
    
    SaveCustomerInfo : function (cmp,event, helper)
    {
        //alert('selectedOptionsList>>>'+ JSON.stringify(cmp.get("v.defaultOptions")));
        //alert('Inside registerUser MainWrapperObject>>>'+JSON.stringify(cmp.get("v.MainWrapperObject")));        
        
        //alert('Before calling SaveCustomerInfo>>>');
        var action = cmp.get("c.SaveCustomerInfo");
        action.setParams({ 
            MainWrapperParam : JSON.stringify(cmp.get("v.MainWrapperObject")) ,
            billingAddressList : cmp.get("v.BillToAddressList") ,
            shippingAddressList : cmp.get("v.ShippToAddressList"),
            InvoiceToAddressList : cmp.get("v.InvoiceToAddressList") ,
            BuyerToAddressList : cmp.get("v.BuyerToAddressList")
            
            
        });
        
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if(cmp.isValid() && state=="SUCCESS")
            {
                var spinner = cmp.find("spinner");
                $A.util.toggleClass(spinner, "slds-hide");
                if(response.getReturnValue()=='Success')
                {
                    cmp.set("v.registrationSuccessfull",true);
                }
                else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Error"),
                        "type" : "error",
                        "message": response.getReturnValue()
                    });
                    toastEvent.fire();
                    return;
                    
                }
                
                
                //history.back();
                
            }else
            {
                alert('Inside error callback>>>>');
                alert('response is'+response.getReturnValue());
            }
        });
        $A.enqueueAction(action); 
        
    },
    
    CallCompanyConfiguration :function (cmp,event, helper)
    {
        //alert('CallCompanyConfiguration where alterd by chandana>>>');
        
        var action = cmp.get("c.getCompanyConfiguration");
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //console.log('state>>>>'+JSON.stringify(response.getReturnValue()));
            var StoreResponse = response.getReturnValue().CompanyConfigurationList;
            var CountryPickListResponse = response.getReturnValue().pickListValuesList;
            if(cmp.isValid() && state=="SUCCESS")
            {
                cmp.set("v.CompanyConfigurationList",StoreResponse);
                cmp.set("v.CountryList",CountryPickListResponse);
                cmp.set("v.RetailerCodeMap",response.getReturnValue().retailerCodeMap);
                //alert('RetailerCodeMap>>>'+JSON.stringify(cmp.get("v.RetailerCodeMap")));
                //alert('CountryList>>>'+JSON.stringify(cmp.get("v.CountryList")));
                //alert('after setting CompanyConfigurationList>>>>'+ cmp.get("v.CompanyConfigurationList")); 
                var CompanyConfigurationList = cmp.get("v.CompanyConfigurationList")
                for (var i = 0; i < CompanyConfigurationList.length; i++) 
                {
                    //alert('Inside For loop>>>'+CompanyConfigurationList[i]);
                    
                } 
            }else
            {
                alert('Inside error callback>>>>');
                alert('response is'+response.getReturnValue());
            }
        });
        $A.enqueueAction(action);  
    },
    
    
})