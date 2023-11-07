({
    doInit : function(component,event,helper) {
        var sizelist=component.get('v.sizelist');
       // alert('sizelist ::'+sizelist);
       // alert('sizeChartData ::'+ JSON.stringify(component.get('v.sizeChartData.EngSize1__c')));
        for(var i=0;i<sizelist.length;i++)
        {
            //sizelist[i].selectedsizechart=false;
            if(sizelist[i].Id==component.get('v.sizeChartData').Id){
                sizelist[i].selectedsizechart=true;
             component.set("v.selectedsizechart.EngSize1__c",sizelist[i].EngSize1__c);  
            }
        }
    },
    selectedSize:function(component,helper,event){
        var sizechartdata=component.get('v.sizelist');   
        for (var i = 0; i <sizechartdata.length; i++) {
            if (sizechartdata[i].selectedsizechart == true) {
                component.set("v.sizeChartData",sizechartdata[i]);               
            }
        }  
    },
    viewselectedSize:function(component,helper,event){
        var sizechartdata=component.get('v.sizelist');   
        for (var i = 0; i <sizechartdata.length; i++) {
            if (sizechartdata[i].selectedsizechart == true) {
                component.set("v.viewSizeChartData",sizechartdata[i]);               
            }
        }  
    },
    clearData: function(component, event, helper) {
    },
    handleSelected: function(component, event, helper) {
        var changeTabColorSizeChart = component.getEvent("changeTabColorSizeChart");
        changeTabColorSizeChart.fire();
        
        var radio=event.getSource().get("v.name");
        
        // var e=radio.Size__c;
        var e=radio.EngSize1__c;
        console.log(e);
        let LogoEvent = component.getEvent("loadMyEvent"); 
        LogoEvent.setParams({"Size" : e}); 
        LogoEvent.fire(); 
        
        var checkvalue = component.find("checknames");
        var resetValue = false;
        if (Array.isArray(checkvalue)) {
            checkvalue.forEach(function(checkbox){
                checkbox.set('v.value', resetValue);
            });  
        }
        else {
            checkvalue.set('v.value', resetValue);
        }
        event.getSource().set("v.value",true);
    },
    handlePicklistSelected: function(component, event, helper) {
        var changeTabColorSizeChart = component.getEvent("changeTabColorSizeChart");
        changeTabColorSizeChart.fire();
        
        var selectedsizechart=component.get("v.selectedsizechart");
        var sizechartdata=component.get('v.sizelist');  
        // alert('selectedsizechart ::'+selectedsizechart);
        for (var i = 0; i <sizechartdata.length; i++) {
            // alert('sizechartdata selectedsizechart ::'+sizechartdata[i].EngSize1__c);
            if (sizechartdata[i].EngSize1__c == selectedsizechart.EngSize1__c) {
                component.set("v.sizeChartData",sizechartdata[i]);  
               // alert('component.set("v.sizeChartData") :::'+component.get("v.sizeChartData"));
            }
        }
        
        
        component.set("v.viewisModalOpen", false);
        let LogoEvent = component.getEvent("loadMyEvent"); 
        // alert('LogoEvent= '+LogoEvent);
        LogoEvent.setParams({"Size" : selectedsizechart.EngSize1__c}); 
        LogoEvent.fire();  
        
        
        
    }
})