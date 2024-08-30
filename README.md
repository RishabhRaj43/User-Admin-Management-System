# User-Admin Management System

A web application for managing users and admins with features such as user authentication, role management, and a simple interface for admin tasks.

## Features

- User authentication (signup and login)
- Admin management of user accounts
- Role-based access control
- Responsive design
- RESTful API for backend operations

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT)
- **Package Manager:** npm


## API Endpoints

### Admin Endpoints

- `POST /admin/signup`: Register a new admin.
- `POST /admin/login`: Admin login.
- `POST /admin/logout`: Admin logout.
- `PUT /admin/edit`: Edit admin details (requires admin authentication).
- `GET /admin/getallUser`: Retrieve a list of all users (requires admin authentication).
- `PUT /admin/editUser/:id`: Edit user details by user ID (requires admin authentication).
- `DELETE /admin/deleteUser/:id`: Delete a user by user ID (requires admin authentication).
- `PUT /admin/banUser/:id`: Ban a user by user ID (requires admin authentication).
- `PUT /admin/unbanUser/:id`: Unban a user by user ID (requires admin authentication).
- `POST /admin/like`: Like an alien (requires admin authentication).
- `GET /admin/likealiens`: Retrieve a list of liked aliens (requires admin authentication).

### User Endpoints

- `POST /user/signup`: Register a new user.
- `POST /user/login`: User login.
- `POST /user/logout`: User logout.
- `PUT /user/edit`: Edit user details (requires user authentication, and the user must not be banned).

-------------------------------------


---------------------------------------------
# _Happy Coding 🤖👾_

