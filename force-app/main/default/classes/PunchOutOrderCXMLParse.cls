/**
* @Author      :   Mahadevaprasad R
* @description       :   This class is used parse cxml into jSon
* @TestClass   :   PunchOutCXMLgenerateTest
* @Date        :   10-11-2023
*/

public  class PunchOutOrderCXMLParse {
    
    public class CXML {
        public Header header { get; set; }
        public Request request { get; set; }
        public string payloadID {get;set;}
        public string timestamp {get;set;}
    }
    public class Header {
        public  FromNode fromNode { get; set; }
        public To to { get; set; }
        public Sender sender { get; set; }
        
    }
    public class FromNode {
        public Credential credential;
    }
    public class To {
        public Credential credential;
    }
    
    public class Credential {
        public String domain { get; set; }
        public String identity { get; set; }
        public String sharedSecret { get; set; }
    }
    
    
    public class Sender {
        public Credential credential { get; set; }
        public String userAgent { get; set; }
        
    }
    
    
    public class PostalAddress {
        public String street { get; set; }
        public String city { get; set; }
        public String state { get; set; }
        public String postalCode { get; set; }
        public String country { get; set; }
        public String name { get; set; }
        public String deliverTo { get; set; }
        
    }
    public class TelephoneNumber {
        public string countryCode { get; set; }
        public string areaOrCityCode{ get; set; }
        public string numberValue{ get; set; }
        public string isoCountryCode{ get; set; }
    }
    public class Phone {
        public string name { get; set; }
        public TelephoneNumber telephoneNumber{ get; set; }
    }
    public class Fax {
        public string name { get; set; }
        public TelephoneNumber telephoneNumber{ get; set; }
    }
    
    public class Address {
        public String addressID { get; set; }
        public string isoCountryCode { get; set;}
        public string name { get; set; }
        public string email { get; set; }
        public PostalAddress postalAddress { get; set; }
        public Phone phone { get; set; }
        public Fax fax { get; set; }
    }
    
    
    public class ShipTo {
        public Address address { get; set; }
        
        
    }
    
    public class Extrinsic {
        public String name { get; set; }
        public String value { get; set; }
    }
    
    public class BrowserFormPost {
        public String uRL { get; set; }
    }
    
    public class Money {
        public String currencyNode { get; set; }
        public Decimal value { get; set; }
    }
    
    public class UnitPrice {
        public string money { get; set; }
        public string currencyValue { get; set; }
    }
    
    public class ItemDetail {
        public UnitPrice unitPrice { get; set; }
        public String unitOfMeasure { get; set; }
        public String classification { get; set; }
        public String manufacturerName { get; set; }
        public String url { get; set; }
        public List<Extrinsic> extrinsics { get; set; }
    }
    
    public class AccountingSegment {
        public String type { get; set; }
        public String id { get; set; }
        public String description { get; set; }
    }
    
    public class Accounting {
        public List<AccountingSegment> segments { get; set; }
    }
    
    public class Charge {
        public Money money { get; set; }
    }
    
    public class Distribution {
        public Accounting accounting { get; set; }
        public Charge charge { get; set; }
    }
    
    public class ItemID {
        public string supplierPartID { get; set; }
        public string supplierPartAuxiliaryID { get; set; }
    }
    public class ItemOut {
        public String quantity { get; set; }
        public ItemDetail itemDetail { get; set; }
        public Distribution distribution { get; set; }
        public ItemID itemID { get; set; }
    }
    
    public class OrderRequestHeader {
        public String orderID { get; set; }
        public String orderDate { get; set; }
        public String type { get; set; }
        public Money total { get; set; }
        public ShipTo shipTo { get; set; }
        public ShipTo billTo { get; set; }
    }
    
    public class OrderRequest {
        public OrderRequestHeader orderRequestHeader { get; set; }
        public List<ItemOut> itemOutList { get; set; }
    }
    
