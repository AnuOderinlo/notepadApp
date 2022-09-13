"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mongoose_1 = __importDefault(require("mongoose"));
const db = new sequelize_1.Sequelize("app", "", "", {
    storage: "./database.sqlite3",
    dialect: "sqlite",
    logging: false,
});
const DB = process.env.DATABASE;
mongoose_1.default.connect(DB).then((con) => {
    // console.log(con.connections);
    console.log("Database successfully connected");
});
exports.default = db;
