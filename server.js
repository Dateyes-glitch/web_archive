const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

// MIME type mapping
const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.mp4': 'video/mp4',
    '.mp3': 'audio/mpeg',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    
    // Default page
    if (filePath === './') {
        filePath = './index.html';
    }
    
    // Get file extension
    const extname = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';
    
    // Read file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html>
                        <head>
                            <title>404 - Page Not Found</title>
                            <style>
                                body { 
                                    font-family: 'VT323', monospace; 
                                    background: #000; 
                                    color: #00ff00; 
                                    text-align: center; 
                                    padding: 50px;
                                }
                                h1 { text-shadow: 0 0 10px #00ff00; }
                            </style>
                        </head>
                        <body>
                            <h1>404 - Page Not Found</h1>
                            <p>Requested file not found: ${filePath}</p>
                            <a href="/" style="color: #00ff00;">Back to Home</a>
                        </body>
                    </html>
                `);
            } else {
                // Server error
                res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8' });
                res.end(`
                    <html>
                        <head>
                            <title>500 - Server Error</title>
                            <style>
                                body { 
                                    font-family: 'VT323', monospace; 
                                    background: #000; 
                                    color: #ff6b6b; 
                                    text-align: center; 
                                    padding: 50px;
                                }
                                h1 { text-shadow: 0 0 10px #ff6b6b; }
                            </style>
                        </head>
                        <body>
                            <h1>500 - Server Error</h1>
                            <p>Internal server error</p>
                            <a href="/" style="color: #00ff00;">Back to Home</a>
                        </body>
                    </html>
                `);
            }
        } else {
            // Success response
            res.writeHead(200, { 
                'Content-Type': contentType + (contentType.includes('text') ? '; charset=utf-8' : ''),
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, HOST, () => {
    console.log(`🚀 Retro Website Server Started!`);
    console.log(`📍 Address: http://${HOST}:${PORT}`);
    console.log(`🎮 Password: retro2024`);
    console.log(`📁 Working Directory: ${__dirname}`);
    console.log(`⏰ Start Time: ${new Date().toLocaleString('en-US')}`);
    console.log(`\n🎵 Features:`);
    console.log(`   - Main page uses bong copy.mp4 as background`);
    console.log(`   - Hello Kitty video as interactive button`);
    console.log(`   - Password verification system (password: retro2024)`);
    console.log(`   - Main page displays all MP4 files`);
    console.log(`   - Mouse drawing interaction support`);
    console.log(`   - Click videos to play corresponding audio`);
    console.log(`\n⌨️  Shortcuts:`);
    console.log(`   - Ctrl + Mouse: Activate canvas drawing`);
    console.log(`   - E: Toggle eraser mode`);
    console.log(`   - Ctrl + C: Clear canvas`);
    console.log(`   - Ctrl + F: Toggle fullscreen`);
    console.log(`   - Esc: Close video info`);
    console.log(`\n🛑 Press Ctrl+C to stop server`);
});

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('\n🛑 Shutting down server...');
    server.close(() => {
        console.log('✅ Server closed');
        process.exit(0);
    });
});

// Error handling
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use, try another port`);
    } else {
        console.error('❌ Server error:', error);
    }
    process.exit(1);
}); 