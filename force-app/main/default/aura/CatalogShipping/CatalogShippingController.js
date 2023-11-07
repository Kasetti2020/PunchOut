({
    doInit : function(component, event,helper) 
    {
       // var spinner = component.find('spinner');
        //$A.util.toggleClass(spinner, "slds-hide");
        helper.toGetcustomerData(component, event,helper);  
        
    },
    reloadPage : function(component, event,helper)
    {
        //helper.toGetcustomerData(component, event,helper);  
    },
    changehandler : function(component, event,helper) 
    {
        helper.toGetCartDetails(component, event,helper);
    },
    deleteProduct: function(component, event, helper,index) 
    {
        var index=event.getSource().get("v.name");
        helper.toDeleteProductCart(component, event,helper,index);  
        
    },
    UpdateCart : function(component, event,helper) 
    {
        helper.UpdateCart(component, event,helper);
        //component.set("v.PlaceorderBtn",true);
        //helper.CalBoxQty(component, event,helper);
    },
    CalculateBoxQty : function(component, event,helper) 
    {
        //var index=event.getSource().get("v.name");
        component.set("v.PlaceorderBtn",true);
    },
    updateRemarks : function(component, event,helper) 
    {
        var index=event.getSource().get("v.name");
        //alert('index>>'+index);
        component.set("v.PlaceorderBtn",true);
    },
    addCart: function(component, event, helper) { 
        helper.toSaveCart(component, event,helper);     
    },
    ClearItems: function(component, event, helper) { 
        // alert('button should hide');
        component.set("v.HideButtons",false);
        helper.ClearCart(component, event,helper);     
    },
    placeOrders: function(component, event, helper) {
        //helper.CalBoxQty(component, event,helper);
        var custid =component.get("v.DisplayCustDetail");
       
        helper.checkingAddAndCloneData(component,event,helper,custid); 
    },
    BacktoCatalog : function(component, event,helper) {
        component.set("v.parentcmp",true);
        component.set("v.Shipcmp",false);
        var urlString = window.location.href;
        var CommunityBaseURL = urlString.substring(0, urlString.indexOf("/s/"));
        //alert(CommunityBaseURL+'/s/catalog-order')
        window.location = CommunityBaseURL+'/s/catalog-order';
        
        //$A.get('e.force:refreshView').fire();
    },
    confirmdata: function(component, event, helper) {
        var custid =component.get("v.DisplayCustDetail");
        helper.confirmdata(component,event,helper,custid); 
    },
    deleteData: function(component, event, helper) {
        var custid =component.get("v.DisplayCustDetail");
        helper.deleteData(component,event,helper,custid); 
    },
    viewCareLabel: function(component, event, helper) {
        var viewInd = event.getSource().get("v.name");
        var soliId = event.getSource().get("v.value");
        var completeWrap = component.get('v.completeWrap');
        var prodId = component.get("v.DisplayCartDetail")[viewInd].ProductId;
        //To get perticular product from completewrap
        if(completeWrap.length > 0){
            for(var i=0;i<completeWrap.length;i++){
                if(prodId == completeWrap[i].Id){
                    component.set("v.quickviewedProduct",completeWrap[i]);
                    component.set('v.MOQ',completeWrap[i].ProductDataMap[completeWrap[i].selectedColor].MOQ);
                    //alert(JSON.stringify(completeWrap[i].ProductDataMap[completeWrap[i].selectedColor].MOQ));
                }
            }
        }
        component.set("v.viewedIndex",viewInd);
        console.log("quickviewedProduct33::"+JSON.stringify(component.get("v.quickviewedProduct")));
        component.set('v.careLabelSelectedDataList',{'exCareSelectedData':'{}','brandIcondata':'{}','sizeChartData':'{}','ChartData':'{}','countryOriginData':'{}','CareSelectedData':[],'FabricSelectedData':[],'freetextData':'{}'});
        component.set('v.Careinstruction',[]);
        component.set('v.CareinstructionForView',[]);
        component.set('v.finalviewedCarelabelData',{});
        component.set("v.deletedCLLIIdList",[]);
        helper.getWrapperDataForView(component,event,helper,viewInd,soliId);
        let CloseLogo = component.getEvent("CloseLogoEvent"); 
       CloseLogo.setParams({"closelogo" : false}); 
        CloseLogo.fire(); 
    },
    closeViewCareLabel:function(component, event, helper){
        component.set("v.viewCarelabelFlag",false);  
    },
    newAddAndClone:function(component, event, helper){
        console.log("quickviewedProduct newAddAndClone::"+JSON.stringify(component.get("v.quickviewedProduct")));
        component.set("v.saveAs",true);
        var action = component.get('c.LatestSubmitViewedCareLabl');
        $A.enqueueAction(action);
    },
    SubmitViewedCareLabl:function(component, event, helper){
        component.set("v.saveAs",false);
        var action = component.get('c.LatestSubmitViewedCareLabl');
        $A.enqueueAction(action);
    },
        //---------------------SUBMIT AND VIEW VALUE---------------------------------------------------//
    
        LatestSubmitViewedCareLabl:function(component, event, helper){
            //alert(JSON.stringify(component.get('v.deletedCLLIIdList')));
            //return;
            var CareIns = component.find("viewCareLabel");
            var itemMaster=component.get('v.itemMasterForView');
            //alert(JSON.stringify(itemMaster));
            var tempViewedCarelabelData={};
            
            if(CareIns.length)
            {
                for(var i=0;i<CareIns.length;i++)
                {
                    var status=CareIns[i].viewSelectedData();
                    //alert(JSON.stringify(status));
                    //tempViewedCarelabelData.status.WhichData=status.Data;
                }
            }
            else{
                var status=CareIns.viewSelectedData();
            }
            var viewedCarelabelData=component.get('v.finalviewedCarelabelData');
            //alert('viewedCarelabelData>>'+JSON.stringify(viewedCarelabelData.sizeChartData));
            //since only one product will be there in careLabelSelectedDataList viewedIndex is set 0 to get data from wrapper
            var viewedIndex=0;
           var careLabelSelectedDataList=component.get('v.careLabelSelectedDataList');
             console.log('LatestSubmitViewedCareLabl ::'+JSON.stringify(careLabelSelectedDataList));
            console.log('LatestSubmitViewedCareLabl  001::'+JSON.stringify(careLabelSelectedDataList[viewedIndex]));
            var sizeChartDatas = careLabelSelectedDataList[viewedIndex].sizeChartData;
            //alert('viewedCarelabelData>>'+JSON.stringify(viewedCarelabelData.sizeChartData));
            if(component.find('viewedpicList').get('v.value')===''){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Language_is_missing"),
                    type: "warning"
                });
                toastEvent.fire();
                return; 
            }
            else{
                viewedCarelabelData.selectedLang=component.find('viewedpicList').get('v.value');
            }
            if(!component.find('viewedQuant').get('v.value') || component.find('viewedQuant').get('v.value')<=0){
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Quantity_is_missing"),
                    type: "warning"
                });
                toastEvent.fire();
                return; 
            }
            else{
                //phase 2.1 MOQ enhansement on view/edit carelable 
                console.log('moq in edit >>'+component.get('v.MOQ'));
                var result;
                if(component.find('viewedQuant').get('v.value') < component.get('v.MOQ') && component.get('v.fullboxQty') && component.get('v.viewedCarelabelData.boxquantity') && (component.find('viewedQuant').get('v.value')<component.get('v.viewedCarelabelData.boxquantity') || component.find('viewedQuant').get('v.value') % component.get('v.viewedCarelabelData.boxquantity')!=0))
                {
                    result = Math.ceil(component.find('viewedQuant').get('v.value')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.quickviewedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( component.get('v.MOQ') )+ "\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) +"\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                    {
                        viewedCarelabelData.quantity=result;
                        component.set("v.Quantity", viewedCarelabelData.quantity);
                        component.find('viewedQuant').set('v.value',result);
                    }
                    else{
                        return;
                    } 
                } 
                else if(component.find('viewedQuant').get('v.value') < component.get('v.MOQ') && component.get('v.fullboxQty') && component.get('v.viewedCarelabelData.boxquantity') && (component.get('v.MOQ')<component.get('v.viewedCarelabelData.boxquantity') || component.get('v.MOQ') % component.get('v.viewedCarelabelData.boxquantity')!=0))
                {
                    result = Math.ceil(component.get('v.MOQ')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.quickviewedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ")+( component.get('v.MOQ') ) + "\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") +  ( result ) +"\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity")+ ( result ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                    {
                        viewedCarelabelData.quantity=result;
                        component.set("v.Quantity", viewedCarelabelData.quantity);
                        component.find('viewedQuant').set('v.value',result);
                    }
                    else{
                        return;
                    }    
                }
                else if(component.find('viewedQuant').get('v.value') < component.get('v.MOQ'))
                {
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.quickviewedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( component.get('v.MOQ') ) +"\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( component.get('v.MOQ') ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                    {
                        viewedCarelabelData.quantity=component.get('v.MOQ');
                        component.set("v.Quantity", viewedCarelabelData.quantity);
                        component.find('viewedQuant').set('v.value',component.get('v.MOQ'));
                    }
                    else{
                        return;
                    }    
                }
                result = Math.ceil(component.find('viewedQuant').get('v.value')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
                if(component.get('v.fullboxQty') && component.get('v.viewedCarelabelData.boxquantity') && (component.find('viewedQuant').get('v.value')<component.get('v.viewedCarelabelData.boxquantity') || component.find('viewedQuant').get('v.value') % component.get('v.viewedCarelabelData.boxquantity')!=0))
                {
                    result = Math.ceil(component.find('viewedQuant').get('v.value')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.quickviewedProduct').Name+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") +"\n" +$A.get("$Label.c.The_nearest_multiples_of_box_quantity")+ ( result ) +"\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity")+( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                    {
                        viewedCarelabelData.quantity=result;
                        component.set("v.Quantity", viewedCarelabelData.quantity);
                        component.find('viewedQuant').set('v.value',result);
                    }
                    else{
                        return;
                    }    
                }  
                viewedCarelabelData.quantity=component.find('viewedQuant').get('v.value');
            }
            if(viewedCarelabelData.brandIcondata){
                if(viewedCarelabelData.brandIcondata==='{}')
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Brand_Icon_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return; 
                }
            }
            else if(itemMaster.Brand_Icon__c)
            {
                viewedCarelabelData.brandIcondata=careLabelSelectedDataList[viewedIndex].brandIcondata;
            }
            if(viewedCarelabelData.FabricSelectedData){
                if(viewedCarelabelData.FabricSelectedData.length<1){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Fabric_data_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                var compCount={};
                var fabCount={};
                var total=0;
                for(var i=0;i<viewedCarelabelData.FabricSelectedData.length;i++)
                {
                    if(viewedCarelabelData.FabricSelectedData[i].Component)
                    {
                        if(!compCount[viewedCarelabelData.FabricSelectedData[i].Component])
                            compCount[viewedCarelabelData.FabricSelectedData[i].Component]=0;
                        compCount[viewedCarelabelData.FabricSelectedData[i].Component]+=viewedCarelabelData.FabricSelectedData[i].value;
                    }
                    if(!viewedCarelabelData.FabricSelectedData[i].Component)
                    {
                        total+=viewedCarelabelData.FabricSelectedData[i].value;
                    }
                    
                }
                for(var key in compCount){
                    if(compCount[key]<100)
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Component") + key + $A.get("$Label.c.has_value_lesser_than_100_in_Fabric"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        return; 
                    }
                }
                //for(var key in fabCount){
                if(total!=0 && (total<100 || total>100))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Fabric_combination_value_lesser_greater_than_100"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return; 
                }
                //viewedCarelabelData.FabricSelectedData=careLabelSelectedDataList[viewedIndex].FabricSelectedData;
            }
            else if(itemMaster.Fabric_Component__c)
            {
                viewedCarelabelData.FabricSelectedData=careLabelSelectedDataList[viewedIndex].FabricSelectedData;
            }
            if(viewedCarelabelData.sizeChartData){
                //alert("viewedCarelabelData.sizeChartData"+JSON.stringify(viewedCarelabelData.sizeChartData));
                if(viewedCarelabelData.sizeChartData==='{}'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Size_chart_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                //viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
            }
            else if(itemMaster.Size_Chart__c)
            {
                //alert("itemMaster.Size_Chart__c"+JSON.stringify(itemMaster.Size_Chart__c));
                viewedCarelabelData.sizeChartData=careLabelSelectedDataList[viewedIndex].sizeChartData;
            }
            if(viewedCarelabelData.countryOriginData){
                if(viewedCarelabelData.countryOriginData.selectedcountry=='-NONE-'){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Country_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return; 
                }
                //viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
            }
            else if(itemMaster.Country_Of_Origin__c)
            {
                viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
            }
            if(viewedCarelabelData.CareSelectedData){
                if(viewedCarelabelData.CareSelectedData.length<1){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Care_instructions_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                var Careinstruction=component.get('v.CareinstructionForView');
                //alert("Careinstruction.length>>"+Careinstruction.length+"<<viewedCarelabelData.CareSelectedData.length>>"+viewedCarelabelData.CareSelectedData.length);
                //if(Careinstruction.length!=viewedCarelabelData.CareSelectedData.length)
                if(Careinstruction == null)
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.All_the_Care_instructions_have_not_been_selected"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                //viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
                //alert(careLabelSelectedDataList[viewedIndex].CareSelectedData);
            }
            else if(component.get('v.CareinstructionForView').length>0)
            {
                viewedCarelabelData.CareSelectedData=careLabelSelectedDataList[viewedIndex].CareSelectedData;
                console.log("viewedCarelabelData.CareSelectedData>>>>"+JSON.stringify( viewedCarelabelData.CareSelectedData));
            }
            /*if(viewedCarelabelData.exCareSelectedData){
                if(!viewedCarelabelData.exCareSelectedData.position || !viewedCarelabelData.exCareSelectedData.ExcareInstructions || viewedCarelabelData.exCareSelectedData.ExcareInstructions.length==0) {  
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: "Warning",
                        message: 'Excare instructions is missing',
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                //viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
            }
            else if(itemMaster.Excare_Instruction__c)
            {
                viewedCarelabelData.exCareSelectedData=careLabelSelectedDataList[viewedIndex].exCareSelectedData;
            }*/
            //alert(JSON.stringify(viewedCarelabelData.exCareSelectedDataList));
            if(itemMaster.Excare_Instruction__c)
            {
                if(viewedCarelabelData.exCareSelectedDataList)
                {
                    if(viewedCarelabelData.exCareSelectedDataList.length==0)
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Excare_instructions_is_missing"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;
                    }
                    else
                    {
                        
                    }
                }
                else
                {
                    viewedCarelabelData.exCareSelectedDataList=careLabelSelectedDataList[viewedIndex].exCareSelectedDataList;
                }
            }
            console.log(JSON.stringify(viewedCarelabelData.freetextData));
            if(viewedCarelabelData.freetextData)
            {
                if(JSON.stringify(viewedCarelabelData.freetextData)=='{}' ){
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Free_Text_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                if((itemMaster.Style_Number__c && !viewedCarelabelData.freetextData.StyleNumber))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Style_Number_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.RN_Number__c && !viewedCarelabelData.freetextData.RNNumber))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.RN_Number_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Lot_Number__c && !viewedCarelabelData.freetextData.LotNumber))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.LotNumber_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Supplier_Number__c && !viewedCarelabelData.freetextData.SupplierNumber))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Supplier_Number_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Labelling_Code__c && !viewedCarelabelData.freetextData.LabellingCode))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Labelling_Code_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Packaging_Code__c && !viewedCarelabelData.freetextData.PackagingCode))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Packaging_Code_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Season_Month__c && !viewedCarelabelData.freetextData.SeasonMonth))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Season_Month_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Season_Year__c && !viewedCarelabelData.freetextData.SeasonYear))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Season_Year_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Item_Number__c && !viewedCarelabelData.freetextData.ItemNumber))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Item_Number_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                if((itemMaster.Care_Instruction__c && !viewedCarelabelData.freetextData.careinstruct))
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.care_instruction_is_missing"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                    
                }
                //viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
            }
            else if(careLabelSelectedDataList[viewedIndex].freetextData)
            {
                viewedCarelabelData.freetextData=careLabelSelectedDataList[viewedIndex].freetextData;
                //viewedCarelabelData.freetextData.careinstruct = careLabelSelectedDataList[viewedIndex].freetextData.careinstruct;
                //alert("viewedCarelabelData.freetextData.careinstruct>>"+viewedCarelabelData.freetextData.careinstruct);
            }
            //alert("viewedCarelabelData.freetextData.careinstruct>>"+viewedCarelabelData.freetextData.careinstruct);
            viewedCarelabelData.Priceper100pc=careLabelSelectedDataList[viewedIndex].Priceper100pc;
            viewedCarelabelData.boxquantity=careLabelSelectedDataList[viewedIndex].boxquantity;
            viewedCarelabelData.color=careLabelSelectedDataList[viewedIndex].color;
            viewedCarelabelData.custRefModel=careLabelSelectedDataList[viewedIndex].custRefModel;
            viewedCarelabelData.fullboxquantity=careLabelSelectedDataList[viewedIndex].fullboxquantity;
            viewedCarelabelData.imgUrl=careLabelSelectedDataList[viewedIndex].imgUrl;
            viewedCarelabelData.localSKU=careLabelSelectedDataList[viewedIndex].localSKU;
            viewedCarelabelData.priceSpecId=careLabelSelectedDataList[viewedIndex].priceSpecId;
            viewedCarelabelData.printShop=careLabelSelectedDataList[viewedIndex].printShop;
            viewedCarelabelData.produDesc=careLabelSelectedDataList[viewedIndex].produDesc;
            viewedCarelabelData.productFamily=careLabelSelectedDataList[viewedIndex].productFamily;
            viewedCarelabelData.productName=careLabelSelectedDataList[viewedIndex].productName;
            viewedCarelabelData.soId=careLabelSelectedDataList[viewedIndex].soId;
            viewedCarelabelData.soliId=careLabelSelectedDataList[viewedIndex].soliId;
            console.log(viewedCarelabelData);
            var viewedIndex=component.get('v.viewedIndex');
            var careLabelSelectedDataList=component.get('v.careLabelSelectedDataList');
            for(var i=0;i<careLabelSelectedDataList.length && i!=viewedIndex;i++)
            {  
                var tempFab=careLabelSelectedDataList[i].FabricSelectedData;
                var fabMached=true;
                if(itemMaster.Fabric_Component__c){
                    if(tempFab.length==viewedCarelabelData.FabricSelectedData.length)
                    {
                        for(var j=0;j<tempFab.length;j++)
                        {
                            var fabId=tempFab[j]['fabId'];
                            delete tempFab[j]['fabId'];
                            var matched=false;
                            for(var k=0;k<viewedCarelabelData.FabricSelectedData.length;k++)
                            {
                                var fabId1=viewedCarelabelData.FabricSelectedData[k]['fabId'];
                                delete viewedCarelabelData.FabricSelectedData[k]['fabId'];
                                if(JSON.stringify(viewedCarelabelData.FabricSelectedData[k])===JSON.stringify(tempFab[j]))
                                {
                                    matched=true;
                                }
                                viewedCarelabelData.FabricSelectedData[k]['fabId']=fabId1;
                            }
                            tempFab[j]['fabId']=fabId;
                            if(!matched)
                            {
                                fabMached=false;
                                break;
                            }
                        }
                    }
                    else
                        fabMached=false;
                }
                var careInstMatch=true;
                if(component.get('v.Careinstruction').length>0)
                {
             
                        if(viewedCarelabelData.CareSelectedData.length==careLabelSelectedDataList[i].CareSelectedData.length)
                {
                    var tempCareInstr=careLabelSelectedDataList[i].CareSelectedData;
                    for(var j=0;j<tempCareInstr.length;j++)
                    {
                        var careIdList=tempCareInstr[j]['careIdList'];
                        //alert('Bef>'+JSON.stringify(tempCareInstr));
                        //delete tempCareInstr[j]['careIdList'];
                        var matched1=false;
                        for(var k=0;k<viewedCarelabelData.CareSelectedData.length;k++)
                        {
                            //if(tempCareInstr[j].instGrp==viewedCarelabelData.CareSelectedData[k].instGrp)
                            //delete viewedCarelabelData.CareSelectedData[k]['careIdList'];
                            if(JSON.stringify(viewedCarelabelData.CareSelectedData[k])===JSON.stringify(tempCareInstr[j]))
                            {
                                matched1=true;
                            }
                        }
                        //tempCareInstr[j]['careIdList']=careIdList;
                        //alert('aft>'+JSON.stringify(tempCareInstr));
                        if(!matched1)
                        {
                            careInstMatch=false;
                            break;
                        }
                    }
                }
                else
                    careInstMatch=false;
                }
                var tempEx=careLabelSelectedDataList[i].exCareSelectedDataList;
                var exMatched=true;
                if(itemMaster.Excare_Instruction__c){
                    if(tempEx.length==viewedCarelabelData.exCareSelectedDataList.length)
                    {
                        for(var j=0;j<tempEx.length;j++)
                        {
                            var excareId=tempEx[j]['excareId'];
                            delete tempEx[j]['excareId'];
                            //alert(JSON.stringify(tempEx[j]));
                            var matched=false;
                            for(var k=0;k<viewedCarelabelData.exCareSelectedDataList.length;k++)
                            {
                                var excareId1=viewedCarelabelData.exCareSelectedDataList[k]['excareId'];
                                delete viewedCarelabelData.exCareSelectedDataList[k]['excareId'];
                                //alert(JSON.stringify(viewedCarelabelData.exCareSelectedDataList[k]));
                                if(JSON.stringify(viewedCarelabelData.exCareSelectedDataList[k])===JSON.stringify(tempEx[j]))
                                {
                                    matched=true;
                                }
                                viewedCarelabelData.exCareSelectedDataList[k]['excareId']=excareId1;
                            }
                            tempEx[j]['excareId']=excareId;
                            if(!matched)
                            {
                                exMatched=false;
                                break;
                            }
                        }
                    }
                    else
                        exMatched=false;
                }
                var freeTextMatch=true;
                if(itemMaster.Free_Text__c){
                    if((itemMaster.Style_Number__c && careLabelSelectedDataList[i].freetextData.StyleNumber!=viewedCarelabelData.freetextData.StyleNumber)
                       ||(itemMaster.RN_Number__c && careLabelSelectedDataList[i].freetextData.RNNumber!=viewedCarelabelData.freetextData.RNNumber)
                       ||(itemMaster.Lot_Number__c && careLabelSelectedDataList[i].freetextData.LotNumber!=viewedCarelabelData.freetextData.LotNumber)
                       ||(itemMaster.Care_Instruction__c && careLabelSelectedDataList[i].freetextData.careinstruct!=viewedCarelabelData.freetextData.careinstruct)
                       ||(itemMaster.Supplier_Number__c && careLabelSelectedDataList[i].freetextData.SupplierNumber!=viewedCarelabelData.freetextData.SupplierNumber)
                       ||(itemMaster.Labelling_Code__c && careLabelSelectedDataList[i].freetextData.LabellingCode!=viewedCarelabelData.freetextData.LabellingCode)
                       ||(itemMaster.Packaging_Code__c && careLabelSelectedDataList[i].freetextData.PackagingCode!=viewedCarelabelData.freetextData.PackagingCode)
                       ||(itemMaster.Season_Month__c && careLabelSelectedDataList[i].freetextData.SeasonMonth!=viewedCarelabelData.freetextData.SeasonMonth)
                       ||(itemMaster.Season_Year__c && careLabelSelectedDataList[i].freetextData.SeasonYear!=viewedCarelabelData.freetextData.SeasonYear)
                       ||(itemMaster.Item_Number__c && careLabelSelectedDataList[i].freetextData.ItemNumber!=viewedCarelabelData.freetextData.ItemNumber))
                    {
                        freeTextMatch=false;
                    }
                }
                var brandIconPresent=true;
                if(itemMaster.Brand_Icon__c)
                {
                    if(careLabelSelectedDataList[i].brandIcondata.Id==viewedCarelabelData.brandIcondata.Id)
                    {
                        brandIconPresent=true;
                    }
                    else
                    {
                        brandIconPresent=false;
                    }
                }
                var sizeChartPresent=true;
                if(itemMaster.Size_Chart__c)
                {
                    var saveAs = component.get("v.saveAs");
                    //alert("12>>"+itemMaster.Size_Chart__c);
                    if(careLabelSelectedDataList[i].sizeChartData.Id==viewedCarelabelData.sizeChartData.Id)
                    {
                        sizeChartPresent=true;
                    }
                    else
                    {
                        sizeChartPresent=false;
                    }
                }
                var countryOfOriginPresent=true;
                if(itemMaster.Country_Of_Origin__c)
                {
                    if(viewedCarelabelData.countryOriginData.selectedcountry==careLabelSelectedDataList[i].countryOriginData.selectedcountry)
                    {
                        countryOfOriginPresent=true;
                    }
                    else
                    {
                        countryOfOriginPresent=false;
                    }
                }
                //alert(fabMached);
                //alert(careInstMatch);
                //alert(exMatched);
                //alert(freeTextMatch);
                //alert(brandIconPresent);
                //alert(sizeChartPresent);
                //alert(countryOfOriginPresent);
                
                if(careLabelSelectedDataList[i].selectedLang==viewedCarelabelData.selectedLang && 
                   careLabelSelectedDataList[i].quantity==viewedCarelabelData.quantity &&
                   brandIconPresent &&
                   sizeChartPresent &&
                   fabMached && 
                   careInstMatch &&
                   exMatched &&
                   freeTextMatch &&
                   countryOfOriginPresent
                  )
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Data_Already_Present"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return; 
                }
            }
             console.log('careLabelSelectedDataList>>'+JSON.stringify(viewedCarelabelData));
            careLabelSelectedDataList[viewedIndex]=viewedCarelabelData;
            careLabelSelectedDataList[viewedIndex].selectedLang=component.find('viewedpicList').get('v.value');
            careLabelSelectedDataList[viewedIndex].quantity=component.find('viewedQuant').get('v.value');
            careLabelSelectedDataList[viewedIndex].sizeChartData = sizeChartDatas;
            console.log('controller Before set::'+JSON.stringify(component.get('v.careLabelSelectedDataList')[viewedIndex]));
            component.set('v.careLabelSelectedDataList',careLabelSelectedDataList[viewedIndex]);
            console.log('controller After set::'+JSON.stringify(component.get('v.careLabelSelectedDataList')));
            component.set('v.viewCarelabelFlag',false);
            helper.saveCareData(component, event, helper,'Cart');
        },

})