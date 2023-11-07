({
    doInit : function(component,event,helper) {
        //var attrImg=component.get("v.attributeVar");
        //alert('attrImg'+attrImg);
        
        
        var Brandlist=component.get('v.Brandlist');
        //alert(JSON.stringify(Brandlist));
        for(var i=0;i<Brandlist.length;i++)
        {
            Brandlist[i].BrandIconCheckbox=false;
            if(Brandlist[i].Id==component.get('v.brandIcondata').Id)
                Brandlist[i].BrandIconCheckbox=true;
        }
    },
    onchangedSelected: function(component, event, helper) {
        var changeTabColorBrandIcon = component.getEvent("changeTabColorBrandIcon");
        changeTabColorBrandIcon.fire();
      
        
       var radio=event.getSource().get("v.name");
      
        var e=radio.Image__c;
        console.log('e ;;' +e);
        let LogoEvent = component.getEvent("loadMyEvent"); 
   LogoEvent.setParams({"Imge" : e}); 
   LogoEvent.fire(); 
        var checkBrandvalue = component.find("checkBrandNames");
         
        var resetCheckboxValue = false;
        if (Array.isArray(checkBrandvalue)) {
            checkBrandvalue.forEach(function(checkbox) {
                checkbox.set('v.value', resetCheckboxValue);
            });  
        }
        else {
            checkBrandvalue.set('v.value', resetCheckboxValue);
        }
        event.getSource().set("v.value",true);
    },
    selectedBrand :function(component,helper,event){        
        var brandIcondata=component.get('v.Brandlist');
        for (var i = 0; i <brandIcondata.length; i++) {
            if (brandIcondata[i].BrandIconCheckbox == true) {
                component.set("v.brandIcondata",brandIcondata[i]);                
            }
        }
    },
    viewSelectedBrand:function(component,helper,event){        
        var brandIcondata=component.get('v.Brandlist');
        for (var i = 0; i <brandIcondata.length; i++) {
            if (brandIcondata[i].BrandIconCheckbox == true) {
                component.set("v.viewBrandIcondata",brandIcondata[i]);
                //var resp={'WhichData':'brandIcondata','Data':brandIcondata[i]}
                //return resp;
            }
        }
    },
    clearData: function(component, event, helper) {
    },
    magnifyMain : function(component, event,helper)
    {
        helper.magnifyMain(component, event,helper);
        
    },
    magnifySub : function(component, event,helper)
    {
        helper.magnifySub(component, event,helper);
        
    },
    magnifyMainleave : function(component, event,helper)
    {
        helper.magnifyMainleave(component, event,helper);
    },
    magnifySubleave : function(component, event,helper)
    {
        helper.magnifySubleave(component, event,helper);
    }
    
})