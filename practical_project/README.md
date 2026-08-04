# 🔐 JWT Authentication API

A secure **User Authentication REST API** built with **Node.js, Express.js, MongoDB, Mongoose, JWT, and bcryptjs**.

This project provides user registration, login, JWT authentication, protected routes, logout, logout from all devices, profile update, user deletion, and user management.

---

## 🚀 Features

* ✅ User Registration
* ✅ User Login
* ✅ Password Hashing with bcryptjs
* ✅ JWT Authentication
* ✅ Protected Routes
* ✅ Get All Users
* ✅ Authenticated User Profile
* ✅ User Logout
* ✅ Logout From All Devices
* ✅ Update User
* ✅ Delete User
* ✅ MongoDB Integration
* ✅ JWT Token Storage
* ✅ Custom Error Handling
* ✅ Environment Variables

---

## 🛠️ Technologies Used

| Technology | Purpose               |
| ---------- | --------------------- |
| Node.js    | Backend Runtime       |
| Express.js | REST API              |
| MongoDB    | Database              |
| Mongoose   | MongoDB ODM           |
| JWT        | Authentication        |
| bcryptjs   | Password Hashing      |
| dotenv     | Environment Variables |
| Postman    | API Testing           |
| Nodemon    | Development           |

---

## 📁 Project Structure

```text
JWT-Authentication/
│
├── config/
│   └── db.js
│
├── controller/
│   └── UserController.js
│
├── middleware/
│   ├── auth.js
│   └── HttpError.js
│
├── model/
│   └── UserModel.js
│
├── routes/
│   └── UserRoutes.js
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env`

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

### 4. Run Project

```bash
npm run dev
```

Or:

```bash
node server.js
```

Server:

```text
http://localhost:5000
```

---

# 🔗 API Endpoints

Base URL:

```text
http://localhost:5000
```

| Method | Endpoint           | Auth | Description        |
| ------ | ------------------ | ---- | ------------------ |
| POST   | `/user/add`        | ❌    | Register User      |
| GET    | `/user/AllUser`    | ❌    | Get All Users      |
| POST   | `/user/Login`      | ❌    | User Login         |
| POST   | `/user/AuthLogin`  | ✅    | Authenticated User |
| POST   | `/user/LogOut`     | ✅    | Logout             |
| POST   | `/user/LogoutAll`  | ✅    | Logout All Devices |
| PATCH  | `/user/Update`     | ✅    | Update User        |
| DELETE | `/user/DeleteUser` | ✅    | Delete User        |

---

# 👤 User Registration

**POST**

```text
/user/add
```

### Request Body

```json
{
  "name": "Amit",
  "Email": "amit@gmail.com",
  "password": "123456",
  "phoneNumber": "9876543210"
}
```

---

# 🔑 User Login

**POST**

```text
/user/Login
```

### Request Body

```json
{
  "Email": "amit@gmail.com",
  "password": "123456"
}
```

Login generates a JWT token which is stored in MongoDB.

---

# 🔒 Authentication

Protected APIs require a JWT token.

Add this header in Postman:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

Authentication middleware:

```text
Authorization Header
        ↓
Extract JWT Token
        ↓
Verify JWT
        ↓
Find User
        ↓
Check Token
        ↓
req.user
        ↓
Protected Controller
```

---

# 📸 Postman API Testing

All APIs were tested successfully using **Postman**.

### 1️⃣ Add User

<p align="center">
  <img src="https://github.com/user-attachments/assets/29b2f6d6-7fb9-4b5e-986c-01774ba93f44" width="700"/>
</p>

---

### 2️⃣ User Login

<p align="center">
  <img src="https://github.com/user-attachments/assets/aaa29b3a-5715-4148-b1a6-660737d4fe74" width="700"/>
</p>

---

### 3️⃣ Get All Users

<p align="center">
  <img src="https://github.com/user-attachments/assets/01ad9bb4-22f1-4ae3-b6d4-8808173d1d67" width="700"/>
</p>

---

### 4️⃣ User Logout

<p align="center">
  <img src="https://github.com/user-attachments/assets/6b61cb5d-f953-4f9d-9d1e-9bdaff7feffd" width="700"/>
</p>

---

### 5️⃣ Logout All Devices

<p align="center">
  <img src="https://github.com/user-attachments/assets/198c4964-d471-4d5f-b441-47763d6beb89" width="700"/>
</p>

---

### 6️⃣ Auth Login

<p align="center">
  <img src="https://github.com/user-attachments/assets/e037e9c5-aeab-4753-bdcf-18a43e69bf7d" width="700"/>
</p>

---

### 7️⃣ Update User

<p align="center">
  <img src="https://github.com/user-attachments/assets/74d7b095-c150-41df-895d-209b29eb95a7" width="700"/>
</p>

---

### 8️⃣ Delete User

<p align="center">
  <img src="https://github.com/user-attachments/assets/fa294fb8-fe9a-4e85-96fc-47fb4a2b170c" width="700"/>
</p>

---

# 🔐 Password Security

Passwords are hashed before storing them in MongoDB using **bcryptjs**.

```javascript
bcrypt.hash(user.password, 10);
```

During login:

```javascript
bcrypt.compare(password, users.password);
```

Plain-text passwords are never stored.

---

# 🎟️ JWT Token

JWT is generated after successful login.

```javascript
const token = jwt.sign(
  { _id: user._id.toString() },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);
```

The token is stored inside the user's `tokens` array.

---

# 🧩 Middleware

The `auth.js` middleware protects private routes.

It checks:

* Authorization Header
* JWT Token
* JWT Secret
* User ID
* Token stored in MongoDB

Example:

```javascript
router.post("/AuthLogin", auth, UserController.authLogin);
```

---

# ❌ Error Handling

A custom `HttpError` class is used for error handling.

```javascript
class HttpError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Example:

```javascript
next(new HttpError("User not found", 404));
```

---

# 🗄️ User Schema

```text
name
Email
password
phoneNumber
tokens
createdAt
updatedAt
```

JWT tokens are stored in:

```javascript
tokens: [
  {
    token: {
      type: String,
      required: true
    }
  }
]
```

---

# 🔑 Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
```

Add `.env` to `.gitignore`:

```gitignore
node_modules/
.env
```

> ⚠️ Never upload your `.env` file or JWT secret to GitHub.

---

# 📚 What I Learned

Through this project, I practiced:

* Node.js
* Express.js
* REST API Development
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt Password Hashing
* Authentication Middleware
* Protected Routes
* Async/Await
* Error Handling
* Postman API Testing
* Git & GitHub

---

# 🚀 Future Improvements

* 🔹 Role-Based Authentication
* 🔹 Email Verification
* 🔹 Forgot Password
* 🔹 Reset Password
* 🔹 Refresh Token
* 🔹 Profile Picture Upload
* 🔹 Joi Validation
* 🔹 Swagger API Documentation

---

# 👨‍💻 Author

**Amit Chavda**

Full Stack Developer

