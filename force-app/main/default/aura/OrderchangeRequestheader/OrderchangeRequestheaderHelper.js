({
	cancelHeaderhelper : function(component, event, helper) {
        //console.log('cancelHeader helper');
        var rowIndex = component.get("v.rowIndex");
        var ROrderheader = component.get("v.ROrderheader");
        var CancelLineReviseComponentEvent = component.getEvent("CancelLineReviseComponentEvent");
        CancelLineReviseComponentEvent.setParams({
            "index": component.get("v.rowIndex")
        });
        CancelLineReviseComponentEvent.fire();
        console.log('After cancelHeader');
    },
})