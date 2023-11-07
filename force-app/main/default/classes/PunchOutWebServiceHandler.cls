public without sharing class PunchOutWebServiceHandler {
    
    //method to initiate recursive parsing of XML stream
    public static Map<String, Object> xmlToMap(String xml){
        
        //initialzing XML document
        Dom.Document doc = new Dom.Document();
        doc.load(xml);
        System.debug('doc::::'+doc);
        //getting the root element and parsing it recursively
        Dom.XMLNode root = doc.getRootElement();
        System.debug('root::::'+root);
        Object temp = parse(root);
        System.debug('temp::::'+temp);
        
        
        //map to store parsed data
        Map<String, Object> jsonResult = new Map<String, Object>{root.getName() => temp};
            
            //result map having data from the XML string as a map
            System.debug('jsonResult::::'+jsonResult);
        PunchOutWebServiceHandler.LoginUrl(jsonResult);
        return jsonResult;
        
        
    }
    
    //method to recursively parse child nodes from XML document
    private static Object parse(Dom.XMLNode node){
        system.debug('node'+node);
        //map to store data of current XML node
        Map<String, Object> jsonResult = new Map<String, Object>();
        
        //getting list of child elements
        List<Dom.XMLNode> children = node.getChildElements();
        
        //if no child elements found, we simply return the text value
        if(children.isEmpty()){
            return node.getText();
        }
        
        //map to store occurence count of child elements against their names       
        Map<String, Integer> nodeNameCount = new Map<String, Integer>();
        
        //iterating over child elements and populating the count in map
        for(Dom.XMLNode child : children){
            
            String nodeName = child.getName();
            
            if(!nodeNameCount.containsKey(child.getName())){
                nodeNameCount.put(nodeName, 0);
            }
            
            Integer oldCount = nodeNameCount.get(nodeName);
            nodeNameCount.put(nodeName, oldCount + 1);
            
        }
        
        //iterating over child elements and parsing them recursively
        for(Dom.XMLNode child : children) {
            
            Object temp = parse(child);
            String nodeName = child.getName();
            
            //checking if this child is an array 
            Boolean childIsArray = (nodeNameCount.get(nodeName) > 1);
            
            //if child is array, save the values as array, else as strings. 
            if(childIsArray) {  
                
                if(jsonResult.get(nodeName) == null){
                    jsonResult.put(nodeName, new List<Object>{ temp });
                    System.debug('MAP1'+nodeName+'_'+ new List<Object>{ temp });
                    
                }
                else{
                    List<Object> tempList = (List<Object>)jsonResult.get(nodeName);
                    tempList.add(temp);
                    jsonResult.put(nodeName, tempList);
                    System.debug('MAP2'+nodeName+'_'+ tempList);
                }
                
            }
            else{
                jsonResult.put(nodeName, temp);
                System.debug('MAP3'+nodeName+'_'+ temp);
            }
        }
        
        //result map for current node
        system.debug('jsonResult><>>>>>>'+jsonResult);
        
        
        return jsonResult;
        
    }
    public static void LoginUrl(Map<String, Object> jsonResult){
        
        string valueFromDeserliz=  JSON.serialize(jsonResult);
        system.debug('valueFromDeserliz><>>>>>>'+valueFromDeserliz);
        
        valueFromDeserliz =valueFromDeserliz.replaceAll('From','From1');
        system.debug('valueFromDeserliz><>>>>>>'+valueFromDeserliz);
        WrapperClass cxmlRequest = (WrapperClass) JSON.deserialize(valueFromDeserliz, WrapperClass.class);
        system.debug('cxmlRequest><>>>>>>'+cxmlRequest.cXML.Request.OrderRequest.ItemOut[0].ItemID.supplierPartID);
        
        Base_Order__c base=new Base_Order__c();
        base.SupplierParty_Name__c=cxmlRequest.cXML.Request.OrderRequest.ItemOut[0].ItemID.supplierPartID;
        system.debug('cxmlRequest><>>>>>>'+base);
        
        /* string valueFromDeserliz2=  JSON.serialize(cxmlRequest);
Http http = new Http();
HttpRequest request = new HttpRequest();
request.setEndpoint('https://webhook.site/b1165467-0b4d-4098-8649-6c591d3c7212');
request.setMethod('POST');
request.setHeader('Content-Type', 'application/Xml');
request.setBody(valueFromDeserliz2);
HttpResponse response = http.send(request);*/
        
    }
    
    
    public class WrapperClass {
        public cXML cXML;
    }
    
    public class cXML {
        public Header Header;
        public Request Request;
    }
    public class Header {
        public From1 from1;
        public To to;
        public Sender sender;
    }
    
    public class From1 {
        public Credential credential;
    }
    
    public class To {
        public Credential credential;
    }
    
    public class Sender {
        public Credential credential;
        public String userAgent;
    }
    
    public class Credential {
        public String domain;
        public String identity;
        public String sharedSecret; // Only in Sender
    }
    
    public class Request {
        public OrderRequest orderRequest;
    }
    
    public class OrderRequest {
        public OrderRequestHeader orderRequestHeader;
        public List<ItemOut> itemOut;
    }
    
    public class OrderRequestHeader {
        public String orderID;
        public String orderDate;
        public String type;
        public Total total;
        public ShipTo shipTo;
        public BillTo billTo;
    }
    
    public class Total {
        public Decimal money;
    }
    
    public class Money {
        //public String currencyv;
        public Decimal Money;
    }
    
    public class ShipTo {
        public Address address;
    }
    
    public class BillTo {
        public Address address;
    }
    
    public class Address {
        public String isoCountryCode;
        public String addressID;
        public String name;
        public PostalAddress postalAddress;
        public String email;
        public Phone phone;
        public Fax fax;
        public String url;
    }
    
    public class PostalAddress {
        public String name;
        public String street;
        public String city;
        public String state;
        public String postalCode;
        public string country;
    }
    
    public class Country {
        public String isoCountryCode;
        public String value;
    }
    
    public class Email {
        public String name;
        public String value;
    }
    
    public class Phone {
        public TelephoneNumber telephoneNumber;
    }
    
    public class TelephoneNumber {
        public string countryCode;
        public String areaOrCityCode;
        public String numberV;
    }
    
    public class CountryCode {
        public String isoCountryCode;
        public String value;
    }
    
    public class Fax {
        public TelephoneNumber telephoneNumber;
    }
    
    public class URL {
        public String name;
        public String value;
    }
    
    public class ItemOut {
        // public String quantity;
        public ItemID itemID;
        public ItemDetail itemDetail;
        public Distribution distribution;
    }
    
    public class ItemID {
        public String supplierPartID;
        public String supplierPartAuxiliaryID;
    }
    
    public class ItemDetail {
        public UnitPrice unitPrice;
        public String unitOfMeasure;
        public string classification;
        public String manufacturerName;
        public string url;
        public list<string> extrinsic;
    }
    
    public class UnitPrice {
        public  Decimal money;
    }
    
    public class Classification {
        public String domain;
    }
    
    public class Extrinsic {
        public String name;
        public String value;
    }
    
    public class Distribution {
        public Accounting accounting;
        public Charge charge;
    }
    
    public class Accounting {
        public Segment costCenter;
        public Segment account;
    }
    
    public class Segment {
        public String type;
        public String id;
        public String description;
    }
    
    public class Charge {
        public Decimal money;
    }

    
    
}