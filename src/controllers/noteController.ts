import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../models/noteModel";
// import { UserSchema } from "../models/userModel";
import {
  createNotesSchema,
  updateNotesSchema,
  registerUserSchema,
  loginSchema,
  generateToken,
  options,
} from "../utility/utils";

export async function createNote(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  // let todo = {...req.body, id}
  try {
    const verified = req.user;
    const userId = verified.id;

    const validationResult = createNotesSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const newNote = await Note.create({ owner: userId, ...req.body });
    // const record = await newNote.save();
    res.status(201).json({
      message: "Successfully created a note",
      newNote,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "failed to create",
      route: "/create",
    });
  }

  //   console.log(req.user);
}

export async function getAllNotes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const notes = await Note.find({});

    res.status(200).json({
      status: "success",
      message: "You have successfully fetch all notes",
      notes,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "failed to read",
      route: "/read",
    });
  }
}

export async function getNote(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    return res.status(200).json({
      message: "Successfully read a note",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed to read single note",
      route: "/read/:id",
    });
  }
}

export async function updateNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    const validationResult = updateNotesSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        Error: "Note does not exist",
      });
    }
    const updateNote = await Note.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      message: "You have successfully updated your note",
      updateNote,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to update",
      route: "/update/:id",
    });
  }
}

export async function deleteNote(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const record = await Note.findById(id);
    if (!record) {
      return res.status(404).json({
        message: "Cannot find Note",
      });
    }
    const deletedRecord = await Note.findByIdAndDelete(id);
    return res.status(200).json({
      status: "success",
      message: "Note deleted successfully",
      deletedRecord,
    });
  } catch (error) {
    res.status(500).json({
      msg: "failed to delete",
      route: "/delete/:id",
    });
  }
}
