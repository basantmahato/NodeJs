
const fs = require('fs');

const logger = (req, res, next)=>{

    console.log('Log Middleware executed ');

    fs.appendFile('./log.txt', `${new Date().toISOString()} ${req.ip}${req.method} ${req.url}\n`,(err)=>{
      if(err){
        console.log(err)
        return next(err)}
      
    })
    next();


}

module.exports = logger;