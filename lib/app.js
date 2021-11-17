"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const productController_1 = require("./controller/productController");
/*
implement your server code here
*/
const port = process.env.PORT || 3005;
const server = http_1.default.createServer((req, res) => {
    let change = req.url;
    if (change === "/api/products" && req.method === "GET") {
        productController_1.getProduct(req, res);
    }
    else if (change.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        const id = +change.split('/').slice(-1)[0];
        productController_1.getSingleProduct(req, res, id);
    }
    else if (change === "/api/products" && req.method === "POST") {
        productController_1.createPorduct(req, res);
    }
    else if (change.match(/\api\/products\/([0-9]+)/) && req.method === "PATCH") {
        const id = +change.split('/').slice(-1)[0];
        productController_1.updateProducts(req, res, id);
    }
    else if (change.match(/\api\/products\/([0-9]+)/) && req.method === "DELETE") {
        const id = +change.split('/').slice(-1)[0];
        productController_1.deleteProduct(req, res, id);
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Route Not found" }));
    }
});
server.listen(port, () => {
    console.log("Running on port 3005");
});
