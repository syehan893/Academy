import UserService from '../services/user.service';

const userService = new UserService();

const { google } = require("googleapis");
const token = require("../../token.json");
const credential = require("../../credentials.json");

const documentID = "1mSNNpbPev_8JdJqf1WAwfyjTeX3XiLNn0_Y8gj23dtQ";

function authorize() {
  const { client_secret, client_id, redirect_uris } = credential.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

const mergeDoc = [{

  method: 'POST',
  path: '/merge/{id?}',
  handler: async (request, h) => {
    const findOne = await userService.findOne(request.params.id);
    let name = findOne.name;
    let username = findOne.username;
    let saldo = findOne.saldo;
    const auth = await authorize();
    const docs = google.docs({
      version: "v1",
      auth
    });
    let requests = [
      {
        replaceAllText: {
          containsText: {
            text: '{{name}}',
            matchCase: true,
          },
          replaceText: name,
        },
      },
      {
        replaceAllText: {
          containsText: {
            text: '{{username}}',
            matchCase: true,
          },
          replaceText: username,
        },
      },
      {
        replaceAllText: {
          containsText: {
            text: '{{saldo}}',
            matchCase: true,
          },
          replaceText: `${saldo}`,
        },
      },
    ];

    docs.documents.batchUpdate(
      {
        documentId: documentID,
        resource: {
          requests,
        },
      },
      (err, data) => {
        if (err) return console.log('The API returned an error: ' + err);
        console.log(data);
      });
    return h.response(docs);
  }
}]

export default mergeDoc;
