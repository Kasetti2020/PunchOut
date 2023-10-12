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
        
        valueFromDeserliz =valueFromDeserliz.replaceAll('From','From1');
        WrapperClass cxmlRequest = (WrapperClass) JSON.deserialize(valueFromDeserliz, WrapperClass.class);
       system.debug('cxmlRequest><>>>>>>'+cxmlRequest);
        
    }
    
    
    public class WrapperClass {
        public cXML cXML;
    }
    
    public class cXML {
      
        public Header header;
        public Request request;
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
    
    public class Credential {
        public String SharedSecret;
        public String identity;
    }
    
    public class Sender {
        public Credential credential;
        public String userAgent;
    }
    
    public class Request {
        public String deploymentMode;
        public PunchOutSetupRequest punchOutSetupRequest;
    }
    
    public class PunchOutSetupRequest {
        public String operation;
        public String buyerCookie;
        public List<Extrinsic> extrinsics;
        public BrowserFormPost browserFormPost;
        public ShipTo shipTo;
    }
    
    public class Extrinsic {
        public String name;
        public String value;
    }
    
    public class BrowserFormPost {
        public String URL;
    }
    
    public class ShipTo {
        public Address address;
    }
    
    public class Address {
        public String addressID;
        public Name name;
        public PostalAddress postalAddress;
    }
    
    public class Name {
        public String lang;
        public String value;
    }
    
    public class PostalAddress {
        public String street;
        public String city;
        public String state;
        public String postalCode;
        public Country country;
    }
    
    public class Country {
        public String isoCountryCode;
    }
    
    
    /*
* 
* 
* 
*   /* Map<String, Object>  cXML = (Map<String, Object>) jsonResult.get('cXML');
Map<String, Object>  request = (Map<String, Object>) cXML.get('Request');
Map<String, Object>  punchOutSetupRequest = (Map<String, Object>) request.get('PunchOutSetupRequest');
Map<String, Object>  browserFormPost = (Map<String, Object>) punchOutSetupRequest.get('BrowserFormPost');
Object  url=browserFormPost.get('URL');
String  valueFrom = JSON.serialize(jsonResult);
system.debug('Object><>>>>>>'+url);
// system.debug('Object><>>>>>>'+url); list<JsonXml> xmlList=new list<JsonXml>();
JsonXml xml=new JsonXml ();
Header headerVal=new Header();
Map<String, Object>  cXML = (Map<String, Object>) jsonResult.get('cXML');
Object  identityFrom1=cXML.get('Header');
system.debug('identityFrom1><>>>>>>'+identityFrom1);
Map<String, Object>  Header = (Map<String, Object>) cXML.get('Header');
////We are getting Value From (From Node)

fromNode FromV=new fromNode();
credentialForm cre=new credentialForm();
Map<String, Object>  FromValue = (Map<String, Object>) Header.get('From');
Map<String, Object>  CredentialFrom = (Map<String, Object>) FromValue.get('Credential');
Object  identityFrom=CredentialFrom.get('Identity');
cre.identityFrom=String.ValueOf(identityFrom);
FromV.CredentialForm=cre;
headerVal.fromNode=FromV;


/////getting Value From To Node
TONode toNod=new ToNode();
credentialTo creTo=new credentialTo();
Map<String, Object>  ToValue = (Map<String, Object>) Header.get('To');
Map<String, Object>  CredentialTo = (Map<String, Object>) FromValue.get('Credential');
Object  identityTo=CredentialTo.get('Identity');
creTo.identityTo=String.ValueOf(identityTo);
toNod.credentialTo=creTo;
headerVal.toNode=toNod;

/////Getting Value From Sender Node
SenderNode toSender=new SenderNode();
credentialSender creSender=new credentialSender();
Map<String, Object>  SenderValue = (Map<String, Object>) Header.get('Sender');
Map<String, Object>  CredentialSender = (Map<String, Object>) SenderValue.get('Credential');
Object  identitySender=CredentialSender.get('Identity');
Object  sharedSecretSender=CredentialSender.get('SharedSecret');
creSender.identitySender=String.ValueOf(identitySender);
creSender.sharedSecretSender=String.ValueOf(sharedSecretSender);
toSender.credentialSender=creSender;
headerVal.senderNode=toSender;
xml.header=headerVal;

/// getting Value From Request Node
Request rqt =new Request();
OrderRequest ordRequest =new OrderRequest();
OrderRequestHeader odrRequestHeader =new OrderRequestHeader();
Total tol=new Total();
Map<String, Object>  request = (Map<String, Object>) cXML.get('Request');
Map<String, Object>  orderRequest = (Map<String, Object>) request.get('OrderRequest');
Map<String, Object>  OrderRequestHeader = (Map<String, Object>) orderRequest.get('OrderRequestHeader');
system.debug('OrderRequestHeader><>>>>>>'+OrderRequestHeader);
Map<String, Object>  Total = (Map<String, Object>) OrderRequestHeader.get('Total');
Object   money=Total.get('Money');
tol.money=string.valueOf(money);
odrRequestHeader.Total=tol;
ordRequest.orderRequestHeader=odrRequestHeader;
rqt.orderRequest=ordRequest;
system.debug('Money><>>>>>>'+money);
///getting value from ShipTo
ShipTo ship=new ShipTo();
Address add=new Address();
Map<String, Object>  shipTo = (Map<String, Object>) OrderRequestHeader.get('ShipTo');
Map<String, Object>  shipToAddress = (Map<String, Object>) shipTo.get('Address');
Object email=shipToAddress.get('Email');
Object name=shipToAddress.get('Name');
Object url=shipToAddress.get('URL');
add.email=string.valueOf(email);
add.name=string.valueOf(name);
add.url=string.valueOf(url);

//getting PostalAddress
PostalAddress post=new PostalAddress();
Map<String, Object>  postalAddress = (Map<String, Object>) shipTo.get('PostalAddress');
Object deliverTo=postalAddress.get('DeliverTo');
Object street=postalAddress.get('Street');
Object city=postalAddress.get('City');
Object state=postalAddress.get('State');
Object postalCode=postalAddress.get('PostalCode');
Object country=postalAddress.get('Country');

//post.deliverTo=string.valueOf(deliverTo);
post.street=string.valueOf(street);
post.state=string.valueOf(state);
post.city=string.valueOf(city);
post.postalCode=string.valueOf(postalCode);
post.country=string.valueOf(country);
add.postalAddress=post;


///getting Phone
Phone phn=new Phone();
TelephoneNumberPhn tele=new TelephoneNumberPhn();
Map<String, Object>  phone = (Map<String, Object>) shipTo.get('Phone');
Map<String, Object>  telephoneNum = (Map<String, Object>) phone.get('TelephoneNumber');
Object countryCode=telephoneNum.get('CountryCode');
Object areaOrCityCode=telephoneNum.get('AreaOrCityCode');
Object num=telephoneNum.get('Number');
tele.countryCode=string.valueOf(countryCode);
tele.areaOrCityCode=string.valueOf(areaOrCityCode);
tele.num=Integer.valueOf(num);
phn.telephoneNumberPhn=tele;
add.phone=phn;

// getting Fax 
Fax fa=new Fax();
TelephoneNumberFax teleFax=new TelephoneNumberFax();
Map<String, Object>  fax = (Map<String, Object>) shipTo.get('Fax');
Map<String, Object>  telephoneteleFax = (Map<String, Object>) fax.get('TelephoneNumber');
Object countryCodeFax=telephoneteleFax.get('CountryCode');
Object areaOrCityCodeFax=telephoneteleFax.get('AreaOrCityCode');
Object numFax=telephoneteleFax.get('Number');
teleFax.countryCode=string.valueOf(countryCodeFax);
teleFax.areaOrCityCode=string.valueOf(areaOrCityCodeFax);
teleFax.num=Integer.valueOf(numFax);
fa.telephoneNumberFax=teleFax;
add.fax=fa;


ship.Address=add;

/* ///billTO
BillTo bill=new BillTo();
Address adds=new Address();
Map<String, Object>  billTo = (Map<String, Object>) OrderRequestHeader.get('BillTo');
Map<String, Object>  billToToAddress = (Map<String, Object>) billTo.get('Address');
Object emails=billToToAddress.get('Email');
Object names=billToToAddress.get('Name');
Object urls=billToToAddress.get('URL');
adds.email=string.valueOf(emails);
adds.name=string.valueOf(names);
adds.url=string.valueOf(urls);

//getting PostalAddress
PostalAddress posts=new PostalAddress();
Map<String, Object>  postalAddressBill = (Map<String, Object>) billTo.get('PostalAddress');
Object deliverTos=postalAddressBill.get('DeliverTo');
Object streets=postalAddressBill.get('Street');
Object citys=postalAddressBill.get('City');
Object states=postalAddressBill.get('State');
Object postalCodes=postalAddressBill.get('PostalCode');
Object countrys=postalAddressBill.get('Country');

//post.deliverTo=string.valueOf(deliverTo);
post.street=string.valueOf(streets);
post.state=string.valueOf(states);
post.city=string.valueOf(citys);
post.postalCode=string.valueOf(postalCodes);
post.country=string.valueOf(countrys);
adds.postalAddress=post;


///getting Phone
Phone phnBill=new Phone();
TelephoneNumberPhn tele=new TelephoneNumberPhn();
Map<String, Object>  phonebillTo = (Map<String, Object>) billTo.get('Phone');
Map<String, Object>  telephoneNumphnBill = (Map<String, Object>) phonebillTo.get('TelephoneNumber');
Object countryCodes=telephoneNumphnBill.get('CountryCode');
Object areaOrCityCodes=telephoneNumphnBill.get('AreaOrCityCode');
Object nums=telephoneNumphnBill.get('Number');
tele.countryCode=string.valueOf(countryCode);
tele.areaOrCityCode=string.valueOf(areaOrCityCode);
tele.num=Integer.valueOf(num);
phn.telephoneNumberPhn=tele;
add.phone=phn;

// getting Fax 
Fax fa=new Fax();
TelephoneNumberFax teleFax=new TelephoneNumberFax();
Map<String, Object>  fax = (Map<String, Object>) shipTo.get('Fax');
Map<String, Object>  telephoneteleFax = (Map<String, Object>) fax.get('TelephoneNumber');
Object countryCodeFax=telephoneteleFax.get('CountryCode');
Object areaOrCityCodeFax=telephoneteleFax.get('AreaOrCityCode');
Object numFax=telephoneteleFax.get('Number');
teleFax.countryCode=string.valueOf(countryCodeFax);
teleFax.areaOrCityCode=string.valueOf(areaOrCityCodeFax);
teleFax.num=Integer.valueOf(numFax);
fa.telephoneNumberFax=teleFax;
add.fax=fa;


ship.Address=add;
odrRequestHeader.shipTo=ship;
ordRequest.orderRequestHeader=odrRequestHeader;
rqt.orderRequest=ordRequest;


system.debug('Email><>>>>>>'+Email);
Map<String, Object>  billTo = (Map<String, Object>) OrderRequestHeader.get('BillTo');
Object billToAddress=billTo.get('Address');
system.debug('billToAddress><>>>>>>'+billToAddress);
xml.request=rqt;
xmlList.Add(xml);
system.debug('xmlList><>>>>>>'+xmlList);

}


public class JsonXml{
@AuraEnabled
public Header header;
@AuraEnabled
public Request request;
}  
///Header WrappperClass
public class Header{
@AuraEnabled
public From1 from1;
@AuraEnabled
public To to;
@AuraEnabled
public SenderNode senderNode; 
}    
public class From1{
@AuraEnabled
public CredentialForm credentialForm;
}
public class CredentialForm{
@AuraEnabled
public string  identityFrom;
}
public class To{
@AuraEnabled
public Credential credentialTo;
}
public class Credential{
@AuraEnabled
public string  identity;
}
public class SenderNode{
@AuraEnabled
public CredentialSender credentialSender;
}
public class CredentialSender{
@AuraEnabled
public string  identitySender;
@AuraEnabled
public String sharedSecretSender;
}

//Request Wrapper Class
public class Request{
@AuraEnabled
public OrderRequest orderRequest;
}
public class OrderRequest{
@AuraEnabled
public OrderRequestHeader orderRequestHeader;  
}
public class OrderRequestHeader{
@AuraEnabled
public Total total;  
@AuraEnabled
public ShipTo shipTo; 
@AuraEnabled
public BillTo billTo;
}
public class Total{
@AuraEnabled
public string Money;  
}
public class ShipTo{
@AuraEnabled
public Address Address;  
}
public class BillTo{
@AuraEnabled
public Address Address;  
}
public class Address{
@AuraEnabled
public string name; 
@AuraEnabled
public string email; 
@AuraEnabled
public string url; 
@AuraEnabled
public PostalAddress postalAddress;
@AuraEnabled
public Phone phone;
@AuraEnabled
public Fax fax;
}
public class PostalAddress{
@AuraEnabled
public list<string> deliverTo;
@AuraEnabled
public string street; 
@AuraEnabled
public string city;
@AuraEnabled
public string state;
@AuraEnabled
public string postalCode;
@AuraEnabled
public string country;
}
public class Phone{
@AuraEnabled
public TelephoneNumberPhn TelephoneNumberPhn;

}
public class TelephoneNumberPhn{
@AuraEnabled
public string countryCode; 
@AuraEnabled
public string areaOrCityCode;
@AuraEnabled
public Integer num;


}
public class Fax{
@AuraEnabled
public TelephoneNumberFax TelephoneNumberFax;

}
public class TelephoneNumberFax{
@AuraEnabled
public string countryCode; 
@AuraEnabled
public string areaOrCityCode;
@AuraEnabled
public Integer num;


}*/
    
    
    
}