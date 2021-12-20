const csv = require('csv-parser');
const fs = require('fs')
var builder = require('xmlbuilder');
 
  fs.createReadStream('BaseDadoV2.csv')
  .pipe(csv())
  .on('data', (row) => { 


    var root = builder.create('root')
       .ele('CustomMetadata', {'xmlns':'http://soap.sforce.com/2006/04/metadata', 'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance', 'xmlns:xsd':'http://www.w3.org/2001/XMLSchema'})
    
      var label = root.ele('label',row.Label);
      var protected = root.ele('protected','false');

       var itemValue1 = root.ele('values')
       itemValue1.ele('field', 'ugz_txt_FilaNucleoEmpresarial__c');
       itemValue1.ele('value',  {'xsi:type':'xsd:string'}, row.ugz_txt_FilaNucleoEmpresarial__c);

       var itemValue2 = root.ele('values')
       itemValue2.ele('field', 'ugz_txt_FilaNucleoIndustrialEnvasado__c');
       itemValue2.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_FilaNucleoIndustrialEnvasado__c);

       var itemValue3 = root.ele('values')
       itemValue3.ele('field', 'ugz_txt_FilaNucleoRevenda__c');
       itemValue3.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_FilaNucleoRevenda__c);

       var itemValue4 = root.ele('values')
       itemValue4.ele('field', 'ugz_txt_MunicipioSemAcento__c');
       itemValue4.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_MunicipioSemAcento__c);

       var itemValue5 = root.ele('values')
       itemValue5.ele('field', 'ugz_txt_Municipio__c');
       itemValue5.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_Municipio__c);

       var itemValue6 = root.ele('values')
       itemValue6.ele('field', 'ugz_txt_Uf__c');
       itemValue6.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_Uf__c);

       var itemValue7 = root.ele('values')
       itemValue7.ele('field', 'ugz_txt_UnidadeFederativaSemAcento__c');
       itemValue7.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_UnidadeFederativaSemAcento__c);


       var itemValue8 = root.ele('values')
       itemValue8.ele('field', 'ugz_txt_UnidadeFederativa__c');
       itemValue8.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_UnidadeFederativa__c);



       var xml  = root.end({ pretty: true});

      xml = xml.replace('<root>','');
      xml = xml.replace('</root>','');

   console.log(xml);
var filePahtName ='Files/ugz_ConfiguracoesParametrizacaoFila.X'+ row.Label +'.md-meta.xml';


   fs.writeFile(filePahtName, xml, function (err) {
    if (err) return console.log(err);
   // console.log('Hello World > helloworld.txt');
  });

  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  }); 