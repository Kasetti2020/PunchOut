({
    getSORetailerCode:function(component, event, helper, recordId) 
    {
        // alert('recordId ::'+recordId);
        var action = component.get("c.getSORetailerCode");
        action.setParams({ 
            "SOID": recordId,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                //alert(JSON.stringify(response.getReturnValue()));
                // alert(response.getReturnValue().Reason_to_Cancel__c);
                //alert(response.getReturnValue().CurrencyIsoCode);
                //component.set("v.reasonToCancel",response.getReturnValue().Reason_to_Cancel__c);
                component.set("v.SelectedRetailer",response.getReturnValue().Retailer_Code2__c); 
                component.set("v.SelectedCompanyVal",response.getReturnValue().Company__c);  
                component.set("v.SelectedCurrencyVal",response.getReturnValue().CurrencyIsoCode);
                component.set("v.SelectedPiklistCurrency",response.getReturnValue().CurrencyIsoCode);
                component.set("v.reviseReason","");
                component.set("v.reviseReasonText","");
                component.set("v.reviseVersionNum",response.getReturnValue().Revise_Version__c);
               /* if(response.getReturnValue().Reason_to_Cancel__c == 'Revise Order To Company'){
                    var res = helper.pickListVal(component,component.get("v.SelectedRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
                    
                }
                else{
                    helper.pickListVal(component,response.getReturnValue().Order_to_Company__c,'Order_Country__c','Preferred_Currency__c');
                    
                }*/
                
            }
            else if (state === "ERROR") 
            {
                 component.set("v.AddressTable",false);
                 $A.get("e.force:closeQuickAction").fire();
                  var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Error"),
                message:$A.get("$Label.c.This_Record_Does_not_have_any_Revise_Request_For_Admin_s"),
                type: "Error"
            });
            toastEvent.fire();
            return;
                 
              //  alert('Error : ' + JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
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
                                           var SelectedCompanyVal = component.get('v.SelectedCompanyVal');
                                           component.set('v.listOfCompanies',response.getReturnValue());
                                           var listCmp = component.get('v.listOfCompanies');
                                           var items = [];
                                           // alert('listCmp ::'+listCmp);
                                           for(var i=0;i<listCmp.length;i++){
                                               // alert('listCmp[i] :::'+listCmp[i])
                                               if(listCmp[i] != SelectedCompanyVal){
                                                   // alert('listCmp[i] :::'+listCmp[i])
                                                   items.push(listCmp[i]);  
                                               }
                                               
                                           }
                                           component.set("v.listOfCompanies", items);
                                           component.set("v.SelectedCurrencyVal", '');
                                       }
                                       else if(dependentField=='Preferred_Currency__c'){
                                           component.set('v.listOfCurrency',response.getReturnValue());
                                           var preferedCurrency =  component.get('v.SelectedCurrencyVal');
                                           // alert('preferedCurrency ::'+preferedCurrency);
                                           
                                           if(preferedCurrency != ''){
                                               var listOfCurrency = component.get('v.listOfCurrency');
                                               var items = [];
                                               //alert('listOfCurrency ::'+listOfCurrency);
                                               
                                               for(var i=0;i<listOfCurrency.length;i++){
                                                   // alert('listOfCurrency[i] :::'+listOfCurrency[i].substring(0,3))
                                                   if(listOfCurrency[i].substring(0,3) != preferedCurrency){
                                                       // alert('listCmp[i] :::'+listOfCurrency[i])
                                                       items.push(listOfCurrency[i]);  
                                                   }
                                                   
                                               }
                                               component.set("v.listOfCurrency", items);
                                               if($A.util.isEmpty(component.get("v.listOfCurrency"))){
                                                   //alert("Inside Empty list");
                                               }
                                               else{
                                                   component.set('v.SelectedPiklistCurrency','');
                                               }
                                           }
                                           
                                       }
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
})