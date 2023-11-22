import { LightningElement,wire,track,api } from 'lwc';
// import getServiceRecords from '@salesforce/apex/MainettiService.getServiceRecords';
import getPicklistCountryCode from '@salesforce/apex/MainettiService.getPicklistCountryCode';
//import getPicklistServiceType from '@salesforce/apex/MainettiService.getPicklistServiceType';
import { NavigationMixin } from 'lightning/navigation';
import { refreshApex } from '@salesforce/apex';
import getGenerateData from '@salesforce/apex/MainettiService.getGenerateData';
import deleteMultipleRecord from '@salesforce/apex/MainettiService.deleteMultipleRecord';
import checkOptionAvailablity from '@salesforce/apex/MainettiService.checkOptionAvailablity';

import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {loadStyle} from 'lightning/platformResourceLoader'
import COLOR from '@salesforce/resourceUrl/COLOR'
// import inputService from '@salesforce/apex/MainettiService.inputService';


export default class MainettiServiceType extends NavigationMixin(LightningElement) {

    @track noRecord=false;
    @track accounts;
    @track headerTrue=true;
    @track buttonDisabled=true;
    @track serviceRecords;
    @track error;
    @api recordId;
    @track recId;
    @track InputJson; 
    @track inputService;
    @track inputCountry;
    @track cleanedJSONString=''; 
    @api selectedRecordId;
    @track selectedRecordId;
    @track actionName;
    @track isShowChild = false;
    @track showParent = true;
    @track isAddService = false;
    @track serviceType_Value;
    @api serviceType_Value;
    @track showSpinner = false;
   @track apexdata;
   @track isShowModal = false;
   @track CountryCode_Value;
   @api CountryCode_Value;
    @api fieldName;
    @api selectedIdList=[];
    @track errorMsg;
    deleteButtonClass = 'slds-hide';
    isCssLoaded = false;
    @track selectedValue = '';
    @track showRadioButton = false;
    @track radioBoolean = false;
    @track radioInput;
    @track radioOutput;

@track selectedOption;
selectedOption;
//To display dataTable
@track columns = [
    {
        label: 'ERP COUNTRY',
        fieldName: 'Country__c',
        type: 'Picklist',
        // sortable: true,
        
    },
    {
    label: 'SERVICE TYPE',
    fieldName: 'Name',
    type: 'text',
    // sortable: true,
    
},

{
    type: "button", label: 'INPUT JSON',
    typeAttributes: {
        label: 'Request',
        name: 'Input',
        value: 'view',
        variant:'destructive',
        disabled: { fieldName: 'isInputJsonButtonDisabled' },
        
    }
},
{
    type: "button", label: 'OUTPUT JSON', 
    typeAttributes: {
        label: 'Response',
        name: 'Output',
        value: 'view',
        variant:'destructive',
        disabled: { fieldName: 'isOutputJsonButtonDisabled' },
        
    }
},
]
@track error;
@track accList ;
@wire(getGenerateData)
wiredgetGenerateData(result) {
    this.accList = result;
    if (result.data) {
        this.apexdata = result.data.map(record => record.Country__c); // Extract ERP_Country__c values
        console.log('Country__c values-->' + JSON.stringify(this.apexdata));

        this.data = result.data.map(record => ({
            ...record,
            isInputJsonButtonDisabled: !record.JSON_Sample__c ,// Disable if JSON_Sample__c is null
            isOutputJsonButtonDisabled: !record.JSON_Output_Sample__c ,// Disable if JSON_Output_Sample__c is null
           // "accountColor":"datatable-orange",
        }));
    //   console.log('data from apex class'+JSON.stringify(this.data));


    } else if (result.error) {
        this.error = result.error;
    }
}

callRowAction(event) {
    this.selectedRows = event.detail.row.Name;

    this.recId = event.detail.row.Id;
    console.log('RECORD iD--> '+this.recId); 
    this.recId = event.detail.row;
    this.erpCountry = this.recId.Country__c;
    this.requestName = this.recId.Name;
    console.log('request Name--> '+this.requestName);
    this.actionName = event.detail.action.name;
   if (this.actionName === 'Input' && ( this.selectedRows === 'Shipment Detail Request' || this.selectedRows === 'Sales Order Confirmation Request' || this.selectedRows === 'Online Enq Confirmation Request')) {
    const navConfig = {
        type: "standard__component",
        attributes: {
            componentName: "c__EditOutPutJSON"
        },
        state: {
            c__param1: this.recId,
            c__param2: this.erpCountry
        }
    };
    this[NavigationMixin.Navigate](navConfig);
}  else if (this.actionName === 'Input') {
        const navConfig = {
            type: "standard__component",
            attributes: {
                componentName: "c__EditInputJSON"
            },
            state: {
                c__param1: this.recId.Id,
                c__param2: this.erpCountry
            }
        };
        this[NavigationMixin.Navigate](navConfig);
    } 
     else if (this.actionName === 'Output') {
        const navConfig = {
            type: "standard__component",
            attributes: {
                componentName: "c__EditOutPutJSON"
            },
            state: {
                c__param1: this.recId,
                c__param2: this.erpCountry
            }
        };
        this[NavigationMixin.Navigate](navConfig);
    }
}

@track countryOptions;
countryOptions = [];
// Wire the Apex method to populate the countryOptions array
@wire(getPicklistCountryCode)
wiredCountryValues({ error, data }) {
    if (data) {
        this.countryOptions = data.map((value) => {
            return { label: value, value: value };
        });
    } else if (error) {
        console.error('Error fetching picklist values:', error);
    }
}

@track checkCountry;

