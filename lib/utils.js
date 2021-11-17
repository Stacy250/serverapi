"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.writeTodatabase = void 0;
const fs_1 = __importDefault(require("fs"));
function writeTodatabase(filename, content) {
    fs_1.default.writeFileSync(filename, JSON.stringify(content, null, 4), "utf8");
}
exports.writeTodatabase = writeTodatabase;
async function getData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {
                resolve(body);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.getData = getData;
