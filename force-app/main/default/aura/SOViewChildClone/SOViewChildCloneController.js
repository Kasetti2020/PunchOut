({
    doint : function(component, event, helper,page) {
        var SOLIlist = component.get('v.SOLIList.SOLIwrap');
        console.log('SOLIlist::'+SOLIlist);
        
        if(SOLIlist.Remaining_Qty__c == 0 || SOLIlist.Remaining_Qty__c == '' || SOLIlist.Remaining_Qty__c== null)
        {
            if(SOLIlist.Ship_qty__c == 0 || SOLIlist.Ship_qty__c =='' || SOLIlist.Ship_qty__c == undefined || SOLIlist.Ship_qty__c == null){
                SOLIlist.Ship_qty__c = SOLIlist.Supply_Quantity__c;
                SOLIlist.Remaining_Qty__c = 0;
                component.set('v.SOLIList.SOLIwrap',SOLIlist);
            }
        }
        else{
            SOLIlist.Ship_qty__c = SOLIlist.Remaining_Qty__c;
            component.set('v.SOLIList.SOLIwrap',SOLIlist);
        }
    },
    
    remainingQtyCal : function(component, event, helper,page) {
        var SOLI = component.get('v.SOLIList.SOLIwrap');
        console.log('SOLI::'+SOLI);
        SOLI.Remaining_Qty__c = SOLI.Supply_Quantity__c - SOLI.Ship_qty__c;
        component.set('v.SOLIList.SOLIwrap',SOLI);
        
    },
    /*updateSO: function(component, event, helper)
    {
        //ert(component.get('v.SOLIList.attach.Id'));
        var AttachId = (component.get('v.SOLIList.attach.Id'));
        component.set('v.downLoadAttachmentURL','https://magnetbox-mainetti.cs31.force.com/PrintShopmainietti/servlet/servlet.FileDownload?file='+AttachId);
       
        var RecordId = component.get('v.SOLIList.SO.Id');
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
                    "title": "Success!",
                    "message": "SO Confirmed successfully",
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
    },*/
    isRefreshed : function(component, event, helper)
    {
        //alert('isRefreshed');
        //$A.get('e.force:refreshView').fire();
    }
})