    public class Request {
        public OrderRequest orderRequest { get; set; }
    }
    
    
    
    
     /** 
     *@description this methode is used to generate redirect url Cxml for login
    *@return  success cxml string
    *@param cxmlData cxml data  
   
    *  */
    public static string parseCXML(String cxmlData) {
        Dom.Document doc = new Dom.Document();
        doc.load(cxmlData);
        
        Dom.XmlNode cxmlNode = doc.getRootElement();
        CXML cxml = new CXML();
        
        
        
        
        cxml.payloadID = cxmlNode.getAttribute('payloadID', null);
        cxml.timestamp = cxmlNode.getAttribute('timestamp', null);
        ////Parse Header Node
        Dom.XmlNode headerNode = cxmlNode.getChildElement('Header', null);
        cxml.header = new Header();
        /////Parse Header From Node
        Dom.XmlNode fromNode=headerNode.getChildElement('From', null);
        cxml.header.FromNode = parseFrom(fromNode.getChildElement('Credential', null));
        /////Parse Header To Node
        Dom.XmlNode to=headerNode.getChildElement('To', null);
        cxml.header.To = parseTo(to.getChildElement('Credential', null));
        /////Parse Header Sender Node
        Dom.XmlNode sender=headerNode.getChildElement('Sender', null);
        cxml.header.sender = parseSender(sender.getChildElement('Credential', null));
        cxml.header.sender.userAgent = sender.getChildElement('UserAgent', null).getText();
        
         string cxmlreturn;
        // Parse Request Node
        Dom.XmlNode requestNode = cxmlNode.getChildElement('Request', null);
        cxml.request = new Request();
        cxml.request.orderRequest = parseOrderRequest(requestNode.getChildElement('OrderRequest', null));
        system.debug('PunchOutOrderCXMLParse<><><'+cxml);
        if(String.isBlank(cxml.payloadID)||String.isBlank(cxml.payloadID)){
             cxmlreturn= PunchOutCXMLgenerate.xmlError('POST XML payloadID is not valid:',cxml.payloadID,cxml.timeStamp,'400','Bad Request');
        } else {
      cxmlreturn = PunchOutOrderCXMLParse.baseOrderCreation(cxml);
        }
        return cxmlreturn;
    }
    /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  credentialNode cxml parse to convert Json 
    
    *  */
    
    //////////From Node ////////
    public static FromNode parseFrom(Dom.XmlNode credentialNode) {
        FromNode fr=new FromNode();
        Credential credential = new Credential();
        credential.domain = credentialNode.getAttribute('domain', null);
        credential.identity = credentialNode.getChildElement('Identity', null).getText();
        fr.Credential=credential;
        System.debug('frOm><>>>'+fr);
        return fr;
    }
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  credentialNode cxml parse to convert Json 
    
    *  */
    //////////TO Node ////////
    public static TO parseTo(Dom.XmlNode credentialNode) {
        TO to=new TO();
        Credential credential = new Credential();
        credential.domain = credentialNode.getAttribute('domain', null);
        credential.identity = credentialNode.getChildElement('Identity', null).getText();
        to.Credential=credential;
        System.debug('frOm><>>>'+to);
        return to;
    }
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  senderNode cxml parse to convert Json 
    
    *  */
    //////////Sender Node ////////
    public static Sender parseSender(Dom.XmlNode senderNode) {
        Sender send=new Sender();
        Credential credential = new Credential();
        credential.domain = senderNode.getAttribute('domain', null);
        credential.identity = senderNode.getChildElement('Identity', null).getText();
        credential.SharedSecret = senderNode.getChildElement('SharedSecret', null).getText();
        send.credential=credential;
        //send.userAgent=senderNode.getChildElement('UserAgent', null).getText();
        return send;
    }
    
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  requestNode cxml parse to convert Json 
    
    *  */
    
