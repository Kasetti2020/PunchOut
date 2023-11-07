({
    doInit : function(component,event,helper) {
        var CareSelectedData=component.get('v.CareSelectedData');
        console.log('CareSelectedData ::'+JSON.stringify(CareSelectedData));
        var Careinstruction=component.get('v.Careinstruction');
         console.log('Careinstruction ::'+JSON.stringify(Careinstruction));
        //console.log()
        var otherInstruction={};
        var careInstructionImage={};
        var tempString=[];
        var ImageList=[];
        for (var i = 0; i < Careinstruction.length; i++) {
            var washInstruction=[];
            for (var j = 0; j < Careinstruction[i].careInsts.length; j++) {
                  console.log('Careinstruction ::'+Careinstruction[i].careInsts[j]);
                var item = {
                    "label": Careinstruction[i].careInsts[j],
                    "value": Careinstruction[i].careInsts[j],
                };
                washInstruction.push(item);
                if(Careinstruction[i].othersInsts){
                    otherInstruction[Careinstruction[i].careInsts[j]]=Careinstruction[i].othersInsts[Careinstruction[i].careInsts[j]];
                }
                if(Careinstruction[i].CareInstImage){
                    careInstructionImage[Careinstruction[i].careInsts[j]]=Careinstruction[i].CareInstImage[Careinstruction[i].careInsts[j]];
                }
            }
            Careinstruction[i].options=washInstruction;
            var tempInsList=[];
            var tempIdList=[];
            for (var k = 0; k < CareSelectedData.length; k++) {
                console.log('CareSelectedData[k].instGrp' +CareSelectedData[k].instGrp);
              //  if(CareSelectedData[k].instGrp=='Retailer Care Code')
                if(CareSelectedData[k].instGrp=='Special Code')
                {
                    if(Careinstruction[i].othersInsts){
                        //tempString.push(Careinstruction[i].othersInsts[CareSelectedData[k].instDetails.toString()]);
                        tempString.push({'instr':CareSelectedData[k].instDetails.toString(),
                                'descr':Careinstruction[i].othersInsts[CareSelectedData[k].instDetails.toString()]
                                });
                    }
                }
                console.log('CareSelectedData[k].instGrp' +CareSelectedData[k].instGrp +' Careinstruction[i].washInstructionGroup :: '+Careinstruction[i].washInstructionGroup);
                if(CareSelectedData[k].instGrp==Careinstruction[i].washInstructionGroup)
                {
                ImageList.push({
                    'group':Careinstruction[i].washInstructionGroup,
                    'instr':CareSelectedData[k].instDetails.toString(),
                    'descr':careInstructionImage[CareSelectedData[k].instDetails.toString()]
                });
                }
                if(CareSelectedData[k].instGrp==Careinstruction[i].washInstructionGroup)
                {
                    
                    tempInsList.push(CareSelectedData[k].instDetails.toString());
                    tempIdList.push(CareSelectedData[k].careIdList.toString());
                    //Careinstruction[i].careIdList=CareSelectedData[k].careIdList;
                }
            }
            Careinstruction[i].selectedValues=tempInsList;
            Careinstruction[i].careIdList=tempIdList;
        }
        component.set('v.SelectedInstImage',ImageList);
        component.set('v.otherInst',false);
        component.set('v.otherInstruction',otherInstruction);
        component.set('v.selectedcareImage',careInstructionImage);
        component.set('v.Careinstruction',Careinstruction);
        if(tempString.length>0)
        {
            component.set('v.selectedOtherInstruction',tempString);            
            component.set("v.showDiv",true);
        }
        if(tempString.length==0)
        {
            component.set("v.showDiv",false);
        }
    },
    //bind the selected data to list
    bindSelectedData : function(component, event) {
        var washInstruction=component.find('washInstruction');
        var selectedCareInstList=[];
        if(washInstruction.length){
            for(var i=0;i<washInstruction.length;i++)
            {
                //alert(JSON.stringify(washInstruction[i].get('v.name')));
                var selectedCareInst=new Object();
                selectedCareInst.careIdList=washInstruction[i].get('v.name');
                if(washInstruction[i].get('v.value').length>0){
                    selectedCareInst.instDetails=washInstruction[i].get('v.value');
                   // selectedCareInst.instGrp=washInstruction[i].get('v.label');
                     selectedCareInst.instGrp=washInstruction[i].get('v.id');
                    selectedCareInstList.push(selectedCareInst);
                }
            }
        }
        else{
            //alert(JSON.stringify(washInstruction.get('v.name')));
            var selectedCareInst=new Object();
            selectedCareInst.careIdList=washInstruction.get('v.name');
            if(washInstruction.get('v.value').length>0){
                selectedCareInst.instDetails=washInstruction.get('v.value');
                //selectedCareInst.instGrp=washInstruction.get('v.label');
                 selectedCareInst.instGrp=washInstruction[i].get('v.id');
                selectedCareInstList.push(selectedCareInst);
            }
        }
        component.set('v.CareSelectedData',selectedCareInstList);
        component.set("v.showDiv",true);
        return selectedCareInstList;
    },
    //bind the selected data to list in view/edit
    viewbindSelectedData : function(component, event) {
        
        var tempVar=component.get('v.selectedCarTabId');
        var Careinstruction=component.get('v.Careinstruction');
        for(var i=0;i<Careinstruction.length;i++){
            component.set('v.selectedCarTabId','care-'+i);
        }
        component.set('v.selectedCarTabId',tempVar);
        var washInstruction=component.find('washInstruction');
       
        var selectedCareInstList=[];
        if(washInstruction.length){
            for(var i=0;i<washInstruction.length;i++)
            {
                //alert(JSON.stringify(washInstruction[i].get('v.name')));
                var selectedCareInst=new Object();
                selectedCareInst.careIdList=washInstruction[i].get('v.name');
                if(washInstruction[i].get('v.value').length>0){
                    selectedCareInst.instDetails=washInstruction[i].get('v.value');
                   // selectedCareInst.instGrp=washInstruction[i].get('v.label');
                    selectedCareInst.instGrp=washInstruction[i].get('v.id');
                    selectedCareInstList.push(selectedCareInst);
                }
            }
        }
        else{
            //alert(JSON.stringify(washInstruction.get('v.name')));
            var selectedCareInst=new Object();
            selectedCareInst.careIdList=washInstruction.get('v.name');
            if(washInstruction.get('v.value').length>0){
                //selectedCareInst.instGrp=washInstruction.get('v.label');
                 selectedCareInst.instGrp=washInstruction[i].get('v.id');
                selectedCareInst.instDetails=washInstruction.get('v.value');
                selectedCareInstList.push(selectedCareInst);
            }
        }
        component.set('v.vaiwCareSelectedData',selectedCareInstList);
        return selectedCareInstList;
    },
   //clear the selection 
    clearData: function(component, event, helper) {
        var params = event.getParam('arguments');
        //params.CloneORClear;
        var washInstruction=component.find('washInstruction');
        if(washInstruction.length){
            for(var i=0;i<washInstruction.length;i++)
            {
                if(params.CloneORClear=='Clear')
                    washInstruction[i].set('v.value','');
            }
        }
        else{
            if(washInstruction.get('v.value').length>0)
            {
                if(params.CloneORClear=='Clear')
                    washInstruction.set('v.value','');
            }
        }
          component.set('v.selectedOtherInstruction','');
          component.set("v.showDiv",false);
    },
    //revoked
    selectedCareInst : function(component, event, helper) {
        var washInstruction=component.find('washInstruction');
        var selectedCareInstList=[];
        for(var i=0;i<washInstruction.length;i++)
        {
            if(washInstruction[i].get('v.value').length>0){
                var selectedCareInst=new Object();
                //selectedCareInst.instGrp=washInstruction[i].get('v.label');
                 selectedCareInst.instGrp=washInstruction[i].get('v.id');
                selectedCareInst.instDetails=washInstruction[i].get('v.value');
                selectedCareInstList.push(selectedCareInst);
            }
        }
       
        component.set('v.CareSelectedData',selectedCareInstList);
        component.set("v.viewisCareInstructionmodal",false);
    },
    //revoked
    tabChangeHandler: function (component, event) {
        // alert(event.target.id);
        component.set('v.tabIndex',event.target.id);
        
    },

    //Added by Bharath on 09/11/2021
   
   
     handleChange: function (component, event,helper) {
         var groupID=event.getSource().get("v.id");
         
        var group=event.getSource().get("v.label");
        console.log('groupID>>'+groupID+'group123>>'+group);
        var selectedOptionValue = event.getParam("value");
        var idx=event.getSource().get("v.id");
        //phase 2.1 validation to restrict the addition of rows
        if(selectedOptionValue.length>8)
        {
             console.log('selectedOptionValue1 ::'+selectedOptionValue);
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: $A.get("$Label.c.Warning"),
                message: $A.get("$Label.c.Maximum_of_8_options_can_be_selected"),
                type: "warning"
            });
            toastEvent.fire();
            if(!component.find('washInstruction').length)
            {
                var finalSelOption=[];
                for(var i=0;i<=7;i++)
                {
                    console.log('selectedOptionValue 2 ::'+selectedOptionValue[i]);
                    finalSelOption.push(selectedOptionValue[i]);
                }
                component.find('washInstruction').set('v.value',finalSelOption);
            }
            else
            {
                var finalSelOption=[];
                for(var i=0;i<=7;i++)
                {
                    console.log('selectedOptionValue 3 ::'+selectedOptionValue[i]);
                    finalSelOption.push(selectedOptionValue[i]);
                }
                component.find('washInstruction')[idx].set('v.value',finalSelOption);
            }
            return;
        }
        // alert('selectedOptionValue2 ::'+selectedOptionValue);
        var options=event.getSource().get("v.options");
        var notPrsentValues=[];
        for(var jj=0;jj<options.length;jj++)
        {
            console.log('selectedOptionValue 4 ::'+options[jj].label);
            if(!selectedOptionValue.includes(options[jj].label))
            {
                
                notPrsentValues.push(options[jj].label);
            }
        }
        var indexvar = event.getSource().get("v.value");
        var otherInstruction=component.get('v.otherInstruction');
       // if(group=='Retailer Care Code')
        if(group=='Special Code')
        {
           //  alert('selectedOptionValue3 ::'+selectedOptionValue);
            var tempString=[];
            for(var i=0;i<selectedOptionValue.length;i++){
                if(otherInstruction[selectedOptionValue[i]])
                {
                     //alert('If other Instructions')
                    tempString.push({
                        'instr':selectedOptionValue[i],
                        'descr':otherInstruction[selectedOptionValue[i]]
                    });
                }
                
            }
            component.set('v.selectedOtherInstruction',tempString);
            component.set("v.showDiv",true);
        }
        // alert('selectedOptionValue4 ::'+selectedOptionValue);
        var selectedcareImage=component.get('v.selectedcareImage');
        var ImageList=component.get('v.SelectedInstImage');
        //alert(JSON.stringify(ImageList));
		var removedIdList=[];
        if(selectedOptionValue.length>0)
        {
            for(var i=0;i<selectedOptionValue.length;i++)
            {
                if(selectedcareImage[selectedOptionValue[i]])
                {
                    var instructionPresent=[];
                    for(var ii=0;ii<ImageList.length;ii++)
                    {
                        if(ImageList[ii].instr ==selectedOptionValue[i])
                        {
                            instructionPresent.push(selectedOptionValue[i]);
                              //alert('instructionPresent ::'+instructionPresent);
                        }
                        if(notPrsentValues.includes(ImageList[ii].instr) && !removedIdList.includes(ii))
                        {
                            removedIdList.push(ii);
                            }
                    }
                    // alert('If other Instructions')
                    if(!instructionPresent.includes(selectedOptionValue[i]))
                    {
                        ImageList.push({
                            'group':group,
                            'instr':selectedOptionValue[i],
                            'descr':selectedcareImage[selectedOptionValue[i]]
                        });
                        }
                   
                }
                else if(!selectedcareImage[selectedOptionValue[i]])
                    {
                        
                         var instructionPresent=[];
                    for(var ii=0;ii<ImageList.length;ii++)
                    {
                        if(ImageList[ii].instr ==selectedOptionValue[i])
                        {
                            instructionPresent.push(selectedOptionValue[i]);
                              //alert('instructionPresent ::'+instructionPresent);
                        }
                        if(notPrsentValues.includes(ImageList[ii].instr) && !removedIdList.includes(ii))
                        {
                            removedIdList.push(ii);
                            }
                    }
                        
                          if(!instructionPresent.includes(selectedOptionValue[i]))
                    {
                         ImageList.push({
                            'group':group,
                            'instr':selectedOptionValue[i],
                            //'descr':selectedcareImage[selectedOptionValue[i]]
                        });
                    }
}
            }
        }
        else
        {
            for(var ii=0;ii<ImageList.length;ii++)
            {
                if(notPrsentValues.includes(ImageList[ii].instr))
                {
                    removedIdList.push(ii);
                }
            }
        }
        //alert(JSON.stringify(removedIdList));
        for(var idind=removedIdList.length-1;idind>=0;idind--)
        {
            ImageList.splice(removedIdList[idind],1);
        }
        component.set('v.SelectedInstImage',ImageList);
        console.log( 'CarecompImageList ::'+ImageList);
         let LogoEvent1 = component.getEvent("loadMyEvent"); 
        LogoEvent1.setParams({"SelectedInstImage": ImageList }); 
   LogoEvent1.fire(); 
        console.log(ImageList.descr);
        if(selectedOptionValue==''||selectedOptionValue=='Null')
        {
            helper.tabcolorRemove(component, event,helper);
        }
        else
        {
            helper.tabcolorSel(component, event,helper);
        }
        //component.set("v.showDiv",true);
        //var index = evt.currentTarget.dataset.index;
        var changeTabColorCareInstructionDetails = component.getEvent("changeTabColorCareInstructionDetails");
        changeTabColorCareInstructionDetails.fire(); 
    },
   
   
    
    
    
    
})