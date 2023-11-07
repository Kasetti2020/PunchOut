({
    navigateToRecord : function(component, event, helper,recordId) {
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