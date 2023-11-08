@RestResource(urlMapping='/v1/PunchOut/')
global class PunchOutWebService {
    @HTTPPOST
    global static string doPost(){ 
        RestRequest request = RestContext.request;
        //system.debug('RestContext.request.requestBody.toString())>'+RestContext.request.requestBody.toString());
        string xml=string.valueOf(RestContext.request.requestBody.toString());
        
        PunchOutLoginCXMLParse.parseCXML(xml);
        
        return 'success';
    }
}