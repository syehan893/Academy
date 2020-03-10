import UserService from "../services/user.service";

const fs = require('fs');
const userService = new UserService();

const { google } = require("googleapis");
const token = require("../../token.json");
const credentials = require("../../credentials.json");

function authorize() {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

var a = null;

const drive = [{

  method: 'POST',
  path: '/drive/{id?}',
  handler: async (request, h) => {
    const findOne = await userService.findOne(request.params.id);
    let id = findOne.id;
    let name = findOne.name;
    const auth = await authorize();
    const drive = google.drive({ version: 'v3', auth });
    var fileMetadata = {
      'name': `document-${id}-${name}.pdf`
    };

    var media = {
      mimeType: 'text/docs',
      body: fs.createReadStream(`doc/document-${id}-${name}.pdf`)
    };
    drive.files.create({
      auth,
      resource: fileMetadata,
      media: media,
      fields: 'id'
    }, function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        a = file.data.id;
        console.log('File Id: ', a);
      }
    });
    return null;
  }

},
{
  method: 'GET',
  path: '/download/{id?}',
  handler: async (request, h) => {
    console.log(a);
    const findOne = await userService.findOne(request.params.id);
    let id = findOne.id;
    let name = findOne.name;
    let fileId = findOne.fileId;
    const auth = await authorize();
    const drive = google.drive({ version: 'v3', auth })
    var dest = fs.createWriteStream(`download/document-${id}-${name}.pdf`);
    drive.files.get({ fileId: fileId, fields: '*' }, (err, res) => {
      if (err) return console.log('The API returned error: ' + err);
      console.log(res.data);
    }).pipe(dest);
  }
}]

export default drive;