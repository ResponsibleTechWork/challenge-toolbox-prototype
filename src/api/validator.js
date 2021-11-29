import Ajv from "ajv";

const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

ajv.addKeyword("optionalProperties"); // https://ajv.js.org/strict-mode.html
ajv.addKeyword("elements");

const testSchema = {
  type: "object",
  properties: {
    foo: {type: "integer"},
    bar: {type: "string"}
  },
  required: ["foo"],
  additionalProperties: false,
};

const testData = {
  foo: 1,
  bar: "abc"
};

const validator = (schema = testSchema, data = testData) => {
    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) console.log(validate.errors);
    return valid;
};

export default validator;
