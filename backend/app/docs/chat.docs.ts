export const chatDocs = {
    '/group/createGrp': {
        post: {
            summary: 'Create a Group',
            description: 'Creates a new group. Requires authentication.',
            tags: ['Group'],
            security: [{ BearerAuth: [] }],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                name: {
                                    type: 'string',
                                    description: 'The name of the group.',
                                    example: 'Dev Hub',
                                },
                                isPublic: {
                                    type: 'boolean',
                                    description: 'Whether the group is public or private.',
                                    example: true,
                                },
                            },
                            required: ['name', 'isPublic'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Group created successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        description: 'The ID of the created group.',
                                        example: 1,
                                    },
                                    name: {
                                        type: 'string',
                                        description: 'The name of the created group.',
                                        example: 'Developers Hub',
                                    },
                                    isPublic: {
                                        type: 'boolean',
                                        description: 'Visibility status of the group.',
                                        example: true,
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Invalid request data.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/chat/send-msg': {
        post: {
            summary: 'Send a Chat Message',
            description: 'Sends a message in a group chat. Requires authentication.',
            tags: ['Chat'],
            security: [{ BearerAuth: [] }], // Assuming JWT authentication
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                groupId: {
                                    type: 'number',
                                    description: 'The ID of the group where the message is sent.',
                                    example: 1,
                                },
                                content: {
                                    type: 'string',
                                    description: 'The message content.',
                                    example: 'Hello, world!',
                                },
                            },
                            required: ['groupId', 'content'],
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Message sent successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    messageId: {
                                        type: 'number',
                                        description: 'The ID of the sent message.',
                                        example: 1001,
                                    },
                                    content: {
                                        type: 'string',
                                        description: 'The message content.',
                                        example: 'Hello, world!',
                                    },
                                    senderId: {
                                        type: 'number',
                                        description: 'The ID of the sender.',
                                        example: 2,
                                    },
                                    groupId: {
                                        type: 'number',
                                        description: 'The ID of the group.',
                                        example: 1,
                                    },
                                },
                            },
                        },
                    },
                },
                400: { description: 'Invalid request data.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
};
