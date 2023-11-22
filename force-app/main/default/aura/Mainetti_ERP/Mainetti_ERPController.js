({
    init : function(component, event, helper) {

    },

    getValueFromLwc : function(component, event, helper) {
		component.set("v.inputValue1",event.getParam('value1'));
		component.set("v.inputValue2",event.getParam('value2'));
        console.log(event.getParam('value1'));
        console.log(event.getParam('value2'));
        // hide lwc component and show chikd aura component
        var comp = component.find('servicelwc');
        $A.util.removeClass(comp, "slds-show");
        $A.util.addClass(comp, "slds-hide");
        var myCmp = component.find("passaura");
        $A.util.removeClass(myCmp, "slds-hide");
        $A.util.addClass(myCmp, 'slds-show');  
	},

    backToLwc : function(component, event, helper){
        // hide aura component and show lwc component
        var comp = component.find('servicelwc');
        $A.util.removeClass(comp, "slds-hide");
        $A.util.addClass(comp, 'slds-show');
        var myCmp = component.find("passaura");
        $A.util.removeClass(myCmp, "slds-show");
        $A.util.addClass(myCmp, "slds-hide");
    },

    getData:function(component,event,helper){
        component.set("v.inputValue1",event.getParam('value1'));
		component.set("v.inputValue2",event.getParam('value2'));
		component.set("v.radioValue",event.getParam('value3'));

        console.log(event.getParam('value1'));
        console.log(event.getParam('value2'));
        console.log('Selected radio value-->'+event.getParam('value3'));

        var comp = component.find('servicelwc');
        $A.util.removeClass(comp, "slds-show");
        $A.util.addClass(comp, "slds-hide");
        var myCmp = component.find("passaura");
        $A.util.removeClass(myCmp, "slds-hide");
        $A.util.addClass(myCmp, 'slds-show'); 

    },
    fetchvalues:function(component, event, helper){
        component.set("v.inputValue1",event.getParam('param1'));
		component.set("v.inputValue2",event.getParam('param2'));

        var comp = component.find('servicelwc');
        $A.util.removeClass(comp, "slds-show");
        $A.util.addClass(comp, "slds-hide");
        var myCmp = component.find("passaura");
        $A.util.removeClass(myCmp, "slds-show");
        $A.util.addClass(myCmp, "slds-hide");
        var myOutComp = component.find("passoutputclone");
        $A.util.removeClass(myOutComp, "slds-hide");
        $A.util.addClass(myOutComp, "slds-show");
    },

    displayOutput : function(component, event, helper){
        var comp = component.find('servicelwc');
        $A.util.removeClass(comp, "slds-show");
        $A.util.addClass(comp, "slds-hide");
        var myCmp = component.find("passaura");
        $A.util.removeClass(myCmp, "slds-show");
        $A.util.addClass(myCmp, "slds-hide");
        var myOutComp = component.find("passoutputclone");
        $A.util.removeClass(myOutComp, "slds-hide");
        $A.util.addClass(myOutComp, "slds-show");
    },

   /* getValueFromLwc2 : function(component, event, helper) {
         component.set("v.jsonSample",event.getParam('value'));
		component.set("v.inputValue1",event.getParam('value1'));
		component.set("v.inputValue2",event.getParam('value2'));

        console.log(event.getParam('value'));
        console.log(event.getParam('value1'));
        console.log(event.getParam('value2')); 
     
        


        component.set("v.jsonSample",JSON.stringify({
            "TestCountry": "Australia",
            "ActionCode": "Validated",
            "CurrencyCode": "HKD",
            "Country": "SRI LANKA",
            "TestString": "ABC",
            "CurrencyCode1": "EUR",
            "MagNETLine": [
                {
                    "ShipToCountry": "100",
                    "ChildCurrency": "INR",
                    "Country": "SRI LANKA",
                    "CurrencyCode": "EUR",
                    "ModelId": "12212",
                    "ChildModelId": "33121"
                },
                {
                   "ShipToCountry": "India",
                    "ChildCurrency": "USD",
                    "Country": "SY",
                    "CurrencyCode": "EUR",
                    "ModelId": "12212",
                    "ChildModelId": "33121"
                }
            ]
        }));
		component.set("v.inputValue1",'Sales Order Request');
		component.set("v.inputValue2",'Mainetti (India) Pvt.Ltd');

        component.set("v.serviceRecId",event.getParam('value3'));
		component.set("v.actionName",event.getParam('value4'));
        console.log(event.getParam('value3'));
        console.log(event.getParam('value4'));


        //alert('attribute set');
         // hide lwc component and show chikd aura component
         var comp = component.find('servicelwc');
         $A.util.removeClass(comp, "slds-show");
         $A.util.addClass(comp, "slds-hide");
         var myCmp = component.find("passaura");
         $A.util.removeClass(myCmp, "slds-hide");
         $A.util.addClass(myCmp, 'slds-show'); 

	
	},*/


})