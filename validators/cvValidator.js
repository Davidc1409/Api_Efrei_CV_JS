const { Validator } = require('jsonschema');

module.exports = {
  verifyCV: (cv, authorId) => {
    if (!cv) {
      throw new Error('Cannot create new CV');
    }

    cv.author = authorId; // Add the authorId to the cv object

    let validator = new Validator();
    let CVSchema = {
      type: 'object',
      properties: {
        description: {
          type: 'string',
          minLength: 3,
          errorMessage: 'Provide description is invalid'
        },
        experiencesPedagogiques: {
          type: 'string',
          minLength: 3,
          errorMessage: 'Provide experience is invalid'
        },
        experiencesProfessionnelles: {
          type: 'string',
          minLength: 3,
          errorMessage: 'Provide experience is invalid'
        }
      },
      required: ['description', 'experiencesPedagogiques', 'experiencesProfessionnelles']
    };

    let result = validator.validate(cv, CVSchema);

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