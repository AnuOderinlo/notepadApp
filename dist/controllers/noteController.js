"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNote = exports.getAllNotes = exports.createNote = void 0;
const uuid_1 = require("uuid");
const noteModel_1 = require("../models/noteModel");
const userModel_1 = require("../models/userModel");
const utils_1 = require("../utility/utils");
async function createNote(req, res, next) {
    const id = (0, uuid_1.v4)();
    // let todo = {...req.body, id}
    try {
        const verified = req.user;
        const validationResult = utils_1.createNotesSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await noteModel_1.NoteSchema.create({
            id,
            ...req.body,
            user_id: verified.id,
        });
        res.status(201).json({
            msg: "Successfully created a note",
            record,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "failed to create",
            route: "/create",
        });
    }
    //   console.log(req.user);
}
exports.createNote = createNote;
async function getAllNotes(req, res, next) {
    try {
        const limit = req.query?.limit;
        const offset = req.query?.offset;
        //  const record = await NoteSchema.findAll({where: {},limit, offset})
        const record = await noteModel_1.NoteSchema.findAndCountAll({
            limit,
            offset,
            include: [
                {
                    model: userModel_1.UserSchema,
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
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "failed to read",
            route: "/read",
        });
    }
}
exports.getAllNotes = getAllNotes;
async function getNote(req, res, next) {
    try {
        const { id } = req.params;
        const record = await noteModel_1.NoteSchema.findOne({ where: { id } });
        return res.status(200).json({
            msg: "Successfully read a note",
            record,
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "failed to read single todo",
            route: "/read/:id",
        });
    }
}
exports.getNote = getNote;
async function updateNote(req, res, next) {
    try {
        const { id } = req.params;
        const { title, description, dueDate, status } = req.body;
        const validationResult = utils_1.updateNotesSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const record = await noteModel_1.NoteSchema.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to update",
            route: "/update/:id",
        });
    }
}
exports.updateNote = updateNote;
async function deleteNote(req, res, next) {
    try {
        const { id } = req.params;
        const record = await noteModel_1.NoteSchema.findOne({ where: { id } });
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
    }
    catch (error) {
        res.status(500).json({
            msg: "failed to delete",
            route: "/delete/:id",
        });
    }
}
exports.deleteNote = deleteNote;
