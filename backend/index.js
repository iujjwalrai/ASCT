const express = require("express");
const http = require("http");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const app = express();
const server = http.createServer(app);
const socketIO = require("socket.io");
const allowedOrigins = [
  "https://asct-frontend.onrender.com",
  "https://asctup.com",
  "https://www.asctup.com"
];
const io = socketIO(server, {
  cors: {
    origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
    credentials: true,
  },
});
const socketHandler = require("./socket/socketController");
socketHandler(io);
app.use(express.json());
app.use(cookieParser());
const fileUpload = require("express-fileupload");

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
const helpdeskRoute = require("./routes/helpdesk");
const queryRoutes = require('./routes/query')
dbConnect();
app.use("/api/v1/contact", contactUsRoute);
app.use("/api/v1/registerPortal", registerRoute);
app.use("/api/v1/LoginPortal", userRoute);
app.use("/api/v1/advocatesList", advocatesListRoute);
app.use("/api/v1/adminPortal", adminRoute);
app.use("/api/v1/paymentPortal", paymentRoute);
app.use("/api/v1/helpdesk",helpdeskRoute);
app.use("/api/v1/query",queryRoutes)
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
server.listen(PORT, ()=>{
    console.log(`Server is running at Port no. ${PORT}`)
});
