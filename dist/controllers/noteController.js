"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.getNote = exports.getAllNotes = exports.createNote = void 0;
const uuid_1 = require("uuid");
const noteModel_1 = require("../models/noteModel");
// import { UserSchema } from "../models/userModel";
const utils_1 = require("../utility/utils");
async function createNote(req, res, next) {
    const id = (0, uuid_1.v4)();
    // let todo = {...req.body, id}
    try {
        const verified = req.user;
        const userId = verified.id;
        const validationResult = utils_1.createNotesSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const newNote = await noteModel_1.Note.create({ owner: userId, ...req.body });
        // const record = await newNote.save();
        res.status(201).json({
            message: "Successfully created a note",
            newNote,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            message: "failed to create",
            route: "/create",
        });
    }
    //   console.log(req.user);
}
exports.createNote = createNote;
async function getAllNotes(req, res, next) {
    try {
        const notes = await noteModel_1.Note.find({});
        res.status(200).json({
            status: "success",
            message: "You have successfully fetch all notes",
            notes,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "failed to read",
            route: "/read",
        });
    }
}
exports.getAllNotes = getAllNotes;
async function getNote(req, res, next) {
    try {
        const { id } = req.params;
        const note = await noteModel_1.Note.findById(id);
        return res.status(200).json({
            message: "Successfully read a note",
            note,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: "failed to read single note",
            route: "/read/:id",
        });
    }
}
exports.getNote = getNote;
async function updateNote(req, res, next) {
    try {
        const { id } = req.params;
        const validationResult = utils_1.updateNotesSchema.validate(req.body, utils_1.options);
        if (validationResult.error) {
            return res.status(400).json({
                Error: validationResult.error.details[0].message,
            });
        }
        const note = await noteModel_1.Note.findById(id);
        if (!note) {
            return res.status(404).json({
                Error: "Note does not exist",
            });
        }
        const updateNote = await noteModel_1.Note.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        res.status(200).json({
            status: "success",
            message: "You have successfully updated your note",
            updateNote,
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
        const record = await noteModel_1.Note.findById(id);
        if (!record) {
            return res.status(404).json({
                message: "Cannot find Note",
            });
        }
        const deletedRecord = await noteModel_1.Note.findByIdAndDelete(id);
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
