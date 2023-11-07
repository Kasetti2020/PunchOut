({
    //save method call
    saveToCart: function(component, event,helper,index) 
    {
        //alert('index>>'+index);
        var custid = component.get("v.onselectcustomeid");
        //alert(component.get("v.selectedCurrency"));
        //alert(component.get("v.searchedCurrency"));
        var indexarr = index.split(" ");
        var completeData = component.get("v.completeWrap");
        var productData = component.get("v.completeWrap")[indexarr[0]];
        var retailercode = productData.tempMap[indexarr[1]].value.retailercodeId;
        var qty = productData.tempMap[indexarr[1]].quantity;
        var boxquantity=productData.tempMap[indexarr[1]].value.boxquantity;
        var fullboxQty=productData.tempMap[indexarr[1]].value.fullboxQty;
        var MOQ =productData.tempMap[indexarr[1]].value.MOQ;
        var currency;
        if(productData.tempMap[indexarr[1]].value.priceByCurr){
         currency = productData.tempMap[indexarr[1]].value.priceByCurr;
        }
        //var searchedCurrency=component.get("v.selectedCurrency");
        var custRefModel = productData.tempMap[indexarr[1]].value.custRefModel;
        //alert('boxquantity>>'+productData.tempMap[indexarr[1]].value.boxquantity);
        //alert('productData.tempMap[indexarr[1]]>>'+JSON.stringify(component.get("v.completeWrap")[indexarr[0]]));
        //console.log('completeWrap>>'+JSON.stringify( component.get("v.completeWrap")));
        
        var result = Math.ceil(qty/boxquantity)*boxquantity;
        if(!qty || qty<=0)
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
        else if(qty < MOQ && boxquantity && (qty<boxquantity || qty % boxquantity!=0) && fullboxQty)
        {
            result = Math.ceil(MOQ/boxquantity)*boxquantity;
            if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get("v.completeWrap")[indexarr[0]].Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( MOQ ) + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
            {
                return;
            }
            productData.tempMap[indexarr[1]].quantity = result;
            completeData[indexarr[0]] = productData;
            component.set("v.completeWrap", completeData);
        }
        else if(qty < MOQ && boxquantity && (MOQ<boxquantity || MOQ % boxquantity!=0) && fullboxQty)
        {
            //alert('inside 2');
            result = Math.ceil(MOQ/boxquantity)*boxquantity;
            if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get("v.completeWrap")[indexarr[0]].Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( MOQ ) + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
            {
                return;
            }
            productData.tempMap[indexarr[1]].quantity = result;
            completeData[indexarr[0]] = productData;
            component.set("v.completeWrap", completeData);
        }
            else if(qty < MOQ )
            {
                if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get("v.completeWrap")[indexarr[0]].Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( MOQ ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( MOQ ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    return;
                }
                productData.tempMap[indexarr[1]].quantity = MOQ;
                completeData[indexarr[0]] = productData;
                component.set("v.completeWrap", completeData);
            }
        	
                else if(fullboxQty && boxquantity && (qty<boxquantity || qty % boxquantity!=0))
                {
                    //code to add the upper limit of box quantity by chandana 
                    
                    if(result)
                    {
                        if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get("v.completeWrap")[indexarr[0]].Name+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity")+( result )+ $A.get("$Label.c.and_add_it_in_the_CART"))) 
            			{
                            return; 
                        }
                        productData.tempMap[indexarr[1]].quantity = result;
                        completeData[indexarr[0]] = productData;
                        component.set("v.completeWrap", completeData);                
                    }
                    else
                    {
                        return;
                    }            
                }  
        var PricebookData = productData.tempMap[indexarr[1]].value.priceBookId;
        var actionsave = component.get("c.saveSO");
        actionsave.setParams({ 
            customerData : custid,
            retailercode : retailercode,
            quantity : productData.tempMap[indexarr[1]].quantity,
            priceBookProId : PricebookData,
            priceByCurr : currency,
            custRefModel : custRefModel,
            selectedCurrency:component.get("v.selectedCurrency"),
            searchedCurrency:component.get("v.searchedCurrency")
        });
        actionsave.setCallback(this, function(response) 
                               {
                                   var state = response.getState();
                                   console.log('state:::'+state);
                                   if (state === "SUCCESS") 
                                   {
                                       //alert("Product added to cart successfully:"+response.getReturnValue());
                                       var toastEvent = $A.get("e.force:showToast");
                                       toastEvent.setParams({
                                           title: $A.get("$Label.c.success"),
                                           message: $A.get("$Label.c.Product_added_to_cart_successfully"),
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
                                               message: $A.get("$Label.c.Add_to_cart_Failed"),
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
        $A.enqueueAction(actionsave);  
        component.set("qty",'');
    },
    //bulk add to cart save function 
    saveBulkToCart: function(component, event,helper,retailerCodeId,bulkCartDataToSave) 
    {
        //alert(component.get("v.selectedCurrency"));
        //alert(component.get("v.searchedCurrency"));
        var custid = component.get("v.onselectcustomeid");
        console.log('custid>>'+custid);
        var actionSaveBulk = component.get("c.addBulkProduct");
        actionSaveBulk.setParams({ 
            custid : custid,
            retailerCodeId : retailerCodeId,
            bulkCartDataToSave : JSON.stringify(bulkCartDataToSave),
            selectedCurrency:component.get("v.selectedCurrency"),
            searchedCurrency:component.get("v.searchedCurrency")
        });
        actionSaveBulk.setCallback(this, function(response) {
            var state = response.getState();
            //alert('state:::'+response.getState());
            if (state === "SUCCESS") 
            {
                //alert("Product added to cart successfully:"+response.getReturnValue());
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.success"),
                    message: $A.get("$Label.c.Product_added_to_cart_successfully"),
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
                    //alert(JSON.stringify(response.getError()));
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Error"),
                        message: $A.get("$Label.c.Add_to_cart_Failed"),
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
        $A.enqueueAction(actionSaveBulk);  
    }
})