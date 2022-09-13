"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const userModel_1 = require("../models/userModel");
const utils_1 = require("../utility/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
/**
 * Create User API
 * @param req
 * @param res
 * @param next
 */
async function createUser(req, res, next) {
    try {
        const validationResult = utils_1.registerUserSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const duplicateEmail = await userModel_1.User.findOne({ email: req.body.email }).exec();
        if (duplicateEmail) {
            return res.status(409).json({
                message: "Email is used, please change email",
            });
        }
        const duplicatePhone = await userModel_1.User.findOne({ phone: req.body.phone }).exec();
        if (duplicatePhone) {
            return res.status(409).json({
                msg: "Phone number is used",
            });
        }
        const passwordHash = await bcryptjs_1.default.hash(req.body.password, 8);
        const ConfirmPasswordHash = await bcryptjs_1.default.hash(req.body.confirm_password, 8);
        const userData = {
            fullname: req.body.fullname,
            email: req.body.email,
            gender: req.body.gender,
            phone: req.body.phone,
            address: req.body.address,
            password: passwordHash,
            confirm_password: ConfirmPasswordHash,
        };
        const userDetails = await userModel_1.User.create(userData);
        const id = userDetails._id;
        const token = (0, utils_1.generateToken)({ id });
        console.log(`The user ID is ${id}`);
        res.status(201).json({
            status: "Success",
            token,
            message: "Successfully created a user",
            data: userDetails,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: "Failed",
            Message: "Unable to create a user",
        });
    }
}
exports.createUser = createUser;
/**
 * Get All Users API
 * @param req
 * @param res
 * @param next
 */
async function getAllUsers(req, res, next) {
    try {
        const userDetails = await userModel_1.User.find({});
        res.status(201).json({
            status: "Success",
            message: "Successfully get all users",
            data: userDetails,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            Message: "Something went all",
        });
    }
}
exports.getAllUsers = getAllUsers;
/**
 * Get a user API
 * @param req
 * @param res
 * @param next
 */
async function getUser(req, res, next) {
    const { id } = req.params;
    try {
        const userDetails = await userModel_1.User.findById(id);
        res.status(201).json({
            status: "Success",
            message: "Successfully get a user",
            data: userDetails,
        });
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            // Message: "Something went all",
            Message: error,
        });
    }
}
exports.getUser = getUser;
/**
 * Create User API
 * @param req
 * @param res
 * @param next
 */
async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const userDetails = await userModel_1.User.findById(id);
        // const { fullname, email, gender, phone, address } = req.body;
        if (userDetails) {
            const userUpdate = await userModel_1.User.findByIdAndUpdate(id, req.body, {
                new: true,
                runValidators: true,
            });
            res.status(201).json({
                status: "Success",
                message: "Successfully updated a user",
                data: userUpdate,
            });
        }
        else {
            res.json({
                status: "failed",
                message: "User not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            Message: "Unable to update user",
        });
    }
}
exports.updateUser = updateUser;
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const userDetails = await userModel_1.User.findById(id);
        if (!userDetails) {
            res.status(404).json({
                status: "failed",
                message: "Can't find user",
            });
        }
        else {
            const deletedUser = await userModel_1.User.findByIdAndDelete(id);
            res.status(203).json({
                status: "Success",
                message: "Successfully Deleted a user",
                data: deletedUser,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            Message: "Unable to delete User",
        });
    }
}
exports.deleteUser = deleteUser;
/**
 * THE LOGIN API
 * @param req
 * @param res
 * @param next
 * @returns
 */
async function loginUser(req, res, next) {
    // const id = uuidv4();
    try {
        const validationResult = utils_1.loginSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const user = await userModel_1.User.findOne({ email: req.body.email }).exec();
        if (!user) {
            return res.status(401).json({
                message: "User does not exist or Email is not correct",
            });
        }
        const { id } = user;
        const token = (0, utils_1.generateToken)({ id });
        const validPassword = await bcryptjs_1.default.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Password is not correct",
            });
        }
        else if (req.body.email !== user.email) {
            return res.status(401).json({
                message: "Email is not correct",
            });
        }
        if (validPassword) {
            console.log(req.cookies);
            return res
                .cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            })
                .status(200)
                .json({
                message: "Successfully logged in",
                token,
                user,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            message: "failed to login",
            route: "/login",
        });
    }
}
exports.loginUser = loginUser;
async function logoutUser(req, res, next) {
    return res
        .clearCookie("jwt")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}
exports.logoutUser = logoutUser;
