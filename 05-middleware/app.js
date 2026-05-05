// import express from "express";
// import helmet from "helmet";

// const app = express();
// //1 application middleware
// app.use(express.json());

// // 4 external middleware

// app.use(helmet());

// // 2 routes level
// app.get("/", (req, res) => {
//   res.send("hello from server");
// });

// app.get("/about", (req, res) => {
//   res.send("this is about page");
// });


// // 3 undefined routes handing

// app.use((req, res) => {
//   res.send("requested route not found");
// });

// // 5 centralize error handling

// app.use((error, req, res, next) => {
//   if (res.headersSend) {
//     return next(error);
//   }

//   res
//     .status(error.statusCode || 500)
//     .json(error.message || "internal server error please try again leter");
// });

// const port = 5000;

// app.listen(port, (err) => {
//   if (err) {
//     return console.log(err.message);
//   }

//   console.log(`server running from on port ${port}`);
// });




import express from "express"
import helmet from "helmet"
import HttpError from "./middleware/httpError.js"
import checkRoll from "./middleware/CheckRoll.js"

const app = express()

// external Middleware 
// helmet
app.use(helmet())

// application Middleware

app.use(express.json())

app.get("/", (req, res) => {
    res.send("this is home page from server")
})

// routes level Middleware

app.get("/about", (req, res) => {
    res.send(" this is about page from server")
})

// undefined routs level Middleware

app.use((req, res) => {
    res.status(404).send("page not found in server")
})

// centralized error Middleware

app.use((err, req, res, next) => {
    console.log(err.message)

    res
        .status(error.statusCode || 500)
        .json({ message: error.message || "internal server error" });
});

const port = 5000

app.listen(port, (err) => {
    if (err) {
        console.log(err.message)
    }

    console.log(`server running on port ${port}`)
})