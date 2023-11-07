({
    onChange : function(component, event, helper) {
        var font=component.find('select').get('v.value');
        component.set("v.FontName",font);
        
    },
    doInit : function(component, event, helper) {
        // alert('ij');
    },
    size : function(component, event, helper) {
        //  var x =  document.getElementById('quantity').value;
        var x=component.find('Size').get('v.value');
        //alert(x);
        component.set("v.Fsize",x);
    },
    align : function(component, event, helper) {
        var font=component.find('align').get('v.value');
        component.set("v.align",font);
    },
    Width : function(component, event, helper) {
        var x=component.find('Width').get('v.value');
        //alert(x);
        component.set("v.FWidth",x);
        
    },
    getValueFromApplicationEvent : function(component, event, helper) {
        var ShowResultValue = event.getParam('Imge');
        console.log('ShowResultValue ::' +ShowResultValue);
       // alert(ShowResultValue);
        // set the handler attributes based on event data
        component.set("v.img", ShowResultValue);
    },
    CreateLogo: function(component, event, helper) {
        let region = document.getElementById("Print"); // whole screen
         console.log('region  '+region);
        html2canvas(region, {
            logging : true, useCORS : true,  allowTaint : false, onrendered: function(canvas) {
                
                
                let pngUrl = canvas.toDataURL('image/jpeg');
                pngUrl =pngUrl.replace(/^data:image\/(png|jpg);base64,/,"") ;
                //console.log(pngUrl);
                
                
               /*  var action = component.get("c.updateSalesOrderForLogoPDF");
        action.setParams({ 
            "pngUrl": pngUrl,
           });
        action.setCallback(this, function(response){

        } */
                
               // component.set("v.Logo",pngUrl);
                component.set("v.ShowLogo",true);
                // component.set("v.img1",pngUrl);
                let LogoEvent = component.getEvent("loadMyEvent"); 
                LogoEvent.setParams({"LogoGeneratorURL" : component.get("v.Logo")}); 
                LogoEvent.fire(); 
            },
        });
    },
    closeModel: function(component, event, helper) {
        component.set("v.ShowLogo",false);
        
    },
    temp : function(component, event, helper) {
        var x=component.find('Temp').get('v.value');
        // alert(x);
        if(x==1){
            component.set("v.ImgDev",true);
            component.set("v.Dev",false);
        }else{
            component.set("v.ImgDev",false);
            component.set("v.Dev",true);
        }
        //component.set("v.Temp",x);
        
    },
    download : function(component, event, helper) {
        
        var a = document.createElement("a"); //Create <a>
        a.href = component.get("v.Logo"); //Image Base64 Goes here
        
        a.download = "Image1"; //File name Here
        a.click(); //Downloaded file  
        component.set("v.ShowLogo",false);
    },
    attach : function(component, event, helper) {
        var img = component.get("v.Logo");
        var base64result = img.split(',')[1];
        //alert(base64result);
        //alert(base64result);
        var action=component.get("c.Addattachment");
        action.setParams({
            img: base64result
            
        });
        action.setCallback(this,function(response){
            var state=response.getState();
            
            console.log('status:'+  state); 
            //alert(state);
            if(state==='SUCCESS'){
                helper.showSuccess();
            }else{
                helper.showError();
            }
            component.set("v.ShowLogo",false);
        });
        $A.enqueueAction(action);
        
    }
})