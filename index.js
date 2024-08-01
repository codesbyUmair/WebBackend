const express = require('express');
const Userrouter = require("./routes/UserRoute");
const Patientrouter = require("./routes/PatientRoute");
const Recipientrouter = require("./routes/RecipientRoute");
const adminRoutes = require("./routes/AdminRoute");
const doctorRoutes = require("./routes/DoctorRoute");
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.listen(3030, ()=>{console.log("Started at 3030")});
app.use(cors());
app.use(express.json());
app.use("/user", Userrouter);
app.use("/patient", Patientrouter);
app.use("/recipient", Recipientrouter);
app.use("/admin", adminRoutes);
app.use('/doctor', doctorRoutes);
mongoose.connect(process.env.MONGODB_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then (()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})