class Model {
  constructor(schema) {
    // eslint-disable-next-line
    // Ensuring the user doesn't override the ID
    this.schema = schema;
  }

  register() {}
}

module.exports = Model;
