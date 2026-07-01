
# Google OAuth Authentication System

A secure authentication system built with **Node.js**, **Express.js**, **Passport.js**, **Google OAuth 2.0**, **MongoDB**, and **EJS**.

Users can log in using their Google account, maintain sessions, access protected routes, and log out securely.

---

## 🚀 Features

* Google OAuth 2.0 Authentication
* User Login with Google
* Persistent Login Session
* Protected Routes
* MongoDB Database Integration
* Passport.js Authentication Strategy
* Express Session Management
* Logout Functionality
* EJS Template Rendering
* Error Handling Middleware

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* Passport.js
* Passport Google OAuth 2.0
* Express Session
* MongoDB
* Mongoose
* Dotenv

### Frontend

* EJS
* HTML
* Bootstrap 5

---

## 📁 Project Structure

```
project/
│
├── config/
│   ├── db.js
│   └── passport.js
│
├── middleware/
│   ├── checkAuth.js
│   └── HttpError.js
│
├── model/
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   └── profileRoutes.js
│
├── views/
│   ├── home.ejs
│   ├── login.ejs
│   └── profile.ejs
│
├── .env
├── package.json
├── server.js
└── README.md
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/your-username/your-repository.git
```

Move into the project directory

```bash
cd your-repository
```

Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

CLIENT_ID=your_google_client_id

CLIENT_SECRET=your_google_client_secret

CALLBACK_URL=http://localhost:5000/auth/google/redirect

SESSION_SECRET=your_session_secret
```

---

## ▶️ Run the Project

Development

```bash
npm start
```

or

```bash
node server.js
```

Server will start at

```
http://localhost:5000
```

---

## 🔄 Authentication Flow

```
Home Page
     │
     ▼
Login Page
     │
     ▼
Google Login
     │
     ▼
Google Authentication
     │
     ▼
Passport Strategy
     │
     ▼
MongoDB
(Store or Find User)
     │
     ▼
Create Session
     │
     ▼
Profile Page
```

---

## 📦 Dependencies

```json
express
mongoose
passport
passport-google-oauth20
express-session
dotenv
ejs
```

---

## 📸 Screens

* Home Page
* Login Page
* Google Login
* Profile Page
* Logout

---

## 🔒 Protected Route

The profile page is protected using custom middleware.

```javascript
router.get("/", checkAuth, (req, res) => {
    res.render("profile", {
        user: req.user
    });
});
```

---

## 👤 User Schema

```javascript
{
    name: String,
    email: String,
    googleId: String
}
```

---

## 📚 What I Learned

* Google OAuth Authentication
* Passport.js Strategy
* Express Session
* Serialize & Deserialize User
* MongoDB Integration
* Route Protection
* Authentication Middleware
* Error Handling
* Environment Variables
* Session Management

---

## 🚀 Future Improvements

* User Dashboard
* Profile Image
* Edit Profile
* JWT Authentication
* Multiple OAuth Providers (GitHub, Facebook)
* Role Based Authentication
* Admin Panel

---

## 👨‍💻 Author

**Amit Chavda**

Full Stack Developer Student

Bhavnagar, Gujarat


