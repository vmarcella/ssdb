const validTypes = new Set(['String', 'Number']);
const log = require('./log');

const cleanFields = (fields) => {
  const keys = Object.keys(fields);
  const cleanedFields = fields;

  for (let i = 0; i < keys.length; i += 1) {
    const field = keys[i];
    const type = fields[field];
    // Check if the type is valid and if not, delete the field.
    if (!validTypes.has(type)) {
      log.warn(`Invalid type ${type}, removing it from the Schema`);
      delete cleanedFields[field];
    }
  }

  return cleanedFields;
};

class Schema {
  constructor(fields) {
    this.fields = cleanFields(fields);
  }
}

module.exports = Schema;
