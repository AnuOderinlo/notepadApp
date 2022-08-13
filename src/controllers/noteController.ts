import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import { NoteSchema } from "../models/noteModel";
import { UserSchema } from "../models/userModel";
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

    const validationResult = createNotesSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await NoteSchema.create({
      id,
      ...req.body,
      user_id: verified.id,
    });
    res.status(201).json({
      msg: "Successfully created a note",
      record,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "failed to create",
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
    const limit = req.query?.limit as number | undefined;
    const offset = req.query?.offset as number | undefined;
    //  const record = await NoteSchema.findAll({where: {},limit, offset})
    const record = await NoteSchema.findAndCountAll({
      limit,
      offset,
      include: [
        {
          model: UserSchema,
          attributes: ["id", "fullname", "email", "phone"],
          as: "users",
        },
      ],
    });
    return res.status(200).json({
      status: "success",
      message: "You have successfully fetch all notes",
      count: record.count,
      record: record.rows,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "failed to read",
      route: "/read",
    });
  }
}

export async function getNote(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;
    const record = await NoteSchema.findOne({ where: { id } });
    return res.status(200).json({
      msg: "Successfully read a note",
      record,
    });
  } catch (error) {
    return res.status(500).json({
      msg: "failed to read single todo",
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
    const { title, description, dueDate, status } = req.body;
    const validationResult = updateNotesSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await NoteSchema.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "Note does not exist",
      });
    }
    const updatedrecord = await record.update({
      title: title,
      description: description,
      dueDate: dueDate,
      status: status,
    });
    res.status(200).json({
      status: "success",
      message: "You have successfully updated your note",
      updatedrecord,
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
    const record = await NoteSchema.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        message: "Cannot find Note",
      });
    }
    const deletedRecord = await record.destroy();
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
