import { LightningElement, api, track,wire } from 'lwc';
import getRecord  from '@salesforce/apex/PassJsonDataControllerForOutPut.getRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getChildField  from '@salesforce/apex/PassJsonDataControllerForOutPut.getChildField';
import getAllfieldsFromMetadata from '@salesforce/apex/PassJsonDataControllerForOutPut.getAllfieldsFromMetadata';
import getAllRelatedChildObjects from '@salesforce/apex/PassJsonDataControllerForOutPut.getAllRelatedChildObjects';
import updatesalesorder from '@salesforce/apex/PassJsonDataControllerForOutPut.updatesalesorder';
import { NavigationMixin } from 'lightning/navigation';


export default class editOutputJSONLWC extends LightningElement {

@api ServiceTypeId;
@api value;
@api
pageReference;
@track editandback=true;

@track calllwcchildforback=false;
@track storejson ;

@track isdisabled=false;
@api item;
@track savebutton=false;


//using for check the value when  component loading
connectedCallback()  {
let param1 = this.pageReference.state.c__param1;
let param2 = this.pageReference.state.c__param2;

this.fetchData(param1, param2);

}


@track value;
@track forobjectfieldnames;
fetchData(param1, param2) {
//alert('insidefetchData');
getRecord({ serviceTypeId: 'a2qO0000000GCBdIAO', erpCountry: 'Kenya' })
.then(result => {
this.iterationobjects=true;
this.storejson = result;
    // this.isdisabled=true;
 this.forobjectfieldnames=this.storejson.map(element => ({label:element.SF_Object1_Field_Name__c, value:element.SF_Object1_Field_Name__c}) );
      console.log('storejson>>', JSON.stringify(this.storejson));
})
.catch(error => {
    console.error('Error:', error);
});
}


@track statusOptions;
@wire(getAllfieldsFromMetadata) wiredAccounts ({ error, data }) {
  
if (data) {
//alert('getAllfieldsFromMetadata');
this.lstaccounts = data; 
// console.log( 'this.lstaccounts'+JSON.stringify(  this.lstaccounts ));
let arrayMapKey = [];
let objectfields = data.objectfield;
for (let key in objectfields) {
    arrayMapKey.push({ label: key, value: key });
}
this.statusOptions=arrayMapKey;
// console.log( 'this.statusOptions'+JSON.stringify(  this.statusOptions ));

} else if (error) { 
this.error = error;  
}   
}


//using wire method for calling apex  method  and passing mapping values 
@track statusOptionschild;
@track statusOptionschildfield;
@wire(getAllRelatedChildObjects) wired ({ error, data }) {
if (data) {
   // alert('getAllRelatedChildObjects');
    console.log( 'this.lstaccounts'+JSON.stringify( data));
    let relChildObjects=data.relatedFieldsMap;
    let childarrayMapKeys = [];
    let childarrayMapKeys1 = [];
    for(var key in relChildObjects){  
    childarrayMapKeys.push({label: key, value: key});   
    }
    for(var key in relChildObjects){
        this.outPutValue=relChildObjects[key];
        childarrayMapKeys1.push({label: this.outPutValue, value: this.outPutValue[0]});
    }
    console.log('objectfields::'+JSON.stringify(childarrayMapKeys1));
    this.statusOptionschildfield=childarrayMapKeys1 ;
    this.statusOptionschild=childarrayMapKeys;
} else if (error) { 
    this.error = error;  
}  
 }


//after adding handlechange value is filtering according to selected object
@track forobjectfieldnames;
handleStatusChange(event){
this.valueChild = event.detail.value;
console.log('this.valueChild>>>>>>'+JSON.stringify(this.valueChild));



getChildField({childObj: this.valueChild})
.then((result) =>{
   // alert('getChildField');
    this.childallfields = result;
console.log('this.childallfields>>>>>>'+JSON.stringify(this.childallfields));
let arrayMapKey = [];
let objectfields = result;
for (let key in objectfields) {
arrayMapKey.push({ label: key, value: key });
}
this.forobjectfieldnames=arrayMapKey;
this.error = undefined;
})
.catch((error)=>{
this.error = error;
this.childallfields = undefined;
})
}

//save action method
SaveHandler(){
//alert('this.storejson'+JSON.stringify(this.storejson));
updatesalesorder({ jsonData:this.storejson, serviceTypeId:'a2qO0000000GC76IAG' })
.then(result => {
    // alert('this.result>>'+JSON.stringify(this.result));
    //this.hideSpinner();
    const event = new ShowToastEvent({
        title: 'Success!',
        message: 'The record has been updated successfully.',
        variant: 'success',
        mode: 'dismissable',
        
    });
    
    this.dispatchEvent(event);
    
})
.catch(error => {
    // Handle error here
    console.log('error in saving record due to-->'+JSON.stringify(error));
    const evt = new ShowToastEvent({
        title: 'Toast Error',
        message: 'Some unexpected error',
        variant: 'error',
        mode: 'dismissable'
    });
    this.dispatchEvent(evt);
})
}

//edit page
@track isdisabled=true;
@track disabled=true;
editpagebutton() {
this.savebutton = true;
this.isdisabled=false;
this.editandback=false;
this.isdisabled=false;
}

//navigating
backbutton(){
// this.calllwcchildforback=true;
window.open('https://mainetti--magnets1.sandbox.lightning.force.com/lightning/n/Mainetti_ERP');
// window.reload();
}
}