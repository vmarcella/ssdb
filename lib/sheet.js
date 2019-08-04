const { google } = require('googleapis');
const credentials = require('../credentials.json');

const authorize = (credentials) => {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const authClient = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0],
  );

  return authClient;
};

const setupSheetsV4 = (authClient) => google.sheets({ version: 'v4', authClient });
const authClient = authorize(credentials);
const sheets = setupSheetsV4(authClient);

const createSheet = (name) => {
  console.log(authClient);
  console.log(credentials);
  console.log(sheets);
};

createSheet();
