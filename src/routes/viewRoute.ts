import express, { Request, Response, NextFunction } from "express";
import {
  getHomePage,
  getDashboardPage,
  getLoginPage,
  getRegisterPage,
  getAddNotePage,
  getEditNotePage,
  getDeleteNotePage,
} from "../controllers/viewController";
import { auth } from "../middleware/authenticateProd";
const router = express.Router();

// Template Route
router.get("/", getHomePage);

router.get("/login", getLoginPage);

router.get("/register", getRegisterPage);

router.get("/dashboard", auth, getDashboardPage);

router.get("/add-note", getAddNotePage);
router.get("/edit-note", getEditNotePage);
router.get("/delete-note", getDeleteNotePage);

export default router;
