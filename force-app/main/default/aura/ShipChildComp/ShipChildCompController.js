({
	myAction : function(component, event, helper) {
		
	},
    toggle: function(component, event, helper) {
        var items = component.get("v.SHList"); 
        var chevronright = component.find('chevronright');
        var chevrondown = component.find('chevrondown');
        
        $A.util.toggleClass(chevronright, 'slds-hide');
        $A.util.toggleClass(chevrondown, 'slds-hide');
        var getAttributeValue = component.get("v.checkThis");
        if(getAttributeValue==true){
            component.set("v.checkThis", false);
            component.set('v.expanded',true);
        }
        else{
            component.set("v.checkThis", true);
            component.set('v.expanded',false);
        }
       
    },
})