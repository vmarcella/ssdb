const sheetAPI = require('./lib/sheet');

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
    await sheetAPI.createSheet(name);
  } catch (err) {
    console.log(err);
  }
};

const config = {
  credentialsPath: './credentials.json',
  tokenPath: './token.json',
};

connect(config).then(async () => {
  await createDB('david');
});
