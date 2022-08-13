"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.generateToken = exports.loginSchema = exports.registerUserSchema = exports.updateNotesSchema = exports.createNotesSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.createNotesSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase().required(),
    description: joi_1.default.string().lowercase().required(),
    dueDate: joi_1.default.string().lowercase().required(),
    status: joi_1.default.string().lowercase().required(),
});
exports.updateNotesSchema = joi_1.default.object().keys({
    title: joi_1.default.string().lowercase(),
    description: joi_1.default.string().lowercase(),
    dueDate: joi_1.default.string().lowercase(),
    status: joi_1.default.string().lowercase(),
});
exports.registerUserSchema = joi_1.default.object()
    .keys({
    fullname: joi_1.default.string().required(),
    email: joi_1.default.string().trim().lowercase().required(),
    phone: joi_1.default.string()
        .length(11)
        .pattern(/^[0-9]+$/)
        .required(),
    gender: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: joi_1.default.ref("password"),
})
    .with("password", "confirm_password");
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().trim().lowercase().required(),
    password: joi_1.default.string().regex(/^[a-zA-Z0-9]{3,30}$/),
});
const generateToken = (user) => {
    const secret = process.env.JWT_SECRET;
    const expires = process.env.JWT_EXPIRES_IN;
    // console.log(process.env);
    console.log(jsonwebtoken_1.default.sign(user, secret, { expiresIn: expires }));
    return jsonwebtoken_1.default.sign(user, secret, { expiresIn: expires });
};
exports.generateToken = generateToken;
// generateToken({id: })
exports.options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
