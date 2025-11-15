const express = require("express");
const connectDB = require("./db/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 3000;

connectDB()
app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.use('/api/auth', authRoutes)

app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`);

})