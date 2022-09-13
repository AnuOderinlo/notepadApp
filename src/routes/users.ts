import express, { Request, Response, NextFunction } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import { auth } from "../middleware/authenticate";
const router = express.Router();

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
// router.patch("/users/:id", updateUser);
// router.delete("/users/:id", deleteUser);
router.post("/login", loginUser);
router.get("/logout", auth, logoutUser);

router.route("/users").get(getAllUsers).post(createUser);
router.route("/users/:id").get(getUser).patch(updateUser).delete(deleteUser);

export default router;