    handleCountryCodeChange(event){
        this.CountryCode_Value = event.target.value; 
        console.log("selected picklist--> "+this.CountryCode_Value);

    }
           
    get options() {
        return [
            { label: 'Sales Order Request', value: 'Sales Order Request' },
            { label: 'Sales Order Line Items Request', value: 'Sales Order Line Items Request' },
            { label: 'Online Enquiry Request', value: 'Online Enquiry Request' },
            { label: 'Online Details Request', value: 'Online Details Request' },
            { label: 'Sales Order Confirmation Request', value: 'Sales Order Confirmation Request' }, 
            { label: 'Online Enq Confirmation Request', value: 'Online Enq Confirmation Request' },
            { label: 'Shipment Detail Request', value: 'Shipment Detail Request' },
        ];
    }

 

    handleServiceTypeChange(event){
         this.serviceType_Value = event.target.value; 
       /* if(this.serviceType_Value == "Others"){
            this.isAddService = true; 
        }*/ 
        if(this.checkCountry =this.apexdata.includes(this.CountryCode_Value) ){
            // alert('inside');
        checkOptionAvailablity({selectedCountry:this.CountryCode_Value,selectedService:this.serviceType_Value})
        .then(result => {
            this.radioInput = result.JSON_Sample__c;
            this.radioOutput = result.JSON_Output_Sample__c;
            if(this.radioInput !== undefined && this.radioOutput !== undefined){
                this.radioBoolean == true;
                const event = new ShowToastEvent({
                    title: 'Error',
                    message: 'Service record already exists for this Country',
                    variant: 'error',
                       });
                     this.dispatchEvent(event);  
                    }
            })
        .catch(error=>{
            this.error = error;
            console.log(error.message);
        })
        console.log("selected picklist--> "+this.serviceType_Value);
       }
    }


    showModalPopup() {
        this.showSpinner = true;
        setTimeout(() => {this.showSpinner = false}, 1000); // Simulate a second delay
        this.isShowModal = true;

    }

    hideModalPopup () {  
        this.isShowModal = false;
        this.CountryCode_Value == undefined;
        this.serviceType_Value == undefined; 
    }
  
