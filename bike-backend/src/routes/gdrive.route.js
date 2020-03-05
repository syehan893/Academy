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

const drive = [{

    method: 'POST',
    path: '/drive/{id?}',
    handler: async (request, h) => {
        const findOne = await userService.findOne(request.params.id);
        let id = findOne.id;
        let name = findOne.name;
        const auth = await authorize();
        const drive = google.drive({version: 'v3', auth});
        var fileMetadata = {
            'name': `document-${id}-${name}.pdf`
          };
        
          var media = {
            mimeType: 'text/pdf',
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
              console.log('File Id: ', file.id);
            }
          });
          return null;
    }

}]

export default drive;