const challengeSchema = {
    type: "object",
    properties: {
        id: { type: "string" },
        title: { type: "string" },
        description: { type: "string" },
        author: { type: "string" },
        challenges: {
            elements: {
                properties: {
                    id: { type: "string" },
                    title: { type: "string" },
    
                }
            },
        },
        environment: { enum: [ 'Trello'] }
    },
    required: [ "title", "description", "challenges", "environment" ],
    optionalProperties: {
        url: { type: "string" },
        origin: {
            type: "object",
            title: { type: "string" },
            author: { type: "string" },
            url: { type: "string" }
        }
    },
    additionalProperties: true
};

export default challengeSchema;