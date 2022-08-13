"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const sequelize_1 = require("sequelize");
const database_config_1 = __importDefault(require("../config/database.config"));
const noteModel_1 = require("./noteModel");
class UserSchema extends sequelize_1.Model {
}
exports.UserSchema = UserSchema;
UserSchema.init({
    id: {
        type: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
    },
    fullname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "fullname is required",
            },
            notEmpty: {
                msg: "Please provide a first name",
            },
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "email is required",
            },
            isEmail: {
                msg: "Please provide a a valid Email",
            },
        },
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "phone is required",
            },
            notEmpty: {
                msg: "Please provide a phone number",
            },
        },
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "password is required",
            },
            notEmpty: {
                msg: "Please provide a password",
            },
        },
    },
}, {
    sequelize: database_config_1.default,
    tableName: "users",
});
UserSchema.hasMany(noteModel_1.NoteSchema, { foreignKey: "user_id", as: "notes" });
noteModel_1.NoteSchema.belongsTo(UserSchema, { foreignKey: "user_id", as: "users" });
