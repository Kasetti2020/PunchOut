({ 
    doInit : function(component, event,helper) 
    { 
       // alert('completeWrap????'+JSON.stringify(component.get("v.completeWrap")));
        //var retrievedValue = window.sessionStorage.getItem("key");
        //alert(retrievedValue);
    },
    //event for handling sizer family
    handleCatalogEvent:function(component, event, helper){
        // alert('3');
        var flag = event.getParam("flag");
        if(flag=='fromSizer')
        {
            // alert('4');
            component.set('v.catalogVertical',true);
        }
        
    },
    //colour change functionality
    colorChange: function(component, event, helper){
        var ind=event.target.name;
        var color=event.target.id;
        var completeWrap=component.get('v.completeWrap');
       // alert(JSON.stringify(completeWrap));
        completeWrap[ind].selectedColor = color;
        
        component.set('v.completeWrap',completeWrap);
    },
    //revoked
    renderCart:function(component, event, helper) {
        component.set("v.parentcmp",false);
        component.set("v.isShipcmp",true);
    },
    // code for Saving SO and SOLI by chandana 
    saveproddata :function(component, event, helper) {
        var index = event.currentTarget;
        //alert('index>>'+index);
        var indexval = index.dataset.record;
      // alert('indexval>>'+indexval);
        helper.saveToCart(component, event, helper,indexval);
    },
    //code for bulk add to cart by Seema
    bulkAdd: function (component, event, helper) {
        console.log('inside bulkadd');
         component.set('v.disableBulkAdd',true);
        console.log(JSON.stringify(component.get('v.completeWrap')));
        var completeWrap=component.get('v.completeWrap');
        var bulkCartDataToSave=[];
        var retailerCodeId='';
        var result;
        for(var i=0;i<completeWrap.length;i++)
        {
            //alert(JSON.stringify(completeWrap[i]));
            for(var j=0;j<completeWrap[i].tempMap.length;j++)
            {
               
                //return;
                if(completeWrap[i].tempMap[j].quantity && !completeWrap[i].tempMap[j].value.addedToCart)
                {
                    //alert('MOQ>>'+completeWrap[i].tempMap[j].value.MOQ);
                    result = Math.ceil(completeWrap[i].tempMap[j].value.quantity/completeWrap[i].tempMap[j].value.boxquantity)*completeWrap[i].tempMap[j].value.boxquantity;
                  
                    
                    // alert('result :::'+completeWrap[i].tempMap[j].quantity )
                    if(!completeWrap[i].tempMap[j].quantity || completeWrap[i].tempMap[j].quantity<=0)
                    {         
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"), 
                            message: $A.get("$Label.c.Entered_Product_Quantity_is_not_valid")+' '+$A.get("$Label.c.for")+' '+completeWrap[i].tempMap[j].value.MainettiModelCode, 
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;
                    }
                    else{    
                    
                    if(completeWrap[i].tempMap[j].quantity < completeWrap[i].tempMap[j].value.MOQ && completeWrap[i].tempMap[j].value.boxquantity && completeWrap[i].tempMap[j].value.fullboxQty &&(completeWrap[i].tempMap[j].quantity<completeWrap[i].tempMap[j].value.boxquantity || completeWrap[i].tempMap[j].quantity % completeWrap[i].tempMap[j].value.boxquantity!=0))
                    {
                        result = Math.ceil(completeWrap[i].tempMap[j].value.MOQ / completeWrap[i].tempMap[j].value.boxquantity)*completeWrap[i].tempMap[j].value.boxquantity;
                        if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+completeWrap[i].tempMap[j].value.MainettiModelCode+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( completeWrap[i].tempMap[j].value.MOQ ) + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) +  $A.get("$Label.c.and_add_it_in_the_CART"))) 
                        {
                            return; 
                        }
                        retailerCodeId=completeWrap[i].tempMap[j].value.retailercodeId;
                        var singlecartDataToSave={"color":completeWrap[i].tempMap[j].key,"pricebookId":completeWrap[i].tempMap[j].value.priceBookId,"quantity":result,"cur":completeWrap[i].tempMap[j].value.priceByCurr,"custRefModel":completeWrap[i].tempMap[j].value.custRefModel};
                        bulkCartDataToSave.push(singlecartDataToSave);
                    }
                    else if(completeWrap[i].tempMap[j].quantity < completeWrap[i].tempMap[j].value.MOQ && completeWrap[i].tempMap[j].value.boxquantity && completeWrap[i].tempMap[j].value.fullboxQty &&(completeWrap[i].tempMap[j].value.MOQ <completeWrap[i].tempMap[j].value.boxquantity || completeWrap[i].tempMap[j].value.MOQ % completeWrap[i].tempMap[j].value.boxquantity!=0))
                    {
                        result = Math.ceil(completeWrap[i].tempMap[j].value.MOQ / completeWrap[i].tempMap[j].value.boxquantity)*completeWrap[i].tempMap[j].value.boxquantity;
                        if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+completeWrap[i].tempMap[j].value.MainettiModelCode+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( completeWrap[i].tempMap[j].value.MOQ ) + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                        {
                            return; 
                        }
                        retailerCodeId=completeWrap[i].tempMap[j].value.retailercodeId;
                        var singlecartDataToSave={"color":completeWrap[i].tempMap[j].key,"pricebookId":completeWrap[i].tempMap[j].value.priceBookId,"quantity":result,"cur":completeWrap[i].tempMap[j].value.priceByCurr,"custRefModel":completeWrap[i].tempMap[j].value.custRefModel};
                        bulkCartDataToSave.push(singlecartDataToSave);
                    }
                    else if(completeWrap[i].tempMap[j].quantity < completeWrap[i].tempMap[j].value.MOQ )
                    {
                        if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+completeWrap[i].tempMap[j].value.MainettiModelCode+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ")+( completeWrap[i].tempMap[j].value.MOQ ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( completeWrap[i].tempMap[j].value.MOQ ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                        {
                            return;
                        }
                        retailerCodeId=completeWrap[i].tempMap[j].value.retailercodeId;
                        var singlecartDataToSave={"color":completeWrap[i].tempMap[j].key,"pricebookId":completeWrap[i].tempMap[j].value.priceBookId,"quantity":completeWrap[i].tempMap[j].value.MOQ,"cur":completeWrap[i].tempMap[j].value.priceByCurr,"custRefModel":completeWrap[i].tempMap[j].value.custRefModel};
                        bulkCartDataToSave.push(singlecartDataToSave);
                    }
                        else if(completeWrap[i].tempMap[j].value.fullboxQty && completeWrap[i].tempMap[j].value.boxquantity && (completeWrap[i].tempMap[j].quantity<completeWrap[i].tempMap[j].value.boxquantity || completeWrap[i].tempMap[j].quantity % completeWrap[i].tempMap[j].value.boxquantity!=0))
                        {
                            result = Math.ceil(completeWrap[i].tempMap[j].quantity/completeWrap[i].tempMap[j].value.boxquantity)*completeWrap[i].tempMap[j].value.boxquantity;
                            if (!confirm($A.get("$Label.c.Order_Quantity_for_Product")+completeWrap[i].tempMap[j].value.MainettiModelCode+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                            {
                                return; 
                            }
                            retailerCodeId=completeWrap[i].tempMap[j].value.retailercodeId;
                            var singlecartDataToSave={"color":completeWrap[i].tempMap[j].key,"pricebookId":completeWrap[i].tempMap[j].value.priceBookId,"quantity":result,"cur":completeWrap[i].tempMap[j].value.priceByCurr,"custRefModel":completeWrap[i].tempMap[j].value.custRefModel};
                            bulkCartDataToSave.push(singlecartDataToSave);
                        }
                            else
                            {
                                retailerCodeId=completeWrap[i].tempMap[j].value.retailercodeId;
                                var singlecartDataToSave={"color":completeWrap[i].tempMap[j].key,"pricebookId":completeWrap[i].tempMap[j].value.priceBookId,"quantity":completeWrap[i].tempMap[j].quantity,"cur":completeWrap[i].tempMap[j].value.priceByCurr,"custRefModel":completeWrap[i].tempMap[j].value.custRefModel};
                                bulkCartDataToSave.push(singlecartDataToSave); 
                            }
                }
                }
            }
        }
        //alert(JSON.stringify(bulkCartDataToSave));
        if(bulkCartDataToSave.length>0)
       		 helper.saveBulkToCart(component, event, helper,retailerCodeId,bulkCartDataToSave);
    },
    //Quickview component method
    quickviewcmp :function(component, event, helper)
    {  
        //alert(component.get('v.completeWrap')[event.currentTarget.name].productfamily);
        if(component.get('v.selectedTab')=='Labels & Tickets')            
        { 
            component.set("v.LabelQuickview",true);
            component.set("v.quickviewedProduct",component.get('v.completeWrap')[event.currentTarget.name]); 
        }
        else
            component.set("v.quickviewedProduct",component.get('v.completeWrap')[event.currentTarget.name]);
        if(component.get('v.completeWrap')[event.currentTarget.name].productfamily.includes('SIZER'))
        {
            component.set("v.sizerIndex",event.currentTarget.name);
            component.set("v.quickviewSizer",true);
        }
        else if(component.get('v.selectedTab')=='MCare' &&
               component.get('v.completeWrap')[event.currentTarget.name].tempMap[0].value.vardataproduct == 'Yes'){
            
            component.set("v.sizerIndex",event.currentTarget.name);
            component.set("v.quickviewSizer",true);
        }
        else
        {
            component.set("v.quickview",true);
        }
    },
    //onclick selection redirect careLabelOrder component 
    SelectLabel :function(component, event, helper)
    {
        component.set("v.quickviewedProduct",component.get('v.completeWrap')[event.currentTarget.name]); 
        component.set("v.quickview",true);
        component.set("v.catalogVertical",false);
        component.set("v.displayPagination",false);
        component.set("v.careLabelOrder",true);
        component.set("v.catalogOrder",true);
        
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
    //onclick selection redirect sizerhanger component 
    SizerProduct :function(component, event, helper)
    {  
            component.set("v.sizerIndex",event.target.name);
            component.set("v.sizerhanger",true);   
            //alert(component.get("v.sizerhanger"));
            component.set("v.catalogVertical",false);
            
            component.set("v.displayPagination",false);

    },
    handleQtyChange :function(component, event, helper)
    {  
       // alert('handleQtyChange ::');
         let DisableBulkAddButton = component.getEvent("disableBulkAddButton"); 
   DisableBulkAddButton.setParams({"buttonDisabled" : false}); 
   DisableBulkAddButton.fire(); 
    },
   
})




