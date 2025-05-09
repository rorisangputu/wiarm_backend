"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = __importDefault(require("./services/db"));
const expressApp_1 = __importDefault(require("./services/expressApp"));
const app = (0, express_1.default)();
const StartServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const PORT = process.env.PORT || 3000;
    yield (0, expressApp_1.default)(app);
    yield (0, db_1.default)();
    app.listen(3000, () => {
        console.log(`Running app on port ${PORT}`);
    });
});
StartServer();
