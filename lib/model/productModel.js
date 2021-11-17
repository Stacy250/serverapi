"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removedelete = exports.update = exports.create = exports.findByid = exports.findAll = void 0;
const utils_1 = require("../utils");
const products = require("../../data/product");
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    });
}
exports.findAll = findAll;
function generateid() {
    let id;
    if (products.length === 0) {
        id = 1;
    }
    else {
        id = +(products[products.length - 1].id) + 1;
    }
    return id;
}
function findByid(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((el) => el.id === id);
        resolve(product);
    });
}
exports.findByid = findByid;
function create(item) {
    return new Promise((resolve, reject) => {
        const newitems = { id: generateid(), ...item };
        products.push(newitems);
        utils_1.writeTodatabase("./data/product.json", products);
        resolve(newitems);
    });
}
exports.create = create;
function update(id, product) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((el) => el.id === id);
        product[index] = { id, ...product };
        utils_1.writeTodatabase("./data/product.json", products);
        resolve(products[index]);
    });
}
exports.update = update;
function removedelete(id) {
    return new Promise((resolve, reject) => {
        products: [] = products.filter((p) => p.id !== id);
        utils_1.writeTodatabase("./data/product.json", products);
        resolve(null);
    });
}
exports.removedelete = removedelete;
