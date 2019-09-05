const { defDB } = require('defDB');

class Model {
  constructor(schema) {
    // eslint-disable-next-line
    // Ensuring the user doesn't override the ID
    this.schema = schema;
    this.name = this.schema.name;
  }

  register() {
    defDB.registerModel(this);
  }
}

module.exports = Model;
