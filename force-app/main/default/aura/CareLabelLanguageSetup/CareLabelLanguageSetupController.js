({
    doInit : function(component, event, helper) {
        //alert('Inside doInit');  
        component.set('v.retailerID','');
        component.set('v.retailerName','');
        //alert('after setting null');  
         component.set('v.newflag', false);   
        
        
    },
    handleLookupEvent : function(component, event, helper) 
    {   
        if(event.getParam("objectAPIName") == "Retailer_Code__c")
        {
              component.set('v.newflag', true);
            helper.fetchExistingConfiguration(component, event, helper);
        }
    },
    retailerChangeEvent : function(component, event, helper)
    {
        
        component.set('v.newflag', true);
        if(component.get('v.retailerName'))
        {
            component.set('v.newflag', false);   
        }
    },
  /*  handleOnSuccess : function(component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "message": "The record has been updated successfully."
        });
        toastEvent.fire();
        component.set('v.newflag','false');
        component.set('v.retailerID',null);
    },*/
    handleOnSuccess : function(component, event, helper) {
        
        var lang1 = component.get("v.languageid1");
        var lang2 = component.get("v.languageid2");
        var lang3 = component.get("v.languageid3");
        var lang4 = component.get("v.languageid4");
        var lang5 = component.get("v.languageid5");
        var langlist=[];
        // alert('langlist>>'+langlist);
        if(JSON.stringify(langlist)== "[]")
        {
            // alert('lang1>>'+lang1);
            if(lang1!=undefined | lang1!=null | lang1!=''  ){
                langlist.push(lang1);   
            }else
            {
                langlist.push(null);  
            }
            if(lang2==null | lang2==''| lang2=='undefined'){
                langlist.push(null);   
            }
            else
            {
                langlist.push(lang2);  
            }
            if(lang3==null | lang3=='' | lang3=='undefined'){
                langlist.push(null);   
            }
            else
            {
                langlist.push(lang3);  
            }
            if(lang4==null | lang4==''| lang4=='undefined'){
                langlist.push(null);   
            }
            else
            {
                langlist.push(lang4);  
            }
            if(lang5==null | lang5=='' | lang5=='undefined'){
                langlist.push(null);   
            }
            else
            {
                langlist.push(lang5);  
            }
        }
        for(var i=1;i<langlist.length;i++)
        {
            //alert('testing>>');
            var long1= JSON.stringify(langlist[i-1]);
            var long2= JSON.stringify(langlist[i]);
            if((long1 =='""' | long1 == "null")&long2 != 'null')
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "type":"error",
                    "title": $A.get("$Label.c.Error"),
                    "message": $A.get("$Label.c.Please_Fill_Language_Details")
                });
                toastEvent.fire();
                return;
            }
        }
        var datafour=JSON.stringify(langlist[langlist.length-2]);
        // var datafive=JSON.stringify(langlist[langlist.length-2]);
        if( datafour == '""' &&  JSON.stringify(langlist[langlist.length-2])!='""')
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "type":"error",
                "title": $A.get("$Label.c.Error"),
                "message": $A.get("$Label.c.Please_Fill_Language_Details")
            });
            toastEvent.fire();
            return;
        }
        
        else{
            if(component.get('v.retailerID')!=null){
             helper.savelanguages(component, event, helper);    
            }else{
                var toastEvent = $A.get("e.force:showToast");
              toastEvent.setParams({
                "type":"error",
                "title": $A.get("$Label.c.Error"),
                "message": $A.get("$Label.c.Required_Retailer")
            });
            toastEvent.fire();
                
            }
           
        }
    },
    savingdata : function(component, event, helper) {
        helper.savelanguages(component, event, helper);
    }
    
    
})