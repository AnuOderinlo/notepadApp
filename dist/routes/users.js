"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
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
// router.get("/users/:id", getUser);
// router.get("/users", getAllUsers);
// router.post("/users", createUser);
// router.put("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);
router.post("/login", userController_1.loginUser);
router.get("/logout", authenticate_1.auth, userController_1.logoutUser);
router.route("/users").get(userController_1.getAllUsers).post(userController_1.createUser);
router.route("/users:id").get(userController_1.getUser).put(userController_1.updateUser).delete(userController_1.deleteUser);
exports.default = router;
