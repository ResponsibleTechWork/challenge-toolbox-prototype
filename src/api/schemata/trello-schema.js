const trelloSchema = {
    type: "object",
    properties: {      
        capabilities: {
            elements: {
                type: "object",
                properties: {
                    capability: { type: "string" }                       
                },
                required: [ "capability" ]
            }
        },
        environment: {
            enum: ["Trello"]
        }
    },
    required: [ "capabilities", "environment" ]
};

export default trelloSchema;