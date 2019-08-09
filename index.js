const sheetAPI = require('./lib/sheet');
const auth = require('./lib/auth');

class SheetDB {
  constructor(config) {
    if (!config) {
      throw new Error('You need to pass in config object');
    }

    sheetAPI
      .setup(config.credentialsPath, config.tokenPath)
      .then(() => {
        console.log("Successfully authenticated with google's servers");
      })
      .catch((err) => console.log(err));
  }

  async createDB(name) {
    try {
      await sheetAPI.createSheet(name);
    } catch (err) {
      console.log(err);
    }
  }
}
const config = {
  credentialsPath: './credentials.json',
  tokenPath: './token.json',
};

const sheetDB = new SheetDB(config);
