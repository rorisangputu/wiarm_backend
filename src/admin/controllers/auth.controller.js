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
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminLogin = void 0;
const findService_1 = require("../service/findService");
const resHandler_1 = require("../../responseHandlers/resHandler");
const passwordService_1 = require("../service/passwordService");
const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const admin = yield (0, findService_1.findAdmin)(email);
        if (!admin) {
            (0, resHandler_1.handleResponse)(res, 400, "No match found with that Email/Password", null);
            return;
        }
        const isMatch = yield (0, passwordService_1.passwordCompare)(password, admin.password);
        if (!isMatch) {
            (0, resHandler_1.handleResponse)(res, 400, "No match found with that Email/Password", null);
            return;
        }
    }
    catch (error) {
        next(error);
    }
});
exports.adminLogin = adminLogin;
