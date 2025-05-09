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
exports.adminRegister = void 0;
const admin_model_1 = __importDefault(require("../models/admin.model"));
const findService_1 = require("../service/findService");
const passwordService_1 = require("../service/passwordService");
const resHandler_1 = require("../../responseHandlers/resHandler");
const adminRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, name } = req.body;
        let admin = yield (0, findService_1.findAdmin)('', email);
        if (admin) {
            (0, resHandler_1.handleResponse)(res, 400, "Admin Already exists", null);
            return;
        }
        const salt = yield (0, passwordService_1.generateSalt)();
        const adminPassword = yield (0, passwordService_1.GeneratePassword)(password, salt);
        admin = new admin_model_1.default({
            name: name,
            email: email,
            password: adminPassword,
            salt: salt
        });
        yield admin.save();
        //JWT TOKEN CREATION
        const token = (0, passwordService_1.GenerateSignature)(admin.id);
        res.cookie("wiarm_admin_auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });
        return (0, resHandler_1.handleResponse)(res, 201, "Admin created successfully", admin);
    }
    catch (err) {
        next(err);
    }
});
exports.adminRegister = adminRegister;
