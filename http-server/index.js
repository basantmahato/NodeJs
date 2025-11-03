const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const log = `${Date.now()} ${req.url} :  New req recieved \n`
    fs.appendFile("log.txt", log,(err,data)=>{
        switch(req.url){
            case'/': res.end('Homepage')
            break;
            case'/about': res.end('About Page')
            break;
            case'/contact': res.end('Contact Page')
            break;
            default : res.end('Page not found')
        }
    })
});
server.listen(3000,()=>{
    console.log('server is listening on port 3000')
})

