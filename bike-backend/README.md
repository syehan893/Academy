# Create & Update Contract With Google API (Docs & Drive)

[![N|Solid](http://phptricks.co.uk/wp-content/uploads/2016/11/api-google-destacado-compressor.png)](https://console.developers.google.com/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://github.com/syehan893/Academy/tree/backend/bike-backend)

## Documentation
APIs (Application Programming Interfaces) are software programs that give developers access to computing resources and data.

### Feature
* See, edit, create, and delete all of your Google Drive files
* Create and write PDF file
* Upload file to Google Drive
* See, edit, and delete Google Doc

### Installation

Install the dependencies and devDependencies and start the server.

```sh
mkdir grocery-adder && cd grocery-adder
yarn init -y
git init
touch .gitignore
npm install googleapis --save
npm install pdfkit --save
mkdir src && touch src/index.js
```

### Plugins

| Plugin | Link |
| ------ | ------ |
| PDFKit | https://pdfkit.org/|
| Google Docs | https://developers.google.com/docs/api|
| Google Drive | https://developers.google.com/drive|

## QuickStart
* Goole Docs API
* Merge Text Google Docs API
* Generate & Manage PDF
* Google Drive API

### Google Doc API with Node js

1) Go to https://console.developers.google.com/apis/library/docs.googleapis.com
2) Click Enable
3) Go to https://developers.google.com/gmail/api/quickstart/nodejs
4) Enable The Gmail API 
5) Download client configuration and save credential in your root project
6) Paste the following code into src/index.js
```javascript
const fs = require("fs");
const readline = require("readline");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
fs.readFile("credentials.json", (err, content) => {
  if (err) return console.log("Error loading client secret file:", err);
  // Authorize a client with credentials, then call the Gmail API.
  authorize(JSON.parse(content), () => console.log("authorized!"));
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES
  });
  console.log("Authorize this app by visiting this url:", authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  rl.question("Enter the code from that page here: ", code => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), error => {
        if (error) return console.error(error);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}
```
7) Watch for scopes used (List Scopes : https://developers.google.com/identity/protocols/googlescopes)
8) node src/index.js
9) Follow link on the terminal
10) Copy the token and enter on your terminal
11) In your root project you get token.json
12) Run node src/index.js and you'll see that authorized! is printed on the terminal
13) Now you can delete a lot of that setup code and write to your google doc!\

```javascript
const { google } = require("googleapis");
const token = require("../token.json");
const credentials = require("../credentials.json");

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

async function main(YOUR_DOCUMENT_ID) {
    const auth = await authorize();
    const docs = google.docs({
      version: "v1",
      auth
    });
    await docs.documents.batchUpdate({
      auth,
      documentId: YOUR_DOCUMENT_ID,
      requestBody: {
        requests: [
          {
            insertText: {
              location: {
                index: 1
              },
              text: "hello!\n"
            }
          }
        ]
      }
    });
}

main("YOUR_DOCUMENT_ID");
```
14) Replace "YOUR_DOCUMENT_ID" with your document id and run it!
15) To see the document id go to https://docs.new in your browser, and that will create a new google doc.
16) Note the id of the doc. It's between d/ and /edit in the url. (example : 12mUisI-QKE2f3fPqLO4uq2UrbSAvZA-SNeThRavjoMU)
17) Now, if you go to your new google doc, you'll see hello! printed there! If you keep running this, hello! will continue getting added.

### Merge Text (Google Doc API)

 ![merge-text](https://developers.google.com/docs/api/images/MergeTextDrawing.jpg) 
1) For each element that you'll be inserting, replace the dummy content with a tag. Be sure to use strings that are unlikely to occur normally. For example, {{name}} might be a good tag.

2) To perform this merge, you can use the code shown below.

```javascript
  let customerName = 'Alice';
  let date = yyyymmdd()
  let requests = [
    {
      replaceAllText: {
        containsText: {
          text: '{{customer-name}}',
          matchCase: true,
        },
        replaceText: customerName,
      },
    },
    {
      replaceAllText: {
        containsText: {
          text: '{{date}}',
          matchCase: true,
        },
        replaceText: date,
      },
    },
  ];

  google.options({auth: auth});
  google
      .discoverAPI(
          'https://docs.googleapis.com/$discovery/rest?version=v1&key={YOUR_API_KEY}')
      .then(function(docs) {
        docs.documents.batchUpdate(
            {
              documentId: '1yBx6HSnu_gbV2sk1nChJOFo_g3AizBhr-PpkyKAwcTg',
              resource: {
                requests,
              },
            },
            (err, {data}) => {
              if (err) return console.log('The API returned an error: ' + err);
              console.log(data);
            });
      });

```
3) "YOUR_API_KEY", you can create your API KEY https://console.developers.google.com/ -> Kredensial -> Create Kredensial -> API KEY

### Generate PDF with Node js

1) Install PDFKit
    > npm install pdfkit
2) Create file sample.js in src folder
3) Paste the followin code into src/sample.js
```javascript
var pdf = require('pdfkit');
var fs = require('fs');

var myDoc = new pdf;

myDoc.pipe(fs.createWriteStream("NAME_YOUR_PDF_FILE"));

myDoc.font('Times-Roman')
.fontSize(48)
.text('NodeJS PDF Document',100,100);

myDoc.end();
```
4) Change "NAME_YOUR_PDF_FILE" whatever you want
5) Run
    > node src/sample.js
    
### Google Drive API with Node js

NOTE : if you already to do this step, you can skip step 1 - 4

1) Go to https://developers.google.com/drive/api/v3/quickstart/nodejs
2) Click Enable The Drive API
3) Click Download Client Configuration
4) Save credential in your root project
5) create index.js in src folder and following the code
```javascript
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/drive'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Drive API.
  authorize(JSON.parse(content), listFiles);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the names and IDs of up to 10 files.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listFiles(auth) {
  const drive = google.drive({version: 'v3', auth});
  drive.files.list({
    pageSize: 10,
    fields: 'nextPageToken, files(id, name)',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const files = res.data.files;
    if (files.length) {
      console.log('Files:');
      files.map((file) => {
        console.log(`${file.name} (${file.id})`);
      });
    } else {
      console.log('No files found.');
    }
  });
}    
```
6) Run 
    > node src/index.js
7) Now you can see all files on your drive
8) To upload file (example : images) add function : 
```javascript
function uploadFile(auth) {
  const drive = google.drive({version: 'v3', auth});
  //name your file
  const fileMetadata = {
    'name': 'photo.jpg'
  };
  const media = {
    mimeType: 'image/jpeg',
    body: fs.createReadStream('PATH_YOUR_FILE/FILE.jpg')
  };
  drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id'
  }, (err, file) => {
    if (err) {
      // Handle error
      console.error(err);
    } else {
      console.log('File Id: ', file.id);
    }
  });
}
```

## Example Project

[Hapi-js](https://github.com/syehan893/Academy/tree/backend/bike-backend) : A simple project Rest-API with Google API (Docs & Drive). 



