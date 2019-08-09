const { promisify } = require('util');
const { setupSheetsV4, authorize } = require('./auth');

let authClient;
let sheets;
let wrapper;

const setup = async (credentialsPath, tokenPath = '') => {
  try {
    authClient = await authorize(credentialsPath, tokenPath);
    sheets = setupSheetsV4(authClient);
    wrapper = {
      createSheet: promisify(sheets.spreadsheets.create.bind(sheets)),
    };
  } catch (err) {
    console.log(err);
  }
};

const createSheet = async (name) => {
  try {
    const sheet = await wrapper.createSheet({
      resource: {
        properties: {
          title: name,
        },
      },
      auth: authClient,
    });
    console.log(sheet);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  setup,
  createSheet,
};
