const http = require("node:http");
const fs = require('node:fs');
const server = http.createServer();
server.on('request',(req,res)=>{
    const result = fs.readFileSync('./test.txt');
    res.setHeader('Content-Type','text/plain');
    res.end(result);
});

server.listen(5000,"127.0.0.1",()=>{
    console.log("server started on port ",server.address());
})



