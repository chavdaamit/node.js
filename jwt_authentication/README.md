
# 🔐 JWT Authentication API

A secure JWT Authentication API built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, **JWT**, and **bcrypt**. This project demonstrates user registration, login, password hashing, JWT token generation, and protected routes using authentication middleware.

---

## 🚀 Features

- 👤 User Registration
- 🔑 User Login
- 🔒 Password Hashing using bcrypt
- 🪪 JWT Token Authentication
- 🛡️ Protected Routes
- 📦 MongoDB Database Integration
- ⚠️ Custom Error Handling Middleware
- 🌐 RESTful API Structure

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- bcrypt
- dotenv
- Nodemon

---

1 : ADD USER 

<img width="1708" height="1047" alt="image" src="https://github.com/user-attachments/assets/31843b6b-e17b-4e33-9d65-f7d465cf3729" />


2 : GET ALL USER 

<img width="1546" height="1115" alt="image" src="https://github.com/user-attachments/assets/917c05b9-37fb-488c-bbea-faab383ccb41" />


3 : LOGIN USER

<img width="1565" height="1057" alt="image" src="https://github.com/user-attachments/assets/4b50e35b-b143-4a76-b45b-2b7b26da211c" />


4 : AUTH LOGIN

<img width="1662" height="986" alt="image" src="https://github.com/user-attachments/assets/4311bc83-9dff-4be7-8842-df2cc715b5bb" />


5 : LOGOUT USER

<img width="1572" height="1007" alt="image" src="https://github.com/user-attachments/assets/63c9a90d-1ae2-4ddc-9dad-f99b98f22921" />


6 : LOGOUT ALL USER

<img width="1481" height="1002" alt="image" src="https://github.com/user-attachments/assets/b712225b-e7af-495a-a2e8-cb31ee0c347b" />

## 📦 Installation

### Clone the repository

```bash
git clone https://github.com/chavdaamit/node.js.git
```

Move into the project folder

```bash
cd node.js/jwt_authentication
```

Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URL=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Project

Development mode

```bash
npm run dev
```

Production mode

```bash
npm start
```

---

## 📌 API Endpoints

### Register User

**POST**

```
/register
```

Body

```json
{
  "name": "Amit",
  "Email": "amit@gmail.com",
  "password": "123456"
}
```

---

### Login User

**POST**

```
/login
```

Body

```json
{
  "Email": "amit@gmail.com",
  "password": "123456"
}
```

Response

```json
{
  "token": "JWT_TOKEN"
}
```

---

### Get Profile (Protected)

**GET**

```
/profile
```

Headers

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🔐 Authentication Flow

```
Register User
      │
      ▼
Password Hash (bcrypt)
      │
      ▼
Save User in MongoDB
      │
      ▼
Login
      │
      ▼
Generate JWT Token
      │
      ▼
Client Stores Token
      │
      ▼
Protected Routes
      │
      ▼
JWT Verification Middleware
      │
      ▼
Access Granted
```

---

## 📸 Testing

You can test all APIs using:

- Postman
- Thunder Client
- Insomnia

---

## 📚 Dependencies

```json
express
mongoose
jsonwebtoken
bcrypt
dotenv
nodemon
```

---

## 👨‍💻 Author

**Amit Chavda**



