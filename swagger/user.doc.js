const data = [
  {
    id: 31,
    name: 'bajak',
    email: 'bajak@uma.ac.id',
    phone_number: '082165561175',
    gender: 2,
    role: 'user',
    createdAt: '2022-05-06T19:28:29.000Z',
    updatedAt: '2022-05-06T19:28:29.000Z',
  },
];
const listUser = {
  tags: ['User'],
  description: 'List all users',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'OK',
              messages: 'Success',
              data,
            },
          },
        },
      },
    },
  },
};
const getUserByPathId = {
  tags: ['User'],
  description: 'Get user by path id',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Id of the user',
      type: 'string',
      example: '13',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'OK',
              messages: 'Success',
              data,
            },
          },
        },
      },
    },
  },
};
const createUser = {
  tags: ['User'],
  description: 'Create a the user',
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'String',
              description: 'Name of the users',
              example: 'imam wasmawi',
            },
            email: {
              type: 'String',
              description: 'Email of the users',
              example: 'bajak@uma.ac.id',
            },
            password: {
              type: 'Password',
              description: 'Password of the users',
              example: '123456',
            },
            gender: {
              type: 'String',
              description: 'Gender of the users',
              example: '1',
            },
            role: {
              type: 'String',
              description: 'Role of the users',
              example: 'user',
            },
            phone_number: {
              type: 'String',
              description: 'Phone number of the users',
              example: '082165561175adad',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'OK',
              token:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5hbWUiOiJ6YWtpIiwiZW1haWwiOiJ6YWtpQHVtYS5hYy5pZCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE2NTE4NzkyNTQsImV4cCI6MTY1MTg4MTA1NH0.HtWYaily5R38v4SJ8plVoxWT2DyE-lRLQiACOomg44c',
            },
          },
        },
      },
    },
  },
};
const updateUser = {
  tags: ['User'],
  description: 'Update a the user',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Update of the user',
      type: 'string',
      example: '13',
    },
  ],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          type: 'object',
          properties: {
            name: {
              type: 'String',
              description: 'Name of the users',
              example: 'imam wasmawi',
            },
            email: {
              type: 'String',
              description: 'Email of the users',
              example: 'bajak@uma.ac.id',
            },
            password: {
              type: 'Password',
              description: 'Password of the users',
              example: 'adadadadfa',
            },
            gender: {
              type: 'String',
              description: 'Gender of the users',
              example: '1',
            },
            role: {
              type: 'String',
              description: 'Role of the users',
              example: 'user',
            },
            phone_number: {
              type: 'String',
              description: 'Phone number of the users',
              example: '08216556117522',
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'OK',
              messages: 'Success',
              data,
            },
          },
        },
      },
    },
  },
};
const deleteUser = {
  tags: ['User'],
  description: 'Delete user by path id',
  parameters: [
    {
      name: 'id',
      in: 'path',
      description: 'Id of the user',
      type: 'string',
      example: '13',
    },
  ],
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            example: {
              status: 'OK',
              messages: 'Success remove',
              data: 1,
            },
          },
        },
      },
    },
  },
};
const userRouteDoc = {
  '/api/v1/users': {
    get: listUser,
    post: createUser,
  },
  '/api/v1/users/{id}': {
    patch: getUserByPathId,
    delete: deleteUser,
    put: updateUser,
  },
};
module.exports = userRouteDoc;
