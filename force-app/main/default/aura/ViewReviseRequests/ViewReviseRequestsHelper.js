({
    fetchReviseOrder : function(component, event, helper) {
        var SalesOrderId = component.get("v.SOObj.Id");
        var action = component.get("c.toGetReviseOrderRequests");
        //var isSaveRequired = false;
        action.setParams({
            "SoId":SalesOrderId,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var res = response.getReturnValue();
                component.set("v.revOrderVerWrp", res);
                //console.log(' res:::'+JSON.stringify(res)); //264 + 316800, 422400
                for(var i=0;i<res.length;i++)
                {
                    console.log(i+' res:::'+JSON.stringify(res[i]));
                    var templist = res[i].ReviseReqWrapList;
                    console.log(' length:::'+templist.length);
                    for(var j=0;j<templist.length;j++)
                    {
                        //console.log(j+' ReviseReqWrapList:::'+JSON.stringify(templist[j]));
                        console.log(j+' newVal:::'+JSON.stringify(templist[j].revOData.What_to_Revise__c));
                        if(templist[j].iseditable)
                            component.set("v.isSaveRequired",true);
                        if(templist[j].revOData.What_to_Revise__c == 'Cancel Order')
                            component.set("v.isCancelOrderflag",true);
                        
                    }
                }
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.No_revise_Orders_created"),
                    type: "warning"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
            console.log('flag>>'+component.get("v.isCancelOrderflag"));
        });
        $A.enqueueAction(action); 
    },
    saveRevision : function(component, event, helper) {
        var revOrderVerWrp = component.get("v.revOrderVerWrp");
        var listOfEditedRO = [];
        
        for(var i=0;i<revOrderVerWrp.length;i++)
        {
            var templist = revOrderVerWrp[i].ReviseReqWrapList;
            for(var j=0;j<templist.length;j++)
            {
                //console.log(j+' ReviseReqWrapList:::'+JSON.stringify(templist[j]));
                //console.log(j+' newVal:::'+JSON.stringify(templist[j].iseditable));
                if(templist[j].iseditable)
                {
                    listOfEditedRO.push(templist[j].newVal);
                }
            }
        }
        
        var action = component.get("c.toSaveReviseOrderRequests");
        action.setParams({
            "RORqtToSave":listOfEditedRO,
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": $A.get("$Label.c.success"),
                    "message": $A.get("$Label.c.The_changes_in_Revise_Request_are_saved_successfully"),
                    "type":"SUCCESS"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
            else
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Revised_requests_are_not_saved"),
                    type: "warning"
                });
                toastEvent.fire();
            }
        });
        $A.enqueueAction(action); 
    },
})