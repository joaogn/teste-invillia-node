"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
class App {
    constructor() {
        this.server = express_1.default();
        this.middlerware();
        this.routes();
    }
    middlerware() {
        this.server.use(express_1.default.json());
        this.server.use(cors_1.default());
    }
    routes() {
        this.server.use(routes_1.default);
    }
}
exports.default = new App().server;
