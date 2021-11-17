import http, { IncomingMessage, ServerResponse } from "http";
import { findAll, findByid, create, update, removedelete } from "../model/productModel";
import { getData } from "../utils";

interface Oj {
    [key: string]: string | number | { [key: string]: string };
}


export async function getProduct(req: IncomingMessage, res: ServerResponse) {
    try {
        const products = await findAll();
        res.writeHead(200, { "Content-Type": "application/json" })
        res.end(JSON.stringify(products))
    } catch (err) {
        res.end("Products Not Availabe")
    }
}

export async function getSingleProduct(req: IncomingMessage, res: ServerResponse, id: number) {
    try {
        const product = await findByid(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: " Product Not Available" }));
        } else {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product))
        }
    } catch (err) {
        console.log(err)
    }
}

export async function createPorduct(req: IncomingMessage, res: ServerResponse) {
    try {
        const body = (await getData(req)) as string;
        const { productName, productDescription, productVarieties } =
            JSON.parse(body);
        const product: any = {
            productName,
            productDescription,
            productVarieties,
            dateUploaded: new Date().toString(),
            dateEdited: new Date().toISOString(),
        };
        const newProduct = await create(product);
        res.writeHead(201, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(newProduct));   
    } catch (err) {
        console.log(err)
    }
}

export async function updateProducts(req: IncomingMessage, res: ServerResponse, id: number) {
    try {
        const product:any = await findByid(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Not found" }));
        } else {
            const body: any = await getData(req);
            const { productName, productDescription, productVarieties } =
                JSON.parse(body);
            const productData = {
                productName: productName || product.productName,
                productDescription: productDescription || product.productName,
                productVarieties: productVarieties || product.productVarieties,
                dateUploaded: product.dateUploaded,
                dateEdited: new Date().toISOString(),
            };
            const updproduct = await update(id, productData);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify(updproduct));
        }
        } catch (err) {
        console.log(err);
    }
        
    } 


export async function deleteProduct(req: IncomingMessage, res: ServerResponse, id: number) {
    try {
        const product = await findByid(id);
        if (!product) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: "Product has been removed" }));

        } else {
            await removedelete(id);
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: `product ${id} removed` }));
        }
    } catch (err) {
        console.log(err)
    }
}