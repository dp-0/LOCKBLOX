const Validator = require("validatorjs");
const { sequelize } = require("../models"); // Import sequelize instance

Validator.register(
  "exists",
  function (value, requirement, attribute) {
    const [modelName, columnName] = requirement.split(",");
    const Model = sequelize.models[modelName];

    if (!Model || !columnName) {
      throw new Error(
        `Invalid exists rule format. Expected "exists:model,column"`
      );
    }

    return Model.findOne({ where: { [columnName]: value } }) !== null;
  },
  "The :attribute must exist."
);
