const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
// Most of this function was taken from the google starter code
// Need to do an async/await refactor
const getRefreshToken = (authClient, tokenPath) => {
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
      fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', tokenPath);
      });
    });
  });
};

const authorize = async (credentialPath, tokenPath = '') => {
  let authClient;
  try {
    console.log(`${credentialPath}`);
    const credentialsJSON = await readFile(credentialPath);
    console.log(credentialsJSON);
    const credentials = await JSON.parse(credentialsJSON);
    const { client_id, client_secret, redirect_uris } = credentials.installed;

    // Setup the auth client
    authClient = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0],
    );

    // Setup the access and refresh token
    const tokenJSON = await readFile(tokenPath);
    const token = JSON.parse(tokenJSON);
    authClient.setCredentials(token);
    return authClient;
  } catch (err) {
    console.error(err);
    getRefreshToken(authClient, tokenPath);
    return authClient;
  }
};

// Setup sheets.
const setupSheetsV4 = (authClient) => google.sheets({ version: 'v4', authClient });

module.exports = {
  setupSheetsV4,
  getRefreshToken,
  authorize,
};
