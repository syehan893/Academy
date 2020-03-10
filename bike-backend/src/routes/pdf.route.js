import { STATUS_CODES } from 'http';
import UserService from '../services/user.service';

const pdf = require('pdfkit');
const fs = require('fs');
const path = require('path')

const userService = new UserService();

const myPdfDoc = [{

  method: 'POST',
  path: '/pdf/{id?}',
  handler: async (request, h) => {
    const findOne = await userService.findOne(request.params.id);
    let id = findOne.id;
    let name = findOne.name;
    let saldo = findOne.saldo;
    const myDoc = new pdf;
    myDoc.pipe(fs.createWriteStream(`doc/document-${id}-${name}.pdf`));
    myDoc.font('Times-Roman')
          .fontSize(48)
          .text(`name : ${name}\nSaldo : ${saldo}\n`,100,100);
    myDoc.end();

    return STATUS_CODES;
  }
},
{
  method: 'POST',
  path: '/rpdf/{id?}',
  handler: async (request, h) => {
    const findOne = await userService.findOne(request.params.id);
    let id = findOne.id;
    let name = findOne.name;
    
    const sourceFile = `./doc/document-${id}-${name}.pdf`
    var query = `https://api.pdf.co/v1/pdf/edit/replace-text`;
    let reqOptions = {
      uri: query,
      fromData: {
        name: path.basename(sourceFile),
        file: fs.createReadStream(sourceFile),
        searchString: 'bambang',
        replaceString: 'santika'
      }
      
    };
  }
}

]
export default myPdfDoc;