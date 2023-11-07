({
    getUniqueParentProds : function(component, event, helper) {
        //alert('inside parent prod :');
        var action = component.get("c.getretailerName");
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                //alert(response.getReturnValue());
                component.set("v.retailerList", response.getReturnValue());
                //alert('inside parent prod res :' + response.getReturnValue());
                // component.set("v.totalPages", Math.ceil(response.getReturnValue().length/component.get("v.pageSize")));
                // component.set("v.currentPageNumber",1);
                //helper.buildData(component, helper);
            }
        });
        $A.enqueueAction(action);
    },
    
    getAccounts : function(component, event, helper) {
        var action = component.get("c.getorderToCompanyList");
        action.setCallback(this,function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var returnedResult = response.getReturnValue();
                //component.set("v.data", response.getReturnValue());
                //alert("Inside");
                for(var i=0; i<returnedResult.length; i++){
                    //alert("InsideLoop");
                    //alert(returnedResult[i].Parent_Product__c);
                    var rows = returnedResult[i];
                    if (rows.Parent_Product__c) rows.Parent_Product__r.Name = rows.Parent_Product__r.Name;
                    //alert("rows:"+rows.Parent_Product__r.Name);
                }
                // alert('inside child prod res :' + response.getReturnValue());
                component.set('v.proBunList', response.getReturnValue());
                
            }
        });
        $A.enqueueAction(action);
    },
    
})