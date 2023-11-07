({
    doInit : function(component,event,helper) {
        //These two below lines used for resetting the array
        component.set('v.careLabelSelectedData',{'exCareSelectedData':'{}','brandIcondata':'{}','sizeChartData':'{}','ChartData':'{}','countryOriginData':'{}','CareSelectedData':[],'FabricSelectedData':[],'freetextData':'{}'});
        component.set('v.Careinstruction',[]);
        component.set('v.selectedLang','');
        component.set('v.Quantity',0);
        component.set('v.BrandIconContent',true);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',false);
        var selectedProduct=component.get('v.selectedProduct');
        console.log('selectedProduct>>'+JSON.stringify(component.get('v.selectedProduct')));
        var fullboxQty=selectedProduct.ProductDataMap[selectedProduct.selectedColor].fullboxQty;
        component.set('v.fullboxQty',selectedProduct.ProductDataMap[selectedProduct.selectedColor].fullboxQty);
        var boxquantity=selectedProduct.ProductDataMap[selectedProduct.selectedColor].boxquantity;
        component.set('v.boxquantity',selectedProduct.ProductDataMap[selectedProduct.selectedColor].boxquantity);
        var prodid=selectedProduct.ProductDataMap[selectedProduct.selectedColor].prodid;
        component.set('v.uomOrder',selectedProduct.ProductDataMap[selectedProduct.selectedColor].UomOrder);
        component.set('v.MOQ',selectedProduct.ProductDataMap[selectedProduct.selectedColor].MOQ);
        helper.getWrapper(component,event,helper,prodid,fullboxQty,boxquantity);
    },
    changeTabColorBrandIcon : function(component,event,helper){
        var BrandIconTab = component.find('BrandIconTab');
        $A.util.addClass(BrandIconTab, 'success-border');
    },
    changeTabColorFabricComponent : function(component,event,helper){       
        var FabricComponentTab = component.find('FabricComponentTab');
        $A.util.addClass(FabricComponentTab, 'success-border');
        //document.getElementById("FabricComponentTab").setAttribute("style", "color: green; border-bottom: 2px solid green");
    },
    changeTabColorSizeChart : function(component,event,helper){       
        var SizeChartTab = component.find('SizeChartTab');
        $A.util.addClass(SizeChartTab, 'success-border');
        //document.getElementById("SizeChartTab").setAttribute("style", "color: green; border-bottom: 2px solid green");
    },
    changeTabColorCountryOfOrigin : function(component,event,helper){       
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        $A.util.addClass(CountryOfOriginTab, 'success-border');
        //document.getElementById("CountryOfOriginTab").setAttribute("style", "color: green; border-bottom: 2px solid green");
    },
    changeTabColorCareInstructionDetails : function(component,event,helper){       
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        $A.util.addClass(CareInstructionDetailsTab, 'success-border');
        //document.getElementById("CareInstructionDetailsTab").setAttribute("style", "color: green; border-bottom: 2px solid green");
    },
    changeTabColorExcareInstructions : function(component,event,helper){       
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        $A.util.addClass(ExcareInstructionsTab, 'success-border');
        //document.getElementById("ExcareInstructionsTab").setAttribute("style", "color: green; border-bottom: 2px solid green");
    },
    changeTabColorFreeText : function(component,event,helper){       
        var FreeTextTab = component.find('FreeTextTab');
        $A.util.addClass(FreeTextTab, 'success-border');
        //document.getElementById("FreeTextTab").setAttribute("style", "color: green; border-bottom: 2px solid green");
    },
    selectedLanguage : function(component,event,helper){
        var cvar = component.get("v.selectedLang");
        var action = component.get("c.getitemmaster");
        action.setParams({ids: cvar});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(state === 'SUCCESS'){
                var ids =JSON.stringify(response.getReturnValue());
                var test =component.set("v.itemMaster",response.getReturnValue());
              //  alert('test69>>'+JSON.stringify(test));
            }
            else if(state === 'INCOMPLETE'){
              //  alert('Something is missing');   
            }
                else if(state === 'ERROR'){
               //     alert('Insertion Failed');   
                }
        })
        $A.enqueueAction(action);
    },
    onchangedSelected: function(component, event, helper) {
        var checkBrandvalue = component.find("checkBrandNames");
        var resetCheckboxValue = false;
        if (Array.isArray(checkBrandvalue)) {
            checkBrandvalue.forEach(function(checkbox) {
                checkbox.set('v.value', resetCheckboxValue);
            });  
        }
        else {
            checkBrandvalue.set('v.value', resetCheckboxValue);
        }
        event.getSource().set("v.value",true);
    },
    selectedBrand :function(component,helper,event){
        var checkBrandvalue = component.find("checkBrandNames");
        for (var i = 0; i < checkBrandvalue.length; i++) {
            if (checkBrandvalue[i].get("v.value") == true) {
                component.set("v.selectedBrand",checkBrandvalue[i].get("v.text"));
            }
        }
    },
    selectedSize:function(component,helper,event){
              //  alert('selectedSize>>');
        var checkvalue = component.find("checknames");
        for (var i = 0; i < checkvalue.length; i++) {
            if (checkvalue[i].get("v.value") == true) {
                component.set("v.selectedsize",checkvalue[i].get("v.text"));
                // component.set("v.isModalOpen", false);
            }
        }  
    },
    //---------------------ADD AND CLONE---------------------------------------------------//
    newAddAndClone: function(component, event, helper){
        var CareIns = component.find("CareInstruction");
        
        var itemMaster=component.get('v.itemMaster');
       // alert('itemMaster115>>'+JSON.stringify(itemMaster));
        if(CareIns.length)
        {
            for(var i=0;i<CareIns.length;i++)
            {
                var status=CareIns[i].getSelectedData();
            }
        }
        else{
            var status=CareIns.getSelectedData();
        }

      // alert('careLabelSelectedData>>'+JSON.stringify(careLabelSelectedData));
        var careLabelSelectedData=component.get('v.careLabelSelectedData');
         console.log(' Master careLabelSelectedData ::'+JSON.stringify(careLabelSelectedData));
        if(component.get('v.selectedLang')===''){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Language_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return; 
        }
        if(!component.get('v.Quantity') || component.get('v.Quantity')<=0){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Quantity_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return; 
        }
        var result;
        if(component.get('v.Quantity') < component.get('v.MOQ') && component.get('v.boxquantity') && component.get('v.fullboxQty')&& (component.get('v.Quantity')<component.get('v.boxquantity') || component.get('v.Quantity') % component.get('v.boxquantity')!=0))
        {
            result = Math.ceil(component.get('v.MOQ')/component.get('v.boxquantity'))*component.get('v.boxquantity');
            if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( component.get('v.MOQ') ) + "\n" +$A.get("$Label.c.The_nearest_multiples_of_box_quantity") + result+  "\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + result + $A.get("$Label.c.and_add_it_in_the_CART"))) 
            {
                component.set("v.Quantity", result);
            }
            else{
                return;
            }
        }
        else if(component.get('v.Quantity') < component.get('v.MOQ') && component.get('v.boxquantity') && component.get('v.fullboxQty') && (component.get('v.MOQ')<component.get('v.boxquantity') || component.get('v.MOQ') % component.get('v.boxquantity')!=0))
        {
            //console.log('23');
            result = Math.ceil(component.get('v.MOQ')/component.get('v.boxquantity'))*component.get('v.boxquantity');
            if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") +( component.get('v.MOQ') ) + "\n" +$A.get("$Label.c.The_nearest_multiples_of_box_quantity") + result+  "\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + result + $A.get("$Label.c.and_add_it_in_the_CART"))) 
            {
                component.set("v.Quantity", result);
            }
            else{
                return;
            }
        }
            else if(component.get('v.Quantity') < component.get('v.MOQ'))
            {
                if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( component.get('v.MOQ') ) + "\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( component.get('v.MOQ') ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    component.set("v.Quantity",component.get('v.MOQ'));
                }
                else{
                    return;
                }
            }
                else
                {
                    var result = Math.ceil(component.get('v.Quantity')/component.get('v.boxquantity'))*component.get('v.boxquantity');
                    if(component.get('v.fullboxQty') && component.get('v.boxquantity') && (component.get('v.Quantity')<component.get('v.boxquantity') || component.get('v.Quantity') % component.get('v.boxquantity')!=0))
                    { 
                        if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity")+ "\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) + "\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                        {
                            component.set("v.Quantity", result);
                        }
                        else{
                            return;
                        }
                    } 
                }
        if(itemMaster.Brand_Icon__c && careLabelSelectedData.brandIcondata==='{}'){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Brand_Icon_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return; 
        }
        if(itemMaster.Fabric_Component__c && careLabelSelectedData.FabricSelectedData.length<1){
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
        for(var i=0;i<careLabelSelectedData.FabricSelectedData.length;i++)
        {
            if(careLabelSelectedData.FabricSelectedData[i].Component)
            {
                if(!compCount[careLabelSelectedData.FabricSelectedData[i].Component])
                    compCount[careLabelSelectedData.FabricSelectedData[i].Component]=0;
                compCount[careLabelSelectedData.FabricSelectedData[i].Component]+=careLabelSelectedData.FabricSelectedData[i].value;
            }
            if(!careLabelSelectedData.FabricSelectedData[i].Component)
            {
                //if(!fabCount[careLabelSelectedData.FabricSelectedData[i].Fabric])
                //   fabCount[careLabelSelectedData.FabricSelectedData[i].Fabric]=0;
                //fabCount[careLabelSelectedData.FabricSelectedData[i].Fabric]+=careLabelSelectedData.FabricSelectedData[i].value; 
                total+=careLabelSelectedData.FabricSelectedData[i].value;
            }
            
        }
        for(var key in compCount){
            if(compCount[key]<100)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.Component") +key+$A.get("$Label.c.has_value_lesser_than_100_in_Fabric")	,
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
        // }
         
             if(itemMaster.Size_Chart__c && careLabelSelectedData.sizeChartData==='{}'){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Size_chart_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
         

        if(itemMaster.Country_Of_Origin__c && (!careLabelSelectedData.countryOriginData.selectedcountry || careLabelSelectedData.countryOriginData.selectedcountry==='-NONE-'))
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Country_of_Origin_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        if(component.get('v.Careinstruction').length>0 && careLabelSelectedData.CareSelectedData.length<1){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Care_instructions_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        if(component.get('v.Careinstruction').length>0 && careLabelSelectedData.CareSelectedData.length>0)
        {
            var Careinstruction=component.get('v.Careinstruction');
            if(Careinstruction.length!=careLabelSelectedData.CareSelectedData.length)
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
        }
        /*if(itemMaster.Excare_Instruction__c  && (!careLabelSelectedData.exCareSelectedData.position || !careLabelSelectedData.exCareSelectedData.ExcareInstructions || careLabelSelectedData.exCareSelectedData.ExcareInstructions.length==0)) {  
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Warning",
                message: 'Excare instructions is missing',
                type: "warning"
            });
            toastEvent.fire();
            return;
        }*/
        if(itemMaster.Excare_Instruction__c && (!careLabelSelectedData.exCareSelectedDataList  || careLabelSelectedData.exCareSelectedDataList.length==0)) {  
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Excare_instructions_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        if(component.get('v.Careinstruction').length>0 && JSON.stringify(careLabelSelectedData.freetextData)=='{}' ){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Free_Text_is_missing"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        else if(itemMaster.Free_Text__c){
            if((itemMaster.Style_Number__c && !careLabelSelectedData.freetextData.StyleNumber))
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
            else if((itemMaster.RN_Number__c && !careLabelSelectedData.freetextData.RNNumber))
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
                else if((itemMaster.Lot_Number__c && !careLabelSelectedData.freetextData.LotNumber))
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
                    else if((itemMaster.Supplier_Number__c && !careLabelSelectedData.freetextData.SupplierNumber))
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
                        else if((itemMaster.Labelling_Code__c && !careLabelSelectedData.freetextData.LabellingCode))
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
                            else if((itemMaster.Packaging_Code__c && !careLabelSelectedData.freetextData.PackagingCode))
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
                                else if((itemMaster.Season_Month__c && !careLabelSelectedData.freetextData.SeasonMonth))
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
                                    else if((itemMaster.Season_Year__c && !careLabelSelectedData.freetextData.SeasonYear))
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
                                        else if((itemMaster.Item_Number__c && !careLabelSelectedData.freetextData.ItemNumber))
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
                                            else if((itemMaster.Care_Instruction__c && !careLabelSelectedData.freetextData.careinstruct))
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
        }
        var temp=new Object();
        temp.selectedLang=component.get('v.selectedLang');
        temp.quantity=component.get('v.Quantity');
        if(careLabelSelectedData.brandIcondata!='{}')
        {
            temp.brandIcondata=careLabelSelectedData.brandIcondata;             
        }
        temp.FabricSelectedData=careLabelSelectedData.FabricSelectedData;
        if(careLabelSelectedData.sizeChartData!='{}')
        {
            temp.sizeChartData=careLabelSelectedData.sizeChartData;
        }
        if(careLabelSelectedData.countryOriginData!='{}')
        {
            temp.countryOriginData=careLabelSelectedData.countryOriginData;
        }
        temp.CareSelectedData=careLabelSelectedData.CareSelectedData;
        //alert(JSON.stringify(careLabelSelectedData.exCareSelectedDataList));
        if(careLabelSelectedData.exCareSelectedDataList && careLabelSelectedData.exCareSelectedDataList.length>0)
        {
            temp.exCareSelectedDataList=careLabelSelectedData.exCareSelectedDataList;	
        }
        if(careLabelSelectedData.freetextData!='{}')
        {
            temp.freetextData=careLabelSelectedData.freetextData;
        }	
        var careLabelSelectedDataList=component.get('v.careLabelSelectedDataList');
        for(var i=0;i<careLabelSelectedDataList.length;i++)
        {  
            var tempFab=careLabelSelectedDataList[i].FabricSelectedData;
            var fabMached=true;
            if(itemMaster.Fabric_Component__c){
                if(tempFab.length==temp.FabricSelectedData.length)
                {
                    for(var j=0;j<tempFab.length;j++)
                    {
                        var fabId=tempFab[j]['fabId'];
                        delete tempFab[j]['fabId'];
                        var matched=false;
                        for(var k=0;k<temp.FabricSelectedData.length;k++)
                        {
                            if(JSON.stringify(temp.FabricSelectedData[k])===JSON.stringify(tempFab[j]))
                            {
                                matched=true;
                            }
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
                if(temp.CareSelectedData.length==careLabelSelectedDataList[i].CareSelectedData.length)
                {
                    var tempCareInstr=careLabelSelectedDataList[i].CareSelectedData;
                    for(var j=0;j<tempCareInstr.length;j++)
                    {
                        var careIdList=tempCareInstr[j]['careIdList'];
                        delete tempCareInstr[j]['careIdList'];
                        //alert('Bef>'+JSON.stringify(tempCareInstr));
                        var matched1=false;
                        for(var k=0;k<temp.CareSelectedData.length;k++)
                        {
                            //if(tempCareInstr[j].instGrp==temp.CareSelectedData[k].instGrp)
                            delete temp.CareSelectedData[k]['careIdList'];
                            //alert('Bef>'+JSON.stringify(temp.CareSelectedData));
                            //alert(JSON.stringify(temp.CareSelectedData[k]));
                            //alert(JSON.stringify(tempCareInstr[j]));
                            if(JSON.stringify(temp.CareSelectedData[k])===JSON.stringify(tempCareInstr[j]))
                            {
                                matched1=true;
                            }
                        }
                        tempCareInstr[j]['careIdList']=careIdList;
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
            /*var excareMatched=true;
            if(itemMaster.Excare_Instruction__c){
                if(careLabelSelectedDataList[i].exCareSelectedData.ExcareInstructions.length==temp.exCareSelectedData.ExcareInstructions.length
                   && careLabelSelectedDataList[i].exCareSelectedData.position==temp.exCareSelectedData.position)
                {
                    //alert(JSON.stringify(careLabelSelectedDataList[i].exCareSelectedData.ExcareInstructions));
                    careLabelSelectedDataList[i].exCareSelectedData.ExcareInstructions.sort();
                    //alert(JSON.stringify(careLabelSelectedDataList[i].exCareSelectedData.ExcareInstructions));
                    temp.exCareSelectedData.ExcareInstructions.sort();
                    if(JSON.stringify(careLabelSelectedDataList[i].exCareSelectedData.ExcareInstructions)!=JSON.stringify(temp.exCareSelectedData.ExcareInstructions))
                    {
                        excareMatched=false;
                    }
                    
                }
                else
                    excareMatched=false;
            }*/
            var tempEx=careLabelSelectedDataList[i].exCareSelectedDataList;
            var exMatched=true;
            if(itemMaster.Excare_Instruction__c){
                if(tempEx.length==temp.exCareSelectedDataList.length)
                {
                    for(var j=0;j<tempEx.length;j++)
                    {
                        var excareId=tempEx[j]['excareId'];
                        delete tempEx[j]['excareId'];
                        var matched=false;
                        //alert(JSON.stringify(tempEx[j]));
                        for(var k=0;k<temp.exCareSelectedDataList.length;k++)
                        {
                            //alert(JSON.stringify(temp.exCareSelectedDataList[k]));
                            if(JSON.stringify(temp.exCareSelectedDataList[k])===JSON.stringify(tempEx[j]))
                            {
                                matched=true;
                            }
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
           // alert(' temp 12');
            var freeTextMatch=true;
            //alert('temp 122');
            //alert(careLabelSelectedDataList[i].freetextData);
            //alert(temp.freetextData.StyleNumber);
            //alert(itemMaster.RN_Number__c && careLabelSelectedDataList[i].freetextData && careLabelSelectedDataList[i].freetextData.RNNumber!=temp.freetextData.RNNumber);
            //alert(itemMaster.Lot_Number__c && careLabelSelectedDataList[i].freetextData.LotNumber!=temp.freetextData.LotNumber);
            //alert(itemMaster.Care_Instruction__c && careLabelSelectedDataList[i].freetextData.careinstruct!=temp.freetextData.careinstruct);
            //alert(itemMaster.Supplier_Number__c && careLabelSelectedDataList[i].freetextData.SupplierNumber!=temp.freetextData.SupplierNumber);
            //alert(itemMaster.Labelling_Code__c && careLabelSelectedDataList[i].freetextData.LabellingCode!=temp.freetextData.LabellingCode);
            //alert(itemMaster.Packaging_Code__c && careLabelSelectedDataList[i].freetextData.PackagingCode!=temp.freetextData.PackagingCode);
            //alert(itemMaster.Season_Month__c && careLabelSelectedDataList[i].freetextData.SeasonMonth!=temp.freetextData.SeasonMonth);
            //alert(itemMaster.Season_Year__c && careLabelSelectedDataList[i].freetextData.SeasonYear!=temp.freetextData.SeasonYear);
            //alert(itemMaster.Item_Number__c && careLabelSelectedDataList[i].freetextData.ItemNumber!=temp.freetextData.ItemNumber);
            if(itemMaster.Free_Text__c){
                if(careLabelSelectedDataList[i].freetextData && ((itemMaster.Style_Number__c && careLabelSelectedDataList[i].freetextData.StyleNumber!=temp.freetextData.StyleNumber)
                   ||(itemMaster.RN_Number__c && careLabelSelectedDataList[i].freetextData.RNNumber!=temp.freetextData.RNNumber)
                   ||(itemMaster.Lot_Number__c && careLabelSelectedDataList[i].freetextData.LotNumber!=temp.freetextData.LotNumber)
                   ||(itemMaster.Care_Instruction__c && careLabelSelectedDataList[i].freetextData.careinstruct!=temp.freetextData.careinstruct)
                   ||(itemMaster.Supplier_Number__c && careLabelSelectedDataList[i].freetextData.SupplierNumber!=temp.freetextData.SupplierNumber)
                   ||(itemMaster.Labelling_Code__c && careLabelSelectedDataList[i].freetextData.LabellingCode!=temp.freetextData.LabellingCode)
                   ||(itemMaster.Packaging_Code__c && careLabelSelectedDataList[i].freetextData.PackagingCode!=temp.freetextData.PackagingCode)
                   ||(itemMaster.Season_Month__c && careLabelSelectedDataList[i].freetextData.SeasonMonth!=temp.freetextData.SeasonMonth)
                   ||(itemMaster.Season_Year__c && careLabelSelectedDataList[i].freetextData.SeasonYear!=temp.freetextData.SeasonYear)
                   ||(itemMaster.Item_Number__c && careLabelSelectedDataList[i].freetextData.ItemNumber!=temp.freetextData.ItemNumber)))
                {
                    //alert(' temp 12.01');
                    freeTextMatch=false;
                }
               // alert(' temp 12.02');
            }
            //alert(' temp 12.1');
            var brandIconPresent=true;
            if(itemMaster.Brand_Icon__c)
            {
                if(careLabelSelectedDataList[i].brandIcondata.Id==temp.brandIcondata.Id)
                {
                    brandIconPresent=true;
                }
                else
                {
                    brandIconPresent=false;
                }
            }
           // alert(' temp 12.2');
            var sizeChartPresent=true;
            if(itemMaster.Size_Chart__c)
            {
                if(careLabelSelectedDataList[i].sizeChartData.Id==temp.sizeChartData.Id)
                {
                    sizeChartPresent=true;
                }
                else
                {
                    sizeChartPresent=false;
                }
            }
            //alert(' temp 12.3');
            var countryOfOriginPresent=true;
            if(itemMaster.Country_Of_Origin__c)
            {
                if(temp.countryOriginData.selectedcountry==careLabelSelectedDataList[i].countryOriginData.selectedcountry)
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
            //alert(' temp 13');
            if(careLabelSelectedDataList[i].selectedLang==temp.selectedLang && 
               careLabelSelectedDataList[i].quantity==temp.quantity &&
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
        console.log('temp1111>>>'+JSON.stringify(temp));
      //  alert('component.get("v.selectedSize")>>>'+component.get("v.selectedSize"));
      //  alert('component.get("v.sizeChartData")>>>'+component.get("v.sizeChartData"));
        careLabelSelectedDataList.push(temp);
        component.set('v.careLabelSelectedDataList',careLabelSelectedDataList);
         console.log('component.get("v.careLabelSelectedDataList")>>>'+JSON.stringify(component.get("v.careLabelSelectedDataList")));
        component.set("v.careLabelOrderDetail", true);
        component.set("v.showSpinner", true);
        helper.saveCareData(component, event, helper,'label');
    },
    ClearData:function(component, event, helper){
        var CareIns = component.find("CareInstruction");
        var itemMaster=component.get('v.itemMaster');
       // alert('itemMaster711>>'+JSON.stringify(itemMaster));
        var careLabelSelectedData=component.get('v.careLabelSelectedData');
        var temp=new Object();
        temp.selectedLang=component.get('v.selectedLang');
        temp.quantity=component.get('v.Quantity');
        if(careLabelSelectedData.brandIcondata!='{}')
        {
            temp.brandIcondata=careLabelSelectedData.brandIcondata;
        }
        temp.FabricSelectedData=careLabelSelectedData.FabricSelectedData;
        if(careLabelSelectedData.sizeChartData!='{}')
        {
            temp.sizeChartData=careLabelSelectedData.sizeChartData;
        }
        if(careLabelSelectedData.countryOriginData!='{}')
        {
            temp.countryOriginData=careLabelSelectedData.countryOriginData;
        }
        temp.CareSelectedData=careLabelSelectedData.CareSelectedData;
        if(careLabelSelectedData.exCareSelectedData!='{}')
        {
            temp.exCareSelectedData=careLabelSelectedData.exCareSelectedData;
        }	
        if(careLabelSelectedData.freetextData!='{}')
        {
            temp.freetextData=careLabelSelectedData.freetextData;
        }	
        careLabelSelectedData.exCareSelectedData='{}';
        careLabelSelectedData.brandIcondata='{}';
        var brandIcondata=component.get('v.Brandlist');
        for (var i = 0; i <brandIcondata.length; i++) {
            brandIcondata[i].BrandIconCheckbox = false;
        }
        component.set('v.Brandlist',brandIcondata);
        careLabelSelectedData.sizeChartData='{}';
        var sizeChartData=component.get('v.sizelist');
        for (var i = 0; i <sizeChartData.length; i++) {
            sizeChartData[i].selectedsizechart = false;
        }         
        component.set('v.sizelist',sizeChartData);
        careLabelSelectedData.CareSelectedData=[];
        careLabelSelectedData.FabricSelectedData=[];
        careLabelSelectedData.freetextData='{}';
        careLabelSelectedData.countryOriginData='{}';
        component.set('v.selectedLang','');
        component.set('v.Quantity',0);
        for(var i=0;i<CareIns.length;i++)
        {
            CareIns[i].clearSelectedData('Clear');
        }
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'success-border');
        $A.util.removeClass(FabricComponentTab, 'success-border');
        $A.util.removeClass(SizeChartTab, 'success-border');
        $A.util.removeClass(CountryOfOriginTab, 'success-border');        
        $A.util.removeClass(CareInstructionDetailsTab, 'success-border');
        $A.util.removeClass(ExcareInstructionsTab, 'success-border');
        $A.util.removeClass(FreeTextTab, 'success-border');
    },
    //---------------------SUBMIT AND VIEW VALUE---------------------------------------------------//
    
    LatestSubmitViewedCareLabl:function(component, event, helper){
        //alert(JSON.stringify(component.get('v.deletedCLLIIdList')));
        //return;
        var CareIns = component.find("viewCareLabel");
        var itemMaster=component.get('v.itemMasterForView');
       // alert(JSON.stringify(itemMaster));
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
            //var WhichData=status.WhichData;
            //alert(WhichData);
            //if(WhichData='brandIcondata')
            //tempViewedCarelabelData.brandIcondata=status.Data;
            //alert(JSON.stringify(status));
        }
        var viewedCarelabelData=component.get('v.finalviewedCarelabelData');
        console.log('viewedCarelabelData>>'+JSON.stringify(viewedCarelabelData));
        
        var viewedIndex=component.get('v.viewedIndex');
       var careLabelSelectedDataList=component.get('v.careLabelSelectedDataList');
         console.log('LatestSubmitViewedCareLabl ::'+JSON.stringify(careLabelSelectedDataList));
        console.log('LatestSubmitViewedCareLabl  001::'+JSON.stringify(careLabelSelectedDataList[viewedIndex]));
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
            	if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( component.get('v.MOQ') )+ "\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) +"\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                {
                    viewedCarelabelData.quantity=result;
                    component.set("v.Quantity", viewedCarelabelData.quantity);
                    component.find('viewedQuant').set('v.value',result);
                }
                return;   
            } 
            else if(component.find('viewedQuant').get('v.value') < component.get('v.MOQ') && component.get('v.fullboxQty') && component.get('v.viewedCarelabelData.boxquantity') && (component.get('v.MOQ')<component.get('v.viewedCarelabelData.boxquantity') || component.get('v.MOQ') % component.get('v.viewedCarelabelData.boxquantity')!=0))
            {
                result = Math.ceil(component.get('v.MOQ')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
                if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ")+( component.get('v.MOQ') ) + "\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") +  ( result ) +"\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity")+ ( result ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                {
                    viewedCarelabelData.quantity=result;
                    component.set("v.Quantity", viewedCarelabelData.quantity);
                    component.find('viewedQuant').set('v.value',result);
                }
                return;   
            }
            else if(component.find('viewedQuant').get('v.value') < component.get('v.MOQ'))
            {
                if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( component.get('v.MOQ') ) +"\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( component.get('v.MOQ') ) + $A.get("$Label.c.and_add_it_in_the_CART")))
                {
                    viewedCarelabelData.quantity=component.get('v.MOQ');
                    component.set("v.Quantity", viewedCarelabelData.quantity);
                    component.find('viewedQuant').set('v.value',component.get('v.MOQ'));
                }
                return;   
            }
            result = Math.ceil(component.find('viewedQuant').get('v.value')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
            if(component.get('v.fullboxQty') && component.get('v.viewedCarelabelData.boxquantity') && (component.find('viewedQuant').get('v.value')<component.get('v.viewedCarelabelData.boxquantity') || component.find('viewedQuant').get('v.value') % component.get('v.viewedCarelabelData.boxquantity')!=0))
            {
                result = Math.ceil(component.find('viewedQuant').get('v.value')/component.get('v.viewedCarelabelData.boxquantity'))*component.get('v.viewedCarelabelData.boxquantity');
            	if (confirm($A.get("$Label.c.Order_Quantity_for_Product")+component.get('v.selectedProduct').Name+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") +"\n" +$A.get("$Label.c.The_nearest_multiples_of_box_quantity")+ ( result ) +"\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity")+( result ) + $A.get("$Label.c.and_add_it_in_the_CART"))) 
                {
                    viewedCarelabelData.quantity=result;
                    component.set("v.Quantity", viewedCarelabelData.quantity);
                    component.find('viewedQuant').set('v.value',result);
                }
                return;   
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
            else{
                viewedCarelabelData.sizeChartData=careLabelSelectedDataList[viewedIndex].sizeChartData;
            }
            //viewedCarelabelData.countryOriginData=careLabelSelectedDataList[viewedIndex].countryOriginData;
        }
        else if(itemMaster.Size_Chart__c)
        {
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
            if(Careinstruction.length!=viewedCarelabelData.CareSelectedData.length)
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
        }
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
                        delete tempCareInstr[j]['careIdList'];
                        var matched1=false;
                        for(var k=0;k<viewedCarelabelData.CareSelectedData.length;k++)
                        {
                            //if(tempCareInstr[j].instGrp==viewedCarelabelData.CareSelectedData[k].instGrp)
                            delete viewedCarelabelData.CareSelectedData[k]['careIdList'];
                            if(JSON.stringify(viewedCarelabelData.CareSelectedData[k])===JSON.stringify(tempCareInstr[j]))
                            {
                                matched1=true;
                            }
                        }
                        tempCareInstr[j]['careIdList']=careIdList;
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
        console.log('controller Before set::'+JSON.stringify(component.get('v.careLabelSelectedDataList')));
        component.set('v.careLabelSelectedDataList',careLabelSelectedDataList);
        console.log('controller After set::'+JSON.stringify(component.get('v.careLabelSelectedDataList')));
        component.set('v.viewCarelabelFlag',false);
        helper.saveCareData(component, event, helper,'label');
    },
    removeCarelabelLine: function(component, event, helper){
        var careLabelSelectedDataList = component.get("v.careLabelSelectedDataList");
        var removeInd = event.getSource().get("v.name");
        var soliIdToDelete=careLabelSelectedDataList[removeInd].soliId;
        var soId=careLabelSelectedDataList[removeInd].soId;
        var deleterow=careLabelSelectedDataList.splice(removeInd, 1);
        component.set("v.careLabelSelectedDataList", careLabelSelectedDataList);
        helper.deleteSOLICarelabelData(component,event,helper,soId,soliIdToDelete);
    },
    viewCareLabel: function(component, event, helper){
        var viewInd = event.getSource().get("v.name");
        component.set('v.viewedIndex',viewInd);
        component.set('v.finalviewedCarelabelData',{});
        // alert(JSON.stringify(component.get('v.careLabelSelectedDataList')[component.get('v.viewedIndex')].CareSelectedData));
        helper.getWrapperDataForView(component,event,helper,viewInd);
         let CloseLogo = component.getEvent("CloseLogoEvent"); 
       CloseLogo.setParams({"closelogo" : false}); 
        CloseLogo.fire(); 
    },
    closeViewCareLabel:function(component, event, helper){
        component.set("v.viewCarelabelFlag",false);  
    },
    addDataToCart: function(component, event, helper){
        helper.saveCareData(component, event, helper,'Cart');
    },
    addLabel:function(component, event, helper){
        component.set("v.careLabelOrder", false); 
         component.set("v.logo", false); 
        component.set("v.catalogVertical", true); 
        component.set("v.displayPagination",true);
        component.set("v.quickview", false); 
        var e = component.getEvent("CatalogEvent");
        e.setParams({ "flag": "fromLabel"});
        e.fire();
    },
    BrandIconTab : function(component, event, helper) {        
        component.set('v.BrandIconContent',true);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',false);
        
        //document.getElementById("FabricComponentTab").setAttribute("style", "background: green; color: white");
        
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.addClass(BrandIconTab, 'slds-is-active');
        $A.util.removeClass(FabricComponentTab, 'slds-is-active');
        $A.util.removeClass(SizeChartTab, 'slds-is-active');
        $A.util.removeClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.removeClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.removeClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.removeClass(FreeTextTab, 'slds-is-active');
        
    },
    FabricComponentTab : function(component, event, helper) {  
        component.set('v.BrandIconContent',false);
        component.set('v.FabricComponentContent',true);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',false);
        
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'slds-is-active');
        $A.util.addClass(FabricComponentTab, 'slds-is-active');
        $A.util.removeClass(SizeChartTab, 'slds-is-active');
        $A.util.removeClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.removeClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.removeClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.removeClass(FreeTextTab, 'slds-is-active');
    },
    SizeChartTab : function(component, event, helper) { 
        component.set('v.BrandIconContent',false);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',true);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',false);
        
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'slds-is-active');
        $A.util.removeClass(FabricComponentTab, 'slds-is-active');
        $A.util.addClass(SizeChartTab, 'slds-is-active');
        $A.util.removeClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.removeClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.removeClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.removeClass(FreeTextTab, 'slds-is-active');
    },
    CountryOfOriginTab : function(component, event, helper) {  
        component.set('v.BrandIconContent',false);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',true);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',false);
        
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'slds-is-active');
        $A.util.removeClass(FabricComponentTab, 'slds-is-active');
        $A.util.removeClass(SizeChartTab, 'slds-is-active');
        $A.util.addClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.removeClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.removeClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.removeClass(FreeTextTab, 'slds-is-active');
    },
    CareInstructionDetailsTab : function(component, event, helper) { 
        component.set('v.BrandIconContent',false);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',true);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',false);
        
        for(var i=0;i<8;i++)
        {
            component.set('v.selectedCarTabId','care-'+i);
        }
        component.set('v.selectedCarTabId','care-0');
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'slds-is-active');
        $A.util.removeClass(FabricComponentTab, 'slds-is-active');
        $A.util.removeClass(SizeChartTab, 'slds-is-active');
        $A.util.removeClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.addClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.removeClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.removeClass(FreeTextTab, 'slds-is-active');
    },
    ExcareInstructionsTab : function(component, event, helper) { 
        component.set('v.BrandIconContent',false);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',true);
        component.set('v.FreeTextContent',false);
        
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'slds-is-active');
        $A.util.removeClass(FabricComponentTab, 'slds-is-active');
        $A.util.removeClass(SizeChartTab, 'slds-is-active');
        $A.util.removeClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.removeClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.addClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.removeClass(FreeTextTab, 'slds-is-active');
    },
    FreeTextTab : function(component, event, helper) { 
        component.set('v.BrandIconContent',false);
        component.set('v.FabricComponentContent',false);
        component.set('v.SizeChartComponetContent',false);
        component.set('v.CountryOfOriginContent',false);
        component.set('v.CareLabelInstructionDetailContent',false);
        component.set('v.ExcareInstructionContent',false);
        component.set('v.FreeTextContent',true);
        
        var BrandIconTab = component.find('BrandIconTab');
        var FabricComponentTab = component.find('FabricComponentTab');
        var SizeChartTab = component.find('SizeChartTab');
        var CountryOfOriginTab = component.find('CountryOfOriginTab');
        var CareInstructionDetailsTab = component.find('CareInstructionDetailsTab');
        var ExcareInstructionsTab = component.find('ExcareInstructionsTab');
        var FreeTextTab = component.find('FreeTextTab');
        
        $A.util.removeClass(BrandIconTab, 'slds-is-active');
        $A.util.removeClass(FabricComponentTab, 'slds-is-active');
        $A.util.removeClass(SizeChartTab, 'slds-is-active');
        $A.util.removeClass(CountryOfOriginTab, 'slds-is-active');
        $A.util.removeClass(CareInstructionDetailsTab, 'slds-is-active');
        $A.util.removeClass(ExcareInstructionsTab, 'slds-is-active');
        $A.util.addClass(FreeTextTab, 'slds-is-active');
    },
    magnify : function(component, event,helper)
    {
        helper.magnify(component,helper,event);
        
    },
    magnifyleave : function(component, event,helper)
    {
        helper.magnifyleave(component, event,helper);
    }
})