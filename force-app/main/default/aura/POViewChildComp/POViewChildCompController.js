({
    doint: function(component, event, helper) {
        
    },
    changeNum :  function(component, event, helper){
        var AVQTY = component.get("v.POList.POLIwrap.Quantity__c");
      var Qty = event.getSource().get("v.value");
        //alert(AVQTY);
        
      },
  
   toggle: function(component, event, helper) {
       //alert('toggle');
        var items = component.get("v.POList"); 
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            //alert('true');
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
            items.expanded=true;
            component.set("v.tablesize",true);
        }
        else{
            //alert('else');
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
            items.expanded=false;
            component.set("v.tablesize",false);
        }
       component.set("v.POList",items); 
    },
    
    /*EditPO : function(component, event, helper){
         component.set('v.isOpen',true);
        
         
    },*/
    ViewPO : function(component, event, helper)
    {
        var poId = event.getSource().get("v.value");
        var scope= "h";
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        urlString = CommunityBaseURL+"/apex/POCustomerPDF?id="+poId+"&sc="+scope;
        //urlString = CommunityBaseURL+"/apex/POCustomerPDF"+"?id="+viewSOLIID+"&sc=h";
        var win = window.open(urlString, '_blank');
        
    },
    closeModal:function(component, event, helper){
        //alert('closeModal');
        component.set('v.isOpen',false);
    },
    EditPOli : function(component, event, helper){
         var editrowId = event.getSource().get("v.value");
        //alert(editrowId);
        component.set('v.POliRecordId',editrowId);
    component.set('v.IsPOLI',true);
        // alert('EditPO');
     /*   var editrowId = event.getSource().get("v.value");
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
    closeModal1:function(component, event, helper){
        component.set('v.IsPOLI',false);
    },
    editRecord : function(component, event, helper) {
        helper.showHide(component);
    },
    handleSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({"title": $A.get("$Label.c.success"),"message": $A.get("$Label.c.The_Purchase_Order_Line_Items_s_info_has_been_updated"),"type": "success"});toastEvent.fire();
       
        helper.showHide(component);
    },
    handleOnSubmit:function(component, event, helper){
       var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:SupplierPO",
        //componentAttributes: {
           // contactName : component.get("v.contact.Name")
        //}
    });
    evt.fire();
   },
    handleCancel : function(component, event, helper) {
        component.set("v.isOpen",false);
        //helper.showHide(component);
        //event.preventDefault();
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
        toastEvent.setParams({"title": $A.get("$Label.c.success"),"message": $A.get("$Label.c.The_Purchase_Order_s_info_has_been_updated")	,"type": "success"});toastEvent.fire();
         
        helper.hidePoli(component);
    },
    changeSelectAll : function(component, event, helper)
    {
        //alert('boolean value '+ component.get("v.POList.IsSelected"));
        if(!component.get("v.POList.IsSelected"))
        {
            //component.set("v.mainCheckbox",component.get("v.POList.IsSelected"));
            var event = component.getEvent("selectcheck");
            event.setParams({
                'selectcheck':'true'
            });
            
            event.fire();
        }
        /*
        if(component.get("v.POList.IsSelected"))
        {
            component.set('v.POList.IsSelected',true);
        }
        else
        {
            component.set('v.POList.IsSelected',false);
        }
        */
        /*code block to fire event fired at each row check box click
        var POList = component.get("v.POList");
        var SelectedretailerCode = component.get("v.SelectedretailerCode");
        
        if(SelectedretailerCode)
        {
            if(SelectedretailerCode == POList.POwrap.Retailer_Code1__c)
            {
            }
            else
            {
                
                //var getCheckAllId = component.find("cboxRow");
                component.find("cboxRow").set("v.value", false);
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: "Warning",
                    message: 'Please Select Purchase Order from only one Retailer.',
                    type: "warning"
                });
                toastEvent.fire();
                return;   
            }
        }
        else
        {
         var event = component.getEvent("selectcheck");
        event.setParams({
            'selectcheck':POList.POwrap.Retailer_Code1__c
           
        });
        event.fire();
        }
        */
    }
})