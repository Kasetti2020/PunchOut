({
	myAction : function(component, event, helper) {
		
	},
    
    
    toggle: function(component, event, helper) {
        var items = component.get("v.POList"); 
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
    updateSO: function(component, event, helper)
    {
        //ert(component.get('v.SOList.attach.Id'));
        var AttachId = (component.get('v.SOList.attach.Id'));
        component.set('v.downLoadAttachmentURL','https://magnetbox-mainetti.cs31.force.com/PrintShopmainietti/servlet/servlet.FileDownload?file='+AttachId);
       
        var RecordId = component.get('v.SOList.SO.Id');
       // alert('RecordId>>>>>>>>>'+RecordId);
        var action = component.get("c.UpdateSOStatuts");
                action.setParams({
                    SOId : RecordId
                });
         action.setCallback(this,function(response){
             
            var state = response.getState();
           //alert(state);
            if(state == 'SUCCESS'){
                
               var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.SO_Confirmed_successfully"),
                    "type":"SUCCESS"
                });
                toastEvent.fire();
             $A.get('e.force:refreshView').fire(); 
            }
            else if (state=="ERROR") {
                alert('ERROR');
            }
                  
        });
        $A.enqueueAction(action);
    },
    isRefreshed : function(component, event, helper)
    {
        //alert('isRefreshed');
        //$A.get('e.force:refreshView').fire();
    }
})