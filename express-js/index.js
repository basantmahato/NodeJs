const express = require('express');
const app = express();

const logger = require('./middleware/log');


const port = 5000;

app.use(logger);

app.use((req, res, next) => {
  console.log('Middleware executed');
  next();
});

app.get('/', (req,res)=>{
    res.send("hello world")
    
})


  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
  
  
app.listen(port, ()=>{
    console.log("app is running on port 5000")
})