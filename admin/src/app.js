const express = require("express")
const app = express()
const {config} = require("dotenv")
config()
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
const PORT= process.env.PORT
app.get("/admin",(req,res)=>{
    res.send("This is Admin api")
})

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const server = http.createServer(app);

    server.listen(PORT);

    console.log(`Worker ${process.pid} started`);
    
}



// const PORT= 3001





// app.listen(PORT,(err)=>{
//     if(!err){
//         console.log("API Auth is running on port " + PORT);
//     }
// })