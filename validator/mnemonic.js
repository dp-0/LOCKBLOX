import Validator from "validatorjs";

Validator.register(
  "mnemonic",
  (value, requirement) => {
    const wordCount = parseInt(requirement, 10);
    const words = value.split(" ");

    return words.length === wordCount;
  },
  "The :attribute must have exactly :mnemonic words."
);

export default Validator;
