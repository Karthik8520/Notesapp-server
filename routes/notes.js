const {Router} = require("express");
const userRouter = require("../routes/user");
const { protect, restrict } = require("../Controllers/auth/auth.js");
const {insertNote, getAllNotes, deleteNote, groupByPriority, getById, updateNote, getCollections} = require("../Controllers/notes/notes.js")

const notesRouter = Router();

notesRouter.use("/addCollection", userRouter);
notesRouter.use("/deleteCollection", userRouter);


notesRouter.get("/getCollections", protect, restrict("user"), getCollections)

notesRouter.get("/collection/:collectionName",protect, restrict("user"), getAllNotes)

notesRouter.route("/")
    // .post(check,insertNote)
    .post(protect,restrict("user"), insertNote)
    .get(protect, restrict("user") , getAllNotes);



notesRouter.route("/priority")
    .get(protect, restrict("user"),  groupByPriority);
    

notesRouter.route("/:id")
    .get(protect, restrict("user"), getById)
    .delete(protect, restrict("user"), deleteNote)
    .patch(protect, restrict("user"), updateNote)



    


//middleware which checks if there is title for a note.
//If there isn't then it would send error json
//it will never reach to **insertNote**     
// function check(req, res, next)
// {
//         if(req.body.title) 
//         {
//             next()
//             return;
//         }
//         else{
//             res.status(404).json({
//                 status: "Error",
//                 msg: "Title is required for a note."
//             })
//         }
// }
module.exports = notesRouter;