
# 📝 Blog Management REST API

A complete **Blog Management REST API** built with **Node.js, Express.js, MongoDB, JWT Authentication, Cloudinary, Multer, and Joi Validation**.

This project provides secure user authentication, role-based authorization, blog CRUD operations, profile image upload, blog image upload, and admin management.

---

# 🚀 Features

## 👤 User

- User Registration
- User Login
- JWT Authentication
- Logout
- Logout From All Devices
- Update Profile
- Delete Own Profile
- Upload Profile Picture
- Password Hashing using Bcrypt
- Joi Validation

---

## 📝 Blog

- Create Blog
- Update Blog
- Delete Blog
- View All Blogs
- Upload Blog Image
- Blog Category Validation
- Cloudinary Image Storage
- Blog Author Relationship

---

## 👑 Admin

- View All Users
- Update Any User
- Delete Any User
- Verify User
- Role Based Authorization

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- JWT
- bcryptjs

## Validation

- Joi

## File Upload

- Multer
- Cloudinary
- multer-storage-cloudinary

## Other Packages

- dotenv
- nodemon

---

# 📂 Folder Structure

```text
Blog-Management-API
│
├── config
│   ├── cloudinary.js
│   └── db.js
│
├── Controller
│   ├── userController.js
│   └── BlogController.js
│
├── middleware
│   ├── auth.js
│   ├── checkRole.js
│   ├── HttpError.js
│   ├── upload.js
│   └── validate.js
│
├── model
│   ├── UserModel.js
│   └── BlogModel.js
│
├── router
│   ├── UserRouter.js
│   ├── BlogRouter.js
│   └── adminRouter.js
│
├── validation
│   ├── UserSchema.js
│   └── BlogSchema.js
│
├── Screenshots
│   ├── user
│   ├── blog
│   └── admin
│
├── .env
├── package.json
├── server.js
└── README.md
```

---



# 📮 API Endpoints

## 👤 User Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /user/add | Register User |
| POST | /user/login | Login User |
| POST | /user/authLogin | Auth Login |
| GET | /user/logoutUser | Logout |
| GET | /user/AllLogout | Logout From All Devices |
| GET | /user/allUser | Get All Users (Admin) |
| PATCH | /user/update | Update User |
| DELETE | /user/deleteUser | Delete Own Account |

---

## 📝 Blog Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /blog/add | Add Blog |
| GET | /blog/allBlog | Get All Blogs |
| PATCH | /blog/update/:id | Update Blog |
| DELETE | /blog/delete/:id | Delete Blog |

---

## 👑 Admin Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| PATCH | /admin/update/:id | Update Any User |
| DELETE | /admin/delete/:id | Delete Any User |

---

# 📸 API Screenshots

---

# 👤 User APIs

## Register User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/c346737c-5bdc-4760-bb1f-9f1a1580ee63" />


---

## Login User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/809903a0-9c27-4b01-acac-d8634420fd14" />


---

## Auth Login

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/f49ea99b-b190-462e-9e62-5e770c28621c" />


---

## Logout User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/045b3051-5f2c-4f7e-8d2e-c89365ab2669" />


---

## Logout From All Devices

<img width="700" alt="image" src="https://github.com/user-attachments/assets/2472acf5-5df3-4990-98a1-0f6430513c1a" />


---

## Get All Users

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/1e0cfb2e-e9a8-4f54-b84c-b9dd7542f945" />


---

## Update User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/ba536823-922d-4b3d-a89b-28be753fd698" />


---

## Delete User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/6d4bfbe8-5391-4972-bd38-c084576a8245" />


---

# 📝 Blog APIs

## Add Blog

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/440744d0-72e4-4da9-b115-daea518f3bf7" />


---

## Get All Blogs

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/9e3b9ea6-5095-4178-9e90-5ad11557e84d" />


---

## Update Blog

<img width="700" alt="image" src="https://github.com/user-attachments/assets/0c681c4b-d7cf-4df8-8a84-aef0f649e57b" />


---

## Delete Blog

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/087eac83-7346-4d73-92b2-cb8e60af2c68" />


---

# 👑 Admin APIs

## Update User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/c8214293-1da9-4d1e-8ae0-a08c3420033e" />



---

## Delete User

<img width="700"  alt="image" src="https://github.com/user-attachments/assets/cb7d22c7-cc67-4a0d-a23f-ef672d7c8764" />

---

# 📦 Packages Used

```json
{
  "bcryptjs": "^...",
  "cloudinary": "^...",
  "dotenv": "^...",
  "express": "^...",
  "joi": "^...",
  "jsonwebtoken": "^...",
  "mongoose": "^...",
  "multer": "^...",
  "multer-storage-cloudinary": "^...",
  "nodemon": "^..."
}
```

---

# 🖼️ Sample Response

```json
{
  "success": true,
  "message": "new blog add",
  "newBlog": {
    "_id": "...",
    "BlogTitle": "Node.js Authentication",
    "Content": "JWT Authentication Example",
    "Category": "Technology",
    "BlogImg": "...",
    "Author": "..."
  }
}
```

---

# 🔒 Security Features

- Password Hashing (bcrypt)
- JWT Authentication
- Role Based Authorization
- Joi Validation
- Cloudinary Secure Upload
- Protected Routes
- Custom Error Handling

---

# 📌 Future Improvements

- Email Verification
- Forgot Password
- Reset Password
- Like & Comment System
- Search Blogs
- Pagination
- Refresh Token
- Swagger API Documentation

---

# 👨‍💻 Author

## Amit Chavda


Thank you for visiting this repository.

Happy Coding 🚀