    //////////requestNode Node ////////
    public static OrderRequest parseOrderRequest(Dom.XmlNode requestNode) {
        OrderRequest orderRequest = new OrderRequest();
        orderRequest.orderRequestHeader = parseOrderRequestHeader(requestNode.getChildElement('OrderRequestHeader', null));
        orderRequest.itemOutList = new List<ItemOut>();
        List<Dom.XMLNode> extrinsicsNode = requestNode.getChildElements();
        
        for (Dom.XmlNode extrinsicNode : extrinsicsNode) {
            System.debug('extrinsicNode><><'+extrinsicNode);
            ItemOut itemOut = new ItemOut();
            if(extrinsicNode.getAttribute('quantity', null)!=null){
                itemOut.quantity = extrinsicNode.getAttribute('quantity', null);
                System.debug('quantity><><'+extrinsicNode.getChildElement('ItemDetail', null));
                itemOut.itemDetail = parseItemDetail(extrinsicNode.getChildElement('ItemDetail', null));
                itemOut.ItemID = parseItemID(extrinsicNode.getChildElement('ItemID', null));
                itemOut.distribution = parseDistribution(extrinsicNode.getChildElement('Distribution', null));
                
                
                orderRequest.itemOutList.add(itemOut);
            }
        }
        System.debug('orderRequest><><'+orderRequest);
        return orderRequest;
    }
    ////////////OrderRequestHeader node
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  headerNode cxml parse to convert Json 
    
    *  */
    public static OrderRequestHeader parseOrderRequestHeader(Dom.XmlNode headerNode) {
        OrderRequestHeader orderRequestHeader = new OrderRequestHeader();
        orderRequestHeader.orderID = headerNode.getAttribute('orderID', null);
        orderRequestHeader.orderDate = headerNode.getAttribute('orderDate', null);
        orderRequestHeader.type = headerNode.getAttribute('type', null);
        orderRequestHeader.total = parseMoney(headerNode.getChildElement('Total', null).getChildElement('Money', null));
        orderRequestHeader.shipTo = parseShipTo(headerNode.getChildElement('ShipTo', null));
        orderRequestHeader.billTo = parseShipTo(headerNode.getChildElement('BillTo', null));
        system.debug('orderRequestHeader><><<'+orderRequestHeader);
        return orderRequestHeader;
        
    }
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  moneyNode cxml parse to convert Json 
    
    *  */
    public static Money parseMoney(Dom.XmlNode moneyNode) {
        Money money = new Money();
        money.currencyNode = moneyNode.getAttribute('currency', null);
        money.value = Decimal.valueOf(moneyNode.getText());
        return money;
    }
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  shipToNode cxml parse to convert Json 
    
    *  */
    public static ShipTo parseShipTo(Dom.XmlNode shipToNode) {
        ShipTo shipTo = new ShipTo();
        shipTo.address = parseAddress(shipToNode.getChildElement('Address', null));
        return shipTo;
    }
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  addressNode cxml parse to convert Json 
    
    *  */
    public static Address parseAddress(Dom.XmlNode addressNode) {
        Address address = new Address();
        address.addressID = addressNode.getAttribute('addressID', null);
        address.isoCountryCode = addressNode.getAttribute('isoCountryCode', null);
        address.name = addressNode.getChildElement('Name', null).getText();
        address.email = addressNode.getChildElement('Email', null).getText();
        address.postalAddress = parsePostalAddress(addressNode.getChildElement('PostalAddress', null));
        address.Phone = parsePhone(addressNode.getChildElement('Phone', null));
        address.Fax = parseFax(addressNode.getChildElement('Fax', null));
        return address;
    }
      /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  postalPhone cxml parse to convert Json 
    
    *  */
    public static Phone parsePhone(Dom.XmlNode postalPhone) {
        Phone phone = new Phone();
        phone.TelephoneNumber = parseTelephoneNumber(postalPhone.getChildElement('TelephoneNumber', null));
        
        return phone;
    }
      /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  postalFax cxml parse to convert Json 
    
    *  */
    public static Fax parseFax(Dom.XmlNode postalFax) {
        Fax fax = new Fax();
        fax.TelephoneNumber = parseTelephoneNumber(postalFax.getChildElement('TelephoneNumber', null));
        
        return fax;
    }
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  postalTelephoneNumber cxml parse to convert Json 
    
    *  */
    public static TelephoneNumber parseTelephoneNumber(Dom.XmlNode postalTelephoneNumber) {
        TelephoneNumber telephoneNumber = new TelephoneNumber();
        telephoneNumber.countryCode = postalTelephoneNumber.getChildElement('CountryCode', null).getText();
        telephoneNumber.areaOrCityCode = postalTelephoneNumber.getChildElement('AreaOrCityCode', null).getText();
        telephoneNumber.numberValue = postalTelephoneNumber.getChildElement('Number', null).getText();
        Dom.XmlNode countryCodeNode = postalTelephoneNumber.getChildElement('CountryCode', null);
        telephoneNumber.isoCountryCode = countryCodeNode.getAttribute('isoCountryCode', null);
        return telephoneNumber;
    }
    
    
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  postalAddressNode cxml parse to convert Json 
    
