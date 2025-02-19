# Chat App

## Overview

This is a real-time chat application built with TypeScript, Express.js, PostgreSQL, and TypeORM. It supports user authentication, group creation, and messaging in both public and private groups. The app includes role-based access control with User and Admin roles.

## Features

- User Authentication (Signup/Login)
- Role-based Access Control (User & Admin)
- Create and Manage Groups (Public & Private)
- Send and Receive Messages
- Group Admin Privileges
- PostgreSQL Database with TypeORM

## Technologies Used

- **Backend:** TypeScript, Express.js
- **Database:** PostgreSQL with TypeORM
- **Authentication:** JWT (JSON Web Token) & passport authentication

## Project Setup

### Prerequisites

Ensure you have the following installed:

- **Node.js (>= 16.x)**
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone [<repository-url>](https://github.com/devprince116/group-chat-app)
   cd chat-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up the PostgreSQL database:
   - Create a database chat_app
   - Update database credentials in `.env` file.
   ```env
   DATABASE="chat_app"
   USERNAME="postgress"
   pass="1234"  //your credentials
   ```

4. Start the server:
   ```sh
   npm start
   ```
   The server will run at **[http://localhost:4000](http://localhost:4000)**.
   Full path: [http://localhost:4000/api/v1/<routes>]

## API Endpoints

### Authentication

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Groups & Messenging

- `POST /create-gtp` - Create a group
- `POST /send-msg`   - Send Messages

## Roles & Permissions

- **User**: Can join groups, send messages.
- **Admin**: Can create/delete groups, manage users in groups.
- Swagger Api-docs: **[http://localhost:4000/api-docs](http://localhost:4000/api-docs)**

## Contributing

Feel free to fork the repository and submit pull requests.

## License

MIT License

