const http = require('http')
const fs = require('fs')
const path = require('path')

const port = 3000;

const allowedFiles = ['index.html', 'server.html', '404.html'];

const server = http.createServer((req, res) => {
    let requestedFile = req.url === '/' ? 'index.html' : req.url.slice(1);
    
    // Check if requested file is allowed
    if (!allowedFiles.includes(requestedFile)) {
        requestedFile = '404.html';
    }

    const filePath = path.join(__dirname, 'public', requestedFile)

    // Determine content type
    const extname = path.extname(filePath)
    let contentType = 'text/html'; // default
    switch (extname) {
        case '.js':
            contentType = 'text/javascript'
            break
        case '.css':
            contentType = 'text/css'
            break
        case '.json':
            contentType = 'application/json'
            break
        case '.png':
            contentType = 'image/png'
            break
        case '.jpg':
        case '.jpeg':
            contentType = 'image/jpeg'
            break
        case '.gif':
            contentType = 'image/gif'
            break
    }

    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Serve 404 page in case of error
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err404, content404) => {
                res.writeHead(404, { 'Content-Type': 'text/html' })
                res.end(content404 || '404 Not Found', 'utf-8')
            })
        } else {
            res.writeHead(200, { 'Content-Type': contentType })
            res.end(content, 'utf-8')
        }
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
