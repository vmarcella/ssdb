const sheetAPI = require('./lib/sheet');
const SheetDB = require('./lib/database');
const log = require('./lib/log');

/**
 * @name connect
 * @
 *
 */
const connect = async (config) => {
  log.setDebug(config.debug);
  await sheetAPI
    .setup(config.credentialsPath, config.tokenPath)
    .then(() => {
      log.info("Successfully authenticated with google's servers");
    })
    .catch((err) => {
      throw new Error(err);
    });
};

const createDB = async (name) => {
  try {
    const sheet = await sheetAPI.createSheet(name);
    const { data } = sheet;
    log.info('Successfully created a spreadsheet');
    return new SheetDB(data.spreadsheetId, data);
  } catch (err) {
    throw new Error(err);
  }
};

const getDB = async (sheetID) => {
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

connect(config).then(async () => {
  try {
    const db = await getDB('1mxxohRQ99t4NICYzUpDD3OwwKL4i4lFzwvqSHAhH7eM');
    const fields = await db.getFields();
    await db.addField('Erikk', 'String');
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
