const sheetAPI = require('./sheet');

module.exports = class SheetDB {
  constructor(sheetID, data) {
    this.sheetID = sheetID;
    this.sheetData = data;
    this.fields = {};
    this.fieldChange = false;
  }

  async getFields() {
    if (Object.entries(this.fields).length === 0 || this.fieldChange) {
      try {
        const fields = await sheetAPI.getFields(this.sheetID);
        const { data } = fields;
        const { values } = data;

        for (let i = 0; i < values.length; i += 1) {
          const currField = values[i][0].split(':');
          const fieldName = currField[0];
          const fieldType = currField[1];

          this.fields[fieldName] = fieldType;
        }
        return this.fields;
      } catch (err) {
        console.log(err);
      }
    } else {
      return this.fields;
    }
  }

  async addField(fieldName) {
    try {
    } catch (err) {}
  }
};
