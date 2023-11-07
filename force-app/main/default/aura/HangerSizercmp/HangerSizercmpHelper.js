({
    //Function to save the Sizer product 
    saveSizerToCart:function(component, event, helper,obj,addTo){
        //alert(component.get("v.selectedCurrency"));
        //alert(component.get("v.searchedCurrency"));
        var actionsave = component.get("c.addSizerProduct");
        actionsave.setParams({ 
            obj:JSON.stringify(obj),
            "addTo": addTo,
            selectedCurrency:component.get("v.selectedCurrency"),
            searchedCurrency:component.get("v.searchedCurrency"),
            
        });
        actionsave.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if (state === "SUCCESS") 
            {
                this.getSizerListData(component, event,helper);
                if(component.get("v.selectedCurrency")){ 
                    component.set("v.selectedCurrency",component.get("v.searchedCurrency"));
                }
                component.set('v.hangerListDetail',true);
                var compEvent = component.getEvent("CatalogEvent");
                compEvent.setParam("flag", "BlockRetailer");
                compEvent.fire(); 
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.success"),
                    message: $A.get("$Label.c.Product_added_to_List_successfully"),
                    type: "success"
                });
                toastEvent.fire();
                /*var urlString = window.location.href;
                    var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                    //alert(CommunityBaseURL+'/s/catalog-order')
                    window.location = CommunityBaseURL+'/s/catalog-order';*/
            }
            else if (state === "INCOMPLETE") {
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
        component.find("quantity").set("v.value", "");
        // component.find("sizelist").set("v.value", "");
        
    },
    //remove the recod from the Database
    RemoveRow:function(component, event,helper,idTODalete)
    {
        var actionsave = component.get("c.deleteRow");
        actionsave.setParams({ 
            idTODalete:idTODalete
        });
        actionsave.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.success"),
                    message: $A.get("$Label.c.Product_removed_from_Cart"),
                    type: "success"
                });
                toastEvent.fire();
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") 
                {
                  //  alert(JSON.stringify(response.getError()));
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
    },
    //Fetching sizer records from the Database
    getSizerListData:function(component, event,helper,prodName)
    {
        var retailercode=component.get('v.retailerID');
        var customerid=component.get('v.onselectcustomeid');
        var actionsave1 = component.get("c.getSizerList");
        actionsave1.setParams({ 
            retailercode:retailercode,
            customerid:customerid,
            prodName:prodName
        });
        actionsave1.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var resp=response.getReturnValue();
                var array=[];
                for(var i=0;i<resp.length;i++)
                {
                    console.log('resp.length[i]  :::'+JSON.stringify(resp[i]));
                    var obj=new Object();
                    obj.recordId=resp[i].Id;
                    obj.prodname=resp[i].Mainetti_Model_Code__c;
                    obj.color=resp[i].Colour__c;
                    obj.size=resp[i].Print__c;
                    obj.quantity=resp[i].Quantity__c;   
                    obj.businessVertical=resp[i].Business_Vertical__c; 
                    if(resp[i].Business_Vertical__c == 'Hanger Business'){
                          component.set('v.disaplaySizerTxt',true);
                    }
                    else if(resp[i].Business_Vertical__c == 'MCare'){
                        component.set('v.disaplayGloveTxt',true);
                    }
                    obj.retailerCodeId=component.get('v.retailerID');
                    obj.orderToCompany=component.get("v.selectedCompany");
                    obj.preCurrency=component.get("v.selectedCurrency");
                    obj.customeid=component.get("v.onselectcustomeid");
                    obj.custRefModel=resp[i].Customer_Ref_Model__c;
                    array.push(obj);
                }
                if(array.length>0)
                {
                    component.set('v.selectedSizer',array);
                    component.set('v.hangerListDetail',true);
                }
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") 
                {
                   // alert(JSON.stringify(response.getError()));
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
        $A.enqueueAction(actionsave1);  
    },
    //Add to cart function
    addTocart:function(component, event,helper)
    {
        var retailercode=component.get('v.retailerID');
        var customerid=component.get('v.onselectcustomeid');
        var actionsave1 = component.get("c.addSizerToCart");
        actionsave1.setParams({ 
            retailercode:retailercode,
            customerid:customerid
        });
        actionsave1.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
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
            }
                else if (state === "ERROR") 
                {
                  //  alert(JSON.stringify(response.getError()));
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
        $A.enqueueAction(actionsave1);  
    },
    //delete function
    deleteSOLIData:function(component,event,helper,soliIdToDelete){
        var action1 = component.get("c.deletedSOLI");
        action1.setParams({
            "soliIdToDelete": soliIdToDelete,
        });
        action1.setCallback(this, function(response) {
            var state = response.getState();
           // alert(state);
            if(state === 'SUCCESS'){
                
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action1);
    },
    //Method is to Check the record is already in the cart are not
    checkCartDatail:function(component, event,helper)
    {
        var selectedColor=component.find('colorlist').get('v.value');
        console.log("selectedColor: " + selectedColor);
        //alert("selectedColor = "+selectedColor);
        // if(component.find('sizelist').get('v.value')!='--NONE--'){
        //if(!component.get('v.isSizerQuickview')){
            var selectedSize=component.find('sizelist').get('v.value');
            component.set('v.selectedSize',selectedSize);
        console.log("selectedSize: " + selectedSize);
        //}
        var CartData=component.get('v.cartDataList'); 
       // console.log("CartData: " + CartData);
        for(var i=0;i<CartData.length;i++){
            if(CartData[i].PSBP==component.get('v.selectedProduct').Name && CartData[i].Color==selectedColor && CartData[i].Size==selectedSize){
                component.set('v.isActive',true);
                return;
            }
            else{
                component.set('v.isActive',false)
            }
        }
    },
    //Check cart data and update the recodrs
    checkCartData:function(component, event,helper)
    {
        var retailercode=component.get('v.retailerID');
        var customerid=component.get('v.onselectcustomeid');
        var actionsave1 = component.get("c.CheckCartDetailsForUpdate");
        actionsave1.setParams({ 
            retailercode:retailercode,
            customerid:customerid
        });
        actionsave1.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var resp=response.getReturnValue();
                //alert(JSON.stringify(resp));
                component.set('v.cartDataList',resp);
                var selectedColor=component.find('colorlist').get('v.value');
                // if(component.find('sizelist').get('v.value')!='--NONE--'){
               // if(!component.get('v.isSizerQuickview'))
                    var selectedSize=component.find('sizelist').get('v.value');
                var CartData=component.get('v.cartDataList');
                for(var i=0;i<CartData.length;i++){
                    //alert(CartData[i].PSBP);
                    if(CartData[i].PSBP==component.get('v.selectedProduct').Name && CartData[i].Color==selectedColor && CartData[i].Size==selectedSize){
                        
                        component.set('v.isActive',true);
                        return;
                    }
                    else{
                        component.set('v.isActive',false)
                    }
                }
            }
            else if (state === "INCOMPLETE") {
            }
                else if (state === "ERROR") 
                {
                   // alert(JSON.stringify(response.getError()));
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
        $A.enqueueAction(actionsave1);  
    },    
    magnify : function(component, event,helper)
    {
        
        document.getElementById("myresult").style.display="block";
        function imageZoom(imgID, resultID) {
            var img, lens, result, cx, cy;
            img = document.getElementById(imgID);
            result = document.getElementById(resultID);
            /*create lens:*/
            lens = document.createElement("DIV");
            lens.setAttribute("class", "img-zoom-lens");
            /*insert lens:*/
            img.parentElement.insertBefore(lens, img);
            /*calculate the ratio between result DIV and lens:*/
            cx = result.offsetWidth / lens.offsetWidth;
            cy = result.offsetHeight / lens.offsetHeight;
            /*set background properties for the result DIV:*/
            result.style.backgroundImage = "url('" + img.src + "')";
            result.style.backgroundSize = (img.width * cx) + "px " + (img.height * cy) + "px";
            /*execute a function when someone moves the cursor over the image, or the lens:*/
            lens.addEventListener("mousemove", moveLens);
            img.addEventListener("mousemove", moveLens);
            /*and also for touch screens:*/
            lens.addEventListener("touchmove", moveLens);
            img.addEventListener("touchmove", moveLens);
            function moveLens(e) {
                var pos, x, y;
                /*prevent any other actions that may occur when moving over the image:*/
                e.preventDefault();
                /*get the cursor's x and y positions:*/
                pos = getCursorPos(e);
                /*calculate the position of the lens:*/
                x = pos.x - (lens.offsetWidth / 2);
                y = pos.y - (lens.offsetHeight / 2);
                /*prevent the lens from being positioned outside the image:*/
                if (x > img.width - lens.offsetWidth) {x = img.width - lens.offsetWidth;}
                if (x < 0) {x = 0;}
                if (y > img.height - lens.offsetHeight) {y = img.height - lens.offsetHeight;}
                if (y < 0) {y = 0;}
                /*set the position of the lens:*/
                lens.style.left = x + "px";
                lens.style.top = y + "px";
                /*display what the lens "sees":*/
                result.style.backgroundPosition = "-" + (x * cx) + "px -" + (y * cy) + "px";
            }
            function getCursorPos(e) {
                var a, x = 0, y = 0;
                e = e || window.event;
                /*get the x and y positions of the image:*/
                a = img.getBoundingClientRect();
                /*calculate the cursor's x and y coordinates, relative to the image:*/
                x = e.pageX - a.left;
                y = e.pageY - a.top;
                /*consider any page scrolling:*/
                x = x - window.pageXOffset;
                y = y - window.pageYOffset;
                return {x : x, y : y};
            }
        }  
        imageZoom("myimage", "myresult");        
        
    },    
    magnifyleave : function(component, event,helper) {
        //alert('leave');
        document.getElementById("myresult").style.display="none";
    }
    
})