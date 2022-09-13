"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// import { DataTypes, Model } from "sequelize";
const mongoose_1 = __importStar(require("mongoose"));
// export class UserSchema extends Model<User> {}
const userSchema = new mongoose_1.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        unique: true,
    },
    address: {
        type: String,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    // notes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Note",
    //   },
    // ],
});
exports.User = mongoose_1.default.model("User", userSchema);
// UserSchema.init(
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },
//     fullname: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "fullname is required",
//         },
//         notEmpty: {
//           msg: "Please provide a first name",
//         },
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "email is required",
//         },
//         isEmail: {
//           msg: "Please provide a a valid Email",
//         },
//       },
//     },
//     gender: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "phone is required",
//         },
//         notEmpty: {
//           msg: "Please provide a phone number",
//         },
//       },
//     },
//     address: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       validate: {
//         notNull: {
//           msg: "password is required",
//         },
//         notEmpty: {
//           msg: "Please provide a password",
//         },
//       },
//     },
//   },
//   {
//     sequelize: db,
//     tableName: "users",
//   }
// );
// UserSchema.hasMany(NoteSchema, { foreignKey: "user_id", as: "notes" });
// NoteSchema.belongsTo(UserSchema, { foreignKey: "user_id", as: "users" });
