({
	doInit : function(component, event, helper) {        
		var userId = $A.get("$SObjectType.CurrentUser.Id");
        if(userId=='' || userId==null)
        {
            //alert('if');
            component.set("v.banner",true);            
        }
        else
        {
            //alert('else');
            component.set("v.banner",false);
        }
	}
})