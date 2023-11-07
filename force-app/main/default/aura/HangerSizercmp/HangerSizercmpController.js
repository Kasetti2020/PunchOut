({
    doInit : function(component, event,helper) 
    { 
        if(component.get('v.sizerIndex') != undefined){
        var completeWrap=component.get('v.completeWrap')[component.get('v.sizerIndex')];
        var prodName=completeWrap.Name;
        var orderToCompany=component.get("v.selectedCompany");
        var preCurrency=component.get("v.selectedCurrency");
            
        var action = component.get("c.productSizerDetails");
       action.setParams({
            prodname:prodName,
            retailerCode:component.get('v.retailerID'),
            orderToCompany:orderToCompany,
            preCurrency:preCurrency,
            selectedTab : component.get("v.selectedTab")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var colorlist=[];
                var sizelist=[];

                var res=response.getReturnValue();
                console.log('res>>'+JSON.stringify(response.getReturnValue()));
                component.set("v.customerInfoMagnetPrice",res.customerInfoMagnetPrice);
                //if colorPriorityCheck is true, color dependent size is set added by raghu on 17/11/2021 starts
                if(res.colorPriorityCheck){
                    component.set('v.colorSizeDependentList',res.colorSizeDependentList);
                    for(var key in res.colorSizeDependentList){
                        colorlist.push(key);
                    }
                    colorlist.sort();
                component.set('v.colorlist',colorlist);
                console.log(completeWrap.selectedColor+'->'+JSON.stringify(colorlist));
                var defaultColor=completeWrap.selectedColor?completeWrap.selectedColor:colorlist[0];
                component.set("v.selectedColor",defaultColor);
                component.find('colorlist').set('v.value',defaultColor);
                
                component.find('sizelist').set('v.value',res.colorSizeDependentList[defaultColor][0]); 
                component.set('v.selectedSize',res.colorSizeDependentList[defaultColor][0]);
                component.set('v.sizelist',res.colorSizeDependentList[defaultColor]);
                    
                completeWrap.selectedColor = defaultColor;
               
                } 
                //if colorPriorityCheck is false, size dependent color is set
                else{
                    component.set('v.colorSizeDependentList',res.sizeColorDependentList);
                    for(var key in res.sizeColorDependentList){
                        sizelist.push(key);
                    }
                    sizelist.sort();
                    component.set('v.sizelist',sizelist);
                    var defaultSize=completeWrap.selectedSize?completeWrap.selectedSize:sizelist[0];
                    component.set('v.selectedSize',defaultSize);
                    component.find('sizelist').set('v.value',defaultSize);

                    component.find('colorlist').set('v.value',res.sizeColorDependentList[defaultSize][0]);
                    component.set("v.selectedColor",res.sizeColorDependentList[defaultSize][0]);
                    component.set('v.colorlist',res.sizeColorDependentList[defaultSize]);

                    completeWrap.selectedSize = defaultSize;
                    
                   console.log('sort::::::'+component.get('v.colorlist'));
                   console.log('sort::::::'+component.get('v.sizelist'));
                }
                component.set("v.colorChartPriority",res.colorPriorityCheck);
                //alert(component.get("v.colorChartPriority"));
                //added by raghu on 17/11/2021 ends
                component.set('v.selectedProduct',completeWrap);
                console.log('selectedProduct>>>>>>'+JSON.stringify(component.get("v.selectedProduct")));
                component.set('v.sizerList',res.sizerList);
                console.log(JSON.stringify(component.get('v.sizerList')));
                helper.getSizerListData(component, event,helper,prodName);
            }
            else
            {
                alert(JSON.stringify(response.getError()));
            }
        }
                          );
        $A.enqueueAction(action);
        helper.checkCartData(component, event,helper);
        }
    },
    onSelectColor:function(component, event,helper) {
        var colorSizeDependentList=component.get('v.colorSizeDependentList');
        var selectedColor=component.find('colorlist1').get('v.value');
        component.set('v.sizelist',colorSizeDependentList[selectedColor]);
        var completeWrap=component.get('v.selectedProduct');
        completeWrap.selectedColor = selectedColor; 
        component.set('v.selectedColor',selectedColor);
        component.find('sizelist1').set('v.value',colorSizeDependentList[selectedColor][0]);
        component.set('v.selectedSize',colorSizeDependentList[selectedColor][0]);
        component.set('v.selectedProduct',completeWrap); 
        helper.checkCartDatail(component, event,helper);
    },
    //onselect Sizer picklist
    onSelectSize:function(component, event,helper) {
        helper.checkCartDatail(component, event,helper);
    },
    //onselct color picklist
    onSelectColorForSizeDepend:function(component, event,helper) {
           helper.checkCartDatail(component, event,helper);
        
    },
    //onselect Sizer picklist
    onSelectSizeForSizeDepend:function(component, event,helper) {
        //on size change set dependent color added by raghu on 17/11/2021 starts
        var SizecolorDependentList=component.get('v.colorSizeDependentList');
        var selectedSize=component.find('sizelist').get('v.value');
        component.set('v.colorlist',SizecolorDependentList[selectedSize]);
        //alert(selectedSize);
        //alert(JSON.stringify(SizecolorDependentList[selectedSize]));
        var completeWrap=component.get('v.selectedProduct');
        console.log(completeWrap);
        completeWrap.selectedSize = selectedSize;
        component.set('v.selectedSize',selectedSize);
        //alert('selectedsize::'+component.get('v.selectedSize'));
        //alert(json.stringify(SizecolorDependentList[selectedSize][0]));
        component.find('colorlist').set('v.value',SizecolorDependentList[selectedSize][0]);
        component.set('v.selectedColor',SizecolorDependentList[selectedSize][0]);
        component.set('v.selectedProduct',completeWrap); 
        //added by raghu on 17/11/2021 ends
        helper.checkCartDatail(component, event,helper);
    },
    //adding list 
    addToList: function(component, event,helper) {
        var completeWrap=component.get('v.selectedProduct');
        console.log('completeWrap ::::'+completeWrap);
      if(component.get("v.colorChartPriority") == true){
        var selectedColor=component.find('colorlist1').get('v.value');
        var selectedSize=component.find('sizelist1').get('v.value'); 
      } else{
        var selectedColor=component.find('colorlist').get('v.value');
        var selectedSize=component.find('sizelist').get('v.value'); 
      }
        var sizerList=component.get('v.sizerList');
        //alert(JSON.stringify(component.get('v.selectedProduct.tempMap')));
        console.log('sizerList>>'+JSON.stringify(sizerList));
        //alert('selected sizer>>'+JSON.stringify(component.get('v.selectedSizer')));
        var prodName;
        var finalQuantity;
        var boxquantity;
        var fullboxQty;
        var MainettiModelCode;
        var priceBookId;
        var priceByCurr;
        var custRefModel;
        var MOQ;
        //alert(component.get("v.selectedCurrency"));
        for(var i=0;i<sizerList.length;i++)
        {
              console.log('sizerList[i] ::::'+sizerList[i]);
            if(sizerList[i].Name==completeWrap.Name && sizerList[i].Color__c == selectedColor && sizerList[i].Sizer_Print__c == selectedSize)
            {
                prodName=sizerList[i].Name;
                boxquantity=sizerList[i].BOX_QTY__c;
                MOQ = sizerList[i].MOQ__c;
                fullboxQty=sizerList[i].Retailer_Code__r.Full_Box_Order__c;
                MainettiModelCode=sizerList[i].Name;
                priceBookId=sizerList[i].Id;
                //alert(sizerList[i].MOQ__c);
                //priceByCurr=sizerList[i].Price_Product_by_Currency__r[0].Id;
                var customerInfoMagnetPrice = component.get("v.customerInfoMagnetPrice");
                //alert(JSON.stringify(customerInfoMagnetPrice));
                for(var j=0;j<sizerList[i].Price_Product_by_Currency__r.length;j++)
                {
                    //alert(component.get("v.selectedCurrency").split('-'));
                    //alert(sizerList[i].Price_Product_by_Currency__r[j].CurrencyIsoCode);
                    if(component.get("v.searchedCurrency").split('-')[0].trim()==sizerList[i].Price_Product_by_Currency__r[j].CurrencyIsoCode && sizerList[i].Price_Product_by_Currency__r[j].MagNET_Price_Code__c == customerInfoMagnetPrice)
                    {
                            priceByCurr=sizerList[i].Price_Product_by_Currency__r[j].Id;
                             //alert(priceByCurr);
                             break;
                    	
                	}
                    else if(component.get("v.searchedCurrency").split('-')[0].trim()==sizerList[i].Price_Product_by_Currency__r[j].CurrencyIsoCode && sizerList[i].Price_Product_by_Currency__r[j].MagNET_Price_Code__c == null)
                    {
                        priceByCurr=sizerList[i].Price_Product_by_Currency__r[j].Id;
                         //alert("2"+priceByCurr);
                    }
                }
                //alert(priceByCurr);
                custRefModel=sizerList[i].Customer_Ref_Model__c;
            }
            
        }
        //var prodName=completeWrap.Name;
        
        if(!selectedColor){ 
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Select_the_color"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        
        if(!selectedSize){ 
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Select_the_Size"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        var obj=new Object();
        var array=component.get('v.selectedSizer');
        var duplicatePrsentAndApproved=false;
        //alert(JSON.stringify(array));
        if(array.length>0)
        {
            for(var i=0;i<array.length;i++)
            {
                
                if(array[i].prodname==component.get('v.selectedProduct').Name && array[i].color==selectedColor && array[i].size==selectedSize)
                {
                    if (confirm($A.get("$Label.c.Entered_value") +array[i].color+ $A.get("$Label.c.And") +array[i].size+ $A.get("$Label.c.already_present_Do_you_want_to_update_the_quantity")))
                    {
                        duplicatePrsentAndApproved=true;
                        //obj=array[i];
                    }  
                    else
                    {
                        return;
                    }
                }
                
            }
        }
        /*alert(duplicatePrsentAndApproved);
        if(duplicatePrsentAndApproved)
        {
            obj.quantity=quantity;
        }
        else
        {*/
        var quantity =parseInt(component.find("quantity").get("v.value"));
        //var boxquantity=completeWrap.ProductDataMap[selectedColor].boxquantity;
        //var fullboxQty=completeWrap.ProductDataMap[selectedColor].fullboxQty;
        console.log(JSON.stringify(completeWrap.ProductDataMap[selectedColor]));
        var result = Math.ceil(quantity/boxquantity)*boxquantity;
        if(!quantity || quantity<=0)
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
        else if(duplicatePrsentAndApproved == false && quantity < MOQ && boxquantity && (quantity<boxquantity || quantity % boxquantity!=0) && fullboxQty == true)
            {
                result = Math.ceil(MOQ/boxquantity)*boxquantity;
                
                if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+MainettiModelCode+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ")+( MOQ )+ ".\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + ".\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    return;
                }
                completeWrap.ProductDataMap[selectedColor].quantity= result;
                finalQuantity=result;
                component.set("v.completeWrap",completeWrap.ProductDataMap[selectedColor].quantity);
            }
        else if(duplicatePrsentAndApproved == false && quantity < MOQ && boxquantity && (MOQ<boxquantity || MOQ % boxquantity!=0) && fullboxQty == true)
            {
                result = Math.ceil(MOQ/boxquantity)*boxquantity;
                
                if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+MainettiModelCode+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( MOQ ) +".\n" +$A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) +".\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    return;
                }
                completeWrap.ProductDataMap[selectedColor].quantity= result;
                finalQuantity=result;
                component.set("v.completeWrap",completeWrap.ProductDataMap[selectedColor].quantity);
            }
        else if(quantity < MOQ && duplicatePrsentAndApproved == false)
            {
                if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+MainettiModelCode+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( MOQ ) + ".\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    return;
                }
                completeWrap.ProductDataMap[selectedColor].quantity= MOQ;
                finalQuantity=MOQ;
                component.set("v.completeWrap",completeWrap.ProductDataMap[selectedColor].quantity);
            }
        else if(fullboxQty && boxquantity && (quantity<boxquantity || quantity % boxquantity!=0))
        {
            if(result)
            {
                if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+MainettiModelCode+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") + ".\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + ".\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    return; 
                }
                completeWrap.ProductDataMap[selectedColor].quantity= result;
                finalQuantity=result;
                component.set("v.completeWrap",completeWrap.ProductDataMap[selectedColor].quantity);                
            }
            else
            {
                return;
            }            
        } 
            else
            {
                completeWrap.ProductDataMap[selectedColor].quantity= quantity;
                finalQuantity=quantity;
                component.set("v.completeWrap",completeWrap.ProductDataMap[selectedColor].quantity); 
            }
        obj.prodname=prodName;
        obj.color=selectedColor;
        obj.size=selectedSize;
        obj.quantity=finalQuantity;
        obj.retailerCodeId=component.get('v.retailerID');
        obj.orderToCompany=component.get("v.selectedCompany");
        //alert(priceByCurr);
        obj.preCurrency=component.get("v.selectedCurrency");
        obj.customeid=component.get("v.onselectcustomeid");
        obj.priceBookId=priceBookId;
        obj.pricebycur=priceByCurr;
        obj.custRefModel=custRefModel;
        //array.push(obj);
        //}
        //component.set('v.selectedSizer',array);
        //alert(JSON.stringify(completeWrap.ProductDataMap));
        //component.set('v.hangerListDetail',true);
        component.set("v.displayPagination",false);
              //  alert(JSON.stringify(component.get('v.selectedSizer')));
        helper.saveSizerToCart(component, event, helper,obj); 
    },
    //remove rows from the list
    removeRow:function(component,event,helper) {
        var selectedSizer = component.get("v.selectedSizer");
        var selectedItem = event.getSource().get("v.name");
        var idTODalete=selectedSizer[selectedItem].recordId;
        selectedSizer.splice(selectedItem, 1);
        component.set("v.selectedSizer", selectedSizer);
        helper.RemoveRow(component,event,helper,idTODalete);
        if(selectedSizer.length==0)
        {
            component.set("v.hangerListDetail", false);
            var e = component.getEvent("CatalogEvent");
            e.setParams({ "flag": "allSizerRemoved"});
            e.fire();
        }
    },
    //change product  function
    changeProd:function(component, event, helper){
        component.set("v.displayPagination",true);
        component.set("v.catalogVertical", true); 
        component.set("v.hangersizer", false); 
        component.set('v.hangerListDetail',false); 
        var e = component.getEvent("CatalogEvent");
        e.setParams({ "flag": "fromSizer"});
        e.fire();
    },
    //Adde to cart method
    addTocart:function(component, event, helper){
        helper.addTocart(component, event, helper);
    },
    //close the model
    close:function(component, event, helper){
        component.set("v.displayPagination",true);
        component.set("v.catalogVertical", true); 
        component.set('v.hangerListDetail',false);    
        component.set('v.quickviewSizer',false);
    },
    magnify : function(component, event,helper)
    {
        helper.magnify(component, event,helper);
        
    },
    magnifyleave : function(component, event,helper)
    {
        helper.magnifyleave(component, event,helper);
    }
})