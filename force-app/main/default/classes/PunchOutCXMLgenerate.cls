/**
* @Author      :   Mahadevaprasad R
* @description       :   This class is used for the Cxml Generate
* @TestClass   :   PunchOutCXMLgenerateTest
* @Date        :   29-10-2023
*/


public with sharing class PunchOutCXMLgenerate {

    /** 
     *@description this methode is used to generate redirect url Cxml for login
    *@return  Redirect cxml
    *@param resPonseData 
    *@param  payloadID 
    *@param timestamp
    *  */
public static String xmlResponseGenerator(string resPonseData,string payloadID,string timestamp){
    Dom.Document doc = new Dom.Document();
    SYstem.debug('doc:'+doc);
    
    // Create the root element
    Dom.XmlNode root = doc.createRootElement('cXML', null, null);
    // Add the payloadID and timestamp attributes to the root element
    root.setAttribute('payloadID',payloadID );
    root.setAttribute('timestamp',timestamp );
    Dom.XmlNode header = root.addChildElement('Response', null, null);
        
    
    Dom.XmlNode fromCredential = header.addChildElement('Status ', null, null);
    fromCredential.setAttribute('code', '200');
    fromCredential.setAttribute('text', 'OK');
    fromCredential.setAttribute(' xml:lang', 'en-US');
    Dom.XmlNode fromIdentity = header.addChildElement('PunchOutSetupResponse', null, null);
    Dom.XmlNode fromPunchOutSetupResponse = fromIdentity.addChildElement('StartPage', null, null);
    Dom.XmlNode fromURL = fromPunchOutSetupResponse.addChildElement('URL', null, null);
    fromURL.addTextNode(resPonseData);
    String xmlString = doc.toXmlString();
    System.debug('xmlstring==> ' + xmlString);
        return xmlString;
}


/** 
 *@description this methode is used to generate Error Cxml Value
    * @return Error Cxml
    *@param resPonseData 
    *@param  payloadID 
    *@param timestamp
    * @param code
    * @param text
    
    *  */
    public static String xmlError(string resPonseData,string payloadID,string timestamp,string code,string text){
    Dom.Document doc = new Dom.Document();
    SYstem.debug('doc:'+doc);
    
    // Create the root element
    Dom.XmlNode root = doc.createRootElement('cXML', null, null);
    // Add the payloadID and timestamp attributes to the root element
    root.setAttribute('payloadID',payloadID );
    root.setAttribute('timestamp',timestamp );
    Dom.XmlNode header = root.addChildElement('Response', null, null);
    
    
    Dom.XmlNode fromCredential = header.addChildElement('Status ', null, null);
    fromCredential.setAttribute('code', code);
    fromCredential.setAttribute('text', text);
    fromCredential.setAttribute(' xml:lang', 'en-US');
        fromCredential.addTextNode(resPonseData);
    
    String xmlString = doc.toXmlString();
    System.debug('xmlstring==> ' + xmlString);
    //return '<?xml version="1.0" encoding="utf-16"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"><cXML xml:lang="en-US" payloadID="635143174550687417@clientsite.com" timestamp="2013-09-09T14:57:35-05:00">   <Response>     <Status code="200" text="success" />    <PunchoutSetupResponse>      <StartPage>      <URL>https://www.ClientSite.com/Punchout/        punchoutsessionrequest.isch?ps=e82d0d33-9fee-45fe-9d87-a23400a4218d</URL>      </StartPage>    </PunchoutSetupResponse>    </Response></cXML>';
    //return '<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE cXML SYSTEM "http://xml.cxml.org/schemas/cXML/1.2.014/cXML.dtd"><cXML xml:lang="en-US" payloadID="1655760397.690501.31608925@punchoutconnect.net" timestamp="2022-06-20T16:26:37-05:00"><Response><Status code="200" text="success"></Status><PunchOutSetupResponse><StartPage><URL>https://mainetti--lightsand.sandbox.my.site.com/MagNETFactory/secur/frontdoor.jsp?sid=00D9D0000000QEP!AQEAQL9ZMYhruB7Vni2IIjWQspnqmQdozLwVoZgtfGXeCOSBGQvIl5AMBOFVaUalW26gbioWF1OecAXArn3wIirX_6H2bL7v</URL></StartPage></PunchOutSetupResponse></Response></cXML>';
    return xmlString;
}

/** 
 *@description this methode is used to generate cancelledOrders Cxml Value
    
    * @param orderDate
    *@param orderID
    *@param payloadID
    */
public static void cancelledOrders(string  orderDate,string orderID,string payloadID){
        // Create a new XML document
    Dom.Document doc = new Dom.Document();
    SYstem.debug('doc:'+doc);
    
    // Create the root element
    Dom.XmlNode root = doc.createRootElement('cXML', null, null);
    // Add the payloadID and timestamp attributes to the root element
    root.setAttribute('payloadID', '958074737352@www.xyz3Demo.com');
    root.setAttribute('timestamp', '2000-06-14T12:59:09-07:00');
    
    // Create the Header element
    Dom.XmlNode header = root.addChildElement('Header', null, null);
    
    // Create the From element
    
    Dom.XmlNode from1 = header.addChildElement('From', null, null);
    Dom.XmlNode fromCredential = from1.addChildElement('Credential', null, null);
    fromCredential.setAttribute('domain', 'DUNS');
    Dom.XmlNode fromIdentity = fromCredential.addChildElement('Identity', null, null);
    fromIdentity.addTextNode('12345678');
    
    // Create the To element
    Dom.XmlNode to = header.addChildElement('To', null, null);
    Dom.XmlNode toCredential = to.addChildElement('Credential', null, null);
    toCredential.setAttribute('domain', 'Networkid');
    Dom.XmlNode toIdentity = toCredential.addChildElement('Identity', null, null);
    toIdentity.addTextNode('ANO1000002792-T');
    
    // Create the Sender element
    Dom.XmlNode sender = header.addChildElement('Sender', null, null);
    Dom.XmlNode senderCredential = sender.addChildElement('Credential', null, null);
    senderCredential.setAttribute('domain', 'www.xyz3Demo.com');
    Dom.XmlNode senderIdentity = senderCredential.addChildElement('Identity', null, null);
    senderIdentity.addTextNode('PunchoutResponse');
    Dom.XmlNode userAgent = sender.addChildElement('UserAgent', null, null);
    userAgent.addTextNode('xyz3.x Buyer Services');
    
    ///Request
    Dom.XmlNode request = root.addChildElement('Request', null, null);
        Dom.XmlNode orderRequest = request.addChildElement('OrderRequest', null, null);
        Dom.XmlNode orderRequestHeader = orderRequest.addChildElement('OrderRequestHeader', null, null);
    orderRequestHeader.setAttribute('orderDate', orderDate);
    orderRequestHeader.setAttribute('orderID', orderID);
    orderRequestHeader.setAttribute('type', 'delete');
    orderRequestHeader.setAttribute('orderVersion', '1');
    Dom.XmlNode documentReference  = orderRequestHeader.addChildElement('DocumentReference ', null, null);
    documentReference.setAttribute('payloadID',payloadID );
}


/** 
 *@description this methode is used to generate Order Cxml Value
    * @return Order Cxml
    * @param recordId 
    * */   
    public static String generateCXML(String recordId){
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
                    itemId.addChildElement('SupplierPartID', null, null).addTextNode(baseList[0].OrderSource__c);
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
        else if(fieldName=='Description'){
                    itemDetail.addChildElement('Description', null, null).addTextNode(String.valueOf(fieldValue));
                }else if(fieldName=='UnitOfMeasure'){
                    System.debug('objectField::'+fieldName);
                    //itemDetail.addChildElement('UnitOfMeasure', null, null).addTextNode(String.valueOf(fieldValue));
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