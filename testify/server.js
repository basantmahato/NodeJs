const express = require("express");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const cors = require("cors");



const app = express();
app.use(cors());
const port = 5000;

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes)
app.use('/api/user', userRoutes)
app.use('/api/admin', adminRoutes)



app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`);

})