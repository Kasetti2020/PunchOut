({
    Getcontactid: function(component, event,helper) 
    {
        var action = component.get("c.getcostomerinfo");
        action.setCallback(this, function(response)  
                           {
                               var state = response.getState();
                               if (state === "SUCCESS") 
                               {
                                   console.log('response.getReturnValue() ::'+JSON.stringify(response.getReturnValue()));
                                   component.set('v.onselectcustomeid', response.getReturnValue().Customer_Information__c);
                                   this.toCheckSORetailer(component, event,helper,response.getReturnValue().Customer_Information__c);
                               }
                               else if (state === "INCOMPLETE") 
                               {
                                   alert('Response is Incompleted');
                               } 
                                   else if (state === "ERROR") 
                                   {
                                       var errors = response.getError();
                                       //alert(JSON.stringify(errors))
                                       if (errors) {
                                           if (errors[0] && errors[0].message) {
                                               alert("Error message: " + errors[0].message);
                                           }
                                       } else {
                                           alert("Unknown error");
                                       }
                                   }
                               var spinner = component.find('spinner');
                               $A.util.toggleClass(spinner, "slds-hide");
                           });
        $A.enqueueAction(action);
    },
    toCheckSORetailer: function(component, event,helper,custInfoId) 
    {
        var action = component.get('c.checkRetailerInSO');
       // alert(JSON.stringify(custInfoId));
        action.setParams({ 
            "customerid": custInfoId
        });
        action.setCallback(this, function(actionResult) {
            var status=actionResult.getState();
          //  alert(status);
            if(status==="SUCCESS")
            {
                var response = actionResult.getReturnValue();
                console.log('customerResponse><><>>'+JSON.stringify(response));
                if( response && response.Retailer_Code1__c)
                {
                    component.set("v.onselectRetailercode",response.Retailer_Code1__c);
                    component.set("v.onselectRetailer",response.Retailer_Code1__r.Name);
                    component.set("v.cartVertical",response.Vertical__c);
                    component.set("v.cartCompany",response.Company__c);
                    component.set("v.cartCurrency",response.CurrencyIsoCode);
                    component.set("v.isCartCreated",true);
                    this.loadCatalogOrder(component, event,helper);

                }
                else
                {
                    this.toGetRetailerData(component, event,helper);
                }
            }
        });
        $A.enqueueAction(action);
    },
    toGetRetailerData: function(component, event,helper) {
        var action = component.get('c.retailerCodeDisplay');
        var self = this;
        action.setCallback(this, function(actionResult) {
            var status=actionResult.getState();
            if(status=="SUCCESS")
            {
                component.set('v.RoList', actionResult.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    loadCatalogOrder: function(component, event,helper) 
    {
        component.set("v.Retailercmp",false);
        component.set("v.Catalogcmp",true);
    },
    pickListVal:function(component, controllingValue, controllingFields, dependentField) 
    {
        //alert('controllingValue:'+controllingValue+' controllingFields:'+controllingFields+' dependentField:'+dependentField);
        var actionCall = component.get("c.getDependentPicklistValues");
        actionCall.setParams({
            "controllingValue":	controllingValue,
            "controllingFields": controllingFields,
            "dependentField": dependentField
        });
        actionCall.setCallback(this, function(response)
                               {
                                   var state = response.getState();
                                   //alert(response.getReturnValue());
                                   if (state === "SUCCESS") 
                                   {
                                       if(dependentField=='Order_Country__c')
                                       {
                                           //  alert('listOfCompanies :::'+response.getReturnValue())
                                           component.set('v.listOfCompanies',response.getReturnValue());
                                       }
                                       else if(dependentField=='Preferred_Currency__c')
                                           component.set('v.listOfCurrency',response.getReturnValue());
                                       
                                       //alert('listOfCompanies>>'+JSON.stringify(component.get('v.listOfCompanies')));
                                       //alert('listOfCurrency>>'+JSON.stringify(component.get('v.listOfCurrency')));
                                   }
                                   else if (state === "ERROR") 
                                   {
                                       alert('Error : ' + JSON.stringify(response.getError()));
                                   } 
                               });
        $A.enqueueAction(actionCall);       
    },
    GetcustomInfoid: function(component, event,helper) {
        var action = component.get("c.getcostomerRetailerData");
        action.setParams({
            "retailerCode":	component.get("v.SelectRetailer"),
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log('GetcustomRetailerInfoid  ::: '+JSON.stringify(response.getReturnValue()));
                component.set('v.selectedCompany',response.getReturnValue().Order_to_Company__c);
                component.set('v.SelectedPiklistCompany',response.getReturnValue().Order_to_Company__c);
                helper.pickListVal(component,component.get('v.selectedCompany'),'Order_Country__c','Preferred_Currency__c');
                component.set('v.selectedCurrency',response.getReturnValue().Preferred_Currency__c);
                component.set('v.SelectedPiklistCurrency',response.getReturnValue().Preferred_Currency__c);
            }else if (state === "INCOMPLETE") {
                alert('Response is Incompleted');
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        alert("Error message: " + 
                              errors[0].message);
                    }
                    
                } else {
                    alert("Unknown error");
                }
            }
        });
        $A.enqueueAction(action);
    },
})