    *  */
    public static PostalAddress parsePostalAddress(Dom.XmlNode postalAddressNode) {
        PostalAddress postalAddress = new PostalAddress();
        postalAddress.name = postalAddressNode.getAttribute('Name', null);
        //postalAddress.deliverTo = postalAddressNode.getChildElement('DeliverTo', null).getText();
        postalAddress.street = postalAddressNode.getChildElement('Street', null).getText();
        postalAddress.city = postalAddressNode.getChildElement('City', null).getText();
        postalAddress.state = postalAddressNode.getChildElement('State', null).getText();
        postalAddress.postalCode = postalAddressNode.getChildElement('PostalCode', null).getText();
        postalAddress.country = postalAddressNode.getChildElement('Country', null).getText();
        return postalAddress;
    }
    
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  itemDetailNode cxml parse to convert Json 
    
    *  */
    
    
    
    public static ItemDetail parseItemDetail(Dom.XmlNode itemDetailNode) {
        ItemDetail itemDetail = new ItemDetail();
        System.debug('itemDetailNode><>>'+itemDetailNode);
        itemDetail.unitPrice = parseUnitPrice(itemDetailNode.getChildElement('UnitPrice', null));
        System.debug('UnitOfMeasure<><>'+itemDetailNode.getChildElement('UnitOfMeasure', null).getText());
        itemDetail.unitOfMeasure = itemDetailNode.getChildElement('UnitOfMeasure', null).getText();
        itemDetail.classification = itemDetailNode.getChildElement('Classification', null).getText();
        itemDetail.manufacturerName = itemDetailNode.getChildElement('ManufacturerName', null).getText();
        itemDetail.url = itemDetailNode.getChildElement('URL', null).getText();
        itemDetail.extrinsics = new List<Extrinsic>();
        
        for (Dom.XmlNode extrinsicNode : itemDetailNode.getChildElements()) {
            Extrinsic extrinsic = new Extrinsic();
            if(extrinsicNode.getAttribute('name', null)!=null){
                extrinsic.name = extrinsicNode.getAttribute('name', null);
                extrinsic.value = extrinsicNode.getText();
                itemDetail.extrinsics.add(extrinsic);
            }
        }
        
        return itemDetail;
    }
      /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  unitPriceNode cxml parse to convert Json 
    
    *  */
    public static UnitPrice parseunitPrice(Dom.XmlNode unitPriceNode) {
        UnitPrice fr=new UnitPrice();
        
        Dom.XmlNode moneynode=unitPriceNode.getChildElement('Money', null);
        fr.money = unitPriceNode.getChildElement('Money', null).getText();
        fr.currencyValue = moneynode.getAttribute('currency', null);
        
        return fr;
    }
    
     /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  itemIDNode cxml parse to convert Json 
    
    *  */
    
    
    public static ItemID parseItemID(Dom.XmlNode itemIDNode) {
        ItemID item = new ItemID();
        item.supplierPartAuxiliaryID = itemIDNode.getChildElement('SupplierPartAuxiliaryID', null).getText();
        item.supplierPartID = itemIDNode.getChildElement('SupplierPartID', null).getText();
        return item;
    }
    /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  distributionNode cxml parse to convert Json 
    
    *  */
    public static Distribution parseDistribution(Dom.XmlNode distributionNode) {
        Distribution distribution = new Distribution();
        distribution.accounting = parseAccounting(distributionNode.getChildElement('Accounting', null));
        distribution.charge = parseCharge(distributionNode.getChildElement('Charge', null));
        return distribution;
    }
    /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  accountingNode cxml parse to convert Json 
    
