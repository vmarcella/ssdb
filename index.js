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
    const sheet = await sheetAPI.createSheet(name);
    console.log(sheet.data);
    return sheet.data;
  } catch (err) {
    console.log(err);
  }
};

const getDB = async (sheetID) => {
  try {
    const sheet = await sheetAPI.getSheet(sheetID);
    console.log(sheet);
    console.log('sheet');
    return sheet;
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
  await getDB('1BvjJ3lrFHDQnGWEhseglZ9ND5zeLhbXz2by_baQn2zE');
});
