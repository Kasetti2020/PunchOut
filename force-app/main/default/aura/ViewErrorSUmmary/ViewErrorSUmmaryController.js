({
    doInit: function(component, event, helper) {
         var salesProceedBatchId = component.get("v.batchId");
         var action = component.get("c.fetchErrorCount"); 
            action.setParams({
                "batchID":salesProceedBatchId,
                 });
            action.setCallback(this,function (response) {
                var state = response.getState();
                if (state === "SUCCESS") {                
                    var res =response.getReturnValue();
                   // alert('res ::'+JSON.stringify(res.salesErrorNameCount));
                      component.set("v.listOfRecords", res.salesErrorNameCount );
                     component.set("v.BatchRecords", res.invntryTransMaster );
                    var spinner = component.find('spinner');
        			$A.util.toggleClass(spinner, "slds-hide");
                }
                      });
            $A.enqueueAction(action);
    },
    
    
    
    
	handleErrorBatchIdEvent : function(component, event, helper) {
        alert('Inside Event');
         var parentId = Event.getParam('parentId');
        alert('parentId ::'+parentId);
		
	},
    backclick : function(component, event, helper) {
        var url = window.location.href; 
        window.history.back();
        return false;	
	}
})