    get radiOptions() {
        return [
            { label: 'Input', value: 'Input' },
            { label: 'Output', value: 'Output' },
            { label: 'Both', value: 'Both' },
        ];
    }
    get radioCXmlOptions() {
        return [
            { label: 'JSON', value: 'JSON' },
            { label: 'CXML', value: 'CXML' },
            
        ];
    }

    handleRadioChange(event) {
       const check = event.target.value;
        console.log('radio checked value -->'+event.target.value);
        
        this.selectedValue = check;
       if(this.selectedValue !== null)
        {
        checkOptionAvailablity({selectedCountry:this.CountryCode_Value,selectedService:this.serviceType_Value})
            .then(result => {
                this.radioInput = result.JSON_Sample__c;
                this.radioOutput = result.JSON_Output_Sample__c;
                //  console.log('input Json-->'+JSON.stringify(this.radioInput));
                //  console.log('output Json-->'+JSON.stringify(this.radioOutput));
              if(this.selectedValue=='Input'){
                if (this.radioInput !== undefined) {
                    this.radioBoolean = true;
                 const radioInput = new ShowToastEvent({
                 title: 'Error',
                 message: 'Input Json already exits for this service type',
                 variant: 'error',
                 });
                this.dispatchEvent(radioInput);  
              }       
            }
            else if(this.selectedValue=='Output'){
                if (this.radioOutput !== undefined) {
                    this.radioBoolean = true;
                    const radioOutput = new ShowToastEvent({
                        title: 'Error',
                        message: 'Output Json already exits for this service type',
                        variant: 'error',
                        });
                       this.dispatchEvent(radioOutput);  
                }else{
                    this.radioBoolean = false;
                }
            }
            else if(this.selectedValue=='Both'){
                if (this.radioInput !== undefined || this.radioOutput !== undefined) {
                    this.radioBoolean = true;
                    const radioBoth = new ShowToastEvent({
                        title: 'Error',
                        message: 'Input or Output Json already exits for this service type',
                        variant: 'error',
                        });
                       this.dispatchEvent(radioBoth);  
                }else{
                    this.radioBoolean = false;
                }
            }
            // else{
            //     console.log('Selected radio button --> '+this.selectedValue);
            //     this.radioBoolean = true;
            //     const selectradio = new ShowToastEvent({
            //         title: 'Error',
            //         message: 'Please Choose one of the radio button',
            //         variant: 'error',
            //         });
            //        this.dispatchEvent(selectradio); 
            // }
            })
            .catch(error => {
                this.error = error;
                console.log(error.message);
            });
        //    alert('this.selectedValue -->'+this.selectedValue) ;
     }else{
        console.log('Error');
     }
    }

