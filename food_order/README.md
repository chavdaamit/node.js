
# 🍔 Food Ordering API

A RESTful backend API for a **Food Ordering System** built using **Node.js, Express.js, MongoDB, and Mongoose**.

This project provides APIs for managing users, authentication, categories, food items, orders, restaurants, and providers.

---

## 🚀 Features

* 🔐 User Authentication
* 👤 User Management
* 🛡️ Role-Based Authorization
* 📂 Category Management
* 🍔 Food Management
* 📝 Order Management
* 🏪 Restaurant Management
* 🚚 Provider Management
* ☁️ Cloudinary Image Upload
* 📧 Email Notifications
* 🔑 JWT Authentication
* 🔒 Password Hashing
* ✅ Request Validation
* 🛡️ Error Handling
* 📊 Audit Logging
* 🚦 Rate Limiting

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **JWT**
* **bcryptjs**
* **Cloudinary**
* **Multer**
* **Nodemailer**
* **Joi**
* **dotenv**

---

## 📁 Project Structure

```text
Food Ordering API
│
├── config
│   ├── cloudinary.js
│   ├── db.js
│   └── email.js
│
├── controller
│   ├── authController.js
│   ├── categoryController.js
│   ├── foodController.js
│   ├── orderController.js
│   ├── providerController.js
│   ├── restaurantController.js
│   └── userController.js
│
├── middleware
│   ├── auditLogger.js
│   ├── auth.js
│   ├── checkRole.js
│   ├── HttpError.js
│   ├── rateLimit.js
│   ├── upload.js
│   └── validate.js
│
├── model
│   ├── auditLogModel.js
│   ├── categoryModel.js
│   ├── foodModel.js
│   ├── orderModel.js
│   ├── providerModel.js
│   ├── restaurantModel.js
│   └── userModel.js
│
├── route
│   ├── adminRouter.js
│   ├── categoryRouter.js
│   ├── foodRouter.js
│   ├── orderRouter.js
│   ├── providerRouter.js
│   ├── restaurantRouter.js
│   └── userRouter.js
│
├── template
│   └── emailTemplate.js
│
├── utils
│   └── sendEmail.js
│
├── validation
│   ├── categorySchema.js
│   ├── foodSchema.js
│   ├── providerSchema.js
│   ├── restaurantSchema.js
│   └── userSchema.js
│
├── .env
├── .gitignore
├── package.json
└── server.js
```


---

# 📌 API Modules

## 🔐 Authentication

Authentication APIs handle user registration and login.

* Register User
* Login User
* Generate JWT Token
* Password Encryption

---

## 👤 User Management

User-related operations include:

* Create User
* Get All Users
* Get User by ID
* Update User
* Delete User

---

## 📂 Category Management

Category operations include:

* Create Category
* Get All Categories
* Get Category by ID
* Update Category
* Delete Category

---

## 🍔 Food Management

Food operations include:

* Add Food
* Get All Foods
* Get Food by ID
* Update Food
* Delete Food
* Upload Food Images

---

## 📝 Order Management

Order operations include:

* Create Order
* Get All Orders
* Get Order by ID
* Update Order
* Update Order Status
* Delete Order

---

## 🏪 Restaurant Management

Restaurant operations include:

* Create Restaurant
* Get All Restaurants
* Get Restaurant by ID
* Update Restaurant
* Delete Restaurant

---

## 🚚 Provider Management

Provider operations include:

* Create Provider
* Get All Providers
* Get Provider by ID
* Update Provider
* Delete Provider

---

## 🔒 Authentication & Authorization

The project uses **JWT (JSON Web Token)** for authentication.

Protected routes require a valid token.

Example:

```http
Authorization: Bearer YOUR_JWT_TOKEN
```

Role-based authorization is handled using middleware.

---

## ☁️ Image Upload

Images are uploaded using:

* Multer
* Cloudinary

This is useful for uploading:

* Food Images
* Restaurant Images
* Provider Images

---

## 📧 Email Service

The project uses **Nodemailer** for sending emails.

Email functionality is handled through:

```text
config/email.js
template/emailTemplate.js
utils/sendEmail.js
```

---

## 🛡️ Security

The project includes the following security features:

* Password Hashing
* JWT Authentication
* Role-Based Authorization
* Input Validation
* Rate Limiting
* HTTP Error Handling
* Audit Logging

---

## 📊 Audit Logging

The application logs important activities using:

```text
auditLogModel.js
auditLogger.js
```

This helps track actions performed in the application.

---

## 📄 Environment Variables

| Variable                | Description               |
| ----------------------- | ------------------------- |
| `PORT`                  | Application port          |
| `MONGO_URI`             | MongoDB connection string |
| `JWT_SECRET`            | JWT secret key            |
| `EMAIL_USER`            | Email username            |
| `EMAIL_PASS`            | Email password            |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name     |
| `CLOUDINARY_API_KEY`    | Cloudinary API key        |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret     |

---

## 👨‍💻 Author

**Amit Chavda**

---

