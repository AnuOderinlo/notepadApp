"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authenticateProd_1 = require("../middleware/authenticateProd");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", function (req, res, next) {
    // res.send("respond with a resource");
    res.status(200).json({
        status: "Success",
        Message: "Successfully created a route",
    });
});
router.get("/users/:id", userController_1.getUser);
router.get("/users", userController_1.getAllUsers);
router.post("/users", userController_1.createUser);
router.put("/users/:id", userController_1.updateUser);
router.delete("/users/:id", userController_1.deleteUser);
router.post("/login", userController_1.loginUser);
router.get("/logout", authenticateProd_1.auth, userController_1.logoutUser);
exports.default = router;
