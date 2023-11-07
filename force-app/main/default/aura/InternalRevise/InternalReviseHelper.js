({
    fetchData: function (component, recordID) {
        /*return new Promise($A.getCallback(function(resolve, reject){
            var action = component.get("c.FetchSalesOrdersforInternal");
            action.setParams({'recordID':recordID});
        	action.setCallback(this, function(response){
            	var state = response.getState();
                if(state === "SUCCESS"){
                    resolve(response.getReturnValue());
                    console.log("Success");
                }else if(state === "ERROR"){
                    reject(action.getError());
                }
        	});
            $A.enqueueAction(action);
        }));*/
        var action = component.get("c.FetchSalesOrdersforInternal");
            action.setParams({'recordID':recordID});
        	action.setCallback(this, function(response){
                var state = response.getState();
            	if (state === "SUCCESS") 
            	{
                    var res = response.getReturnValue();
                    component.set("v.SOdetails",res.SOList[0]);
                    var SOdetails = component.get("v.SOdetails.SO");
                    //console.log('FETCH>>>>>',SOdetails.Status__c,SOdetails.Enquiry_Status__c);
       				if(SOdetails.Status__c == 'Order Under Processing')	//changed on 08/01/2020
       				{
            			component.set("v.cancancel",false);
       				}
                    if(SOdetails.Status__c=='Cancelled'||SOdetails.Enquiry_Status__c=='Order submitted'||SOdetails.Enquiry_Status__c=='Order Locked' || SOdetails.Status__c == 'Partially Shipped' || SOdetails.Status__c == 'Fully Shipped' || SOdetails.Status__c == 'Approve Pending'||SOdetails.Enquiry_Status__c=='Change Approved'||SOdetails.Status__c == 'Under Processing'||SOdetails.Enquiry_Status__c=='Pending for change approval')
                    {
                        var toastEvent = $A.get("e.force:showToast");
            			toastEvent.setParams({
                			title: $A.get("$Label.c.Warning"),
                            message: `Order cannot be revised if status is not appropriate`,
                			type: "warning"
            			});
            			toastEvent.fire();
                        component.set("v.CloseCurrentWindow",false);
        				if(component.get("v.CloseCurrentWindow"))
        				{
            				window.close();
        				}
        				else
        				{
            				$A.get("e.force:closeQuickAction").fire();
        				}
                    }
                    /*if((SOdetails.Status__c == 'Revised' && SOdetails.Enquiry_Status__c=='Change Received') || (SOdetails.Status__c == 'Revised' && SOdetails.Enquiry_Status__c=='Change Rejected'))
                    {
                        var toastEvent = $A.get("e.force:showToast");
            			toastEvent.setParams({
                			title: "Warning",
                            message: `Order cannot be revised if status is not appropriate`,
                			type: "warning"
            			});
            			toastEvent.fire();
                        component.set("v.CloseCurrentWindow",false);
        				if(component.get("v.CloseCurrentWindow"))
        				{
            				window.close();
        				}
        				else
        				{
            				$A.get("e.force:closeQuickAction").fire();
        				}
                    }*/
                    component.set('v.showSpinner',false);
       				this.newdetails(component, event, helper);
                }else{
                    alert(`Error while retrieving Value`);
                }
            });
        	$A.enqueueAction(action); 
    },
    newdetails : function(component, event, helper) 
    {
        //console.log('////>>SODetails in revorder'+JSON.stringify(component.get("v.SOdetails")));
        var soRec = component.get("v.SOdetails");
        var action = component.get("c.fetchRevOrderwrap");
        action.setParams({ 
            "salesOrder":component.get("v.SOdetails.SO"),
            "salesOrderline":component.get("v.SOdetails.SOLI")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                var ReviseOrderRequest = response.getReturnValue();
                var reviseLine = ReviseOrderRequest.OrderLineList.reviseOrder;
                console.log('revise line >>'+JSON.stringify(ReviseOrderRequest.pickListValuesList));
                component.set("v.listcancelpiclist",ReviseOrderRequest.pickListValuesList);
                component.set("v.ReviseOrderRequest",ReviseOrderRequest);
               	var array1 = [];                    											// To check wether arry is empty (Sanario: if line item is not there)
                if(reviseLine && reviseLine.length) 
                {
                    array1.push(ReviseOrderRequest.OrderLineList.reviseOrder[0])
                    component.set("v.ReviseHeaderList",array1);
                    // line item logic 
                    var array2 = [];
                    reviseLine.forEach(function(temp){
                        var obj = {Mainetti_SO__c : temp.Mainetti_SO__c, 
                                   Mainetti_SOLI__c:temp.Mainetti_SOLI__c, 
                                   Old_Quantity__c:temp.Old_Quantity__c, 
                                   What_to_Revise__c:temp.What_to_Revise__c,
                                   Purchase_Orders__c:temp.Purchase_Orders__c,
                                   //POLI_Name_Text__c :temp.POLI_Name_Text__c,
                                   variable_data_product__c:temp.variable_data_product__c,
                                   Color__c:temp.Color__c,
                                   print__c:temp.print__c,
                                   Customer_Refe_Model__c:temp.Customer_Refe_Model__c,
                                   Box_Quantity__c:temp.Box_Quantity__c,
                                   Full_Box_Quantity__c:temp.Full_Box_Quantity__c,
                                  	MOQ__c:temp.MOQ__c
                                  };
                        array2.push(obj);
                    });
                    component.set("v.ReviseLineList",array2);                
                }
                //initially to set it empty
                else{
                    var Cloneheader = component.get("v.ReviseHeaderList");						//  its empty existing list
                	var objRecord = {'Mainetti_SO__c' : soRec.SO.Id,'What_to_Revise__c':''};
                    Cloneheader.push(objRecord);
                	component.set("v.ReviseHeaderList", Cloneheader); 
                    
                }
            }            
        });
        $A.enqueueAction(action); 
    },
    AddRequest : function(component, event, helper, index) 
    {
        var revRec = component.get("v.ReviseOrderRequest.OrderLineList.reviseOrder");
        var soRec = component.get("v.SOdetails");
        var Cloneheader = component.get("v.ReviseHeaderList");	//  its empty existing list
        var objRecord = {'Mainetti_SO__c' : soRec.SO.Id,'What_to_Revise__c':''};
        if(Cloneheader.length == 0)
        {
            Cloneheader.push(objRecord);
            component.set("v.ReviseHeaderList", Cloneheader);
        }
        else if(Cloneheader[Cloneheader.length-1].What_to_Revise__c != '' && Cloneheader[Cloneheader.length-1].What_to_Revise__c != 'Please select')
        {
            if(Cloneheader.length <= 4)
            {
                Cloneheader.push(objRecord);
                component.set("v.ReviseHeaderList", Cloneheader); 
            } 
        }
        else
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title:  $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Please_enter_What_to_revise_value_before_Adding_New_change_Request"),
                type: "warning"
            });
            toastEvent.fire();
        }
    },
    saveRequest : function(component, event, helper) 
    {
        //alert('ReviseHeaderList on submit'+JSON.stringify(component.get("v.ReviseHeaderList")));
        var ReviseOrderRequest = component.get("v.ReviseOrderRequest.OrderLineList.reviseOrder");
        var ordertocompany = component.get("v.ReviseOrderRequest.revSO.Company__c");
        var RetailerCode = component.get("v.ReviseOrderRequest.revSO.Retailer_Code1__r.Market_Segment__c");
       	var headerList = component.get("v.ReviseHeaderList");
        var ReviseLineList = component.get("v.ReviseLineList");
        var result;
       	for(var i=0;i<ReviseLineList.length;i++)
        {
             //new code changes for MOQ(Phase 2.1) by chandana
             //Both the BOX quantity and MOQ validation is handeled 
            if( ReviseLineList[i].Revised__c == true )
            {
                result = Math.ceil(ReviseLineList[i].New_Quantity__c/ReviseLineList[i].Box_Quantity__c)*ReviseLineList[i].Box_Quantity__c;           
            	var rem = ((ReviseLineList[i].New_Quantity__c) % ReviseLineList[i].Box_Quantity__c);
                var MOQ = ReviseLineList[i].MOQ__c;
                var proName;
                if(ReviseLineList[i].New_Quantity__c < MOQ && ReviseLineList[i].Box_Quantity__c && rem!=0 && ReviseLineList[i].Full_Box_Quantity__c == true)
                {
                    result = Math.ceil(ReviseLineList[i].MOQ__c / ReviseLineList[i].Box_Quantity__c)*ReviseLineList[i].Box_Quantity__c;
					if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code") + ReviseLineList[i].Customer_Refe_Model__c + $A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") + ( MOQ )+ ".\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity")+(result ) +".\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") +( result ))) 
                    {
                        ReviseLineList[i].New_Quantity__c = result;
                        proName = ReviseLineList[i].Revised__c;
                        component.set('v.ReviseLineList',ReviseLineList);
                    }
                    else{
                        return;
                    }
                }
                else if(ReviseLineList[i].New_Quantity__c < MOQ && ReviseLineList[i].Box_Quantity__c && (MOQ<ReviseLineList[i].Box_Quantity__c || MOQ % ReviseLineList[i].Box_Quantity__c!=0) && ReviseLineList[i].Full_Box_Quantity__c == true)
                {
                    result = Math.ceil(ReviseLineList[i].MOQ__c / ReviseLineList[i].Box_Quantity__c)*ReviseLineList[i].Box_Quantity__c;
					if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code")+ReviseLineList[i].Customer_Refe_Model__c+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") +( MOQ ) +".\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity") + ( result ) +".\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ))) 
                    {
                        ReviseLineList[i].New_Quantity__c = result;
                        proName = ReviseLineList[i].Revised__c;
                        component.set('v.ReviseLineList',ReviseLineList);
                    }
                    else{
                        return;
                    }
                }
                else if(ReviseLineList[i].New_Quantity__c < MOQ )
                {
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code")+ReviseLineList[i].Customer_Refe_Model__c+$A.get("$Label.c.is_less_then_Minimum_Order_Quantity_MOQ") +( MOQ ) +".\n" + $A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( MOQ ))) 
                    {
                        ReviseLineList[i].New_Quantity__c = MOQ;
                        proName = ReviseLineList[i].Revised__c;
                        component.set('v.ReviseLineList',ReviseLineList);
                    }
                    else{
                        return;
                    }
                }
                else if(rem!=0 && ReviseLineList[i].Box_Quantity__c && ReviseLineList[i].Full_Box_Quantity__c == true)
                {
                    if (confirm($A.get("$Label.c.Order_Quantity_for_Mainetti_Model_Code")+ReviseLineList[i].Customer_Refe_Model__c+$A.get("$Label.c.is_not_the_multiples_of_Box_quantity") +".\n" + $A.get("$Label.c.The_nearest_multiples_of_box_quantity")+ ( result ) +".\n" +$A.get("$Label.c.Click_OK_to_confirm_Order_Quantity") + ( result ))) 
                    {
                        ReviseLineList[i].New_Quantity__c = result;
                        proName = ReviseLineList[i].Revised__c;
                        component.set('v.ReviseLineList',ReviseLineList);
                    }
                    else{
                        return;
                    }
                }
                if(!ReviseLineList[i].New_Quantity__c || ReviseLineList[i].New_Quantity__c<=0)
                {
                    ReviseLineList[i].New_Quantity__c = ReviseLineList[i].Box_Quantity__c;
                }
                
            }
        }
        component.set('v.ReviseLineList',ReviseLineList);
        var temp = [].concat(headerList,ReviseLineList);
        var actionsaveOrder = component.get("c.SaveRevOrderInternal");
        actionsaveOrder.setParams({ 
            "revOrder":JSON.stringify(temp),
            "ordertocompany":ordertocompany,
            "RetailerCode":RetailerCode,
            "CancelDate":component.get("v.today")
        });
        actionsaveOrder.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") 
            {
                if(response.getReturnValue()=='success')
                {
                    this.updateAfterSuccess(component, event, helper);
                }
                else
                {
                    var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title:  $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.No_revise_Orders_created"),
                        type: "warning"
                    });
                    toastEvent.fire();
                    $A.get('e.force:refreshView').fire();
                }
            }else{
                	var toastEvent = $A.get("e.force:showToast");
                    toastEvent.setParams({
                        title:  $A.get("$Label.c.Warning"),
                        message: $A.get("$Label.c.Error_revising_Sales_Order"),
                        type: "warning"
                    });
                    toastEvent.fire();
                	return;
            }
        });
        $A.enqueueAction(actionsaveOrder);
        console.log("isCancelled>>>>>"+component.get("v.isCancelled"));
    },
    updateAfterSuccess: function(component, event, helper) 
    {
        var action = component.get("c.UpdateRevOrderAfterTrigger");
        console.log("isCancelled>>>>>"+component.get("v.isCancelled"));
        action.setParams({
            'SoID':component.get('v.recordId'),
            'isCancelled':component.get("v.isCancelled")
        });
        action.setCallback(this, function(response){
        	var state = response.getState();
            if (state === "SUCCESS") 
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title:  $A.get("$Label.c.success"),
                    message: $A.get("$Label.c.Order_revised_successfully"),
                    type: "success"
                });
                toastEvent.fire();
                component.set("v.OpenOrderChangeRequest",false);
                this.closePop(component, event, helper);
                $A.get('e.force:refreshView').fire();
            }else{
                alert("Error updating after trigger");
            }
        });             
        $A.enqueueAction(action); 
    },
    closePop : function(component, event, helper) 
    {
        //alert('Inside closeModal');
        //alert('Close Flag>>'+component.get("v.CloseCurrentWindow"));
        component.set("v.CloseCurrentWindow",false);
        if(component.get("v.CloseCurrentWindow"))
        {
            window.close();
        }
        else
        {
            $A.get("e.force:closeQuickAction").fire();
        }
        component.set("v.showSpinner",false);
    }
})