({ 
    doInit : function(component, event,helper,page) 
    {
          helper.GetcustomInfoid(component, event, helper);
        var res = helper.pickListVal(component,component.get("v.SelectedRetailer"),'Retailer_Code_Hidden__c','Order_Country__c');
        helper.getCartCount(component, event, helper);
         component.set('v.selectedCompany',component.get("v.selectedCompany"));
         helper.pickListVal(component,component.get("v.selectedCompany"),'Order_Country__c','Preferred_Currency__c');
         component.set('v.selectedCurrency',component.get("v.selectedCurrency"));
        var currentUrl = window.location.href;
        var sParameterName = currentUrl.split('=');
        //window.sessionStorage.setItem("key",sParameterName[1]);
       // var retrievedValue = window.sessionStorage.getItem("key");
        
       // component.set("v.recordId", sParameterName[1]);

        // Store in localStorage
        window.localStorage.setItem("recordUrlId", sParameterName[1]);
       // alert(sParameterName[1]);
    },
    //Product seach functon
    Search: function(component, event, helper) 
    {
        component.set("v.page",1);
        helper.productSearch(component, event, helper);
    },
    
     //Family seach functon
    Family: function(component, event, helper) 
    {
        component.set("v.page",1);
        helper.productFamily(component, event, helper);
    },
    
    
    
    //tab selction with respective product list
    selectTab : function(component, event, helper) 
    {
         component.set("v.showSpinner",true);
        helper.toCheckSORetailer(component, event, helper,event.getSource().get('v.id'));  
        component.set("v.viewbulk",true);
        component.set("v.selectedFamily",'NULL');
        component.set("v.displayPagination",true);
        component.set("v.catalogVertical",true);
        component.set("v.catalogOrder",false);
        component.set("v.sizerhanger",false);
        component.set("v.careLabelOrder",false);
        component.set("v.logo",false);
          component.set("v.selectedCompany",component.get("v.selectedCompany"));
        
    },
    //pagination code
    pageChange: function(component, event, helper) {
        //var spinner = component.find('spinner');
        //$A.util.toggleClass(spinner, "slds-hide");
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        component.set("v.page",page);
        
        if(component.get("v.isSearch"))
        {
            helper.productSearch(component, event, helper);
        }
        else
        {
            helper.toGetTabData(component, event, helper,component.get("v.selectedTab"));
        }
    },
    //catalog shipping
    Shipcmp:function(component, event, helper) {
        component.set("v.parentcmp",false);
        component.set("v.isShipcmp",true);
         component.set("v.logo",false);
    },  
    //function helps to hide the increment and  decrement of number field
    afterRender: function (component, event, helper) {
        this.superAfterRender();
        
        //disable up, down, right, left arrow keys
        window.addEventListener("keydown", function(e) {
            if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
        
        //disable mousewheel
        window.addEventListener("mousewheel", function(e) {
            e.preventDefault();
        }, false);
        
        window.addEventListener("DOMMouseScroll", function(e) {
            e.preventDefault();
        }, false);
        
    },
    //order to company picklist
    OrderToCompany:function(component, event, helper)
    {
        var compName = event.getSource().get("v.value");
        helper.pickListVal(component,compName,'Order_Country__c','Preferred_Currency__c');
        helper.productSearch(component, event, helper);
    },
    //preferred to currency picklist
    preferredCurrency:function(component, event, helper)
    {
        component.set('v.selectedFamily','NULL');
        var templist = [];
        component.set('v.fieldList',templist);
        helper.productSearch(component, event, helper);
    },
    //event call based on vartical and family to retailer block
    handleCatalogEvent:function(component, event, helper){
        var flag = event.getParam("flag");
        if(flag=='BlockRetailer')
        {
            component.set('v.cartFlag',true);
        }
        else if(flag=='fromSizer'||flag=='fromLabel')
        {  
            helper.productSearch(component, event, helper);
        }
            else if(flag=='allSizerRemoved' && !component.get('v.CartCount'))
            {
                component.set('v.cartFlag',false);
            }
    },
    //bulk add to cart
    bulkAdd:function(component,event,helper)
    {
          component.set('v.disableBulkAdd',true);
        
       // alert('bulkAdd');
        var bulkadd='';
        if(component.get('v.selectedTab')=='Hanger Business')            
        {
            bulkadd = component.find("hangerBulkaddId");
        }
        else if(component.get('v.selectedTab')=='Flexible Packaging')
        {
            bulkadd = component.find("fexyBulkaddId");
        }
            else if(component.get('v.selectedTab')=='TLA')
            {
                bulkadd = component.find("tlaBulkaddId");
            }
                else if(component.get('v.selectedTab')=='INTELLIGENT SOLUTIONS')
                {
                    bulkadd = component.find("rfidBulkaddId");
                }
                    else if(component.get('v.selectedTab')=='Labels & Tickets')
                    {
                        bulkadd = component.find("labelBulkaddId");
                    }
                    else if(component.get('v.selectedTab')=='MCare')
                    {
                        bulkadd = component.find("MCareId");
                    }
    var status=bulkadd.getBulkData();
},
    logoshow : function (component, event, helper) {
        component.set("v.logo",false);
    },
    getValueFromApplicationEvent : function(component, event, helper) {
         var closelogo = component.get("v.closelogo");
       // alert('closelogo ::'+closelogo);
        if(closelogo == true){
        component.set("v.logo",true);
          var SelectedImg = event.getParam('Imge');
        console.log('SelectedImg :: '+SelectedImg);
         var SelectedSize = event.getParam('Size');
        console.log( 'SelectedSize ::'+SelectedSize);
         var SelectedFabricArray = event.getParam('FabricArray');
          console.log(''+SelectedFabricArray);
        var SelectedCountry = event.getParam('Country');
       // alert(' SelectedCountry ::'+SelectedCountry);
        console.log('SelectedCountry ::'+SelectedCountry);
        var SelectedInstImage = event.getParam('SelectedInstImage');
          console.log('SelectedInstImage'+SelectedInstImage);
             var ExCareIns = event.getParam('ExCareIns');
          console.log(ExCareIns);
        var FreeText = event.getParam('FreeText');
        //alert(' FreeText ::'+FreeText);
             var JSONStr = JSON.stringify(FreeText);
        console.log( 'FreeText ::'+FreeText);
        console.log('JSONStr ::'+JSONStr);
        var LogoGeneratorURL = event.getParam('LogoGeneratorURL');
       // alert('LogoGeneratorURL ::'+LogoGeneratorURL);
          console.log(LogoGeneratorURL);
           
        if(SelectedImg != null){
       component.set("v.SelectedImage",SelectedImg);
        component.set("v.Devlogo",true);
        }
        if(SelectedSize != null){
           component.set("v.Selectedsize",SelectedSize);
            if(component.get("v.Selectedsize")){
                component.set("v.DevSize",true);
            }else{
                 component.set("v.DevSize",false);
            }
           
        }if(SelectedFabricArray != null){
            component.set("v.SelectedFabricArray",SelectedFabricArray);
            var a = component.get("v.SelectedFabricArray");
            if(a[0]){
                component.set("v.DevFabric",true);
            }else{
                 component.set("v.DevFabric",false);
            }
           
        }if(SelectedCountry != null){
            component.set("v.SelectedCountry",SelectedCountry);
            if(SelectedCountry =='-NONE-'){
                component.set("v.DevCountry",false);
            }else{
                component.set("v.DevCountry",true);
            }
             
        }if(SelectedInstImage != null){
            component.set("v.SelectedInstImage",SelectedInstImage);
            
            var a = component.get("v.SelectedInstImage");
            if(a[0]){
                 component.set("v.DevCare",true);
            }else{
                 component.set("v.DevCare",false);
            }
           
        }if(ExCareIns != null){
            component.set("v.ExCareIns",ExCareIns);
            
             var a = component.get("v.ExCareIns");
            if(a[0]){
                 component.set("v.DevExcare",true);
            }else{
                 component.set("v.DevExcare",false);
            }
             
        }if(FreeText != null){
            component.set("v.FreeText",FreeText);
             component.set("v.DevFree",true);
        }if(LogoGeneratorURL != null){
            component.set("v.LogoGeneratorURL",LogoGeneratorURL);
            
        }
    }
    },
    
     getValuesFromChildCmp : function(component, event, helper) {
       var buttonDisabled = event.getParam('buttonDisabled');
        
      //  alert('buttonDisabled :: '+buttonDisabled);
          component.set("v.disableBulkAdd",buttonDisabled);
         
     },
    hideLogoGeneration : function(component, event, helper) {
         var closelogo = event.getParam('closelogo');
       // alert('closelogo :: '+closelogo);
        component.set("v.closelogo",closelogo);
    }
})