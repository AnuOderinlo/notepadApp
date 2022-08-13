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
router.get("/notes/:id", noteController_1.getNote);
router.get("/notes", noteController_1.getAllNotes);
router.post("/notes", authenticate_1.auth, noteController_1.createNote);
router.put("/notes/:id", authenticate_1.auth, noteController_1.updateNote);
router.delete("/notes/:id", authenticate_1.auth, noteController_1.deleteNote);
exports.default = router;
