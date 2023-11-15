({
    toGetcustomerData:function(component, event,helper){
        //alert('hii');
        var action1 = component.get("c.FetchCustData");
        action1.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                component.set("v.DisplayCustDetail", response.getReturnValue().Customer_Information__c);
                //alert('displaycustdetails>>'+component.get("v.DisplayCustDetail"));
                var actiongetcart = component.get("c.getAllCartDetails");
                var custid =component.get("v.DisplayCustDetail");
                actiongetcart.setParams({ 
                    "customerid": custid
                });
                actiongetcart.setCallback(this, function(response){
                    var state = response.getState();
                    if (state === "SUCCESS") { 
                        if(response.getReturnValue()!= null)
                        {
                            component.set('v.CartValue',response.getReturnValue().length);
                            component.set('v.DisplayCartDetail',response.getReturnValue());
                            //alert( component.get('v.DisplayCartDetail').Id);
                            //Added By Raghu On 12/11/2021 starts
                            //To get the Total Order Amount
                            var totalAmmount =0;
                                for(let i=0;i<response.getReturnValue().length;i++){
                                    totalAmmount += component.get("v.DisplayCartDetail")[i].TotalPriceByCurrency;
                                }
                                totalAmmount = totalAmmount.toFixed(2);
                                totalAmmount = Number(totalAmmount).toLocaleString(undefined, {minimumFractionDigits: 2});
                            component.set('v.renderTotalAmmount',false);
                            component.set('v.renderTotalAmmount',true);
                            component.set('v.TotalOrderAmmount',totalAmmount);
                            component.set('v.CurrencyIso',component.get("v.DisplayCartDetail")[0].CurrencyIsoCode);
                            component.set('v.loaded',false);
                           //Added By Raghu On 12/11/2021 ends
                                //alert(component.get("v.DisplayCartDetail")[0].orderUom);
                            //ENC 2.1 ## Added to show remarks based on retailer code remarks 
                            if(component.get('v.CartValue') !=0)
                            {
                                component.set('v.showremarks',component.get("v.DisplayCartDetail")[0].showremarks);
                                component.set("v.ShowPriceInOrder",component.get("v.DisplayCartDetail")[0].ShowPriceInOrder);
                            }
                        }
                        else
                        {
                            if(component.get('v.CartValue') == 0)
                            {
                                component.set("v.HideButtons",false);
                            } 
                            var toastEvent = $A.get("e.force:showToast");
                            toastEvent.setParams({
                                title: $A.get("$Label.c.Warning"),
                                message: $A.get("$Label.c.No_Product_in_Cart"),
                                type: "warning"
                            });
                            toastEvent.fire();
                            component.set('v.loaded',false);
                        }
                        
                    }
                   // var spinner = component.find('spinner');
                   // $A.util.toggleClass(spinner, "slds-hide");
                });
                $A.enqueueAction(actiongetcart); 
                
            }
        });
        $A.enqueueAction(action1);
        
      
        
    },
    // Added by mahadevaprasad on 07/11/2023 starts
    punchOutmethod:function(component, event,helper){
         //alert('punchOut');
         var currentUrl = window.location.href;
        var sParameterName = currentUrl.split('=');
        alert(sParameterName[1]);
        var action = component.get("c.punchOutMethod");
        action.setParams({ recordId : sParameterName[1] });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
               // alert("From server: " + response.getReturnValue());
                var resultvalue=response.getReturnValue();
                alert(resultvalue);
                if(resultvalue=='create'){
                    component.set('v.isOperation',true);
                   
                } else  if(resultvalue=='edit'){
                    component.set('v.isOperation',true);
                     
                }
                else  if(resultvalue=='inspect'){
                    component.set('v.isOperation',false);
                   
                    
                }
                  
                
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
    // Added by mahadevaprasad on 07/11/2023 ends
    toDeleteProductCart:function(component, event,helper,index) {
        var CartDisplay =component.get('v.DisplayCartDetail');
        //On delete set the correct value to total Order Amount Added By Raghu On 12/11/2021 starts
         //var temp = component.get('v.TotalOrderAmmount') - CartDisplay[index].TotalPriceByCurrency;
         //let numberFormat = new Intl.NumberFormat('en-US',{minimumFractionDigits:2});
         //temp= numberFormat.format(temp);
        //Added By Raghu On 12/11/2021 ends
        var action = component.get("c.deleteProductFromCart");
        action.setParams({ 
            "soliId": CartDisplay[index].Id,
            "soId":CartDisplay[index].SOid
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set('v.CartValue',response.getReturnValue().length);
                component.set("v.DisplayCartDetail", response.getReturnValue());
                // To refresh the component after delete Added By Raghu On 12/11/2021 starts
                this.toGetcustomerData(component, event,helper);
               //component.set('v.TotalOrderAmmount',temp);
               //To refresh the TotalOrderAmmount attribute
              // component.set('v.renderTotalAmmount',false);
               //component.set('v.renderTotalAmmount',true);
               //component.set('v.CurrencyIso',component.get("v.DisplayCartDetail")[0].CurrencyIsoCode);
               // Added By Raghu On 12/11/2021 ends
                if(component.get("v.CartValue") == 0)
                {
                    component.set("v.HideButtons",false);
                }
                
            }
        });
        $A.enqueueAction(action);
    },
    UpdateCart:function(component, event,helper) {
        
        var index=event.getSource().get("v.name");
        var updatedQuantity=event.getSource().get("v.value");
        var proName;
        var qtyval;
        var temp= component.get("v.DisplayCartDetail");
        for(var i=0;i<temp.length;i++)
        {
            //code to add the upper limit of box quantity by chandana  
            var newqty= temp[i].Quantity;
			var result = Math.ceil(temp[i].Quantity/temp[i].boxquantity)*temp[i].boxquantity;
            var boxqty = temp[i].boxquantity;
            var rem = ((newqty) % boxqty);
            if(newqty < temp[i].MOQ && temp[i].boxquantity && rem!=0 && temp[i].fullboxQty == true)
            {
                //alert('inside MOQ and Box');
				result = Math.ceil(temp[i].MOQ/temp[i].boxquantity)*temp[i].boxquantity;
				if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code")+temp[i].PSBP+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( temp[i].MOQ ) + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                    {
                        temp[i].Quantity = result;
                        proName = temp[i].Name;
                        component.set('v.DisplayCartDetail',temp);
                    }
                    else{
                        return;
                    }
            }
            else if(newqty < temp[i].MOQ && temp[i].boxquantity &&(temp[i].MOQ<temp[i].boxquantity || temp[i].MOQ % temp[i].boxquantity!=0) && temp[i].fullboxQty == true)
            {
                //alert('inside MOQ and Box');
				result = Math.ceil(temp[i].MOQ/temp[i].boxquantity)*temp[i].boxquantity;
				if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code")+temp[i].PSBP+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( temp[i].MOQ ) + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                    {
                        temp[i].Quantity = result;
                        proName = temp[i].Name;
                        component.set('v.DisplayCartDetail',temp);
                    }
                    else{
                        return;
                    }
            }
			else if(newqty < temp[i].MOQ )
            {
                //alert('inside MOQ');
				if (confirm($A.get("$Label.c.Entered_value_for_Mainetti_Model_Code")+temp[i].PSBP+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( temp[i].MOQ ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( temp[i].MOQ ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                    {
                        temp[i].Quantity = temp[i].MOQ;
                        proName = temp[i].Name;
                        component.set('v.DisplayCartDetail',temp);
                    }
                    else{
                        return;
                    }
			}
			//only for box quantity 
            else if(temp[i].boxquantity)
            {
                //alert('inside Box');
                //alert('inside temp>>'+temp[i].boxquantity);
                var boxqty = temp[i].boxquantity;
                var rem = ((newqty) % boxqty);
                //alert(rem);
                if(rem!=0 && temp[i].fullboxQty == true)
                {
                    //alert('inside rem');
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code")+temp[i].PSBP+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                    {
                        temp[i].Quantity = result;
                        proName = temp[i].Name;
                        component.set('v.DisplayCartDetail',temp);
                    }
                    else{
                        return;
                    }
                }
                if(!newqty || newqty<=0)
                {
                    temp[i].Quantity = boxqty;
                }
            }
            if(!newqty || newqty<=0)
            {
                qtyval = temp[i].Quantity;
            }
        }
        component.set('v.DisplayCartDetail',temp);
        if(qtyval || qtyval<=0 )
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Entered_Product_Quantity_is_not_valid"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        else{
            var CartDisplay =JSON.stringify(component.get('v.DisplayCartDetail'));
            var action = component.get("c.updateCartValue");
            action.setParams({ 
                "solilistjson":CartDisplay
            });
            action.setCallback(this, function(response){
                var state = response.getState();
                if (state === "SUCCESS") 
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.Cart_Updated_Successfully"),
                        type: "success"
                    });
                    toastEvent.fire();
                    this.toGetcustomerData(component, event,helper); // After update, To Refresh the view calling toGetcustomerData Added By Raghu On 12/11/2021 
                }
                else if (state === "INCOMPLETE") {
                    // do something
                }
                    else if (state === "ERROR") 
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Error"),
                            message: $A.get("$Label.c.Contact_System_Admin"),
                            type: "Error"
                        });
                        toastEvent.fire();
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                console.log("Error message: " + 
                                            errors[0].message);
                            }
                        } 
                        else {
                            console.log("Unknown error");
                        }
                    }
            });
            $A.enqueueAction(action);
        }
        component.set("v.PlaceorderBtn",false);
        var PlaceorderBtn=component.find('placeorder');
        $A.util.removeClass(PlaceorderBtn, 'slds-button_disabled');
    },
    
    CalBoxQty:function(component, event,helper) 
    {
        //alert('CalBoxQty>>'+JSON.stringify(component.get("v.DisplayCartDetail")));
        var proName;
        var qtyval;
        var temp= component.get("v.DisplayCartDetail");
        for(var i=0;i<temp.length;i++)
        {
            //code to add the upper limit of box quantity by chandana 
            var result = Math.ceil(temp[i].Quantity/temp[i].boxquantity)*temp[i].boxquantity;
           	var newqty= temp[i].Quantity;
            if(temp[i].boxquantity)
            {
                var boxqty = temp[i].boxquantity;
                var rem = ((newqty) % boxqty);
                if(rem!=0 && temp[i].fullboxQty == true)
                {
                    temp[i].Quantity = result;
                    proName = temp[i].Name;
                    break;
                }
                else if(!newqty || newqty<=0)
                {
                    temp[i].Quantity = boxqty;
                }
            }
        }
        if(proName)        
        {
            component.set('v.DisplayCartDetail',temp);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.One_of_the_entered_Quantity_is_not_the_multiple_of_box_quantity_Click_Update_Ca"),
                type: "warning"
            });
            toastEvent.fire();
            component.set("v.PlaceorderBtn",true);
            return;
        }
        if(qtyval){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Entered_Product_Quantity_is_not_valid"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        else
        {
            component.set("v.GetAddress",true);
        }
        
    },
    checkingAddAndCloneData:function(component,event,helper,custid) 
    { 
        console.log('checkingAddAndCloneData>>');
        
        var AddandCloneData=component.get('c.checkLengthAddAndCloneDataToDelete');
        AddandCloneData.setParams({
            "customerid": custid
        });
        AddandCloneData.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                if(response.getReturnValue().length>0)
                {
                    component.set("v.confirmdataSection",true);
                    if (confirmdata) 
                    {
                        component.set("v.GetAddress",false);
                        component.set("v.parentcmp",true);
                        component.set("v.Shipcmp",false);
                        var urlString = window.location.href;
                        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                        window.location = CommunityBaseURL+'/s/catalog-order';
                    }
                    else
                    {
                        var deleteData=component.get('c.checkAddAndCloneDataToDelete');
                        deleteData.setParams({
                            "customerid": custid
                        });
                        deleteData.setCallback(this, function(response) {
                            var state = response.getState();
                            if(state === 'SUCCESS'){
                                this.CalBoxQty(component, event,helper);
                            }
                            else if(state === 'ERROR'){
                                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
                            }
                        })
                        $A.enqueueAction(deleteData);
                    }
                }
                else
                {
                    this.CalBoxQty(component, event,helper);
                }
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(AddandCloneData);
    },
    confirmdata:function(component,event,helper,custid)
    {
        //alert('confirmdata');
        component.set("v.GetAddress",false);
        component.set("v.parentcmp",true);
        component.set("v.Shipcmp",false);
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        //alert(CommunityBaseURL+'/s/catalog-order')
        window.location = CommunityBaseURL+'/s/catalog-order';
    },
    deleteData:function(component,event,helper,custid)
    {         
        var AddandCloneData=component.get('c.checkLengthAddAndCloneDataToDelete');
        AddandCloneData.setParams({
            "customerid": custid
        });
        AddandCloneData.setCallback(this, function(response) {
            var state = response.getState();
            //alert(response.getState());
            if(state === 'SUCCESS'){
                //alert(response.getReturnValue().length);
                if(response.getReturnValue().length>0)
                {                    
                    var deleteData=component.get('c.checkAddAndCloneDataToDelete');
                    //alert('???'+JSON.stringify(component.get('c.checkAddAndCloneDataToDelete')));
                    deleteData.setParams({
                        "customerid": custid
                    });
                    deleteData.setCallback(this, function(response) {
                        var state = response.getState();
                        //alert(response.getState());
                        if(state === 'SUCCESS'){
                            this.CalBoxQty(component, event,helper);
                            //component.set("v.GetAddress",true);
                        }
                        else if(state === 'ERROR'){
                            alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
                        }
                    })
                    $A.enqueueAction(deleteData);
                }
                
                else
                {
                    this.CalBoxQty(component, event,helper);
                }
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(AddandCloneData);
        // alert('data>>'+JSON.stringify(AddandCloneData));
        component.set("v.confirmdataSection",false);
    },
    ClearCart:function(component, event,helper) 
    {
        //var CustomerID=component.get('v.DisplayCustDetail');
        var action1 = component.get("c.ClearCartDetails");
        /*action1.setParams({ 
            "customerid":CustomerID
        });*/
        action1.setCallback(this, function(response){
            var state = response.getState();
            
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.success"),
                    message: $A.get("$Label.c.Cart_Cleared_Successfully"),
                    type: "success"
                });
                toastEvent.fire();
                $A.get('e.force:refreshView').fire();
            }
            else if (state === "INCOMPLETE") {
                // do something
            }
                else if (state === "ERROR") 
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Error"),
                        message: $A.get("$Label.c.Contact_System_Admin"),
                        type: "Error"
                    });
                    toastEvent.fire();
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                            console.log("Error message: " + 
                                        errors[0].message);
                        }
                    } 
                    else{console.log("Unknown error");}
                }
        });
        $A.enqueueAction(action1);
    },
    getWrapperDataForView: function(component,event,helper,viewInd,soliId){
        //alert("DisplayCartDetail>>"+component.get("v.DisplayCartDetail")[viewInd].ProductId);
       // alert("viewInd"+viewInd);
        var action = component.get("c.getWrapperData");
        action.setParams({
            "retailerCode": component.get("v.SelectedRetailer"),
            "productname":component.get("v.DisplayCartDetail")[viewInd].ProductId,//prodid
            "customerid": component.get('v.DisplayCustDetail'),
        }); 
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS'){
                var mainwrapper = response.getReturnValue();
                component.set("v.itemMasterForView",mainwrapper.itemMaster);
                component.set("v.picvalueForView",mainwrapper.LangCombList);
                component.set("v.BrandlistForView",mainwrapper.BrandIcon);
                component.set("v.sizelistForView",mainwrapper.sizechart);
                component.set("v.lstcmpnameForView",mainwrapper.FabricComponent);
                component.set("v.lstfabnameForView",mainwrapper.MaterialComponent);
                component.set("v.lstcountrynameForView",mainwrapper.CountryofOrigin);
                component.set("v.selectedcountryForView",mainwrapper.LangCountryList);
                component.set("v.CareinstructionForView",mainwrapper.Careinstruction);
                console.log('CareLabelOrder'+JSON.stringify(component.get('v.CareinstructionForView')));
                component.set("v.ExcareinstructionForView",mainwrapper.Excareinstruction);
                component.set("v.ExcarecmpnameForView",mainwrapper.ExcarePosition);
                component.set("v.picvalue",mainwrapper.LangCombList);
                if(mainwrapper.careLabelSelectedDataList != null){
                    console.log("soliId>>"+soliId);
                    for(var i=0;i<mainwrapper.careLabelSelectedDataList.length;i++){
                        var selectedSoliId = mainwrapper.careLabelSelectedDataList[i].soliId;
                         console.log("selectedSoliId>>"+selectedSoliId+"<soliId>"+soliId);
                        if(soliId == selectedSoliId){
                            console.log("inside");
                            component.set('v.viewedCarelabelData',mainwrapper.careLabelSelectedDataList[i]);
                            component.set("v.careLabelSelectedDataList",mainwrapper.careLabelSelectedDataList[i]);
                            break;
                        }
                    }
                }
               
                console.log('viewedCarelabelData freetextData'+JSON.stringify(component.get('v.viewedCarelabelData.freetextData')));
                component.set('v.viewCarelabelFlag',true);
                component.set("v.Careinstruction",mainwrapper.Careinstruction);
                component.find('viewedpicList').set('v.value',component.get('v.viewedCarelabelData').selectedLang);
                component.find('viewedQuant').set('v.value',component.get('v.viewedCarelabelData').quantity);
                component.set('v.uomOrder',component.get("v.DisplayCartDetail")[viewInd].orderUom);
                //alert(JSON.stringify(component.get('v.viewedCarelabelData.boxquantity')));
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action);
        
    },
    saveCareData:function(component, event, helper,addTo)
    {    
        var viewInd = component.get("v.viewedIndex");
        var saveOrSaveAs = component.get("v.saveAs");
        //To call a perticular method based on user selected option
        if(saveOrSaveAs){
            var action = component.get('c.saveAsCareLabelData'); //on SaveAs button click saveAsCareLabelData method will get called
        }else{
            var action = component.get('c.saveCareLabelData'); ////on Save button click saveCareLabelData method will get called
        }
        //alert(JSON.stringify(component.get('c.saveCareLabelData')));
        action.setParams({
            "careLabelSelectedDataList":JSON.stringify(component.get('v.careLabelSelectedDataList')),
            "productId":component.get("v.DisplayCartDetail")[viewInd].ProductId,
            "retailerId": component.get('v.SelectedRetailer'), 
            "completeWrap": JSON.stringify(component.get("v.quickviewedProduct")),
            "customeid":component.get('v.DisplayCustDetail'),
            "addTo": addTo,
            selectedCurrency:component.get("v.selectedCurrency"),
            searchedCurrency:component.get("v.searchedCurrency"),
        }); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();
           //alert('state???'+state);
            if (component.isValid() && state === "SUCCESS"){
                var resp = response.getReturnValue();
                
                 if(addTo=='Cart')
                {
                    console.log(JSON.stringify(component.get("v.deletedCLLIIdList")));
                    
                    if(component.get("v.deletedCLLIIdList").length>0){
                        helper.deleteCarelabelData(component,event,helper);
                    }
                    else{
                        helper.getExistingLabelData(component, event, helper);
                    }
                    var message;
                    if(saveOrSaveAs){
                         message = $A.get("$Label.c.Successfully_Updated_In_Cart");
                    }else{
                        message = $A.get("$Label.c.Successfully_Saved_In_Cart");
                    }
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: message,
                        type: "success"
                    });
                    toastEvent.fire();
                    this.toGetcustomerData(component, event,helper);
                    //$A.get('e.force:refreshView').fire();
                }
            }
            else
            {
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        });
        $A.enqueueAction(action);
    },
    deleteCarelabelData:function(component,event,helper){
        var action1 = component.get("c.deletedCLLI");
        action1.setParams({
            "deletedCLLIList": component.get('v.deletedCLLIIdList')  //deletedCLLIIdList attribute value set from CareLabelOrderFabricComponent if a fab is removed
        });
        action1.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                helper.getExistingLabelData(component, event, helper);
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED111.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action1);
    },

    getExistingLabelData:function(component,event,helper){
        var action1 = component.get("c.fetchCareLabelData");
        action1.setParams({
            "retailerId": component.get('v.SelectedRetailer'),
            "customeid": component.get('v.DisplayCustDetail')
        });
        action1.setCallback(this, function(response) {
            var state = response.getState();
            //alert('j'+state);
            if(state === 'SUCCESS'){
                var returnValue = response.getReturnValue();
               // alert(JSON.stringify(returnValue));
                console.log('returnValue'+JSON.stringify(returnValue));
                component.set("v.careLabelSelectedDataList",returnValue);
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action1);
    },
  
})