"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
router.get("/notes/:id", noteController_1.getNote);
// router.get("/notes", getAllNotes);
// router.post("/notes", auth, createNote);
router.patch("/notes/:id", authenticate_1.auth, noteController_1.updateNote);
router.delete("/notes/:id", authenticate_1.auth, noteController_1.deleteNote);
router.route("/notes").get(noteController_1.getAllNotes).post(authenticate_1.auth, noteController_1.createNote);
// router
//   .route("/notes/:id")
//   .get(getNote)
//   .patch(auth, updateNote)
//   .delete(auth, deleteNote);
exports.default = router;
