const { Validator } = require('jsonschema');

module.exports = {
  verifyRec: (rec, cvId, authorId) => {
    if (!rec) {
      throw new Error('Cannot create new Recommendation');
    }

    rec.cvId = cvId; 
    rec.RecAuthor = authorId; 

    let validator = new Validator();
    let RecSchema = {
      type: 'object',
      properties: {
        text: {
          type: 'string',
          minLength: 3,
          errorMessage: 'Provide recommendation text is invalid'
        }
      },
      required: ['text']
    };

    let result = validator.validate(rec, RecSchema);

    if (result.errors.length) {
      const errorInputsMsg = result.errors
        .map((error) => {
          return error.schema.errorMessage || error.message;
        })
        .join(' ');

      throw new Error(errorInputsMsg);
    }
  }
};