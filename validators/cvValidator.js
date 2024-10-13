const { Validator } = require('jsonschema');

module.exports = {
    verifyCV: (cv) => {
        if (!cv) {
            throw new Error('Cannot create new cv');
        }
        let validator = new Validator();
        let cvSchema = {
            type: 'object',
            properties: {
                lastname: {
                    type: 'string',
                    minLength: 3,
                    required : true,
                    errorMessage: 'Provided Name is invalid'
                },
                firstname : {
                    type : 'string',
                    minLength : 3,
                    required : true,
                    errorMessage : 'Provided fistname is invalid'
                },
                description: {
                    type: 'string',
                    minLength: 5,
                    errorMessage: 'Provided description is invalid'
                },
                contact : {
                    type : 'string'
                },
                isVisible : {
                    type : 'boolean',
                    required : true
                },
                userId : {
                    type: 'string',
                    minLength: 1,
                    required : true,
                    errorMessage: 'userId is invalid'
                },
                experiencesPedagogiques: {
                    type : "array",
                    items : {
                        type : "object",
                        properties: {
                            title : {
                                type: "string",
                            },
                            description : {
                                type : 'string'
                            },
                            startDate : {
                                 type : 'date',
                            },
                            endDate : {
                                type : 'date',
                            }
                        },
                    }
                },
                experiencesProfessionnelles : {
                    type : "array",
                    items : {
                        type : "object",
                        properties: {
                            title : {
                                type: "string",
                            },
                            description : {
                                type : 'string'
                            },
                            startDate : {
                                 type : 'date',
                            },
                            endDate : {
                                type : 'date',
                            }
                        },
                    }
                }
            },
            required: ['lastname','firstname', 'user','isVisible']
        };

        let result = validator.validate(cv, cvSchema);

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
