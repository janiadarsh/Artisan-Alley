require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const authRouter = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const serviceRouter = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDb = require("./utils/db");


//cors
const corsOptions = {
    origin: "http://localhost:5173",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
  };
app.use(cors(corsOptions));
// The app.use(express.json()) middleware is used in Express.js to parse incoming JSON payloads.
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/form", contactRouter);
app.use("/api/data", serviceRouter);


//admin route
app.use("/api/admin", adminRoute);
//this is one way to make a route but it is not efficient therefore we create a seperate file
// auth-router.js that contains all the code related to routing to make server.js neat
// app.get("/" , (req, res) => {
//     res.status(200).send("Welcome buddy");
// })



const PORT = 5000;

connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at port ${PORT}`);
    })
});
