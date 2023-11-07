({
    doInit : function(component, event,helper,page) 
    {
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        component.set('v.today', today);
        helper.retailerOnChangehelper(component, event, helper);  
    },
    
    GetAllModel  : function(component, event,helper)
    {
        var selectedRetailers = component.get('v.selectedRetailer');
        var selectedUserCompany = component.get('v.selectedUserCompany');
        if(selectedUserCompany == null || selectedUserCompany == 'Select'){
            var text = 'No Company Records Found…';
            // alert('text:'+text);
            helper.errorToast(component,event,helper,text);
            return;
        }
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");   
        var action = component.get("c.getRelatedModellist");        
        action.setParams({
            'selectedRetailers': selectedRetailers,
            'selectedUserCompany': selectedUserCompany
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") {
                component.set('v.relatedModelList',response.getReturnValue().dataUplaodTrns);
                component.set('v.ifModelAvailable','true');
                component.set('v.IsCompanySelected','true');
                component.set('v.disable','false');
                var spinner = component.find('spinner');
                $A.util.toggleClass(spinner, "slds-hide");      
            }
            
        });
        $A.enqueueAction(action);     
    },
    
    OrderToCompany:function(component, event, helper)
    {
        var compName = event.getSource().get("v.value");
        component.set("v.IsCompanySelected", 'true');      
    },
    
    retailerOnChange : function(component, event, helper) {
        var selectedRetailers = component.get('v.selectedRetailer');
        if(selectedRetailers == null || selectedRetailers == 'Select Retailer'){
            var text = 'Please Select a Retailer';
            helper.errorToast(component,event,helper,text);
            return;
        }
        var selectedUserCompany = component.set('v.selectedUserCompany','Select');
        component.set('v.IsCompanySelected','false');
        component.set('v.ifModelAvailable','false');
        helper.ShowUserAllocatedCmphelper(component , event, helper);
    },
    
    ShowUserAllocatedCmp  : function(component, event, helper) {
        var selectedUserCompany = component.get('v.selectedUserCompany');
        var selectedRetailers = component.get('v.selectedRetailer');
        if(selectedRetailers == null || selectedRetailers == 'Select Retailer'){
            var text = 'Please Select a Retailer';
            helper.errorToast(component,event,helper,text);
            return;
        }
        helper.pickListVal(component ,selectedRetailers,'Retailer_Code_Hidden__c','Order_Country__c');
        if(selectedUserCompany){
            component.set("v.IsRetailerSelected", 'true');
            component.set('v.disable','true');
            component.set('v.ifModelchecked','true');
            component.set('v.IsCompanySelected','false');
            component.set('v.ifModelAvailable','false');
            // component.set('v.disable','false');
            var spinner = component.find('spinner');
            $A.util.toggleClass(spinner, "slds-show");
        }
        
    },
    
    SelectedCompany:function(component, event, helper){
        var compName = event.getSource().get("v.value");
        var actionCall = component.get("c.getDependentPicklist");
        actionCall.setParams({
            "compName":	compName,
        });
        actionCall.setCallback(this, function(response){
            
            var state = response.getState();
            //alert(response.getReturnValue());
            if (state === "SUCCESS") 
            {
                component.set('v.listOfCompanies',response.getReturnValue());              
            }
        });
        $A.enqueueAction(actionCall);  
    },
    
    SaveAllocatedModel:function (component, event, helper)
    {
        
        
        var selectedRetailers = component.get('v.selectedRetailer');
        if(selectedRetailers == null || selectedRetailers == 'Select Retailer'){
            var text = 'Please Select a Retailer';
            helper.errorToast(component,event,helper,text);
            return;
        }
        
        var selectedUserCompany = component.get('v.selectedUserCompany');
        if(selectedUserCompany == null || selectedUserCompany == 'Select'){
            var text = 'Please Select a From Company';
            helper.errorToast(component,event,helper,text);
            return;
        }
        
        
        
        var selectedCompany = component.get('v.selectedCompany');
        if(selectedCompany == null || selectedCompany == 'Select'){
            var text = 'Please Select a Company To Allocate';
            helper.errorToast(component,event,helper,text);
            return;
        }
        
        
        var AllocationDate = component.find("AllocationDate").get("v.value"); 
        // alert('AllocationDate ::'+AllocationDate);
        
        var DispatchDate = component.find("ETD").get("v.value"); 
        //alert('DispatchDate ::'+DispatchDate);
        if(DispatchDate == null){
            var text = 'Please Select the Dispatch Date';
            helper.errorToast(component,event,helper,text);
            return;
        }
        var ArrivalDate = component.find("ETA").get("v.value"); 
        // alert('ArrivalDate ::'+ArrivalDate);
        if(ArrivalDate == null){
            var text = 'Please Select the Arrival Date';
            helper.errorToast(component,event,helper,text);
            return;
        }
        
        var PoNo = component.find("PoNo").get("v.value");
        // alert('PoNo ::'+PoNo);
        /*  if(ContainerNo == null){
            var text = 'Please Enter the Container Number';
            helper.errorToast(component,event,helper,text);
            return;
        }
          var SealNo = component.find("SealNo").get("v.value");
        //alert('SealNo ::'+SealNo);
         if(SealNo == null){
            var text = 'Please Enter the Seal Number';
            helper.errorToast(component,event,helper,text);
            return;
        }*/
        
        var modelList1 = component.get("v.relatedModelList");
        //  alert('modelList1.FlagCheck ::'+modelList1.FlagCheck);
        /*   if(modelList1.length()==0)
        {
               var text = 'Please Select a  Model To Allocate';
            helper.errorToast(component,event,helper,text);
        }*/
        var callApex = false;
        for(var i=0; i<modelList1.length; i++){
            if(modelList1[i].FlagCheck){
                //alert('modelList1[i].RemainingQuantity ::'+modelList1[i].RemainingQuantity);
                // alert('modelList1[i].AvailableQuantity ::'+modelList1[i].AvailableQuantity);
                // FlagCheck = true;           
                if(modelList1[i].TransferQuantity == null || modelList1[i].TransferQuantity == ''){
                    var text = 'Please enter Transfer quantity';
                    helper.errorToast(component,event,helper,text);
                    return;
                } else if(modelList1[i].TransferQuantity > modelList1[i].AvailableQuantity){
                    
                    var text = 'Transfer Quantity should not be greater then available quantity';
                    helper.errorToast(component,event,helper,text);
                    return;
                }
                
                
                if(modelList1[i].FlagCheck){
                    
                } else {
                    var text = 'Remaining Quantity should be positive value';
                    helper.errorToast(component,event,helper,text);
                    return;
                }
                callApex = true;
            }
            /* else {
                // if(callApex =false){
                         var text = 'Please Select a  Model To Allocate';
            helper.errorToast(component,event,helper,text);
                       return;
             }
                   // }*/
            if(modelList1[i].FlagCheck){
                var isDecimal = (modelList1[i].TransferQuantity - Math.floor(modelList1[i].TransferQuantity)) !== 0;
                //alert('isDecimal ::'+isDecimal);
                if(isDecimal){
                    var text = 'Transfer Quantity should not contain decimal values';
                    helper.errorToast(component,event,helper,text);
                    // alert('Transfer quantity should not contain decimal values');
                    return;
                }
                callApex = true;
            }
            
        }
        if(callApex){
            component.set('v.showConfirmDialog', true);
        }
    },
    
    
    handleConfirmDialogYes : function(component, event, helper) {
        console.log('Yes');
        component.set('v.showConfirmDialog', false);  
        var selectedUserCompany = component.get('v.selectedUserCompany');
        var selectedRetailers = component.get('v.selectedRetailer');
        var selectedCompany = component.get('v.selectedCompany');
        var AllocationDate = component.find("AllocationDate").get("v.value"); 
        var DispatchDate = component.find("ETD").get("v.value"); 
        var ArrivalDate = component.find("ETA").get("v.value");
        var PoNo = component.find("PoNo").get("v.value");
        var modelList1 = component.get("v.relatedModelList");
        var spinner = component.find('spinner');
        $A.util.toggleClass(spinner, "slds-hide");
        var delay = 4000;
        
        var actionCall = component.get("c.saveAllocatedModel");
        actionCall.setParams({
            // "modelList":	modelList1,
            jsonObj : JSON.stringify(modelList1),
            "AllocationDate" : AllocationDate,
            "DispatchDate" : DispatchDate,
            "ArrivalDate"  : ArrivalDate,
            "selectedUserCompany" : selectedUserCompany,
            "selectedRetailers" : selectedRetailers,
            "selectedCompany"  : selectedCompany,
            "PoNo" : PoNo
        });
        actionCall.setCallback(this, function(response) {
            var state = response.getState();
            var status = response.getReturnValue();
            // alert('status ::'+status);
            if(status){
                var text = 'Model Allocated Successfully';
                helper.successToast(component,event,helper,text);
                delay;
                component.set("v.relatedModelList",null);
                component.set('v.ifModelAvailable','false');
                var spinner = component.find('spinner');
                $A.util.toggleClass(spinner, "slds-hide");
            }
            else {
                
                var spinner = component.find('spinner');
                $A.util.toggleClass(spinner, "slds-hide");
                var text = 'Model Allocated Un-Successful';
                helper.errorToast(component,event,helper,text);
            }
        });
        $A.enqueueAction(actionCall); 
        
    },
    
    handleConfirmDialogNo : function(component, event, helper) {
        console.log('No');
        component.set('v.showConfirmDialog', false);
    },
    
    
    
    DispatchdateController : function(component, event, helper){
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        // alert(' today ::'+today);
        var DispatchDate = component.get("v.DispatchDate");
        //alert('DispatchDate ::'+DispatchDate);
        
        /* if(DispatchDate <= today){
            
            var text = 'Please Select a valid Date,Which is greater than Today';
            helper.errorToast(component,event,helper,text);
            // alert('Please Provide a valid Date,Which is greater than Today!');
            DispatchDate = null;
            component.set("v.DispatchDate", DispatchDate);
        } */
        
        
    },
    
    
    ArrivaldateController : function(component, event, helper){
        var today = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        // alert(' today ::'+today);
        
        var ArrivalDate = component.get("v.ArrivalDate");
        //alert('ArrivalDate ::'+ArrivalDate);
        var DispatchDate = component.get("v.DispatchDate");
        // alert('DispatchDate ::'+DispatchDate);
        if(DispatchDate != null){
            
            if( ArrivalDate <= DispatchDate ){
                var text = 'Please Select a valid Date,Which is greater than Dispatch Date';
                helper.errorToast(component,event,helper,text);
                ArrivalDate = null;
                component.set("v.ArrivalDate", ArrivalDate);
            }
        }
        else{
            var text = 'Please Provide a valid Dispatch Date';
            helper.errorToast(component,event,helper,text);
            ArrivalDate = null;
            component.set("v.ArrivalDate", ArrivalDate);
        }
        
    },
    qtyEntered : function(component, event, helper){
        var index = event.getSource().get('v.name');
        var value = event.getSource().get('v.value'); 
        var modelList1 = component.get("v.relatedModelList");
        var trnsfrQty = modelList1[index].TransferQuantity;
        modelList1[index].RemainingQuantity = modelList1[index].AvailableQuantity - trnsfrQty;
        component.set('v.relatedModelList',modelList1);
    },
    
    modelIsChecked : function(component, event, helper){
        var value = event.getSource().get('v.value'); 
        if(value){
            // component.set('v.ifModelchecked','true');
        }
        else
        {
            //component.set('v.ifModelchecked','false'); 
        }
    }
    
})