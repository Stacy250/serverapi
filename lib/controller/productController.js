"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProducts = exports.createPorduct = exports.getSingleProduct = exports.getProduct = void 0;
const productModel_1 = require("../model/productModel");
const utils_1 = require("../utils");
async function getProduct(req, res) {
    try {
        const products = await productModel_1.findAll();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(products));
    }
    catch (err) {
        res.end("Products Not Availabe");
    }
}
exports.getProduct = getProduct;
async function getSingleProduct(req, res, id) {
    try {
        const product = await productModel_1.findByid(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: " Product Not Available" }));
        }
        else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.getSingleProduct = getSingleProduct;
async function createPorduct(req, res) {
    try {
        const body = (await utils_1.getData(req));
        const { productName, productDescription, productVarieties } = JSON.parse(body);
        const product = {
            productName,
            productDescription,
            productVarieties,
            dateUploaded: new Date().toString(),
            dateEdited: new Date().toISOString(),
        };
        const newProduct = await productModel_1.create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));
    }
    catch (err) {
        console.log(err);
    }
}
exports.createPorduct = createPorduct;
async function updateProducts(req, res, id) {
    try {
        const product = await productModel_1.findByid(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Not found" }));
        }
        else {
            const body = await utils_1.getData(req);
            const { productName, productDescription, productVarieties } = JSON.parse(body);
            const productData = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productName,
                productVarieties: productVarieties || product.productVarieties,
                dateUploaded: product.dateUploaded,
                dateEdited: new Date().toISOString(),
            };
            const updproduct = await productModel_1.update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updproduct));
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.updateProducts = updateProducts;
async function deleteProduct(req, res, id) {
    try {
        const product = await productModel_1.findByid(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product has been removed" }));
        }
        else {
            await productModel_1.removedelete(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `product ${id} removed` }));
        }
    }
    catch (err) {
        console.log(err);
    }
}
exports.deleteProduct = deleteProduct;
