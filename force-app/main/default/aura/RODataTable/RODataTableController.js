({
    jsLoaded: function(component, event, helper) {
        debugger;
        $('#sampleTable').DataTable();
    },
    
    doInit : function(component, event, helper) 
    {
        var action = component.get("c.getRODataTableValues");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state === 'SUCCESS'){
                component.set("v.dataValues", action.getReturnValue());
                // alert('1>>'+JSON.stringify(component.get("v.dataValues")));
            }
            
        });
        
        $A.enqueueAction(action);
    },
    handleClick : function(component, event, helper) 
    {
        var ROID = event.getSource().get("v.name");
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0,urlString.indexOf("/n/"));
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": CommunityBaseURL+"/n/Admin_Revise_Request?c__SOID=" + ROID
        });
        urlEvent.fire();        
    },
    navigateToSo : function(component, event, helper) {
        var recordId = event.target.dataset.soid;
        var navService = component.find("navService");
        var pageReference = {    
            "type": "standard__recordPage",
            "attributes": {
                "recordId": recordId, 
                "actionName": "view"
            }
        }
        navService.generateUrl(pageReference)
        .then($A.getCallback(function(url) {
            window.open(url,'_blank'); //this opens your page in a seperate tab here
        }), 
              $A.getCallback(function(error) {
                  console.log('error: ' + error);
              }));
    }
    
})