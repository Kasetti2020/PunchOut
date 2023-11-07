({
    DeleteIndividualBuyerToAddress : function(component, event, helper) 
    {
          //alert('Inside DeleteIndividualBuyerToAddress before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
        	//alert('cmpEvent>>>'+cmpEvent);
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "DeleteBuyerToAdress"
            });
           
            cmpEvent.fire();
        	
    },
    
	selectDefailtBuyerToAddress : function(component, event, helper) 
    {
		 if(component.get('v.BillToLockedAddress.Is_Default__c'))
        {
            //alert('Inside child before event fire>>');
            var cmpEvent = component.getEvent("appEvent");
            cmpEvent.setParams({
                "rowIndex" : component.get('v.rowIndex') ,
                "flag" : "CheckDeafultBillToLockedAdress"
            });
            
            cmpEvent.fire();
            
        } 
      
	},
    
    
   
})