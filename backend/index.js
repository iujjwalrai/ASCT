const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const PORT = process.env.PORT || 5000
const contactUsRoute = require("./routes/contactUs");
const  {dbConnect} = require("./config/database");

dbConnect();
app.use("/api/v1/contact", contactUsRoute);


app.get("/", (req,res)=>{
    res.status(200).json({
        message: "Welcome to the ASCT-UP API"
    })
});


app.listen(PORT, ()=>{
    console.log(`Server is running at Port no. ${PORT}`)
});
