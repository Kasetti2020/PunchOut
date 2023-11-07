({
	getSOList : function(component, event, helper,page, NewOrders ,OrderUnderProcess) 
    {    
         console.log('NewOrders  4::'+NewOrders);
          console.log('OrderUnderProcess  5::'+OrderUnderProcess);
        var searchtxt =component.get("v.searchText");
       // alert('searchtxt:::'+searchtxt);
        page = page || 1;        
        var action = component.get("c.FetchMainettiOrderClone");  
        action.setParams({ "pageNumber" : page,
                          "searchtxt" : searchtxt,
                          "NewOrders" : NewOrders,
                          "OrderUnderProcess" : OrderUnderProcess });
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") {
                var spinner = component.find("spinner");
                $A.util.toggleClass(spinner, "slds-hide");
                
                var Res = response.getReturnValue();
                // alert('Res.length>>'+Res.length);
                if(Res.length <= 0){
                     //alert('accs Is Empty>>');
                    component.set("v.SOList",null);
                     var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title : $A.get("$Label.c.Error"),
                        message:$A.get("$Label.c.No_Sales_Order_Found"),
                        duration:' 2000',
                        key: 'info_alt',
                        type: 'info',
                        mode: 'pester'
                    });
                    toastEvent.fire();
                }
                else{
                    
                
                 //alert('accs>>'+JSON.stringify(Res));
                component.set('v.total', Res[0].total);
                component.set('v.page', Res[0].page);
                component.set('v.pages', Math.ceil(Res[0].total/Res[0].pageSize));
                component.set("v.SOList",Res);
                }
                //----New Logic to make IsDownLoaded True for Header if particular Printshop user SOLI are downloaded starts from here
           		 var SOLIWrapper = component.get("v.SOList");
                // alert('Total WrapperSize is>>'+SOLIWrapper.length);
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
                
                
                
                //alert('accsafterFilter>>>>'+JSON.stringify(component.get("v.SOList")));
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
        });
        
        $A.enqueueAction(action);
    },
    
    //--------------Commented on 27-Nov-2019-----------------------------
     /*
      updateSOStatus : function(component,event,selctedRec){
        alert('updateSelected');
      alert('selctedRec in helper'+selctedRec);
       var updateSOstatus = component.get("c.UpdateSOStatuts");
        //alert(updatestatus);
        updateSOstatus.setParams({
            SOId : selctedRec
        });
        updateSOstatus.setCallback(this,function(response){
            var state = response.getState();
            alert('state>>>>'+state);
           if(state == 'SUCCESS'){
               
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Success!",
                    "message": "The Status updated successfully",
                    "type":"SUCCESS"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
                
            }
            else if (state=="ERROR") {
                alert('ERROR');
            }
            
        });
        $A.enqueueAction(updateSOstatus);
      
    }*/
    
    //--------------Commented on 27-Nov-2019 till here -----------------------------
})