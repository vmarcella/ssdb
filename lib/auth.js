const { google } = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const { promisify } = require('util');
const log = require('./log');

// Create an interface for any users to obtain auth tokens
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Promisified functions (because callbacks are lame)
const readFile = promisify(fs.readFile);

/**
 * @name getRefreshToken
 */
const getRefreshToken = (authClient, tokenPath) => {
  // Generate the auth url for getting permissions to use the app from
  // the user.
  const authUrl = authClient.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  log.info(`Visit this url: ${authUrl}`);

  // Prompt the user
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    authClient.getToken(code, (err, token) => {
      if (err) {
        return log.error('Error while trying to retrieve access token', err);
      }
      authClient.setCredentials(token);

      // Store the token to disk for later program executions
      fs.writeFile(tokenPath, JSON.stringify(token), (err) => {
        if (err) return log.error(err);
        log.info('Token stored to', tokenPath);
      });
    });
  });
};

const authorize = async (credentialPath, tokenPath = '') => {
  let authClient;
  try {
    const credentialsJSON = await readFile(credentialPath);
    const credentials = await JSON.parse(credentialsJSON);
    // eslint-disable-next-line
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
