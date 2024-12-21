const express = require("express");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
const fileUpload = require("express-fileupload");
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,               // Allows credentials (cookies)
}));

app.use(
    fileUpload({
      useTempFiles: true, // Enable temporary file storage
      tempFileDir: "/tmp/", // Directory for temporary files
    })
);

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
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
});
app.listen(PORT, ()=>{
    console.log(`Server is running at Port no. ${PORT}`)
});
