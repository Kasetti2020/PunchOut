({
	handleSelectedOption: function(component, event, helper) {
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
		}
})