({
    getWrapper:function(component,event,helper,prodid,fullboxQty,boxquantity)
    {
        var action = component.get("c.getWrapperData");
        //alert(component.get("v.retailerID"));
        //alert(JSON.stringify(component.get("v.completewrapdata")));
        action.setParams({
           "retailerCode": component.get("v.retailerID"),
           // "retailerCode": 'a009D000004DYVPQA4',
            "productname":component.get('v.selectedProduct').Id,//prodid
            "customerid": component.get('v.onselectcustomeid'),
            "fullboxQty":fullboxQty,
            "boxquantity":boxquantity
        });   
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                //alert(JSON.stringify(response.getReturnValue()));
                var mainwrapper = response.getReturnValue();
                if(!mainwrapper.itemMaster.Brand_Icon__c)
                {
                    if(!mainwrapper.itemMaster.Fabric_Component__c)
                    {
                        if(!mainwrapper.itemMaster.Size_Chart__c)
                        {
                            if(!mainwrapper.itemMaster.Country_Of_Origin__c)
                            {
                                if(!mainwrapper.itemMaster.Care_Instruction__c)
                                {	
                                    if(!mainwrapper.itemMaster.Excare_Instruction__c) 
                                    {
                                        if(!mainwrapper.itemMaster.Free_Text__c) 
                                        {
                                            
                                        }
                                        else
                                        {
                                            component.set("v.FreeTextContent",true);
                                            component.set("v.BrandIconContent",false);
                                        }
                                    }			
                                    else
                                    {
                                        component.set("v.ExcareInstructionContent",true);
                                        component.set("v.BrandIconContent",false);
                                    }   
                                }	
                                else
                                {
                                    component.set("v.CareLabelInstructionDetailContent",true);
                                    component.set("v.BrandIconContent",false);
                                }			
                            }														
                            else
                            {							
                                component.set("v.CountryOfOriginContent",true);
                                component.set("v.BrandIconContent",false);
                            }
                        }
                        else
                        {
                            component.set("v.SizeChartComponetContent",true);
                            component.set("v.BrandIconContent",false);
                        }
                    }
                    else
                    {
                        component.set("v.FabricComponentContent",true);
                        component.set("v.BrandIconContent",false);
                    }
                }else{
                    component.set("v.BrandIconContent",true);
                }
                 console.log('mainwrapper :::'+JSON.stringify(mainwrapper));
                component.set("v.picvalue",mainwrapper.LangCombList);
                component.set("v.Brandlist",mainwrapper.BrandIcon);
             //   alert('mainwrapper.BrandIcon ::'+mainwrapper.BrandIcon);
                component.set("v.sizelist",mainwrapper.sizechart);
                component.set("v.lstcmpname",mainwrapper.FabricComponent);
                component.set("v.lstfabname",mainwrapper.MaterialComponent);
                component.set("v.lstcountryname",mainwrapper.CountryofOrigin);
                component.set("v.selectedcountry",mainwrapper.LangCountryList);
                component.set("v.StyleNumber",mainwrapper.StyleNumber);
                component.set("v.Careinstruction",mainwrapper.Careinstruction);
                if(mainwrapper.itemMaster.Excare_Instruction__c)
                {
                    component.set("v.Excareinstruction",mainwrapper.Excareinstruction);
                    component.set("v.Excarecmpname",mainwrapper.ExcarePosition);
                }
                    if(mainwrapper.careLabelSelectedDataList.length>0){
                        component.set('v.careLabelOrderDetail',true);
                        console.log('mainwrapper :::'+JSON.stringify(mainwrapper.careLabelSelectedDataList));
                        component.set("v.careLabelSelectedDataList",mainwrapper.careLabelSelectedDataList);
                    }
                component.set("v.itemMaster",mainwrapper.itemMaster);
               // alert('itemMaster93>>'+JSON.stringify(mainwrapper.itemMaster));
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action);
    },
    getWrapperDataForView:function(component,event,helper,viewInd){
        console.log('getWrapperDataForView'+JSON.stringify(component.get('v.careLabelSelectedDataList')));
        //var getWrapperDataForView = component.get('v.careLabelSelectedDataList');
        var action = component.get("c.getWrapperData");
        action.setParams({
            "retailerCode": component.get("v.retailerID"),
            "productname":component.get('v.careLabelSelectedDataList')[viewInd].productName,//prodid
            "customerid": component.get('v.onselectcustomeid'),
        });   
        action.setCallback(this, function(response) {
            var state = response.getState();
            //alert(state);
            if(state === 'SUCCESS'){
                var mainwrapper = response.getReturnValue();
                //alert(JSON.stringify(mainwrapper.itemMaster));
                component.set("v.itemMasterForView",mainwrapper.itemMaster);
                component.set("v.picvalueForView",mainwrapper.LangCombList);
                component.set("v.BrandlistForView",mainwrapper.BrandIcon);
                component.set("v.sizelistForView",mainwrapper.sizechart);
                component.set("v.lstcmpnameForView",mainwrapper.FabricComponent);
                component.set("v.lstfabnameForView",mainwrapper.MaterialComponent);
                component.set("v.lstcountrynameForView",mainwrapper.CountryofOrigin);
                component.set("v.selectedcountryForView",mainwrapper.LangCountryList);
                component.set("v.CareinstructionForView",mainwrapper.Careinstruction);
                component.set("v.ExcareinstructionForView",mainwrapper.Excareinstruction);
                component.set("v.ExcarecmpnameForView",mainwrapper.ExcarePosition);
                console.log('CareLabelOrder'+JSON.stringify(component.get('v.careLabelSelectedDataList')[viewInd]));
               // console.log('CareLabelOrder :::'+mainwrapper.itemMaster);
                component.set('v.viewedCarelabelData',component.get('v.careLabelSelectedDataList')[viewInd]);
                component.set('v.viewCarelabelFlag',true);
                component.find('viewedpicList').set('v.value',component.get('v.careLabelSelectedDataList')[viewInd].selectedLang);
                component.find('viewedQuant').set('v.value',component.get('v.careLabelSelectedDataList')[viewInd].quantity);
                //Added by Bharath on 23/12/2021
                // component.set("v.careLabelSelectedDataList",mainwrapper.careLabelSelectedDataList);
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action);
    }, 
    saveCareData:function(component, event, helper,addTo)
    {
       // alert('selectedCurrency ::'+ component.get("v.selectedCurrency"));
       // alert(component.get("v.searchedCurrency"));
          console.log('careLabelSelectedDataList :::'+ JSON.stringify(component.get("v.careLabelSelectedDataList"))); 
        var action = component.get('c.saveCareLabelData'); 
        //alert(JSON.stringify(component.get('c.saveCareLabelData')));
        action.setParams({
            "careLabelSelectedDataList":JSON.stringify(component.get('v.careLabelSelectedDataList')),
            "productId":component.get('v.selectedProduct').Id,
            "retailerId": component.get('v.retailerID'), 
            "completeWrap": JSON.stringify(component.get("v.selectedProduct")),
            "customeid":component.get('v.onselectcustomeid'),
            "addTo": addTo,
            selectedCurrency:component.get("v.selectedCurrency"),
            searchedCurrency:component.get("v.searchedCurrency"),
        }); 
        
        action.setCallback(this, function(response) {
            var state = response.getState();
           //alert('state???'+state);
            if (component.isValid() && state === "SUCCESS"){
                var resp = response.getReturnValue();
                if(addTo=='label')
                {  
                    if(component.get("v.deletedCLLIIdList").length>0)
                        helper.deleteCarelabelData(component,event,helper);
                    else
                        helper.getExistingLabelData(component, event, helper);
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.Successfully_added_to_the_List"),
                        type: "success"
                    });
                    toastEvent.fire();
                    component.set("v.showSpinner", false);
                    if(component.get("v.selectedCurrency")){ 
                       component.set("v.selectedCurrency",component.get("v.searchedCurrency"));
                     }
               		 var compEvent = component.getEvent("CatalogEvent");
                    compEvent.setParam("flag", "BlockRetailer");
                    compEvent.fire();
                    //var urlString = window.location.href;
                    //var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
                    //alert(CommunityBaseURL+'/s/catalog-order')
                   // window.location = CommunityBaseURL+'/s/catalog-order';
                    //component.set("v.careLabelOrder", true);
                    //component.set("v.catalogVertical", false);
                    
                }
                else if(addTo=='Cart')
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.success"),
                        message: $A.get("$Label.c.Successfully_added_To_Cart"),
                        type: "success"
                    });
                    toastEvent.fire();
                    
                    $A.get('e.force:refreshView').fire();
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
            "deletedCLLIList": component.get('v.deletedCLLIIdList')
        });
        action1.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                helper.getExistingLabelData(component, event, helper);
            }
            else if(state === 'ERROR'){
                //alert('ERROR OCCURED111.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action1);
    },
    deleteSOLICarelabelData:function(component,event,helper,soId,soliIdToDelete){
        var action1 = component.get("c.deleteCareLabelData");
        action1.setParams({
            "soid": soId,
            "soliIdToDelete": soliIdToDelete,
        });
        action1.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                
            }
            else if(state === 'ERROR'){
                alert('ERROR OCCURED.'+JSON.stringify(response.getError()));
            }
        })
        $A.enqueueAction(action1);
    },
    getExistingLabelData:function(component,event,helper){
        var action1 = component.get("c.fetchCareLabelData");
        action1.setParams({
            "retailerId": component.get('v.retailerID'),
            "customeid": component.get('v.onselectcustomeid')
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
    
    magnify : function(component,helper,event)
    {
        var divId=event.target.id;
        var imgId=divId.replace("div", "img");
        //alert('divId'+divId);
        //alert('imgId'+imgId);
        
        document.getElementById("myresult1").style.display="block";
        
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
                x = pos.x - (lens.offsetWidth / 5);
                y = pos.y - (lens.offsetHeight / 5);
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
        imageZoom(imgId, "myresult1");        
        
    },
    
    magnifyleave : function(component, event, helper) {
        document.getElementById("myresult1").style.display="none";
    }
})