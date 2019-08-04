const { google } = require('googleapis');
const { promisify } = require('util');
const readline = require('readline');
const fs = require('fs');
const credentials = require('../credentials.json');

const TOKEN_PATH = 'token.json';

const authorize = (credentials) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const authClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  return authClient;

  try {
    const token = require('../token.json')
  }
};

const setupSheetsV4 = (authClient) => google.sheets({ version: 'v4', authClient });

const getRefreshToken = (authClient) => {
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  console.log('Visit this url: ', authUrl);

  // Create an interface to enter the token
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Prompt the user
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    authClient.getToken(code, (err, token) => {
      if (err) {
        return console.error(
          'Error while trying to retrieve access token',
          err,
        );
      }
      authClient.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
    });
  });
};

const authClient = authorize(credentials);
const sheets = setupSheetsV4(authClient);

const wrapper = {
  createSheet: promisify(sheets.spreadsheets.create.bind(sheets)),
};

const createSheet = async (name) => {
  try {
    const sheet = await wrapper.createSheet({
      spreadSheetId: name,
      auth: authClient,
    });
    console.log(sheet);
  } catch (err) {
    console.error(err);
  }
};

getRefreshToken(authClient);

createSheet('NewSheet!!').then(() => console.log('here'));
