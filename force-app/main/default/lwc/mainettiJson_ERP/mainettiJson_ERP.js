import { LightningElement, api, track, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import getRecord from '@salesforce/apex/PassJsonDataController.getRecord';
import getAllChildObjects from '@salesforce/apex/PassJsonDataController.getAllChildObjects';
import getAllRelatedChildObjects from '@salesforce/apex/PassJsonDataController.getAllRelatedChildObjects';
import getServicetype from '@salesforce/apex/PassJsonDataController.getServicetype';
import getAllfieldss from '@salesforce/apex/PassJsonDataController.getAllfieldss';
import getAllfieldsFromMetadata from '@salesforce/apex/PassJsonDataController.getAllfieldsFromMetadata';
import featchService from '@salesforce/apex/PassJsonDataController.featchService';


export default class MainettiJson_ERP extends LightningElement {
    @api servtype;  @api counrty;
    @api recordName;  @api InsertJosnData;  @api serviceRecordId;
    @api servicerecord; @track servicerecord;   @track recordName;
    @track servicetype; @track servicerecordId;
    @track showProgressBar = true;
    @track ServiceTypedetails = false;
    @track InsertJosnData = true;
    @track storejson = [];
    @track serviceTypeEdit = false;
    @track previousValid = false;
    @track showmyspinner = false;
    @api parent; @track parent;
    @track SelObj; @track SelectedObj; 
    @api storejson;
    @api ServiceTypeEdit; @api validateprogressbarforfinal;
    @api PreviousValid; @api showProgressBar;
    @api ServiceTypedetails; @api mapPage;
    @track lookUpObj = [];  @track lookupObjFields = [];
    @track allField = [];  @track getAllField = [];
    @track allObject = [];  @track getAllObject = [];
    @track allChildObj = []; @track allChildObject = [];
    @track items = []; @api item;
    @track relatedObjChlid; @track relatedChildObjects; @track shouldRenderContent=true;
  

    showSpinner() {
        this.showmyspinner = true;
    }
    hideSpinner() {
        this.showmyspinner = false;
    }

    handleServiceChange(event) {
        this.servicerecord = event.target.value;
        console.log('service record-->'+this.servicerecord);
    }

    activeButton() {
        const json = this.template.querySelector('lightning-textarea').value;
        // console.log('json inserted-->' + JSON.stringify(json));
        if (json != null) {
            this.disabled = false;
        }
    }


    /*
    handleChange(event) {
        const selectedField = event.currentTarget.dataset.id;
        const selectedValue = event.target.value;
        console.log(' this.selectedField row number-->'+selectedField);
        this.SelObj = selectedValue;
        console.log(' this.SelObj-->'+this.SelObj);
        this.storejson[event.currentTarget.dataset.id].ObjectNames1__c=event.target.value;
        if(this.SelObj ==null){
            this.relatedChildObjects=null;
        }
         if (this.SelObj =='Sales_Order__c'){
            this.relatedChildObjects=this.childarrayMap;
        }
        console.log('storejson values-->'+JSON.stringify(this.storejson));
    }
    getValuesByKey(childarrayMap, requiredKey) {
        const result = [];
        for (const item of childarrayMap) {
            if (item.key === requiredKey) {
            const fields = item.value;
            fields.forEach(field => {
                result.push(field.split(','));
            });
            }
        }
        return result;
    }
    
   @track fieldsForRequiredObject=[];
    handleChildObjName(event) {
        const selectedFieldId = event.currentTarget.dataset.id;
        const childObjValue = event.target.value;
        this.SelectedChildObjName = childObjValue;
        console.log('Selected Child Obj Name-->'+this.SelectedChildObjName);
        
        this.storejson[event.currentTarget.dataset.id].ChildObjectName1__c=this.SelectedChildObjName;
        console.log('storejson Child Object value-->'+JSON.stringify(this.storejson));
        
        if(this.childarrayMap){
            const requiredObject = this.SelectedChildObjName; // Replace with the object name you want
            
            this.fieldsForRequiredObject = this.getValuesByKey(this.childarrayMap, requiredObject);
            console.log('Fields for -->' + requiredObject + ': ' + this.fieldsForRequiredObject);    
        }

    }

    handleChildField(event) {
        const selectedField = event.target.id;
        const childObjField = event.target.value;
        this.SelectedChildField = childObjField;
        console.log('Selected Child Obj Name-->'+this.SelectedChildField);
        console.log('data id set-->'+event.currentTarget.dataset.id);

        this.storejson[event.currentTarget.dataset.id].SF_Object1_Field_Name__c=event.target.value;
        console.log('storejson Field value-->'+JSON.stringify(this.storejson));

    }  
    */

    previousPage() {
        this.mapPageForPreview = false;
        this.mapPage = true;
        this.PostmanLink = false;
    }
   

    navigateToParentComponent() {
        const parentComponent = this.parent;
        if (parentComponent && typeof parentComponent.greetingMethod === 'function') {
            parentComponent.greetingMethod();
        }
    }
    
    serviceType() {
        this.columns = [
            { label: 'Service Type', fieldName: 'Name', type: 'text' }
        ];

        featchService()
            .then(result => {
                this.data = result;
                console.log('FETCH SERVICE DATA --> '+this.data);
            })
            .catch(error => {
                console.error('Error fetching service data:', error);
            });
    }
   
connectedCallback(){
     getAllfieldsFromMetadata()
        .then(result => {
            this.hideSpinner();
            const objectfields = result.objectfield;
            const arrayMapKey = [];
            for (let key in objectfields) {
                arrayMapKey.push({ key: key, value: objectfields[key] });
            }
            this.getAllObject = arrayMapKey;
            this.getAllField = arrayMapKey;
            // console.log('get all object-->'+JSON.stringify(this.getAllObject));
            // console.log('get all Field-->'+JSON.stringify(this.getAllField));

        })
        .catch(error => {
            this.hideSpinner();
            console.error('Error fetching fields from metadata:', error);
        });
   
         this.childarrayMap = [];

    getAllRelatedChildObjects()
        .then(result => {
            this.hideSpinner();

            const relChildObjects = result.relatedObjectmap;
            const childarrayMapValues = [];

            for (const key in relChildObjects) {
                if (relChildObjects.hasOwnProperty(key)) {
                    childarrayMapValues.push({ key: key, value: relChildObjects[key] });
                }
            }

            this.relatedObjChlid = childarrayMapValues;
          
            const relatedChildFieldsMap = result.relatedFieldsMap;
            console.log('fields from apex -->'+relatedChildFieldsMap);
            for (const key in relatedChildFieldsMap) {
                if (relatedChildFieldsMap.hasOwnProperty(key)) {
                    this.childarrayMap.push({ key: key, value: relatedChildFieldsMap[key] });
                }
            }
            // console.log('Child object fields-->'+JSON.stringify(this.childarrayMap));
            })
        .catch(error => {
            this.hideSpinner();
            console.error('Error fetching related child objects:', error.message);
        });

}

   /* handleConfirmEdit() {
        getRecord()
            .then(result => {
                const items = result.map(item => item);
                this.storejson = items;
                this.ServiceTypeEdit = true;
                this.PreviousValid = true;
                this.showSpinner(); 
                this.mapPage = true;
                this.ServiceTypedetails = false;
            })
            .catch(error => {
                // Handle any errors here
                console.error(error.message);
            });
    }*/
    
@track object;
    myControllerMethod() {
        this.showSpinner();
        this.object = this.servtype;
        console.log('object-->'+this.object);
        this.servicerecord = this.object;
        var validation=false;
        if (this.object==[]) {
            validation=true;
            this.hideSpinner();
            
                const toastEvent = new ShowToastEvent({
                    title: 'Error!',
                    mode: 'dismissible',
                    message: 'Please Choose One Service Type',
                    variant: 'error',
                });
                this.dispatchEvent(toastEvent);
        
        } else {
            let json;
            if (this.actionNameVar == undefined) {
            this.recordName = json;
            var validations = false;
            try {
                this.hideSpinner();
                var jsonData = this.template.querySelector('lightning-textarea').value;
                const deserializedObject = JSON.parse(jsonData);

                function traverseObject(obj, result, currentKey) {
                    for (const key in obj) {
                        if (obj.hasOwnProperty(key)) {
                            const newKey = currentKey ? `${currentKey}.${key}` : key;
                            if (typeof obj[key] === 'object') {
                                traverseObject(obj[key], result, newKey);
                            } else {
                                result.push({ key: newKey, value: obj[key] });
                            }
                        }
                    }
                }
                const nestedKeysWithValues = [];
                const pushallvalue = [];
                traverseObject(deserializedObject, nestedKeysWithValues, '');
                nestedKeysWithValues.forEach(item => {
                    const removzerofromarraykeys = item.key;
                    const deleted = removzerofromarraykeys.replace(".0", ' ');
                    const updatedStr1 = deleted.replace(/\.0/g, '');
                    const removeemptyspace = updatedStr1.replace(/\s+/g, "");
                    console.log('remove empty space-->'+removeemptyspace);
                    pushallvalue.push({"Name": removeemptyspace, "SF_Object1_Field_Name__c": null, "ObjectNames1__c": null, "ChildObjectName1__c": null});
                });
                 this.connectedCallback();
                //  console.log('after method call object-->'+JSON.stringify(this.getAllObject)); 
                this.storejson = pushallvalue;
                this.mapPage = true;
                this.InsertJosnData = false;    
            } catch (error) {
                this.hideSpinner();
                console.log("Error due to-->"+error.message);
                const toastEvent = new ShowToastEvent({
                    duration: '2000',
                    title: 'Error!',
                    mode: 'dismissible',
                    message: 'Please Enter Valid JsonData',
                    variant: 'error',
                });
                this.dispatchEvent(toastEvent);
            }
        }else{
            this.getAllFields();
            // json = this.record;
            this.recordName = this.storejson;
            const serviceRecordId = this.serviceRecordId;
    
            getRecord({ serviceRecordId: serviceRecordId })
                .then(result => {
                    this.hideProgressBar();
                    var result =result.map;
                    var items=[];
                        for (var i = 0; i < result.length; i++) {
                            items.push(result[i]);
                        }
                    this.storejson = items;
                    this.companyName=this.storejson.map(element => ({label:element.ObjectNames1__c, value:element.ObjectNames1__c}) );
                    this.showSpinner();
                })
                .catch(error => {
                    this.hideProgressBar();
                    console.error('Error fetching record data:', error);
                });
    
            this.ServiceTypeEdit = true;
            this.validateprogressbarforfinal = true;
            this.PreviousValid = true;
            this.mapPage = true;
            this.InsertJosnData = false;
        }
                
    }
}

@api
saveHandler() {
    const validateprogressbarforfinal = this.validateprogressbarforfinal;

    if (validateprogressbarforfinal==false) {
        const toastEvent = new ShowToastEvent({
            title: 'Error!',
            mode: 'dismissible',
            message: 'Please Complete Previous Step',
            variant: 'error',
        });
        this.dispatchEvent(toastEvent);
    } else {
        this.showSpinner();
        const jsonParse = this.storejson;
        const service = this.servtype;
        const country = this.counrty;
        const jsonedit = this.ServiceTypeEdit;
        const jsonSample = this.record;
        const serviceRecordId = this.serviceRecordId;

        getServicetype({
            services: service,
            jsonData: jsonParse,
            jsonedit: jsonedit,
            countryCode: country,
            jsonSample: jsonSample,
            serviceRecordId: serviceRecordId,
        })
            .then(result => {
                if (jsonedit === false) {
                    this.hideSpinner();
                    this.mapPage = false;
                    this.PostmanLink = true;

                    const hostname = window.location.origin;
                    const arr = hostname.split('.');
                    const instance = arr[0];
                    const instances = '.my.salesforce.com/services/apexrest/TestingClass/';
                    this.records = instance + instances;

                    const toastEvent = new ShowToastEvent({
                        title: 'Success!',
                        message: 'The record has been Inserted successfully.',
                        variant: 'success',
                        mode: 'dismissible',
                    });
                    this.dispatchEvent(toastEvent);

                    // Call a method in the parent component
                    this.greetingMethod();
                } else {
                    const toastEvent = new ShowToastEvent({
                        title: 'Success!',
                        message: 'The record has been Updated successfully.',
                        variant: 'success',
                        mode: 'dismissible',
                    });
                    this.dispatchEvent(toastEvent);

                    // Refresh the view
                    const refreshView = new CustomEvent('forcerefresh');
                    this.dispatchEvent(refreshView);
                }
            })
            .catch(error => {
                console.error('Error in Apex call:', error);
            });

        this.serviceType();
    }
}


}