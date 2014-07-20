
var casper = require('casper').create();
var x = require('casper').selectXPath;
var server = require('webserver').create();
var utils = require('utils');
var fs = require('fs');
var start_url = 'http://www.zaragoza.es/ciudad/cementerios/torrero/';
casper.userAgent('Mozilla/4.0 (compatoble; MSIE 6.0; Windows NT 5.1)');
var links = [];
//var enterramientos [];
var port = require('system').env.PORT || 8080;
//var ip_server = '127.0.0.1:8585';
var server= server.listen(port, function(request,response){

casper.start(start_url);
casper.thenEvaluate(function(e) {
   var a= document.querySelectorAll('a');
    return a;
 });
 
casper.then(function() {
    // Click on 1st result link
    this.click('html body div.visib div#menu ul li ul li:nth-child(4n) a');
});
casper.then(function() {
    console.log('clicked ok, new location is ' + this.getCurrentUrl());
});

casper.then(function () {
        this.sendKeys('#sape1','de-la pascua');
        //this.sendKeys('#sape2','');

        console.log('Buscando a Perez antoran');
});
        
casper.thenClick(x('//*[@id="formularioMapaTotem:buscar"]'),function(){
            console.log('Le doy al boton buscar');
            });

function getLinks() {
   // var links = document.querySelectorAll('table tbody tr');
   var links= document.getElementById('formularioMapaTotem:resultsTable:tbody_element').querySelectorAll('tr');
   // return Array.prototype.map.call(links, function(e) {
   // return e.getElementsByTagName('tr');
    //});
return links;
}   

casper.wait(500,function(){
      links = this.evaluate(getLinks);
    console.log(links.length+"he encontrado");
         for(var i=1; i<=links.length;i++){      
             var muertos = {};
                muertos.ape1= casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[5]')); 
                muertos.ape2= casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[6]')); 
                muertos.nom= casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[7]'));
                muertos.man=  casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[1]'));
                muertos.fil=  casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[3]'));    
                muertos.num=  casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[4]')); 
                muertos.fechadef = casper.fetchText(x(' /html/body/form/div[1]/fieldset/div[3]/div/table/tbody/tr['+i+']/td[9]'));
                response.write(JSON.stringify(muertos));
             var json =JSON.stringify(muertos);
     fs.write('./myFile.json', json, 'a');
        // var muertos = '{' + '"nombre":'+nom+',"apellido1":'+ape1+',"apellido2":'+ape2+'}',
        //console.log("Nombre:"+nom+" Apellidos:"+ape1+ape2+" Manzana:"+man+" Fila:"+fil+" Numero:"+num+" Fecha def:"+fechadef);
        // console.log(muertos);
        //console.log(JSON.stringify(enterramientos[]));
        //response.write("Nombre:"+nom+" Apellidos:"+ape1+ape2+" Manzana:"+man+" Fila:"+fil+" Numero:"+num+" Fecha def:"+fechadef); 
            
       }
    
            });



    casper.run(function() {
  //  this.exit();
    });

});
console.log('Server running at http://localhost:' + ip_server+'/');