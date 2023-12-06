global with sharing class PunchOutOrderMessageController {
    global String getStringList { get; set; }
    global String getStringUrl { get; set; }
    
    public punchOutOrderMessageController(){
        string recordIdUrl = ApexPages.currentPage().getParameters().get('Id');
         System.Url recordId = URL.getOrgDomainUrl();
                System.Url recordUrl = URL.getCurrentRequestUrl();
       // string path = URL.getPath();
        System.debug('recordId><>'+recordId);
        System.debug('recordUrl><>'+recordUrl);
    } 
    public  String getStringList() {
       /* System.debug('Inside Methode');
        string recordId = System.currentPagereference().getParameters().get('Id');
        string recUrl = Apexpages.currentPage().getHeaders().get('Id');
        string Url = Apexpages.currentPage().getUrl();
        System.debug('Url><>'+Url);
        System.debug('recUrl><>'+recUrl);
        System.debug('recordId><>'+recordId);      
        //System.debug('getOrgDomainUrl><>'+Url.getOrgDomainUrl().toExternalForm()); 
       // System.debug('getPath><>'+Url.getOrgDomainUrl().getPath();
       */
         String partitionInput = 'PunchOut';
            
            Cache.SessionPartition  sessionPartition = Cache.Session.getPartition(partitionInput);
        Id punchOutRefId= (Id)sessionPartition.get('PunchOutId');
            System.debug('punchOutRefId><>'+punchOutRefId);
       string recordId='a2jHz0000006jahIAA';
        PunchOut_Request__c punch =[select Id,payloadID__c,TimeStamp__c,Street__c,City__c,State__c,PostalCode__c,Country__c,Address_Name__c From PunchOut_Request__c where Id=: recordId WITH SECURITY_ENFORCED ];
        
        list<Base_Order__c> baseList =[select Id,PunchOut_Request__c,OrderSource__c,Company__c From Base_Order__c Where PunchOut_Request__c=:recordId WITH SECURITY_ENFORCED] ;
        
        set<id> baseListId=new set<id>();
        for(Base_Order__c b:baseList ){
            baseListId.add(b.Id);
        }
        List<JF_SF_Field_Mapping__c> mappingRecords= [SELECT Name,SF_Object1_Field_Name__c, ObjectNames1__c,Service_Type__c
                                                      FROM JF_SF_Field_Mapping__c where Service_Type__r.Name ='Sales Order Request' WITH SECURITY_ENFORCED];
        
        Map<String,String> perentMap = new Map<String,String>();  
        Map<String,String> childMap = new Map<String,String>();
        Map<String,String> jsonNameParent = new Map<String,String>();
        Map<String,String> jsonNameChild = new Map<String,String>();
        
        system.debug('mappingRecord'+mappingRecords); 
        For(JF_SF_Field_Mapping__c jf : mappingRecords){
            if(jf.ObjectNames1__c.contains('.')){
                jsonNameParent.put(jf.Name,jf.SF_Object1_Field_Name__c);
                System.debug('jf.SF_Object1_Field_Name__c::'+jf.SF_Object1_Field_Name__c);
                if(jf.SF_Object1_Field_Name__c == 'Name1'){
                    childMap.put('Name',jf.ObjectNames1__c);
                    
                }else{
                    childMap.put(jf.SF_Object1_Field_Name__c,jf.ObjectNames1__c);
                } 
                
                
            }
            else{
                System.debug('jf.SF_Object1_Field_Name__c,jf.Name::'+jf.SF_Object1_Field_Name__c+'::'+jf.Name);
                perentMap.put(jf.SF_Object1_Field_Name__c,jf.ObjectNames1__c);
                jsonNameParent.put(jf.Name,jf.SF_Object1_Field_Name__c);
                
            }
        }
        
        // Get the keys and values from the Map
        List<String> keys = new List<String>(jsonNameParent.keySet());
        List<String> values = new List<String>(jsonNameParent.values());
        
        // Now you can work with the keys and values as needed
        System.debug('Keys: ' + keys);
        System.debug('Values: ' + values);
        
        System.debug('jsonNameParent>>>'+jsonNameParent);
        String parentKeyVal;
        String parentvalue = 'SELECT ';
        String childkey;
        String childval = 'SELECT ';
        for(String s : perentMap.keySet()){
            parentvalue += s+',';
            System.debug('parentvalue>>'+parentvalue);
        }
        for(String s : perentMap.values()){
            parentKeyVal = s;
            System.debug('parentKeyVal>>'+parentKeyVal);
        }
        for(String s : childMap.keySet()){
            childval += s+',';
        }
        for(String s : childMap.values()){
            childkey = s;
        }
        System.debug('childkey?>>>'+childkey);
        String stringvarible;
        if(String.isNotBlank(childkey)){
            
            String[] mappingParts = childkey.split('\\.');
            System.debug('mappingParts>>>'+mappingParts);
            String childObj = mappingParts[1].replace('s__r', '__c');
            System.debug('childObj'+childObj);
            if (childval.endsWith(',')) {
                childval = childval.substring(0, childval.length() -1);
            }
            System.debug('childval>>>'+childval);
            
            parentKeyVal=parentKeyVal.replace('__c', '__r.Id');
            // stringvarible = parentvalue+'('+childval+' FROM '+childObj+') FROM '+parentKeyVal+' where id =:recordId';
            stringvarible = +childval+' FROM '+childObj+' where '+parentKeyVal+' =:baseListId';
            System.debug('Stringvarible>>'+stringvarible);
            
        }else{
            if (parentvalue.endsWith(',')) {
                parentvalue = parentvalue.substring(0, parentvalue.length() -1);
            }
            stringvarible = parentvalue+' FROM '+parentKeyVal+' where id =:recordId';
            System.debug('Stringvarible>>'+stringvarible);
            
        }
        
        System.debug('Stringvarible>>>>'+stringvarible);
        List < sObject > sList = Database.query(stringvarible);
        System.debug('sList>>'+sList);
        Dom.Document doc = new Dom.Document();
        Dom.XmlNode root = doc.createRootElement('cXML', null, null);
        root.setAttribute('payloadID', punch.payloadID__c);
        root.setAttribute('timestamp', String.ValueofGmt(punch.TimeStamp__c));
        
        // Create the Header element
        Dom.XmlNode header = root.addChildElement('Header', null, null);
        
        // Create the From element
        
        Dom.XmlNode from1 = header.addChildElement('From', null, null);
        Dom.XmlNode fromCredential = from1.addChildElement('Credential', null, null);
        fromCredential.setAttribute('domain', 'DUNS');
        Dom.XmlNode fromIdentity = fromCredential.addChildElement('Identity', null, null);
        fromIdentity.addTextNode('');
        
        // Create the To element
        Dom.XmlNode to = header.addChildElement('To', null, null);
        Dom.XmlNode toCredential = to.addChildElement('Credential', null, null);
        toCredential.setAttribute('domain', 'Networkid');
        Dom.XmlNode toIdentity = toCredential.addChildElement('Identity', null, null);
        toIdentity.addTextNode('');
        
        // Create the Sender element
        Dom.XmlNode sender = header.addChildElement('Sender', null, null);
        Dom.XmlNode senderCredential = sender.addChildElement('Credential', null, null);
        senderCredential.setAttribute('domain', 'www.xyz3Demo.com');
        Dom.XmlNode senderIdentity = senderCredential.addChildElement('Identity', null, null);
        senderIdentity.addTextNode('PunchoutResponse');
        Dom.XmlNode userAgent = sender.addChildElement('UserAgent', null, null);
        userAgent.addTextNode('xyz3.x Buyer Services');
        
        // Create the Message element
        Dom.XmlNode message = root.addChildElement('Message', null, null);
        Dom.XmlNode punchOutOrderMessage = message.addChildElement('PunchOutOrderMessage', null, null);
        //>>Dom.XmlNode buyerCookie = punchOutOrderMessage.addChildElement('BuyerCookie', null, null);
        //>>buyerCookie.addTextNode('1J3YVWU9QWMTB');
        
        // Create the PunchOutOrderMessageHeader element
        Dom.XmlNode punchOutOrderMessageHeader = punchOutOrderMessage.addChildElement('PunchOutOrderMessageHeader', null, null);
        punchOutOrderMessageHeader.setAttribute('operationAllowed', 'create');
        Dom.XmlNode total = punchOutOrderMessageHeader.addChildElement('Total', null, null);
        Dom.XmlNode money = total.addChildElement('Money', null, null);
        money.setAttribute('currency', 'USD');
        money.addTextNode('14.27');
        
        
        
        for (SObject record : sList) {
            Dom.XmlNode itemIn = punchOutOrderMessage.addChildElement('ItemIn', null, null);
            Dom.XmlNode itemId = itemIn.addChildElement('ItemID', null, null);
            
            itemId.addChildElement('SupplierPartAuxiliaryID', null, null).addTextNode(baseList[0].Company__c);
            Dom.XmlNode itemDetail = itemIn.addChildElement('ItemDetail', null, null);
            Dom.XmlNode unitPrice = itemDetail.addChildElement('UnitPrice', null, null);
            Dom.XmlNode unitPriceMoney = unitPrice.addChildElement('Money', null, null);
            
            // Retrieve and iterate over the fields in the record
            for (String fieldName : jsonNameParent.keySet()) {
                String objectField = jsonNameParent.get(fieldName);
                System.debug('objectField::'+objectField);
                //System.debug('fieldName::'+fieldName);
                System.debug('record::'+record.getSObjectType().getDescribe().fields.getMap());
                //System.debug('MapValues:'+jsonNameParent.get(fieldName));
                if (record.getSObjectType().getDescribe().fields.getMap().containsKey(objectField)) {
                    Object fieldValue = record.get(objectField);
                    System.debug('fieldName::'+fieldName);
                    System.debug(fieldName+'   '+ String.valueOf(fieldValue));
                    
                    
                    if(fieldName=='quantity'){
                        itemIn.setAttribute('quantity', String.valueOf(fieldValue));
                    }
                    
                    // SObject BaseOrder =record.getSObject(varData.Object_Name_A__c);
                    
                    
                    if(fieldName=='currency'){
                        
                        unitPriceMoney.setAttribute('currency', String.valueOf(fieldValue));
                    }
                    else if(fieldName=='SupplierPartID'){
                        //itemDetail.addChildElement('Description', null, null).addTextNode(String.valueOf(fieldValue));
                        itemId.addChildElement('SupplierPartID', null, null).addTextNode(String.valueOf(fieldValue));
                    }else if(fieldName=='SupplierPartID'){
                        System.debug('objectField::'+fieldName);
                        // itemId.addChildElement('SupplierPartID', null, null).addTextNode(String.valueOf(fieldValue));
                    } else if(fieldName=='currency'){
                        unitPriceMoney.addTextNode(String.valueOf(fieldValue));
                    }
                }
            }
            
            
        }
        String xmlString = doc.toXmlString();
        System.debug('xmlString><>>>>>>'+xmlString);
        return xmlString;
    }
    
    
    
    
    
    
    
    
}