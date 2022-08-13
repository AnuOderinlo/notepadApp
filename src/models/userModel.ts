import { DataTypes, Model } from "sequelize";

import db from "../config/database.config";
import { NoteSchema } from "./noteModel";

interface User {
  id: string;
  fullname: string;
  email: string;
  gender: string;
  phone: string;
  address: string;
  password: string;
}

export class UserSchema extends Model<User> {}

UserSchema.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    fullname: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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
  },
  {
    sequelize: db,
    tableName: "users",
  }
);

UserSchema.hasMany(NoteSchema, { foreignKey: "user_id", as: "notes" });

NoteSchema.belongsTo(UserSchema, { foreignKey: "user_id", as: "users" });
