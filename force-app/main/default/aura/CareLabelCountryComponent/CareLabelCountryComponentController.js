({
    doInit:function(component, event, helper){
        //alert(component.get('v.selectedcountry'));
    },
     getSelectedCountryValue:function(component, event, helper){
        //helper.getCountryWithLanguage(component, event, helper);
        var changeTabColorCountryOfOrigin = component.getEvent("changeTabColorCountryOfOrigin");
         let LogoEvent = component.getEvent("loadMyEvent"); 
   LogoEvent.setParams({"Country" : component.get("v.selectedcountry")}); 
   LogoEvent.fire(); 
		changeTabColorCountryOfOrigin.fire();
    },
   
    FetchCountry:function(component, event, helper) {
        //var countrydata=component.get('v.LangCountryList')[0];
        //var countrySelectedData=component.find("checknames");
        var selectedData=new Object();
       selectedData.selectedcountry=component.get("v.selectedcountry");
       // alert('selectedData.selectedcountry>>'+selectedData.selectedcountry);
       /* selectedData.selectedlangList=[];
        for(var i=0;i<countrySelectedData.length;i++){
            if (countrySelectedData[i].get("v.value"))
            {
                var fieldName='Language'+(i+1)+'__c';
                selectedData.selectedlangList.push(countrydata[fieldName]);
            }
        }*/
        //alert(JSON.stringify(selectedData));
        /*for (var i = 0; i <countrydata.length; i++) {
            if (countrydata[i].selectedList == true) {
                component.set("v.countryOriginData",countrydata[i]);               
            }
        }*/
        component.set('v.countryOriginData',selectedData);
        component.set("v.viewisCountryModal", false);
        //alert('2');
    },
    viewFetchCountry:function(component, event, helper) {
        var selectedData=new Object();
        selectedData.selectedcountry=component.get("v.selectedcountry");
        component.set('v.viewCountryOriginData',selectedData);
    },
    handleSelected:function(component, event, helper) {
        
    },
     CloseCountrymodel : function(component, event, helper) {
		component.set("v.viewisCountryModal",false);  
	},
     clearData: function(component, event, helper) {
         component.set("v.selectedcountry",'-NONE-');
    }
})