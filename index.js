const csv = require('csv-parser');
const fs = require('fs')
var builder = require('xmlbuilder');
const  metaDataTypeName ='ugz_ParametrizacaoAtribuicaoFila';
const dataBaseFile ='MecardoNucleFila3.csv';
 
  fs.createReadStream(dataBaseFile)
  .pipe(csv())
  .on('data', (row) => { 


    var root = builder.create('root')
       .ele('CustomMetadata', {'xmlns':'http://soap.sforce.com/2006/04/metadata', 'xmlns:xsi':'http://www.w3.org/2001/XMLSchema-instance', 'xmlns:xsd':'http://www.w3.org/2001/XMLSchema'})
    
      var label = root.ele('label',row.Label);
      var protected = root.ele('protected','false');

       var itemValue1 = root.ele('values')
       itemValue1.ele('field', 'ugz_txt_Fila__c');
       itemValue1.ele('value',  {'xsi:type':'xsd:string'}, row.ugz_txt_Fila__c);

       var itemValue2 = root.ele('values')
       itemValue2.ele('field', 'ugz_txt_Mercado__c');
       itemValue2.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_Mercado__c);

       var itemValue3 = root.ele('values')
       itemValue3.ele('field', 'ugz_txt_Nucleo__c');
       itemValue3.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_Nucleo__c);

       /*var itemValue4 = root.ele('values')
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

       var itemValue9 = root.ele('values')
       itemValue9.ele('field', 'ugz_txt_MercadoEmpresarial__c');
       itemValue9.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_MercadoEmpresarial__c  =='NA'? '': row.ugz_txt_MercadoEmpresarial__c) ;

       var itemValue10 = root.ele('values')
       itemValue10.ele('field', 'ugz_txt_MercadoRevenda__c');
       itemValue10.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_MercadoRevenda__c =='NA'? '': row.ugz_txt_MercadoRevenda__c);

       var itemValue11= root.ele('values')
       itemValue11.ele('field', 'ugz_txt_MercadoIndustrial__c');
       itemValue11.ele('value', {'xsi:type':'xsd:string'}, row.ugz_txt_MercadoIndustrial__c  =='NA'? '': row.ugz_txt_MercadoIndustrial__c );

*/

       var xml  = root.end({ pretty: true});

      xml = xml.replace('<root>','');
      xml = xml.replace('</root>','');

   console.log(xml);
var filePahtName =`Files/${metaDataTypeName}.X${row.Label}.md-meta.xml`;


   fs.writeFile(filePahtName, xml, function (err) {
    if (err) return console.log(err);
   // console.log('Hello World > helloworld.txt');
  });

  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  }); 