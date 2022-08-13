"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const viewController_1 = require("../controllers/viewController");
const authenticate_1 = require("../middleware/authenticate");
const router = express_1.default.Router();
// Template Route
router.get("/", viewController_1.getHomePage);
router.get("/login", viewController_1.getLoginPage);
router.get("/register", viewController_1.getRegisterPage);
router.get("/dashboard", authenticate_1.auth, viewController_1.getDashboardPage);
router.get("/add-note", viewController_1.getAddNotePage);
router.get("/edit-note", viewController_1.getEditNotePage);
router.get("/delete-note", viewController_1.getDeleteNotePage);
exports.default = router;
