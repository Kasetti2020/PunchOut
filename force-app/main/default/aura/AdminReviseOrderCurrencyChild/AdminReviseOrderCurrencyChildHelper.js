({
	fetchBulkReviseOrder : function(component, event, helper)  
    {
        var CurrentSOid = component.get("v.List.Id");
       console.log('CurrentSOid fetchBulkReviseOrder>>'+JSON.stringify(component.get("v.List")));
        
		var action = component.get("c.fetchBulkReviseOrder");
        action.setParams({ Soid : CurrentSOid});
        action.setCallback(this, function(response) 
        {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var responce = response.getReturnValue(); 
                component.set("v.ReviseLineList",response.getReturnValue());
                //console.log('lines records '+component.get("v.ReviseLineList"));
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
	},
    getApproveList : function(component, event, helper) 
    {
       var ReviseLineList = component.get("v.ReviseLineList");
       console.log('getApproveList>>'+JSON.stringify(component.get("v.ReviseLineList")));
       var Aarray = [];
       var Rarray = [];
       for(var i=0;i<=ReviseLineList.length-1;i++)
        {
            if(ReviseLineList[i].Checked == true)
            {
                Aarray.push(ReviseLineList[i].RO.Name);
            }
            else
            {
                Rarray.push(ReviseLineList[i].RO.Name);
            }
        }  
        component.set("v.SelectedList",Aarray);
       	component.set("v.rejectedList",Rarray);
        console.log('SelectedList>>'+JSON.stringify(component.get("v.SelectedList")));
        console.log('rejectedList>>'+JSON.stringify(component.get("v.rejectedList")));
    },
     SaveApproveOrders : function(component, event, helper) 
    {
        var ReviseLineList = component.get("v.ReviseLineList");
        //console.log('RORecords in SaveApproveOrders >>'+JSON.stringify(component.get("v.ReviseLineList")));
        var classicviewflag = component.get("v.checkClassicOrLightning");
        var action = component.get("c.SaveApproveOrders");
        action.setParams({ ApproveList : component.get("v.ReviseLineList")});
        action.setCallback(this, function(response) 
        {
            var state = response.getState();
            //alert('responce state>>'+state);
            if (state === "SUCCESS") {
               var responce = response.getReturnValue(); 
               var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.Bulk_Approval_of_Revise_order_submitted_successfully"),
                        type: "success"
                    });
                    toastEvent.fire();
                    component.set("v.OpenOrderChangeRequest",false);  
                    
                
                var emailaction = component.get("c.SendApproveEmails");
                emailaction.setParams({ ApproveList : component.get("v.ReviseLineList")});
                emailaction.setCallback(this, function(response) 
                {
                    var state = response.getState();
                    $A.get('e.force:refreshView').fire();
                });
        		$A.enqueueAction(emailaction);
                
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
})