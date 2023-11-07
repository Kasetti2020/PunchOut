({
    doInit : function(component,event,helper) {
        var Excareinstruction=component.get('v.Excareinstruction');
        //alert("do init##"+JSON.stringify(Excareinstruction));
        var ExcareInstruction=component.find('ExcareInstruction').get('v.options');
        var originalExcareInst = [];
        for (var i = 0; i <Excareinstruction.length; i++) {
            
            var item = {
                "label": Excareinstruction[i].Description__c,
                "value": Excareinstruction[i].Description__c
            };
            ExcareInstruction.push(item);
            originalExcareInst.push(item);
        }
        component.set("v.originalExcareInstruction",originalExcareInst);
        var exCareSelectedData=component.get('v.exCareSelectedData');
        //alert(component.get('v.exCareSelectedData'));
        component.set('v.excareInstructionList',exCareSelectedData);
        if(exCareSelectedData && exCareSelectedData.length>0)
            component.set('v.tableview',true);
        //component.set('v.selectedposition',exCareSelectedData.position);
    },
    //handle function for exacre
    handleExcareChange : function(component,event,helper) {
        var Excareinstruction=component.get('v.Excareinstruction');
        var ExcareInstruction=component.find('ExcareInstruction').get('v.options');
        for (var i = 0; i <Excareinstruction.length; i++) {
            
            var item = {
                "label": Excareinstruction[i].Description__c,
                "value": Excareinstruction[i].Description__c
            };
            ExcareInstruction.push(item);
        }
        var exCareSelectedData=component.get('v.exCareSelectedData');
        //alert(component.get('v.exCareSelectedData'));
        component.set('v.selectedValues',exCareSelectedData.ExcareInstructions);
        component.set('v.selectedposition',exCareSelectedData.position);
    },
    //add instruction to list
    addCareInstruction: function (component, event) {
        var exCare=component.find('ExcareInstruction').get('v.value');
        var pos=component.find('ddexcarename').get('v.value');
        if(!exCare || !pos)
        {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Select_both_the_values"),
                type: "warning"
            });
            toastEvent.fire();
            return;
        }
        var excareInstructionList=component.get('v.excareInstructionList');
        if(!excareInstructionList){
            excareInstructionList=[];
        }
        for(var i=0;i<excareInstructionList.length;i++){
            if(excareInstructionList[i].exCareInstruction==exCare)
            {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    title: $A.get("$Label.c.Warning"),
                    message: $A.get("$Label.c.You_cannot_select_same_ExCare_Instruction_with_different_Position"),
                    type: "warning"
                });
                toastEvent.fire();
                return;
            }
        }
        
        excareInstructionList.push({'exCareInstruction':exCare,'position':pos});
        component.set('v.excareInstructionList',excareInstructionList);
        console.log(excareInstructionList);
        
         let LogoEvent1 = component.getEvent("loadMyEvent"); 
        LogoEvent1.setParams({"ExCareIns": excareInstructionList }); 
   LogoEvent1.fire();
        
        //alert(JSON.stringify(excareInstructionList));
        component.set('v.tableview',true);
         var changeTabColorExcareInstructions = component.getEvent("changeTabColorExcareInstructions");
		changeTabColorExcareInstructions.fire();

        //After adding a row remove the selected excare instruction from dropdown list added on 09/12/2021 starts
        var originalExcare = component.get("v.originalExcareInstruction");      //contains Original list of Excare Instructions
        var tempOption = component.find('ExcareInstruction').get('v.options');  
        tempOption.length = 0;       //Before Pushing updated values empty the list
        var excareInstructionList = component.get("v.excareInstructionList");    //List contains selected excareinstruction and position on this basis removing value in originallist
        for(var i=0;i<originalExcare.length;i++){
            var alreadyAdded = false;
            if(excareInstructionList.length > 0){
                for(var j=0;j<excareInstructionList.length;j++){
                    if(originalExcare[i].label == excareInstructionList[j].exCareInstruction){
                        alreadyAdded = true;      //is selected value == Original list[i] then set boolean to true
                    }
               }
                if(!alreadyAdded){
                    var item = {                               //only the filtered List will be Pushed
                        "label": originalExcare[i].label,
                        "value": originalExcare[i].label
                    };
                    tempOption.push(item);
                }
            } else{                                         //if excareInstructionList doesn't contain any value means push entire list
                var item = {
                    "label": originalExcare[i].label,
                    "value": originalExcare[i].label
                    };
                    tempOption.push(item);
                } 
        }
        component.find('ExcareInstruction').set('v.options',tempOption);
        //added on 09/12/2021 ends
       
    },
    //remove row from the list
    removeRow: function(component, event, helper){
        var excareInstructionList=component.get('v.excareInstructionList');
        var selectedItem = event.getSource().get("v.name");
        var deletedCLLIIdList=component.get('v.deletedCLLIIdList');
        //alert(JSON.stringify(deletedFabfun));
        if(!deletedCLLIIdList)
            deletedCLLIIdList=[];
        if(excareInstructionList[selectedItem].excareId)
            deletedCLLIIdList.push(excareInstructionList[selectedItem].excareId);
        component.set('v.deletedCLLIIdList',deletedCLLIIdList);
        //alert(component.get('v.deletedCLLIIdList'));
        excareInstructionList.splice(selectedItem, 1);
        component.set("v.excareInstructionList", excareInstructionList);
        
          let LogoEvent1 = component.getEvent("loadMyEvent"); 
        LogoEvent1.setParams({"ExCareIns": excareInstructionList }); 
   LogoEvent1.fire();
        ////////////////////////////////////////////////////////////////////////////////
        helper.handleSelectedOption(component, event, helper);
    
        ///////////////////////////////////////////////////////////////////////////////
        // helper.deletedFabfun(component, event, helper,clliId);
        //alert(excareInstructionList.length);
        if(excareInstructionList.length==0)
        {
             component.set('v.tableview',false);
        }
    },
    handleChange: function (component, event) {
        // This will contain an array of the "value" attribute of the selected options
        var selectedOptionValue = event.getParam("value");
        
        component.set('v.position',true);
        //alert("Option selected with value: '" + selectedOptionValue.toString() + "'");
    },
    closeExcareInstructionModel : function(component, event, helper) {
        component.set("v.viewisExCareInstructionmodal",false);
    },
    selectedExCareInst : function(component, event, helper) {
        component.set("v.exCareSelectedData", component.get("v.excareInstructionList")); 
    },
    viewselectedExCareInst : function(component, event, helper) {
        //alert(JSON.stringify(component.get("v.excareInstructionList")));
        component.set("v.viewExCareSelectedData", component.get("v.excareInstructionList")); 
    },
    clearData: function(component, event, helper) {
        component.set('v.excareInstructionList',[]);
        component.set('v.selectedposition',[]);
        component.set('v.tableview',false);
    },
    getSelectedPositionValue: function(component, event, helper) {
        var picklist=component.find('ddexcarename');
        var picklistvalue=picklist.get('v.value');
    },
    
})