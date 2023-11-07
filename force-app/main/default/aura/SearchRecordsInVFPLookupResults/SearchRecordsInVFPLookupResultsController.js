({
    selectRecord : function(component, event, helper){      
        // get the selected record from list  
        var getSelectRecord = component.get("v.selectedStoreId");
       // alert("getSelectRecord:"+getSelectRecord.Name);
        //var JSONStr = JSON.stringify(getSelectRecord); 
         //alert("JSONStr:"+JSONStr);
        // call the event   
        var compEvent = component.getEvent("storeIddataEvent");
        //alert('compEvent :'+compEvent);
        // set the Selected sObject Record to the event attribute.  
        compEvent.setParams({"recordByEvent" : getSelectRecord
                            });  
        // fire the event  
        compEvent.fire();
    },
  })