({
    
    doInit : function(component, event, helper) {        
        component.set('v.columns', [
            {label: 'Child Product', fieldName: 'Child_Product__c', editable:'true', type: 'text'},
            {label: 'Quantity', fieldName: 'Quantity__c', editable:'true', type: 'text'}
        ]);        
        helper.getUniqueParentProds(component,event, helper);
        helper.getAccounts(component,event, helper);
    },
    toggle: function(component, event, helper) {
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
        }
        else{
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
        }
        
    },
     delete : function(component, event) {
        var parentId = event.getSource().get("v.name");
        alert('parentId:'+parentId);
        console.log('in delete account helper method.');
        var action = component.get("c.deleleretailer");
       action.setParams({retailerName:parentId});
        action.setCallback(this, function(response) {
            component.set("v.retailerList",response.getReturnValue());
            alert('return value  :' +response.getReturnValue());
           /* var text = 'Bundle Deleted successfully.';
                    helper.successToast(component,event,helper,text);*/
           // alert('Deleted');
            $A.get('e.force:refreshView').fire();
            
        });
        $A.enqueueAction(action);
    },
        onChange : function(component, event, helper) {
            var selectedRetailer = event.getSource().get("v.name");
            //alert('selectedRetailer :'+selectedRetailer);
    var identityRequest     = component.get('v.pro.Status__c');
             // alert('identityRequest :'+identityRequest);
            var action = component.get("c.statusUpdate");
       action.setParams({name:selectedRetailer.Name,
                        status:selectedRetailer.Status__c});
        action.setCallback(this, function(response) {
    component.set('v.retailerList',response.getReturnValue());
            //alert('response.getReturnValue() :'+response.getReturnValue());
            //alert(' Status Updated :');
    //console.log(identityRequest)
      });
        $A.enqueueAction(action);
},
})