    *  */
    public static Accounting parseAccounting(Dom.XmlNode accountingNode) {
        Accounting accounting = new Accounting();
        accounting.segments = new List<AccountingSegment>();
        
        for (Dom.XmlNode segmentNode : accountingNode.getChildElements()) {
            AccountingSegment segment = new AccountingSegment();
            segment.type = segmentNode.getAttribute('type', null);
            segment.id = segmentNode.getAttribute('id', null);
            segment.description = segmentNode.getAttribute('description', null);
            accounting.segments.add(segment);
        }
        
        return accounting;
    }
    /** 
     *@description this methode is used to parse cxml
    *@return  parse cxml
   
    *@param  chargeNode cxml parse to convert Json 
    
    *  */
    public static Charge parseCharge(Dom.XmlNode chargeNode) {
        Charge charge = new Charge();
        charge.money = parseMoney(chargeNode.getChildElement('Money', null));
        return charge;
    }
    
 /** 
     *@description this methode is used to base order creation
    *@return  cxml Value Error or success
   
    *@param  cxml parse Json Value 
    
    *  */

    public static string baseOrderCreation(CXML cxml) {
             
       Boolean cxmlInvalidModel=false;
        Boolean cxmlShipTO=false;
        Boolean cxmlPrice=false;
        string returnValue;
        system.debug('cxml.payloadID><>'+cxml.payloadID);
        list<PunchOut_Request__c> punch = [select Id,payloadID__c,Operation__c,Createddate,timestamp__c From PunchOut_Request__c where payloadID__c =:cxml.payloadID WITH SECURITY_ENFORCED ];
        
        list<string> modelID=new list<string>();
        for(ItemOut i:cxml.Request.OrderRequest.itemOutList){
            modelID.add(i.ItemDetail.classification);
        }
       system.debug('cxml.payloadID><>'+modelID);
        /////// Order Confrim Cxml validation 
        if(punch.size()>0){
            cxmlInvalidModel= PunchOutValidation.inActiveModelID(punch[0].Id);
            cxmlShipTO= PunchOutValidation.getShipTOAddress(punch[0].Id,cxml);
            cxmlPrice= PunchOutValidation.getPriceValue(punch[0].Id);
            // PunchOutValidation.getbaseOrder(punch[0].Id,modelID);
        }
       
           
       
        
        
        list<Base_Order__c> baseupdate=[select id,Start_Process__c,Processing_Status__c,Retailer_code__c,PunchOut_Request__c,PunchOut_Request__r.payloadID__c from Base_Order__c where PunchOut_Request__r.payloadID__c =:cxml.payloadID  ];
        System.debug('baseupdate><>'+baseupdate);
        
        
        if(baseupdate.size()>0 &&(!cxmlShipTO)&&(!cxmlInvalidModel)&&(!cxmlPrice)){
        returnValue=PunchOutCXMLgenerate.xmlError('DataUploaded Successfully',cxml.payloadID,cxml.timestamp,'200','Ok') ;
        system.debug('returnValue><>'+returnValue);
        for(Base_Order__c b:baseupdate){
            b.Start_Process__c=true;
            b.Processing_Status__c='Draft';
            b.PunchOut_Status__c='Order Confirmed';
            b.Retailer_code__c='Saver';
            Update  b;
                    }
               System.debug('baseupdate><>'+baseupdate);    
        
            
        }
        ////if payloadID is Is not valid error message will generate 
        else if(baseupdate.size()==0 ){
             returnValue= PunchOutCXMLgenerate.xmlError('POST XML is not valid:PayloadID is Invalid',cxml.payloadID,cxml.timestamp,'400','Bad Request');
        } ////if ModelIds are Invalid error message will generate 
        else if(cxmlInvalidModel){
             returnValue= PunchOutCXMLgenerate.xmlError('POST XML is not valid:ModelIds are Invalid',cxml.payloadID,cxml.timestamp,'400','Bad Request');
        }////if ShipTo addres isInvalid error message will generate 
        else if(cxmlShipTO){
             returnValue= PunchOutCXMLgenerate.xmlError('POST XML is not valid:ShipTo addres is Invalid',cxml.payloadID,cxml.timestamp,'400','Bad Request');
        }////if Product Price value Changed error message will generate 
        else if(cxmlPrice){
            returnValue= PunchOutCXMLgenerate.xmlError('POST XML is not valid:Product Price value Changed',cxml.payloadID,cxml.timestamp,'400','Bad Request');
        }
        
        
        
        return returnValue;
    }
    
    
}