/*



completeWrap>>[{"Id":"a039D000009tK0bQAE","Name":"3315","ProductDataMap":

{"YELLOW":{"addedAsLabel":false,"addedToCart":false,"boxquantity":500,"color":"YELLOW","currencyType":"USD","custRefModel":"3315CG-Yellow","fullboxQty":true,"MainettiModelCode":"3315","MOQ":200,"priceBookId":"a029D00000E5YvxQAF",
"priceByCurr":"a0y9D000000CuqoQAC","proAdditionalImgURL":["https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Top.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Back.JPG",
"https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Right.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Left.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Bottom.JPG",
"https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_BottomV2.JPG"],"proddescription":"15\" Yellow Jacket Hanger",
"proddescription2":"Description 2: 3315CG-YELLOW","proddescription3":"3315 Yellow Description 3","prodid":"a039D000009tK0bQAE",
"proImgURL":"https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow.jpg","proPrice":26,"proPriceBy1000":260,
"retailercodeId":"a009D000004DYVPQA4","retailerCodeName":"DEMO RETAILER","showPrice":true,"UomOrder":"EA","uomPrice":0.26},

"BLUE":{"addedAsLabel":false,"addedToCart":false,"boxquantity":10,"color":"BLUE","currencyType":"USD","custRefModel":"3315CG-BLUE","fullboxQty":true,"MainettiModelCode":"3315",
"MOQ":200,"priceBookId":"a029D00000E5Zv3QAF","priceByCurr":"a0y9D000000Cz8BQAS","proddescription":"15\" Blue Jacket Hanger",
"proddescription2":"Description 2: 3315CG-BLUE","proddescription3":"3315 Blue - Description 3 0329","prodid":"a039D000009tK0bQAE",
"proImgURL":"https://magnet01.blob.core.windows.net/hanger-business/3315_Blue.jpg","proPrice":99,"proPriceBy1000":990,"retailercodeId":"a009D000004DYVPQA4",
"retailerCodeName":"DEMO RETAILER","showPrice":true,"UomOrder":"EA","uomPrice":0.99}},


"productfamily":"OUTERWEAR","producttype":"Hanger Business",
"selectedColor":"YELLOW","tempMap":

[{"value":{"addedAsLabel":false,"addedToCart":false,"boxquantity":500,"color":"YELLOW","currencyType":"USD",
"custRefModel":"3315CG-Yellow","fullboxQty":true,"MainettiModelCode":"3315","MOQ":200,"priceBookId":"a029D00000E5YvxQAF","priceByCurr":"a0y9D000000CuqoQAC",
"proAdditionalImgURL":["https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Top.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Back.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Right.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Left.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_Bottom.JPG","https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow_BottomV2.JPG"],"proddescription":"15\" Yellow Jacket Hanger","proddescription2":"Description 2: 3315CG-YELLOW","proddescription3":"3315 Yellow Description 3","prodid":"a039D000009tK0bQAE","proImgURL":"https://magnet01.blob.core.windows.net/hanger-business/3315_Yellow.jpg",
"proPrice":26,"proPriceBy1000":260,"retailercodeId":"a009D000004DYVPQA4","retailerCodeName":"DEMO RETAILER","showPrice":true,"UomOrder":"EA",
"uomPrice":0.26},"key":"YELLOW"},

{"value":{"addedAsLabel":false,"addedToCart":false,"boxquantity":10,"color":"BLUE","currencyType":"USD","custRefModel":"3315CG-BLUE",
"fullboxQty":true,"MainettiModelCode":"3315","MOQ":200,"priceBookId":"a029D00000E5Zv3QAF","priceByCurr":"a0y9D000000Cz8BQAS","proddescription":"15\" Blue Jacket Hanger",
"proddescription2":"Description 2: 3315CG-BLUE","proddescription3":"3315 Blue - Description 3 0329","prodid":"a039D000009tK0bQAE",
"proImgURL":"https://magnet01.blob.core.windows.net/hanger-business/3315_Blue.jpg","proPrice":99,"proPriceBy1000":990,"retailercodeId":"a009D000004DYVPQA4",
"retailerCodeName":"DEMO RETAILER","showPrice":true,"UomOrder":"EA","uomPrice":0.99},"key":"BLUE"}]},


{"Id":"a039D000009tK0iQAE","Name":"3319ORG_HAPPY",
"ProductDataMap":{"ORANGE":{"addedAsLabel":false,"addedToCart":false,"boxquantity":11,"color":"ORANGE","currencyType":"USD","custRefModel":"3319-ORG_HAPPY",
"fullboxQty":true,"MainettiModelCode":"3319ORG_HAPPY","MOQ":200,"priceBookId":"a029D00000E5YvwQAF","priceByCurr":"a0y9D000000CuqlQAC",
"proAdditionalImgURL":["https://magnet01.blob.core.windows.net/hanger-business/3319ORG-A.JPG","https://magnet01.blob.core.windows.net/hanger-business/3319ORG-B.JPG",
"https://magnet01.blob.core.windows.net/hanger-business/3319ORG-C.JPG","https://magnet01.blob.core.windows.net/hanger-business/3319ORG-D.JPG",
"https://magnet01.blob.core.windows.net/hanger-business/3319ORG-E.JPG","https://magnet01.blob.core.windows.net/hanger-business/3319ORG-F.JPG"],"proddescription":"19\" Orange Jacket Hanger with HAPPY logo",
"proddescription2":"Description 2: 3319ORG_Happy","prodFamily":"HappyPrint","prodid":"a039D000009tK0iQAE","proImgURL":"https://magnet01.blob.core.windows.net/hanger-business/3319_ORANGEHappy.jpg","proPrice":41,"proPriceBy1000":410,"retailercodeId"

CatalogVertical.js:112 bulkCartDataToSave>>[{"color":"YELLOW","pricebookId":"a029D00000E5YlfQAF","quantity":"500","cur":"a0y9D000000CuM1QAK","custRefModel":"584CG-YELLOW"}]
CatalogVertical.js:113 retailerCodeId>>"a009D000004DYVPQA4"


*/