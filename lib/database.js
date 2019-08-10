const sheetAPI = require('./sheet');

module.exports = class SheetDB {
  constructor(sheetID, data) {
    this.sheetID = sheetID;
    this.sheetData = data;
  }

  async getFields() {
    try {
      const fields = await sheetAPI.getFields(this.sheetID);
      console.log(fields);
    } catch (err) {
      console.log(err);
    }
  }

  addField(fieldName) {}
};
