import express, { Request, Response, NextFunction } from "express";
import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import { auth } from "../middleware/authenticateProd";
const router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.send("respond with a resource");
  res.status(200).json({
    status: "Success",
    Message: "Successfully created a route",
  });
});

router.get("/notes/:id", getNote);
router.get("/notes", getAllNotes);
router.post("/notes", auth, createNote);
router.put("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);

export default router;
