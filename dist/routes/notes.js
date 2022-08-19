"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    // res.send("respond with a resource");
    res.status(200).json({
        status: "Success",
        Message: "Successfully created a route",
    });
});
// router.get("/notes/:id", getNote);
// router.get("/notes", getAllNotes);
// router.post("/notes", auth, createNote);
// router.put("/notes/:id", auth, updateNote);
// router.delete("/notes/:id", auth, deleteNote);
router.route("/notes").get(noteController_1.getAllNotes).post(authenticate_1.auth, noteController_1.createNote);
router
    .route("/notes/:id")
    .get(noteController_1.getNote)
    .put(authenticate_1.auth, noteController_1.updateNote)
    .delete(authenticate_1.auth, noteController_1.deleteNote);
exports.default = router;
