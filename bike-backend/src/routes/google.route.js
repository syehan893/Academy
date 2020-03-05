import UserService from '../services/user.service';

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

const documentID = "1mSNNpbPev_8JdJqf1WAwfyjTeX3XiLNn0_Y8gj23dtQ";

const doc = [{

    method: 'POST',
    path: '/doc/{id?}',
    handler: async (request, h) => {
        const findOne = await userService.findOne(request.params.id);
        let name = findOne.name;
        let saldo = findOne.saldo;
        const auth = await authorize();
        const docs = google.docs({
            version: "v1",
            auth
        });
        await docs.documents.batchUpdate({
            auth,
            documentId: documentID,
            requestBody: {
                requests: [
                    {
                        insertText: {
                            location: {
                                index: 1
                            },
                            text: `name : ${name}\nSaldo : ${saldo}\n`
                        }
                    }
                ]
            }
        });
        return h.response(docs);
    }
},

]

export default doc;