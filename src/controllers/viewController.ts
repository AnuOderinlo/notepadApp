import { Request, Response, NextFunction } from "express";
import { NoteSchema } from "../models/noteModel";

// Get home page
export async function getHomePage(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  // Get all notes from db
  const notes = await NoteSchema.findAll();
  console.log(req.cookies.jwt.id);

  res.status(200).render("index", {
    title: "All notes",
    notes,
  });
}

// get Dashboard page
export async function getDashboardPage(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const verified = req.user;
  console.log(verified.id);

  const notes = await NoteSchema.findAll({
    where: {
      user_id: verified.id,
    },
  });
  res.status(200).render("dashboard", {
    title: "All notes",
    notes,
  });
  // res.status(200).render("dashboard");
}

// get login page
export async function getLoginPage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).render("login");
}

// get register page
export async function getRegisterPage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).render("register");
}

export async function getAddNotePage(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(200).render("addNote");
}

export async function getEditNotePage(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const { id } = req.query;
  // console.log(req.query.id);

  const note = await NoteSchema.findOne({ where: { id } });
  // console.log(note);

  res.status(200).render("editNote", {
    title: "All notes",
    note,
  });
}

export async function getDeleteNotePage(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const { id } = req.query;
  // console.log(req.query.id);

  const note = await NoteSchema.findOne({ where: { id } });
  res.status(200).render("deleteNote", {
    title: "All notes",
    note,
  });
}
