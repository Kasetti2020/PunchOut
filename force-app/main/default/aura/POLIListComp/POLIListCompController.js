({
    doint: function(component, event, helper) {
        //alert(JSON.stringify(component.get('v.POList'))+'inner comp');
    },
    
    validateQty:function(component, event, helper) {
       //alert('Inside validateQty>>>'+event.getSource().get("v.value"));
       var Quantity = event.getSource().get("v.value");
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
    openRecords : function (component, event, helper) {
       /* var RecordId = component.get('v.POList.Id');
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      "recordId": RecordId,
      "slideDevName": "related"
    });
    navEvt.fire();
    */
    },
    toggle: function(component, event, helper) {
        //var items = component.get("v.POList"), index = event.getSource().get("v.value");
        var items = component.get("v.POList"); 
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        //var exp = component.find('indx');
        //alert('POLI'+POLI);
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        //$A.util.toggleClass(exp, 'slds-hide');
        
        //alert(JSON.stringify(items));
        //var exp = component.set("v.POList.Expanded__c",true);        
        
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            //alert('if'); 
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
        }
        else{
            //alert('else');
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
        }
        
        //items[index].exp = !items[index].exp;
        //component.set("v.POList", items);
    },
    close: function(component, event, helper) {
        component.set('v.expanded',false);
    },
     EditPO : function(component, event, helper){
         component.set('v.isOpen',true);
        // alert('EditPO');
      /*  var editrowId = event.getSource().get("v.value");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": editrowId,
            "panelOnDestroyCallback": function(event) {
                // $A.get('e.force:refreshView').fire();
                window.location.href = "/lightning/n/POViewPage";
            }
        });
        editRecordEvent.fire();
        */
    },
    closeModal:function(component, event, helper){
        component.set('v.isOpen',false);
    },
  
 
    editRecord : function(component, event, helper) {
        helper.showHide(component);
    },
    handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({"title": "Success!","message": "The Purchase Order Line Items's info has been updated.","type": "success"});toastEvent.fire();
       
        helper.showHide(component);
    },
    handleOnSubmit:function(component, event, helper)
    {
        
        //alert('Inside handleOnSubmit>>>');
        var evt = $A.get("e.force:navigateToComponent");
        var fields = event.getParam('fields');
        //alert('fields.Quantity__c>>'+fields.Quantity__c);
        //component.find('myRecordForm').submit(fields);
        if(fields.Quantity__c < 1 || isNaN(fields.Quantity__c))
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": $A.get("$Label.c.Error"),
                "type" : "error",
                "message": $A.get("$Label.c.Enter_Valid_Quantity")
            });
            toastEvent.fire();
            event.preventDefault(); 
           
           
        }else
        {
            fields["Supply_Quantity__c"] = fields.Quantity__c;
            component.find('editForm1').submit(fields);
            evt.setParams({
                componentDef : "c:SupplierPO",
                //componentAttributes: {
                // contactName : component.get("v.contact.Name")
                //}
            });
            evt.fire();
            
        }

       
   },
    handleCancel : function(component, event, helper) {
        helper.showHide(component);
        event.preventDefault();
    },
    navToComp:function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:SupplierPO",
        //componentAttributes: {
           // contactName : component.get("v.contact.Name")
        //}
    });
    evt.fire();
    },
    handleSuccess1 : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        //toastEvent.setParams({"title": "Success!","message": "The Purchase Order's info has been updated.","type": "success"});toastEvent.fire();
        toastEvent.setParams({"title": $A.get("$Label.c.success"),"message": $A.get("$Label.c.The_POLI_s_info_has_been_updated"),"type": "success"});toastEvent.fire();
         
        helper.hidePoli(component);
    },
})