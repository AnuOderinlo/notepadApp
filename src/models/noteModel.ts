import { DataTypes, Model } from "sequelize";

import db from "../config/database.config";

interface Note {
  id: string;
  user_id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
}

export class NoteSchema extends Model<Note> {}

NoteSchema.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.STRING,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "notes",
  }
);
