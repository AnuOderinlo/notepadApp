"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = require("../models/userModel");
const secret = process.env.JWT_SECRET;
async function auth(req, res, next) {
    try {
        const authorization = req.headers.authorization;
        let token;
        if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }
        else {
            return res.redirect("/login");
        }
        // if the token is present in cookies
        let verified = jsonwebtoken_1.default.verify(token, secret);
        if (!verified) {
            return res.status(401).json({
                Error: "User not verified, you cant access this route",
            });
        }
        const { id } = verified;
        const user = await userModel_1.UserSchema.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({
                Error: "User not verified",
            });
        }
        req.user = verified;
        next();
    }
    catch (error) {
        return res.status(403).json({
            Error: "User not logged in",
        });
    }
}
exports.auth = auth;
// exports.logout = (req: Request | any, res: Response, next: NextFunction) => {};
