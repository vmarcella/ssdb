const sheetAPI = require('./sheet');
const log = require('./log');

let defDB;

/**
 * @des register the default database
 * @private
 * @param {SheetDB} SheetDB - The sheet database
 */
const registerDefaultDB = (db) => {
  defDB = db;
};

/**
 * @class
 * @desc The sheet database instance used for handling database interactions
 * @param {String} sheetID - The sheetID that this current database is referencing (used for api calls)
 * @param {Object} data - metadata about the spreadsheet to be stored and kept for reference.
 */
class SheetDB {
  constructor(sheetID, data, defaultDB = true) {
    this.sheetID = sheetID;
    this.sheetData = data;
    this.fields = {};
    this.models = {};
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
    if (defaultDB) registerDefaultDB(this);
  }

  /**
   * @desc Get what fields are currently being stored inside of the database
   * @return {Object} fields - The fields that are currently stored within the database.
   * @example
   * // Retrieves the fields within a db
   * const currentFields = sheetDBInstance.getFields();
   * // currentFields would then look like this if printed:
   * {
   *   fieldName: {
   *     type: 'String',
   *     col: 'A1'
   *   }
   * }
   */
  async getFields(field = '') {
    if (Object.entries(this.fields).length === 0 || this.fieldChange) {
      try {
        const fields = await sheetAPI.getFields(this.sheetID, field);
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
        log.error(err);
      }
    }
    return this.fields;
  }

  /**
   * @desc Get what fields are currently being stored inside of the database
   * @param {String} fieldName - The name of the field to be added.
   * @param {String} type - The type of the field that is being added.
   * @example
   * // Creates a username field of type String within the spreadsheet.
   * sheetDBInstance.addField("Username", "String")
   */
  async addField(fieldName, type) {
    if (!fieldName) throw new Error('The field name was not supplied');
    if (!type) throw new Error('The type was not supplied');

    try {
      let fieldEntries = Object.entries(this.fields);
      if (fieldEntries.length === 0 || this.fieldsChange) {
        await this.getFields();
        fieldEntries = Object.entries(this.fields);
      }

      // Iterate through the field names
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

  /**
   * @desc Add an item to the database. Currently only supports one item type
   */
  async addItem(item) {
    const cleanedItem = item;
    const fields = Object.keys(item);
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i];
      if (!this.field[fields] || field === 'ID') {
        delete cleanedItem[field];
      }
    }

    log.info(cleanedItem);
  }

  /**
   * @desc Register a new model to the database
   */
  registerModel(model) {
    const { name } = this.model;
    if (this.models[name]) throw new Error('Trying to register the same model twice.');
    this.models[name] = model;
  }
}

module.exports = { SheetDB, defDB };