    navigateToAura(){
    //this.showParent = false; 
    // this.isShowChild = true;
    this.requestName1 = this.serviceType_Value;
    this.erpCountry1 = this.CountryCode_Value;
    if(this.serviceType_Value == undefined || this.CountryCode_Value == undefined){
        this.radioBoolean = true;
        const toastMsg = new ShowToastEvent({
        title: 'Error',
        message: 'Please select ERP-Country and Service Type',
        variant: 'error',
        });
       this.dispatchEvent(toastMsg); 
    } 
   // alert('this.serviceType_Value><<<1233>>>>'+this.serviceType_Value);
   // alert('this.CountryCode_Value12<<<>>>>'+this.CountryCode_Value);
   // alert('this.selectedValue <<<1111111>>>'+this.selectedValue );
//alert(((this.selectedValue === 'Input') && ( this.serviceType_Value === 'Shipment Detail Request' || this.serviceType_Value === 'Order Confirmation Request')));
    if(( this.serviceType_Value === 'Shipment Detail Request' || this.serviceType_Value === 'Sales Order Confirmation Request' || this.serviceType_Value === 'Online Enq Confirmation Request') && (this.selectedValue === 'Input')){
        const paramservice = this.serviceType_Value;
       // alert('Inside Shipment>>>>>>>1234');
        const paramCountry = this.CountryCode_Value;
        const navConfig = { 
            type: "standard__component",
            attributes: {
                componentName: "c__PassJsonDataForOrderAndShipment"
            },
            state: {
                c__param1: paramservice,
                c__param2: paramCountry
            }
        };
        this[NavigationMixin.Navigate](navConfig);
    }
    else if(this.selectedValue === 'Input' && this.radioBoolean == false ){
       // alert('Inside Input radio Button>>>>>>>1234');

    const value1 = this.serviceType_Value;
    const value2 = this.CountryCode_Value;
    console.log('value of service type-->'+value1+' : '+value2);

     const navConfig = { 
            type: "standard__component",
            attributes: {
                componentName: "c__PassJsonData"
            },
            state: {
                c__param1: value1,
                c__param2: value2
            }
        };
        this[NavigationMixin.Navigate](navConfig);
    }else if(this.selectedValue === 'Output' && this.radioBoolean == false){
       // alert('Inside OutPut radio Button>>>>>>>1234');
    const paramservice = this.serviceType_Value;
    const paramCountry = this.CountryCode_Value;
    const navConfig = { 
        type: "standard__component",
        attributes: {
            componentName: "c__PassJsonDatacloneforOutput"
        },
        state: {
            c__param1: paramservice,
            c__param2: paramCountry
        }
    };
    this[NavigationMixin.Navigate](navConfig);
 }else if(this.selectedValue === 'Both' && this.radioBoolean ==false){
   // alert('Inside Both radio Button>>>>>>>1234');

        const value1 = this.serviceType_Value;
        const value2 = this.CountryCode_Value; 
        const value3 = this.selectedValue;
        console.log('value of service type-->'+value1+' : '+value2+' :: '+value3);
        const navConfig = { 
            type: "standard__component",
            attributes: {
                componentName: "c__PassJsonData"
            },
            state: {
                c__param1: value1,
                c__param2: value2,
                c__param3: value3
            }
        };
        this[NavigationMixin.Navigate](navConfig);
        
    }
    }

 
    getSelectedIdAction(event){
      //  alert(' in side onrow Selection');
        const selectedRowIds = event.target.selectedRows;
        console.log('selected Row Ids--> ' + JSON.stringify(selectedRowIds));
        // alert('Insode parenmt And selectedRowIds'+selectedRowIds);
        this.selectedRowIds=[];
 
        for (let i = 0; i<selectedRowIds.length; i++){
            this.selectedIdList.push(selectedRowIds[i]);
        }
       console.log('selected Rows-->' + selectedRowIds +' :: '+ selectedRowIds.length );
       console.log('list of selected rows-->'+JSON.stringify(this.selectedIdList));
       if(selectedRowIds.length > 0 ){
        this.deleteButtonClass =  'slds-show' ;
        } 
        if(selectedRowIds.length == 0 ){
            this.deleteButtonClass =  'slds-hide' ;
            }
    }
    
    deleteSelectedRows(){
        deleteMultipleRecord({servObj:this.selectedIdList})
        .then(()=>{
            this.template.querySelector('lightning-datatable').selectedRowIds=[];
 
            const toastEvent = new ShowToastEvent({
                title:'Success!',
                message:'Record deleted successfully',
                variant:'success'
              });
              this.dispatchEvent(toastEvent);
            return refreshApex(wiredgetGenerateData);
        })
        .catch(error =>{
            this.errorMsg =error;
            window.console.log('unable to delete the record due to ' + JSON.stringify(this.errorMsg));
        });
    }

    renderedCallback(){ 
        if(this.isCssLoaded) return
        this.isCssLoaded = true
        loadStyle(this, COLOR).then(()=>{
            console.log("CSS Loaded Successfully")
        }).catch(error=>{ 
            console.error("Error in loading the colors")
        })
    }
   
}