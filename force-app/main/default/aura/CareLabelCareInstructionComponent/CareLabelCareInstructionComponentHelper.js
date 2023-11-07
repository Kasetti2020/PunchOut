({
	tabcolorSel : function(component, event,helper) {
        var cmpTarget = component.find('tabset');
        //alert(component.get("v.selectedCarTabId"));
        var tabIndex = component.get("v.selectedCarTabId").split("-");
        //alert(tabIndex[1]);
        $A.util.addClass(cmpTarget, 'tabset'+tabIndex[1]);
		
	},
    tabcolorRemove : function(component, event,helper) {
        var cmpTarget = component.find('tabset');
        //alert(component.get("v.selectedCarTabId"));
        var tabIndex = component.get("v.selectedCarTabId").split("-");
        //alert(tabIndex[1]);
        $A.util.toggleClass(cmpTarget, 'tabset'+tabIndex[1]);
		
	},
    
})