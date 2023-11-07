({
    doInit : function(component, event, helper)
    {
        
    },
    handleLookupEvent : function(component, event, helper) 
    {
        // alert('TESTING1'+event.getParam("objectAPIName"));
        var test=event.getParam("objectAPIName");
       // alert('objectAPIName>>>'+test);
        //alert('value>> '+event.getParam("objectAPIName")=='Price_Specification_Book_Product__c');
       // if(event.getParam("objectAPIName")=='Price_Specification_Book_Product__c')
       // {
            
            if(component.get('v.productID')!=null  && component.get('v.retailerID')!=null )
            {
                helper.fetchExistingConfiguration(component, event, helper);
                //component.set("v.configuratorFlag",true);
            }
        
    },
    productChangeEvent : function(component, event, helper)
    {
       // alert('test'+component.get('v.productName'));
        if(component.get('v.productName'))
        {
             component.set("v.configuratorFlag",false);
        }
    },
    retailerChangeEvent : function(component, event, helper)
    {
        if(component.get('v.retailerName'))
        {
            component.set("v.configuratorFlag",false);
            component.set("v.productID",null);
        }
    },
	configuratorLoad : function(component, event, helper) 
    {
    },
    configuratorSubmit : function(component, event, helper) 
    {
        //var fields = event.getParam("fields");
        //fields["Brand_Icon__c"])
        
		/*
		var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
			"type":"warning",
			"title": "Warning!",
			"message": "Received Data and Time is mandatory"
		});
		toastEvent.fire();
		event.preventDefault();
		return;
		*/
    },
    configuratorSuccess : function(component, event, helper) 
    {
    },
    closeConfigurator : function(component, event, helper) 
    {
       // alert('Test4');
        component.set("v.configuratorFlag",false);
    },
    
    submitConfigurations : function(component, event, helper) {
		  helper.saveTheConfigurations(component, event, helper);
	},
    onCheck: function(component, event, helper) 
    {
        var checkval = component.find("checkbox").get("v.value");
        if(checkval===false){
            //alert('checkval>>1');
             component.set("v.config.RN_Number__c",false);
             component.set("v.config.Style_Number__c",false);
             component.set("v.config.Lot_Number__c",false);
             component.set("v.config.Care_Instruction__c",false);
             component.set("v.config.Packaging_Code__c",false);
             component.set("v.config.Labelling_Code__c",false);
             component.set("v.config.Season_Month__c",false);
             component.set("v.config.Season_Year__c",false);
             component.set("v.config.Supplier_Number__c",false);
             component.set("v.config.Item_Number__c",false);
             component.set("v.config.Season_Year__c",false);
        }
    },
        
    
        
       cancelmethod : function(component, event, helper) 
        {
            component.set("v.configuratorFlag",false);
            component.set("v.retailerID", '');
        },            
     
    

})