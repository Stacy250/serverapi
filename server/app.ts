
import http, { IncomingMessage, Server, ServerResponse } from "http";
import { getProduct, getSingleProduct, createPorduct,updateProducts, deleteProduct } from "./controller/productController";
/*
implement your server code here
*/
const port = process.env.PORT || 3005

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
  let change = req.url as string;

  if (change === "/api/products" && req.method === "GET") {
    getProduct(req,res);
  } else if (change.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
    const id = +change.split('/').slice(-1)[0];
    getSingleProduct(req, res, id)

  } else if (change === "/api/products" && req.method === "POST") {
    createPorduct(req,res)

  } else if (change.match(/\api\/products\/([0-9]+)/) && req.method === "PATCH") {
    const id = +change.split('/').slice(-1)[0];
    updateProducts(req, res, id)

  } else if (change.match(/\api\/products\/([0-9]+)/) && req.method === "DELETE") {
     const id = +change.split('/').slice(-1)[0];
    deleteProduct(req, res, id);

  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route Not found" }))
  }

});

server.listen(port, () => {
  console.log("Running on port 3005")
});

























