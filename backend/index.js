const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'https://asct-frontend.onrender.com/', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,               // Allows credentials (cookies)
  }));
  
require("dotenv").config();
const PORT = process.env.PORT || 5000
const contactUsRoute = require("./routes/contactUs");
const  {dbConnect} = require("./config/database");
const registerRoute = require("./routes/register");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin")
const advocatesListRoute = require("./routes/advocatesList");
const paymentRoute = require("./routes/payment");
dbConnect();
app.use("/api/v1/contact", contactUsRoute);
app.use("/api/v1/registerPortal", registerRoute);
app.use("/api/v1/LoginPortal", userRoute);
app.use("/api/v1/advocatesList", advocatesListRoute);
app.use("/api/v1/adminPortal", adminRoute);
app.use("/api/v1/paymentPortal", paymentRoute);
app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Welcome to the ASCT-UP API"
    })
});

app.listen(PORT, ()=>{
    console.log(`Server is running at Port no. ${PORT}`)
});
