const sheetAPI = require('./sheet');

module.exports = class SheetDB {
  constructor(sheetID, data) {
    this.sheetID = sheetID;
    this.sheetData = data;
    this.fields = {};
    this.fieldChange = false;
    this.fieldMappings = {
      0: 'A',
      1: 'B',
      2: 'C',
      3: 'D',
      4: 'E',
      5: 'F',
      6: 'G',
      7: 'H',
      8: 'I',
      9: 'J',
      10: 'K',
      11: 'L',
      12: 'M',
      13: 'N',
      14: 'O',
      15: 'P',
      16: 'Q',
      17: 'R',
      18: 'S',
      19: 'T',
      20: 'U',
      21: 'V',
      22: 'W',
      23: 'X',
      24: 'Y',
      25: 'Z',
    };
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

          this.fields[fieldName] = {
            type: fieldType,
            col: this.fieldMappings[i] + String(i + 1),
          };
        }
        return this.fields;
      } catch (err) {
        console.log(err);
      }
    }
    return this.fields;
  }

  async addField(fieldName, type) {
    try {
      let fieldEntries = Object.entries(this.fields);
      if (fieldEntries.length === 0 || this.fieldsChange) {
        await this.getFields();
        fieldEntries = Object.entries(this.fields);
      }

      for (let i = 0; i < fieldEntries.length; i += 1) {
        const storedFieldName = fieldEntries[i][0];
        if (fieldName === storedFieldName) {
          throw new Error('Youve already stored a field with this name!');
        }
      }

      const fieldLocation = `${this.fieldMappings[fieldEntries.length]}1`;
      sheetAPI.addField(this.sheetID, fieldLocation, `${fieldName}:${type}`);
    } catch (err) {
      throw new Error(err);
    }
  }
};
