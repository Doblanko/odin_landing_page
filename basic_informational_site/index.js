const http = require('http');
const path = require('path');
const fs = require('fs');

const serverPort = process.env.PORT || 8080;

const handleClientRequest = (req, res) => {
    // Build filepath
    let filePath = path.join(
        __dirname, 'public',
        req.url === '/' ? 'index.html' : req.url
    );

    // Extension of file
    let extName = path.extname(filePath)

    // Initial content type
    let contentType = 'text/html';
    // Check ext and set content type
    switch(extName) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css'
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    // Read file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            // Error
            if(err.code == 'ENOENT') {
                // Page not found
                fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                    res.writeHead(200, { 'Content-Type': 'text/html'});
                    res.end(content, 'utf8');
                });
            } else {
                // Some server error
                res.writeHead(500);
                res.end(`Server Error ${error.code}`)
            }
        } else {
            // Success
            res.writeHead(200, { 'Content-Type': contentType});
            res.end(content);
        }
    })
};

const server = http.createServer(handleClientRequest);
server.listen(serverPort, () => console.log(`Server running on port ${serverPort}`))