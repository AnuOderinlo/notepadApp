import { Sequelize } from "sequelize";
import mongoose from "mongoose";

const db = new Sequelize("app", "", "", {
  storage: "./database.sqlite3",
  dialect: "sqlite",
  logging: false,
});

const DB: any = process.env.DATABASE;

mongoose.connect(DB).then((con) => {
  // console.log(con.connections);
  console.log("Database successfully connected");
});

export default db;
