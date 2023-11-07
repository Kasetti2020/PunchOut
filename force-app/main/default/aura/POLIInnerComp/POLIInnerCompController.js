({
    EditPOli : function(component, event, helper){
        component.set('v.IsPOLI',true);
        
    },
    doint: function(component, event, helper) 
    {
  
        component.set('v.POLIQuantity',component.get('v.POLI.Quantity__c'));
        //alert('Original Qty>>'+component.get('v.POLIQuantity'));
        //alert('Modified Qty>>'+component.get('v.POLI.Quantity__c'));
       
    },
    closeModal1:function(component, event, helper){
        
        //alert('Original Qty>>'+component.get('v.POLIQuantity'));
        //alert('Modified Qty>>'+component.get('v.POLI.Quantity__c'));
        component.set('v.POLI.Quantity__c',component.get('v.POLIQuantity'));
        component.set('v.IsPOLI',false);
    },
    validateQty:function(component, event, helper) {
        
        var Quantity = component.get("v.POLI.Quantity__c");
        //alert('Modified Qty : '+Quantity);
        if(Quantity < 1)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_Valid_Quantity")
            });
            toastEvent.fire();
            return;
        } 
        
    },
    UpdatePOLI:function(component, event, helper){
        
        /*var spinner = component.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");*/
        var Quantity = component.get("v.POLI.Quantity__c");
        //alert('Modified Qty : '+Quantity);
        if(Quantity < 1)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_Valid_Quantity")
            });
            toastEvent.fire();
            return;
        } 
        
        var POLIVar = component.get("v.POLIVar");
        POLIVar.Quantity__c = component.get("v.POLI.Quantity__c");
        POLIVar.Supply_Quantity__c = component.get("v.POLI.Quantity__c");
        POLIVar.Id = component.get("v.POLI.Id");
        POLIVar.sobjectType = 'Purchase_Order_LineItem__c';
        component.set("v.POLIVar",POLIVar);
        helper.updatePOLine1(component, event, helper);
        //alert('Final JSON object is>>'+JSON.stringify(component.get("v.POLIVar")));
        //component.set('v.IsPOLI',false);
        
    },
    
})