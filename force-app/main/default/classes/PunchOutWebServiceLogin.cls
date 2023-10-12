@RestResource(urlMapping='/v1/PunchOutLogin/')
global class PunchOutWebServiceLogin {
    @HTTPPOST
    global static string doPost(){ 
        RestRequest request = RestContext.request;
        system.debug('RestContext.request.requestBody.toString())>'+RestContext.request.requestBody.toString());
        string xml=string.valueOf(RestContext.request.requestBody.toString());
     //fromJSON.parseCXML(xml);
    
       Map<String, Object> jsonResult =PunchOutWebServiceHandler.xmlToMap(xml);
        //system.debug('xmlData><>>>>>>'+jsonResult);
       // PunchOutWebServiceHandler.LoginUrl(jsonResult);
       PunchOutSetupRequestParser.parseXMl(jsonResult);
        return 'success';
    }
}