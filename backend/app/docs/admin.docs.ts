export const adminDocs = {
    '/admin/allUsers': {
        get: {
            summary: 'Get All Users',
            description: 'Retrieves a list of all users. Requires authentication.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }], // JWT authentication
            responses: {
                200: {
                    description: 'List of users retrieved successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: { type: 'number', example: 1 },
                                        name: { type: 'string', example: 'John Doe' },
                                        email: { type: 'string', example: 'johndoe@example.com' },
                                        role: { type: 'string', example: 'user' },
                                    },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized - Missing or invalid token.' },
            },
        },
    },
    '/admin/{id}': {
        get: {
            summary: 'Get User by ID',
            description: 'Retrieves details of a specific user by their ID. Requires authentication.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'number' },
                    description: 'The ID of the user to retrieve.',
                    example: 1,
                },
            ],
            responses: {
                200: {
                    description: 'User details retrieved successfully.',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    id: { type: 'number', example: 1 },
                                    name: { type: 'string', example: 'John Doe' },
                                    email: { type: 'string', example: 'johndoe@example.com' },
                                    role: { type: 'string', example: 'user' },
                                },
                            },
                        },
                    },
                },
                401: { description: 'Unauthorized - Missing or invalid token.' },
                404: { description: 'User not found.' },
            },
        },
    },
    '/admin/delete/{id}': {
        delete: {
            summary: 'Delete User',
            description: 'Deletes a specific user by their ID. Requires admin role.',
            tags: ['Admin'],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    schema: { type: 'number' },
                    description: 'The ID of the user to delete.',
                    example: 1,
                },
            ],
            responses: {
                200: { description: 'User deleted successfully.' },
                401: { description: 'Unauthorized - Missing or invalid token.' },
                403: { description: 'Forbidden - Only admins can delete users.' },
                404: { description: 'User not found.' },
            },
        },
    },
};
