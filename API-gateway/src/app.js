const express = require("express")
const { createProxyMiddleware } = require("http-proxy-middleware")

const app = express()

const routes = {
    "/admin": "http://localhost:3000",
    "/auth": "http://localhost:3001",
    "/friend": "http://localhost:3002",
    "/post": "http://localhost:3003",
    "/user": "http://localhost:3004",
}

for (const route in routes) {
    const target = routes[route]
    app.use(route, createProxyMiddleware({ target, changeOrigin: true }))
    console.log(route.toString(), target)
}
const PORT = 8080
app.listen(PORT, (err) => {
    if (!err) {
        console.log("API Gateway is running on port " + PORT);
    }
})