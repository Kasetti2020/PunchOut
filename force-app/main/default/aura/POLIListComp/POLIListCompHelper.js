({
	showHide : function(component) {
     
        component.set("v.isOpen",false);
        component.set("v.IsPOLI",false);
        
         //$A.get('e.force:refreshView').fire();
    },
    hidePoli : function(component) {
      component.set("v.IsPOLI",false);
        $A.get('e.force:refreshView').fire();
    }
})