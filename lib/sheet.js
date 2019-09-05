const { promisify } = require('util');
const { setupSheetsV4, authorize } = require('./auth');
const log = require('./log');

let authClient;
let sheets;
let wrapper;

/**
 * @function
 * @desc Get the fields from a spreadsheet
 * @params {String} sheetID - The google spreadsheet ID
 * @return {Object} the field data
 */
const setup = async (credentialsPath, tokenPath = '') => {
  try {
    authClient = await authorize(credentialsPath, tokenPath);
    sheets = setupSheetsV4(authClient);
    wrapper = {
      createSheet: promisify(sheets.spreadsheets.create.bind(sheets)),
      getSheet: promisify(sheets.spreadsheets.get.bind(sheets)),
      getFields: promisify(sheets.spreadsheets.values.get.bind(sheets)),
      addField: promisify(sheets.spreadsheets.values.append.bind(sheets)),
    };
  } catch (err) {
    log.error(err);
    throw new Error(err);
  }
};

/**
 * @function
 * @desc Get the fields from a spreadsheet
 * @params {String} sheetID - The google spreadsheet ID
 * @return {Object} the field data
 */
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
    return sheet;
  } catch (err) {
    log.error(err);
    throw new Error(err);
  }
};

/**
 * @function
 * @desc Get the fields from a spreadsheet
 * @params {String} sheetID - The google spreadsheet ID
 * @return {Object} the field data
 */
const getSheet = async (sheetID) => {
  try {
    const sheet = await wrapper.getSheet({
      spreadsheetId: sheetID,
      auth: authClient,
    });
    return sheet;
  } catch (err) {
    log.error(err);
    throw new Error(err);
  }
};

/**
 * @function
 * @desc Get the fields from a spreadsheet
 * @params {String} sheetID - The google spreadsheet ID
 * @return {Object} the field data
 */
const getFields = async (sheetID, field) => {
  try {
    const fields = await wrapper.getFields({
      spreadsheetId: sheetID,
      range: `${field}A1:Z1`,
      majorDimension: 'COLUMNS',
      auth: authClient,
    });
    return fields;
  } catch (err) {
    log.error(err);
    throw new Error(err);
  }
};

const addField = async (sheetID, column, fieldName) => {
  try {
    const addedField = await wrapper.addField({
      spreadsheetId: sheetID,
      range: column,
      auth: authClient,
      valueInputOption: 'RAW',
      resource: {
        values: [[fieldName]],
      },
    });

    return addedField.data;
  } catch (err) {
    log.error(err);
    throw new Error(err);
  }
};

module.exports = {
  setup,
  createSheet,
  getSheet,
  getFields,
  addField,
};
