import fs from "fs"
import { IncomingMessage, ServerResponse } from "http";

interface Oj {
    [key: string] :string|number|{[key:string]:string}
}

export function writeTodatabase(filename: string, content:Oj) {
    fs.writeFileSync(filename, JSON.stringify(content, null, 4), "utf8")
}
export async function getData(req: IncomingMessage) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on('data', (chunk) => {
                body += chunk.toString();

            });
            req.on("end", () => {
                resolve(body)
            })
        } catch (err) {
            console.log(err);
        }
    })
}