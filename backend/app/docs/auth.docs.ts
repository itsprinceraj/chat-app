export const authDocs = {
  "/auth/signup": {
    post: {
      summary: "User Signup",
      description: "Registers a new user and returns a success response.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email of the user.",
                  example: "dummy@example.com",
                },
                password: {
                  type: "string",
                  description: "The password for the account.",
                  example: "password123",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        201: {
          description: "User successfully registered.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    example: "User registered successfully.",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid input or email already taken.",
        },
      },
    },
  },
  "/auth/login": {
    post: {
      summary: "User Login",
      description: "Logs in a user and returns a JWT token.",
      tags: ["Authentication"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: {
                  type: "string",
                  description: "The email of the user.",
                  example: "dummy@example.com",
                },
                password: {
                  type: "string",
                  description: "The password for the account.",
                  example: "password123",
                },
              },
              required: ["email", "password"],
            },
          },
        },
      },
      responses: {
        200: {
          description: "Login successful.",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  token: {
                    type: "string",
                    description: "JWT token.",
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                  },
                },
              },
            },
          },
        },
        400: {
          description: "Invalid credentials or bad request.",
        },
        401: {
          description: "Unauthorized - invalid email or password.",
        },
      },
    },
  },
};
