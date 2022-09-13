import { DataTypes, Model } from "sequelize";
import mongoose, { Schema } from "mongoose";

import db from "../config/database.config";

interface Note {
  id: string;
  user_id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

const noteSchema = new Schema({
  title: {
    type: String,
    required: [true, "A title is needed"],
    unique: true,
  },
  description: {
    type: String,
    required: [true, "A description is needed"],
  },
  status: {
    type: String,
    default: "Pending",
  },
  dueDate: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Note = mongoose.model("Note", noteSchema);

// export class NoteSchema extends Model<Note> {}

// NoteSchema.init(
//   {
//     id: {
//       type: DataTypes.UUIDV4,
//       primaryKey: true,
//       allowNull: false,
//     },

//     user_id: {
//       type: DataTypes.STRING,
//     },

//     title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     dueDate: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     tableName: "notes",
//   }
// );
