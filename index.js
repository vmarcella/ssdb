const sheetAPI = require('./lib/sheet');
const SheetDB = require('./lib/database');

const connect = async (config) => {
  await sheetAPI
    .setup(config.credentialsPath, config.tokenPath)
    .then(() => {
      console.log("Successfully authenticated with google's servers");
    })
    .catch((err) => console.log(err));
};

const createDB = async (name) => {
  try {
    const sheet = await sheetAPI.createSheet(name);
    const { data } = sheet;
    return new SheetDB(data.spreadsheetId, data);
  } catch (err) {
    throw new Error(err);
  }
};

const getDB = async (sheetID) => {
  try {
    const sheet = await sheetAPI.getSheet(sheetID);
    const { data } = sheet;
    return new SheetDB(data.spreadsheetId, data);
  } catch (err) {
    throw new Error(err);
  }
};

const config = {
  credentialsPath: './credentials.json',
  tokenPath: './token.json',
};

connect(config).then(async () => {
  try {
    const db = await getDB('1BvjJ3lrFHDQnGWEhseglZ9ND5zeLhbXz2by_baQn2zE');
    await db.getFields();
  } catch (err) {
    console.log(err);
  }
});

module.exports = {
  connect,
  createDB,
  getDB,
};
