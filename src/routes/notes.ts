import express, { Request, Response, NextFunction } from "express";
import {
  createNote,
  getAllNotes,
  getNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import { auth } from "../middleware/authenticate";
const router = express.Router();

router.get("/notes/:id", getNote);
// router.get("/notes", getAllNotes);
// router.post("/notes", auth, createNote);
router.patch("/notes/:id", auth, updateNote);
router.delete("/notes/:id", auth, deleteNote);

router.route("/notes").get(getAllNotes).post(auth, createNote);
// router
//   .route("/notes/:id")
//   .get(getNote)
//   .patch(auth, updateNote)
//   .delete(auth, deleteNote);

export default router;
