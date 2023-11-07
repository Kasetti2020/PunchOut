({
    doint : function(component, event, helper,page) {
        //alert('if');
         var spinner = component.find("spinner");
      // alert('NewOrders ::'+component.get("v.NewOrdersCheck"));
         var checkedValues = "";
       // alert('checkedValues ::'+checkedValues);
        $A.util.toggleClass(spinner, "slds-hide");
        //helper.getSOList(component, event, helper,page);
           helper.getSOList(component, event, helper,page,component.get("v.NewOrdersCheck"),component.get("v.OrderUnderProcessCheck"));
    },
    selectAll: function(component,event, helper){
        var slctCheck = event.getSource().get("v.value");
        var SOLI = component.get("v.SOList");
        console.log('1st'+JSON.stringify(SOLI));
        var solipush = [];
        if(slctCheck)
        {
            //alert('if');
            for(var i=0; i<SOLI.length; i++)
            {
                
                //alert('IsIsDownloaded>> '+SOLI[i].SO.IsDownloaded__c);
                if(!SOLI[i].IsDownLoaded)
                {
                    
                    SOLI[i].IsSelected= true;
                	solipush.push(SOLI[i]);
                }
                
                
            }
            
            component.set("v.SOList",SOLI); 
            console.log('last'+JSON.stringify(SOLI));
            
        }
        else
        {
            //alert('else');
            
            for(var i=0; i<SOLI.length ; i++)
            {
                SOLI[i].IsSelected = false;
                solipush.push(SOLI[i]);
            }
            component.set('v.SOList',solipush); 
        }
        
        
    },
    DownloadCSV:function(component, event, helper){
        
        var getCheckAllId = component.get("v.SOList");
        var SOLILIST = [];
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        var selctedRec = [];
        for (var i = 0; i < getCheckAllId.length; i++) {
            
            if(getCheckAllId[i].IsSelected == true )
            {
                selctedRec.push(getCheckAllId[i].SO.Id); 
                var SOLI = getCheckAllId[i].SOLI;
                for (var j = 0; j < SOLI.length; j++) 
                {
                    //alert('INside SOLI Iteration>>>'+SOLI[j].Id);
                    SOLILIST.push(SOLI[j].Id); 
                }
                
                
            }
            
        }
        if(selctedRec.length == 0){
            
           // component.set('v.ButtonDissable',True); 
            alert('Select atleast One Order ');
           return;
       }
        
        // helper.updateSOStatus(component,event,selctedRec);
        //alert('state before call');
        
       // alert('state before call');
        //alert('Final SOLILIST>>>>>'+SOLILIST);
        //alert('Final SOLILIST.length>>>>>'+SOLILIST.length);
        var action = component.get("c.SOStatutsupdate");
        action.setParams({ SOIds : JSON.stringify(selctedRec),SOLIIDS: JSON.stringify(SOLILIST)});
        
        action.setCallback(this, function(response) {
            var state = response.getState();
           //alert('state>>>'+state);
           //code changes on Download button to apply the status changes not the CSV hence commented the CSV #EHN 2.1 req by chandana 
            if (state === "SUCCESS") {
                 var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.Manufacturing_started_successfully"),
                        type: "success"
                    });
                    toastEvent.fire();
                 $A.get('e.force:refreshView').fire();
                //alert('selctedRec:::'+JSON.stringify(selctedRec));
                //alert('SOLILIST:::'+JSON.stringify(SOLILIST));
                /*var urlString = window.location.href;
                var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                var url = CommunityBaseURL+'/apex/GenerateMainettiOrder?ListId='+JSON.stringify(selctedRec)+'&SOLILIST='+JSON.stringify(SOLILIST);
                //urlString = CommunityBaseURL+"/apex/SOConfirmationPDF"+"?DefaultBillToID="+BillAdd.Id+"&DefaultShippToID="+ShipAdd.Id;
                window.open(url);*/
                
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            alert("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        alert("Unknown error");
                    }
                }
        });
        $A.enqueueAction(action);
    },
    
    
    pageChange: function(component, event, helper) {
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        //alert('page>>'+page);   
       // helper.getSOList(component, event, helper,page);
        //var checkedValues = "";
         helper.getSOList(component, event, helper,page,component.get("v.NewOrdersCheck"),component.get("v.OrderUnderProcessCheck"));
    },
    CreateShipment : function(component, event, helper) {
        
        component.set("v.ShipComp",true);
        component.set("v.ParentComp",false);
    },
    
    handleSearchEvent : function(component, event) {
       // alert('handleSearchEvent');
        var soList = event.getParam("POList");
        //alert('soList ::'+soList);
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var sertxt = event.getParam("searchtext");
      //  alert('sertxt ::'+sertxt);
        if(flag==true && type=='PrintShopSO'){
            component.set('v.total', soList[0].total);
            component.set('v.page', soList[0].page);
            component.set('v.pages', Math.ceil(soList[0].total/soList[0].pageSize));
            component.set("v.SOList",soList);
            component.set("v.searchText", sertxt);
            
             if(soList == '[]'){
                //alert('Inside POLI');
                 component.set("v.SOList",null);
            }
            
            //----New Logic to make IsDownLoaded True for Header if particular Printshop user SOLI are downloaded starts from here
            var SOLIWrapper = component.get("v.SOList");
            //alert('Total WrapperSize is>>'+SOLIWrapper.length);
            for(var i=0; i<SOLIWrapper.length; i++)
            {
                var InnerList = SOLIWrapper[i].SOLI;
                //alert('SOLILIst For So '+i +' is'+InnerList.length);
                for(var j=0; j<InnerList.length; j++)
                {
                    //alert('Inside innerlist Iteration>>>');
                    //alert('InnerList Is_Downloaded__c Flag '+InnerList[j].Name +' '+InnerList[j].Is_Downloaded__c);
                    if(InnerList[j].Is_Downloaded__c)
                    {
                        //alert('SOLIWrapper[i].IsDownLoaded true so need to break>>>');
                        SOLIWrapper[i].IsDownLoaded = true;
                        break;
                    }
                }
            }	
            
            //alert('Before assigning the Modified Wrapperlist to SOList');
             component.set("v.SOList",SOLIWrapper);
            //alert('After assigning the Modified Wrapperlist to SOList');
            
            //----New Logic to make IsDownLoaded True for Header if particular Printshop user SOLI are downloaded till here
            
        }
        else
            $A.get('e.force:refreshView').fire();
        //helper.getPOList(component, event, helper);
    },
    handleChangeOnChecked: function (component, event) {
        //alert(event.getParam('value'));  
         var checkedVal = event.getParam("value");
         component.set('v.checkboxValue', checkedVal);
         var getval = component.get("v.checkboxValue");
        //alert('getval ::'+getval); 
         var action = component.get("c.FetchMainettiOrderBasedOnCheckbox");
        action.setParams({ checkedValues : getval });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var Res = response.getReturnValue();
                // alert('accs>>'+JSON.stringify(Res));
                component.set('v.total', Res[0].total);
                component.set('v.page', Res[0].page);
                component.set('v.pages', Math.ceil(Res[0].total/Res[0].pageSize));
                component.set("v.SOList",Res);
            }
        });
         $A.enqueueAction(action);
                           
         //helper.getSOList(component, event, helper,page,checkedValues);
    },
    checkboxSelect: function(component, event, helper) {
         var spinner = component.find("spinner");
                $A.util.toggleClass(spinner, "slds-hide");
        // alert('checkboxSelect ::'+event.getSource().get('v.checked'));
        component.set("v.NewOrdersCheck",event.getSource().get('v.checked'));
        //alert('NewOrders ::'+component.get("v.NewOrders"));
        //alert('OrderUnderProcess ::'+component.get("v.OrderUnderProcess"));
        var page = component.get("v.page") || 1;
         helper.getSOList(component, event, helper,page,component.get("v.NewOrdersCheck"),component.get("v.OrderUnderProcessCheck"));
        
    },
    checkboxSelect1: function(component, event, helper) {
         var spinner = component.find("spinner");
                $A.util.toggleClass(spinner, "slds-hide");
        // alert('checkboxSelect ::'+event.getSource().get('v.checked'));
        component.set("v.OrderUnderProcessCheck",event.getSource().get('v.checked'));
        //alert('NewOrders ::'+component.get("v.NewOrders"));
        //alert('OrderUnderProcess ::'+component.get("v.OrderUnderProcess"));
        var page = component.get("v.page") || 1;
         helper.getSOList(component, event, helper,page,component.get("v.NewOrdersCheck"),component.get("v.OrderUnderProcessCheck"));
        
    },
})