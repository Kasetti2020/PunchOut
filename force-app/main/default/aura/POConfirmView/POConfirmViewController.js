({
    doint : function(component, event, helper,page) 
    {
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
        helper.getPOList(component, event, helper,page);
        //Added by SUSHIL on 7-12-21
        const options = [
      {'label': $A.get("$Label.c.Separate_Order_One_PO_to_One_SO"), 'value': 'Multiple SO Conversion' },                                           
      {'label': $A.get("$Label.c.Combine_Order_Multiple_PO_to_One_SO"), 'value': 'Single SO Conversion' }                                          
        /* ... */
    ];

    component.set('v.options', options);
    },
    
    selectchild: function(component,event,helper)
    {
        //code block to catch event fired at each row check box click
        var selRetailer = event.getParam("selectcheck");
        if(selRetailer)
        {
            component.set("v.mainCheckbox",false);
        }
        
    },
    selectAll: function(component,event, helper){
        var slctCheck = event.getSource().get("v.value");
        var POLI = component.get("v.POList.POLIList");
        var polipush = [];
        if(slctCheck)
        {
            for(var i=0; i<POLI.length; i++)
            {
                
                POLI[i].IsSelected= true;
                polipush.push(POLI[i]);
                
            }
            component.set("v.POList.POLIList",polipush); 
        }
        else
        {            
            for(var i=0; i<POLI.length ; i++)
            {
                POLI[i].IsSelected = false;
                polipush.push(POLI[i]);
                
            }
            component.set('v.POList.POLIList',polipush); 
            component.set("v.mainCheckbox",false);
        }
        
        
    },
    ConfirmOrder:function(component, event, helper)
    {
        var getCheckAllId = component.get("v.POList.POLIList");
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        
        var retailerId;
        var vertical;
        var selctedRec = [];
        //var selctedRecTemp = [];
        var flag;
        var POPoRTempArr = new Array(2);
        var POLIPoRTempArr = [];
        var POLIQtyArr  = [];
        var POLIRecArr  = [];
        
        
        //To get list of all PO for unselecting All
        var temp = [];
        var getCheckAllId = component.get("v.POList.POLIList");
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            temp.push(getCheckAllId[i].POwrap.Id);
        }
        component.set("v.toclearConfirmPOList",temp);
        //console.log("All POs to transfer for unchecking>>>"+component.get("v.toclearConfirmPOList"));
        
        
        /*for (var i = 0; i < getCheckAllId.length; i++) 
        {
            
            if(getCheckAllId[i].IsSelected == true)
            {
                
                selctedRecTemp.push(getCheckAllId[i]); 
            }
        }
        
        if(selctedRecTemp.length > 1)
        {
      
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: "Warning",
                message: 'Please select one PO at once!',
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        */
        //to remove lines having zero qty
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            var POLIQtyArr1  = [];
            if(getCheckAllId[i].IsSelected == true)
            {
                var poli = getCheckAllId[i].POLIwrap;
                var po = getCheckAllId[i].POwrap;
                console.log("poli>>>>>"+JSON.stringify(poli));
                console.log("poli>>>>>"+JSON.stringify(po));
               
                if(!poli)	//validation to check if the selected PO have line items or not
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        message: getCheckAllId[i].POwrap.Name+ $A.get("$Label.c.does_not_have_any_line_items"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                //taking poli data having zero qty to update in db
                POLIPoRTempArr = [];
                for(var j = 0; j < poli.length; j++) 
                {
                    if(poli[j].Supply_Quantity__c == 0)
                    {
                        var POLIQty = poli[j].Id+'-'+ poli[j].Supply_Quantity__c+'-'+poli[j].Purchase_Order__c;
                        console.log("POLIQty>>>>>"+JSON.stringify(POLIQty));
                        POLIQtyArr.push(POLIQty);
                         POLIQtyArr1.push(POLIQty);
                        console.log("POLIQtyArr>>>>>"+JSON.stringify(POLIQtyArr));
                        return;
                    }
                    else if(poli[j].Supply_Quantity__c ==""||poli[j].Supply_Quantity__c == null || poli[j].Supply_Quantity__c == undefined){
                        var toastEvent = $A.get("e.force:showToast");
            			toastEvent.setParams({
                		title : $A.get("$Label.c.Warning"),
               			message:$A.get("$Label.c.Please_enter_0_for_all_the_PO_line_items_that_you_are_trying_to_delete"),
               			duration:' 5000',
                		type: 'Warning'
            			});
            			toastEvent.fire(); 
                        return;
                    }
                    else
                    {
                        POLIPoRTempArr.push(poli[j]);
                    }
                }
                console.log("getCheckAllId["+i+"].POLIwrap.length>>>>>"+getCheckAllId[i].POLIwrap.length); 
                console.log("POLIQtyArr.length>>>>>"+POLIQtyArr.length);
				if(getCheckAllId[i].POLIwrap.length == 1){
					var poli = getCheckAllId[i].POLIwrap;
					for(j=0;j<poli.length;j++){
						if(poli[j].Supply_Quantity__c == 0){
							getCheckAllId[i].isAllqtyZero = true;
						}
					}
				}else{
                    if(POLIQtyArr.length>0 && (getCheckAllId[i].POLIwrap.length == POLIQtyArr1.length)){
                    	getCheckAllId[i].isAllqtyZero = true;
                    	//alert("inside the bug if else");
					}
				}
                for(j=1;j<getCheckAllId.length;j++){
                    if(getCheckAllId[j].IsSelected == true)
            		{
                        if(i!=j){
                            if(po.Supplier_Code__c != getCheckAllId[j].POwrap.Supplier_Code__c){
                                
                                var toastEvent = $A.get("e.force:showToast");
                    			toastEvent.setParams({
                        			title: $A.get("$Label.c.Warning"),
                        			message: $A.get("$Label.c.Please_select_POs_of_same_Supplier_Factory_Code"),
                        			type: "warning"
                    			});
                    			toastEvent.fire();
                                return;
                            }
                        }
                    }
                }
            }
        }
        //updating 0 qty in poli
        if(POLIQtyArr.length>0)
        {
            helper.updatePOLIqty(component, event,helper,POLIQtyArr);
        }
        
       for (var i = 0; i < getCheckAllId.length; i++) 
        {
            if(getCheckAllId[i].IsSelected == true)
            {
                var poli = getCheckAllId[i].POLIwrap;
               if(poli.length==0 || getCheckAllId[i].isAllqtyZero)	//validation to check if the selected PO have line items or not
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title: $A.get("$Label.c.Warning"),
                        
                        message: $A.get("$Label.c.Please_check") +getCheckAllId[i].POwrap.Order_Number__c+ $A.get("$Label.c.Either_it_does_not_have_any_line_items_or_the_PO_has_been_cancelled_Please_un"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    return;
                }
                for (var j = 0; j < poli.length; j++) 
                {
                    //alert('j>>'+j+'poli'+JSON.stringify(poli[j]));
                    if(poli[j].Expected_Delivery_Date__c)
                    {
                        
                    }
                    else
                    {
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Please_enter_Expected_Delivery_Date_at_PO_detail") +poli[j].Name,
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;
                    }
                    
                    if(poli[j].Supply_Quantity__c != poli[j].Quantity__c)
                    {
                        var POLIQty = poli[j].Id+ '-'+ poli[j].Supply_Quantity__c;
                    }
                    
                    POLIRecArr.push(poli[j]);
                }

                if(vertical)
                {
                    if(getCheckAllId[i].POwrap.Vertical__c != vertical)
                    {
                        flag = false;
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Please_Select_Purchase_Order_from_only_one_Vertical"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;   
                    }
                }
                else
                {
                    vertical = getCheckAllId[i].POwrap.Vertical__c;
                }
                
                if(retailerId)
                {
                    if(getCheckAllId[i].POwrap.Retailer_Code1__c != retailerId)
                    {
                        flag = false;
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            title: $A.get("$Label.c.Warning"),
                            message: $A.get("$Label.c.Please_Select_Purchase_Order_from_only_one_Retailer"),
                            type: "warning"
                        });
                        toastEvent.fire();
                        return;   
                    }
                    else if(getCheckAllId[i].POwrap.Retailer_Code1__c == retailerId && getCheckAllId[i].POwrap.Vertical__c == vertical)
                    {
                        flag = true;
                        selctedRec.push(getCheckAllId[i]); 
                        //getCheckAllId[i].IsSelected = false;
                        component.set("v.selectedRetailerId",getCheckAllId[i].POwrap.Retailer_Code1__c);
                        component.set("v.selectedRetailer",getCheckAllId[i].POwrap.Retailer_Code1__r.Name);
                    }
                }
                else
                {
                    retailerId = getCheckAllId[i].POwrap.Retailer_Code1__c;
                    
                    flag = true;
                    selctedRec.push(getCheckAllId[i]); 
                    //getCheckAllId[i].IsSelected = false;
                    component.set("v.selectedRetailerId",getCheckAllId[i].POwrap.Retailer_Code1__c);
                    component.set("v.selectedRetailer",getCheckAllId[i].POwrap.Retailer_Code1__r.Name);
                }
                //getCheckAllId[i].set("v.value", selctedRec);	//don't know what this does
                
            }            
        }
        
        
        //Validation for Expected_Delivery_Date__c ends here ---->
        if(flag)
        {
            helper.updatePOLI(component, event,helper,POLIRecArr,retailerId);
            //helper.updatePOLIqty(component, event,helper,POLIQtyArr,retailerId);
            
            component.set("v.SelecPOList",selctedRec);
            component.set("v.POList.POLIList",getCheckAllId);	//making all the selected items false again            
            //helper.updateQuantity(component, event,selctedRec);
        }
        else{
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title : $A.get("$Label.c.Error_Message"),
                message:$A.get("$Label.c.Select_atleast_one_Purchase_Order"),
                duration:' 5000',
                key: 'info_alt',
                type: 'error',
                mode: 'pester'
            });
            toastEvent.fire();
            
            return;
            
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            if(getCheckAllId[i].IsSelected == true)
            {
                var po = getCheckAllId[i].POwrap;
                component.set("v.supplierCode",po.Supplier_Code__c);
            }
        }
        component.set("v.ConfirmPO",true);
        component.set("v.MainFlag",false);
    },
    closeModal: function(component, event, helper) {
        component.set("v.shipadd", false);
        $A.get('e.force:refreshView').fire();
    },
    openConfirmOrderModal: function(component, event, helper) {
        component.set("v.isBoxValidationRqd", false);
        //component.set('v.shipadd',true);
        component.set('v.openChoicePopup',true);
    },
    openConfirmOrderPageModal : function(component, event, helper){
        
        if(component.get("v.SOChoiceFlag") != null && component.get("v.SOChoiceFlag") !=''){
            component.set('v.shipadd',true);
            component.set('v.openChoicePopup',false);
        }
        else{
            
            var defaultSOValue = component.get("v.Defaultvalue");
            component.set("v.SOChoiceFlag",defaultSOValue);
            component.set('v.shipadd',true);
            component.set('v.openChoicePopup',false);
        }
        
    },
    cancelMethod : function(component, event, helper){
        helper.cancelPOnPOLIChanges(component, event,helper);
        component.set('v.openChoicePopup',false);
    },
    handleChangeRadio: function (component, event) {
        var changeValue = event.getParam("value");
        component.set("v.SOChoiceFlag",changeValue);
        
    },
    closeBoxRqdModal: function(component, event, helper) {
        helper.cancelPOnPOLIChanges(component, event,helper);
        component.set("v.isBoxValidationRqd", false);
    },
    pageChange: function(component, event, helper) 
    {
        var spinner = component.find('spinner');
        $A.util.removeClass(spinner, "slds-hide");
        
        var page = component.get("v.page") || 1;
        var direction = event.getParam("direction");
        page = direction === "previous" ? (page - 1) : (page + 1);
        helper.getPOList(component, event, helper,page);
    },
    
    EditPO : function(component, event, helper){
        var editrowId = event.getSource().get("v.value");
        var editRecordEvent = $A.get("e.force:editRecord");
        editRecordEvent.setParams({
            "recordId": editrowId,
            "panelOnDestroyCallback": function(event) {
                window.location.href = "/lightning/n/POViewPage";
            }
        });
        editRecordEvent.fire();
    },
    
    handleSearchEvent : function(component, event) {
        
        var poList = event.getParam("POList");
        var flag = event.getParam("flag");
        var type = event.getParam("type");
        var sertxt = event.getParam("searchtext");
        if(flag==true && type=='OpenPO'){
            component.set('v.total', poList.total);
            component.set('v.page', poList.page);
            component.set('v.pages', Math.ceil(poList.total/poList.pageSize));
            component.set("v.POList", poList);
            component.set("v.searchText", sertxt);
        }
        else{
            // $A.get('e.force:refreshView').fire();
             component.set("v.ConfirmPO",true);
        	component.set("v.MainFlag",false);
        }
           
           
    },
    tablesizeChange: function(component, event) {
        var poList = component.get("v.POList");
        var anyOneExpanded=false;
        if(poList.POLIList)
        {
            for(var i=0;i<poList.POLIList.length;i++)
            {
                if(poList.POLIList[i].expanded==true)
                {
                    
                    anyOneExpanded=true;
                    
                }
            }
        }
        component.set('v.tablesizeExpand',!anyOneExpanded);
    },
    uncheckPO: function(component, event, helper){
        var selctedRecTemp = [];
        var temp = [];
        var getCheckAllId = component.get("v.POList.POLIList");
        if (!Array.isArray(getCheckAllId)) {
            getCheckAllId = [getCheckAllId];
        }
        for (var i = 0; i < getCheckAllId.length; i++) 
        {
            if(getCheckAllId[i].IsSelected == true)
            {
                //selctedRecTemp.push(getCheckAllId[i]);
                //temp.push(selctedRecTemp[i].POwrap.Id);
                temp.push(getCheckAllId[i].POwrap.Id);
            }
            
        }
        component.set("v.clearPOListIds",temp);
        //console.log('All POs>>>>    '+temp);
        if(component.get("v.clearPOListIds")=='' || component.get("v.clearPOListIds")==null || component.get("v.clearPOListIds")==undefined ){
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
            title : $A.get("$Label.c.Warning"),
            message: $A.get("$Label.c.Please_select_a_PO_to_remove"),
            duration:' 5000',
            key: 'info_alt',
            type: 'warning',
            mode: 'pester'
            });
            toastEvent.fire();       
        }
        
        
        var action = component.get("c.uncheckPoCheckbox");
        action.setParams({ SelectedId : component.get("v.clearPOListIds")});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var accs = response.getReturnValue();
        
            }
            else if (state === "INCOMPLETE") {
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
        if(component.get("v.clearPOListIds") =='' || component.get("v.clearPOListIds")==null ||component.get("v.clearPOListIds") == undefined){
            return;
		}
        else{
             //$A.get('e.force:refreshView').fire();
             component.set("v.ConfirmPO",true);
        	component.set("v.MainFlag",false);
        }
},
    backToPO: function(component, event, helper){
        $A.get('e.force:refreshView').fire();
    }
})