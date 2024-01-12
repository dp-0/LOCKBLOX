const Validator = require("validatorjs");

Validator.register(
  "unique",
  function (value, requirement, attribute) {
    const [modelName, columnName] = requirement.split(",");
    const Model = require("../models/" + modelName);

    if (!Model || !columnName) {
      throw new Error(
        `Invalid unique rule format. Expected "unique:model,column"`
      );
    }

    return Model.findOne({ where: { [columnName]: value } }) === null;
  },
  "The :attribute must be unique."
);
