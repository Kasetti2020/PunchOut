({

            getDefaultLanguage : function (cmp,event, helper)
            {
            var action = cmp.get("c.getDefaultLanguage");
            action.setCallback(this,function(response){   
            var state = response.getState();  
            if(state === "SUCCESS"){ 
            var defaultLan = response.getReturnValue();
            //alert('defaultLan>>'+defaultLan);
            cmp.set("v.defaultLanguage", defaultLan); 

            }
            else if(state === 'ERROR'){
            alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
            });
            $A.enqueueAction(action);
            },




    validateEmail : function(elementValue)
    {    
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(elementValue); 
    }, 
    GetCustInfoDetails : function (cmp,event, helper)
    {
        var action = cmp.get("c.getCustomerInfo");
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        action.setParams({
            'UserId' : userId
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            //alert('state>>'+state);
            var StoreResponse = response.getReturnValue().CustInfo;
            var CountryPickListResponse = response.getReturnValue().pickListValuesList;
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                cmp.set("v.CustomerInfo",StoreResponse);
                cmp.set("v.CountryList",CountryPickListResponse);
            } else {
                //alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    GetInitDetails : function (cmp,event, helper)
    {
        var action = cmp.get("c.GetInitDetails");
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.CustomerInfo",StoreResponse);
                cmp.set('v.showSpinner', false); 
                
            } 
            else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    GetInitDetails1 : function (cmp,event, helper)
    {
        var action = cmp.get("c.GetInitDetails");
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.GetInitDetailsWrapper",StoreResponse);
                cmp.set("v.CustomerInfo",StoreResponse.CustomerInformation);
                cmp.set("v.CustomerInfoTemp",StoreResponse.CustomerInformation);
                cmp.set("v.depnedentFieldMap",StoreResponse.DependentMap);
                var depnedentFieldMap = cmp.get("v.depnedentFieldMap");
                var ListOfDependentFields = depnedentFieldMap[StoreResponse.RetailerName];
                var dependentFields = [];
                dependentFields.push('--- None ---');
                for (var i = 0; i < ListOfDependentFields.length; i++) {
                    //alert('Inside For loop>>>'+ListOfDependentFields[i]);
                    dependentFields.push(ListOfDependentFields[i]);
                }
                // set the dependentFields variable values to store(dependent picklist field) on lightning:select
                cmp.set("v.listDependingValues", dependentFields);
                var SubDepnedentFieldMap = StoreResponse.SubDependentMap;
                cmp.set("v.SubDepnedentFieldMap",SubDepnedentFieldMap);	
                var listOfkeys = []; // for store all map keys (controller picklist values)
                var ControllerField = []; // for store controller picklist value to set on lightning:select. 
                var ListOfCurrencyDependentFields = SubDepnedentFieldMap[StoreResponse.DefaultOrderToCompany];
                var SubdependentFields = [];
                SubdependentFields.push('--- None ---');
                for (var i = 0; i < ListOfCurrencyDependentFields.length; i++) {
                    //alert('Inside For loop>>>'+ListOfCurrencyDependentFields[i]);
                    SubdependentFields.push(ListOfCurrencyDependentFields[i]);
                }
                // set the SubdependentFields variable values to store(dependent picklist field) on lightning:select
                cmp.set("v.listPreferredCurrencyDependingValues",SubdependentFields);
                cmp.set("v.TemplistPreferredCurrencyDependingValues",cmp.get('v.listPreferredCurrencyDependingValues'));
                cmp.set('v.showSpinner', false); 
                cmp.set("v.beforeEmailMod",cmp.get("v.CustomerInfoTemp.Email__c"));
            } else {
                //alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    fetchRetalerData : function (cmp,event, helper)
    {
        var action = cmp.get("c.GetRetailerData");
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var MainMap = response.getReturnValue();
                cmp.set("v.MainMap",MainMap);
                cmp.set("v.depnedentFieldMap",MainMap.DependentMap);
                cmp.set("v.SubDepnedentFieldMap",MainMap.SubDependentMap);
                cmp.set("v.RetailerCodeMap",MainMap.RetailerCodeMap);
                cmp.set("v.RetailerDataList",MainMap.RetailerDataListToReturn);
                cmp.set("v.RetailerCodeValidationMap",MainMap.retailerCodeValidationMap);
                var idListStr;
                for(var i=0;i<MainMap.RetailerDataListToReturn.length;i++)
                {
                    if(i==0)
                        idListStr=MainMap.RetailerDataListToReturn[i].Retailer_Code__c;
                    else
                        idListStr+='\',\''+MainMap.RetailerDataListToReturn[i].Retailer_Code__c;
                }
                cmp.set('v.idListStr',idListStr);
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
            } 
            else {
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    UpdateRetailerData : function (cmp,event, helper)
    {
        var action = cmp.get("c.UpdateRetailerRelatedData");
        var RetailerDataList = cmp.get("v.RetailerDataList");
        action.setParams({
            'RetailerDataList' : RetailerDataList,
            'CustomerName':cmp.get("v.CustomerInfo.First_Name__c") +' '+ cmp.get("v.CustomerInfo.Last_Name__c"),
            'RetailerDataListToDelete': cmp.get("v.RetailerDataListToDelete"),
            'OrdertoMainettiCompany': cmp.get("v.OrdertoMainettiCompany")
            
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            var StoreResponse = response.getReturnValue();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "type" : "success",
                    "message": $A.get("$Label.c.Retailer_Data_updated_successfully")
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                cmp.set('v.showRetailerDataSection', false);  
                cmp.set("v.RetailerDataList",StoreResponse);
            } else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    UpdateCustomerInfoDetails : function (cmp,event, helper)
    {
        var action = cmp.get("c.UpdateCustomerInfoDetails");
        var objDetails = cmp.get("v.CustomerInfoTemp");
        action.setParams({
            'CustInfo' : objDetails,
            'DefaultOrderToCompany':cmp.get("v.GetInitDetailsWrapper.DefaultOrderToCompany"),
            'DefaultPreferredCurrency':cmp.get("v.GetInitDetailsWrapper.DefaultPreferredCurrency"),            
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.CustomerInfo",StoreResponse);
                cmp.set('v.showProfileSection', false);  
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "type" : "success",
                    "message": $A.get("$Label.c.Profile_Information_details_updated_successfully")
                });
                toastEvent.fire();
                var prevMail = cmp.get("v.beforeEmailMod");
                if(prevMail != objDetails.Email__c){
                    var toastEvent = $A.get("e.force:showToast");
                	toastEvent.setParams({
                        "mode" : 'sticky',
                        "duration" : 10000,
                    	"title": $A.get("$Label.c.Email_Changed"),
                        "type" : "warning",
                        "message": $A.get("$Label.c.Email_Change_Request_is_Accepted_A_system_email_has_been_sent_to_you_please_cl")
                    });
                    toastEvent.fire();
                }
            } else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    GetAddressDetails : function (cmp,event, helper)
    {
        var action = cmp.get("c.GetAddressDetails");
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.ShowInvoiceToBuyerToComp",StoreResponse.ShowInvoiceToBuyerToComp);
                cmp.set("v.ShowBillToLockedComp",StoreResponse.ShowBillToLockedComp);
                for(var i = 0 ; i<StoreResponse.BuyerToAddressList.length ; i++)
                {
                    StoreResponse.BuyerToAddressList[i].sObjecttype='Ship_Bill_Address__c';
                }
                cmp.set("v.AddressWrapperObject",StoreResponse);
            } else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
            
        });
        $A.enqueueAction(action); 
    },
    
    UpdateAddress : function (cmp,event, helper)
    {
        var objDetails = cmp.get("v.AddressWrapperObject");
        var action = cmp.get("c.UpdateAddressDetails");
        action.setParams({
            'AddressWrapperObjectParam' : JSON.stringify(objDetails)
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue();
                cmp.set("v.AddressWrapperObject",StoreResponse);
                cmp.set('v.showAddressSection', false);  
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "type" : "success",
                    "message": $A.get("$Label.c.Address_Information_details_updated_successfully")
                });
                toastEvent.fire();
                //cmp.set("v.ShowInvoiceToBuyerToComp",StoreResponse.AddressWrapperObject);
            }else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
        
    },
    
    
    deleteAddress : function(component, event, helper , rowIndex, flag , CurrentAddressToDelete)
    {
        var action = component.get("c.deleteAddressAndUpdate");
        action.setParams({
            "CustomerAddressToDelete": CurrentAddressToDelete
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                if(flag=='DeleteBillAdress')
                {
                    var BillToAddressList = component.get('v.AddressWrapperObject.BillToAddressList');
                    BillToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.BillToAddressList',BillToAddressList);
                }
                if(flag=='DeleteShipAdress')
                {
                    var ShippToAddressList = component.get('v.AddressWrapperObject.ShippToAddressList');
                    ShippToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.ShippToAddressList',ShippToAddressList);
                }
                if(flag=='DeleteInvoiceToAdress')
                {
                    var InvoiceToAddressList = component.get('v.AddressWrapperObject.InvoiceToAddressList');
                    InvoiceToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.InvoiceToAddressList',InvoiceToAddressList);
                }
                if(flag=='DeleteBuyerToAdress')
                {
                    var BuyerToAddressList = component.get('v.AddressWrapperObject.BuyerToAddressList');
                    BuyerToAddressList.splice(rowIndex, 1);
                    component.set('v.AddressWrapperObject.BuyerToAddressList',BuyerToAddressList);
                }    
            }else
            {
                alert('Inside Error callback of deleteAddress>>>>>'+state);  
            }
        });
        $A.enqueueAction(action);
    },
    fetchDepValues: function(component, ListOfDependentFields) {
        var dependentFields = [];
        dependentFields.push('--- None ---');
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            dependentFields.push(ListOfDependentFields[i]);
        }
        component.set("v.listDependingValues", dependentFields);
    },
    
    fetchDepPreferredCurrencyValues:function(component, ListOfDependentFields) {
        var dependentFields = [];
        dependentFields.push('--- None ---');
        for (var i = 0; i < ListOfDependentFields.length; i++) {
            dependentFields.push(ListOfDependentFields[i]);
        }
        component.set("v.listPreferredCurrencyDependingValues", dependentFields);   
    },
    UpdatePassword : function (cmp,event, helper)
    {
        var userId = $A.get( "$SObjectType.CurrentUser.Id" );
        var password = cmp.get("v.password");
        var action = cmp.get("c.ChangePassword");
        action.setParams({
            'userid' : userId,
            'newPassword' : password
        });
        action.setCallback(this, function(response) {
            var state =  response.getState();
            if (cmp.isValid() && state == 'SUCCESS') 
            {   
                var StoreResponse = response.getReturnValue(); 
                if(StoreResponse[1] == 'ShowErrorTrue')
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.Error"),
                        "type" : "error",
                        "message": $A.get("$Label.c.Do_not_use_5_previously_used_passwords")
                    });
                    toastEvent.fire();
                    
                }else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        "title": $A.get("$Label.c.success"),
                        "type" : "success",
                        "message": $A.get("$Label.c.Password_changed_successfully_you_will_be_logged_out_soon")
                    });
                    toastEvent.fire();
                    var urlString = window.location.href;
                    //var CommunityBaseURL = urlString.slice(0, -2);
                    //alert(urlString);
                    var intLocation = urlString.indexOf("MagNETFactory") + 13;
                    var CommunityBaseURL = urlString.substring(0, intLocation);
                    //alert(CommunityBaseURL);
                    var gotoURL = CommunityBaseURL+"/secur/logout.jsp?retUrl="+CommunityBaseURL+"/s/login"
                            
                    window.setTimeout(
                        $A.getCallback(function() {
                            window.location.replace(gotoURL);
                        }),3000
                    );
                }
            }else {
                alert('Inside Error callback>>>>>'+state);
                console.log('Failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);      
    },
})