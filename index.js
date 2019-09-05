const sheetAPI = require('./lib/sheet');
const { SheetDB } = require('./lib/database');
const log = require('./lib/log');

let setup = false;

/**
 * @name connect
 * @desc connect to the google api. Needed in order to do any database operations and is what
 * generate the token file if it is not present
 * @param {Object} config - The config object that contains properties for authenticating with
 * google services. the fields that are used within the object are credentialsPath,
 * tokenPath, and debug.
 * @example
 * const { connect } = require('ssdb');
 * config = {
 *   credentialsPath: "path/to/credentials",
 *   tokenPath: "path/to/tokenfile" // Will create if not already there.
 *   debug: false // true if you'd like to see what's going on under the hood.
 * }
 *
 * // Successfully connects to google services
 * await connect(config)
 */
const connect = async (config) => {
  if (!config || !config.credentialsPath) throw new Error('You need to provide the config object/credentials path');
  log.setDebug(config.debug);
  await sheetAPI
    .setup(config.credentialsPath, config.tokenPath)
    .then(() => {
      setup = true;
      log.info("Successfully authenticated with google's servers");
    })
    .catch((err) => {
      throw new Error(err);
    });
};

/**
 * @name createDB
 * @desc create a database (spreadsheet) from your google account given the name of the spreadsheet.
 * @param {String} name - The name that you'd like the new database to be named.
 * @example
 * const { createDB } = require('ssdb');
 *
 * // Returns a new SheetDB instance
 * const db = await createDB('sfjklKJhf93Hvkljrf32');
 */
const createDB = async (name) => {
  if (!setup) throw new Error('You need to authenticate with the connect ufnction');

  try {
    const sheet = await sheetAPI.createSheet(name);
    const { data } = sheet;
    log.info('Successfully created a spreadsheet');
    return new SheetDB(data.spreadsheetId, data);
  } catch (err) {
    throw new Error(err);
  }
};

/**
 * @name getDB
 * @desc gets a database (spreadsheet) from your google account given the spreadsheet ID.
 * @param {String} sheetID - The ID of the sheet that you're trying to receive.
 * @example
 * const { getDB } = require('ssdb');
 *
 * // Returns a new SheetDB instance
 * const db = await getDB('sfjklKJhf93Hvkljrf32')
 */
const getDB = async (sheetID) => {
  if (!setup) throw new Error('You need to authenticate with the connect ufnction');
  try {
    const sheet = await sheetAPI.getSheet(sheetID);
    const { data } = sheet;
    log.info('Successfully grabbed a spreadsheet');
    return new SheetDB(data.spreadsheetId, data);
  } catch (err) {
    throw new Error(err);
  }
};

const config = {
  credentialsPath: './credentials.json',
  tokenPath: './token.json',
  debug: true,
};

const Schema = require('./lib/schema');
const Model = require('./lib/model');

connect(config).then(async () => {
  try {
    const db = await getDB('1mxxohRQ99t4NICYzUpDD3OwwKL4i4lFzwvqSHAhH7eM');
    const fields = await db.getFields();
    const Schema = new Schema({
      Erik: 'String',
      David: 'Number',
      Name: 'Object',
    });

    await db.addField('Erikk', 'String');
    await db.addItem({
      ID: 'String',
    });
    log.info(fields);
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  connect,
  createDB,
  getDB,
};
