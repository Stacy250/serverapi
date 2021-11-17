import {writeTodatabase} from "../utils"

interface obj {
    [key:string]: string| string[]
}
type identity ={
    [keys: string]:number
}
const products = require("../../data/product")

export function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products);
    })
}

function generateid() {
    let id;
    if (products.length === 0) {
        id =1
    } else {
        id = +(products[products.length-1].id)+1
    }
    return id
}

export function findByid(id: number) {
    return new Promise((resolve, reject) => {
        const product = products.find((el: identity) => el.id === id)
        resolve(product)
        
    })
}

export function create(item: obj[]) {
    return new Promise((resolve, reject) => {
        const newitems = { id: generateid(),...item }
        products.push(newitems)
        writeTodatabase("./data/product.json", products)
        resolve(newitems)
    })
}

export function update(id: number, product: obj) {
    return new Promise((resolve, reject) => {
       const index = products.findIndex((el:identity)=>el.id === id)
       product[index] = { id, ...product } as any
        writeTodatabase("./data/product.json", products);
        resolve(products[index]);
    })
}
export function removedelete(id: number) {
    return new Promise((resolve, reject) =>{
   products:[] = products.filter((p: any) => p.id !== id)
   writeTodatabase("./data/product.json", products);
        resolve(null);
    })
}