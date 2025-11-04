const http = require('http');
const fs = require('fs');

const url = require('url')

const server = http.createServer((req, res) => {

    const log = `${Date.now()} ${req.url} :  New req recieved \n`
    const myUrl = url.parse(req.url,true)
    console.log(myUrl)
    fs.appendFile("log.txt", log,(err,data)=>{
        switch(myUrl.pathname){
            case'/': res.end('Homepage')
            break;
            case'/about':   const qp = myUrl.query.name
            
            res.end(`About Page ${qp}`)
          
            break;

            case "/search":
                const search = myUrl.query.search_query;
                res.end("here are your results for " + search)

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

