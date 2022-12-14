"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDeleteNotePage = exports.getEditNotePage = exports.getAddNotePage = exports.getRegisterPage = exports.getLoginPage = exports.getDashboardPage = exports.getHomePage = void 0;
const noteModel_1 = require("../models/noteModel");
// Get home page
async function getHomePage(req, res, next) {
    // Get all notes from db
    const notes = await noteModel_1.NoteSchema.findAll();
    res.status(200).render("index", {
        title: "All notes",
        notes,
    });
}
exports.getHomePage = getHomePage;
// get Dashboard page
async function getDashboardPage(req, res, next) {
    const verified = req.user;
    console.log(verified.id);
    const notes = await noteModel_1.NoteSchema.findAll({
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
exports.getDashboardPage = getDashboardPage;
// get login page
async function getLoginPage(req, res, next) {
    res.status(200).render("login");
}
exports.getLoginPage = getLoginPage;
// get register page
async function getRegisterPage(req, res, next) {
    res.status(200).render("register");
}
exports.getRegisterPage = getRegisterPage;
async function getAddNotePage(req, res, next) {
    res.status(200).render("addNote");
}
exports.getAddNotePage = getAddNotePage;
async function getEditNotePage(req, res, next) {
    const { id } = req.query;
    // console.log(req.query.id);
    const note = await noteModel_1.NoteSchema.findOne({ where: { id } });
    // console.log(note);
    res.status(200).render("editNote", {
        title: "All notes",
        note,
    });
}
exports.getEditNotePage = getEditNotePage;
async function getDeleteNotePage(req, res, next) {
    const { id } = req.query;
    // console.log(req.query.id);
    const note = await noteModel_1.NoteSchema.findOne({ where: { id } });
    res.status(200).render("deleteNote", {
        title: "All notes",
        note,
    });
}
exports.getDeleteNotePage = getDeleteNotePage;
