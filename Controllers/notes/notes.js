const notes = require("../../models/notesModel");
const notesModel = require("../../models/notesModel");


exports.insertNote = async (req, res)=>{
    //console.log(req.body);
    try{
       // 1) Collect data from req body
        const data = {
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority,
            user: req.user._id,
            collections: req.body.collection
        }
        if(req.body.role){data.role=req.body.role}

        // 2) Make sure collection is passed and collection exists(i.e collection was created)
        if(!data.collections) throw "Collection name is necessary to be passed."
        //console.log(req.user);
        if(!req.user.collections.includes(String(data.collections).toLowerCase())) throw "collection doesn't exist, create it first"

        // 3) create the note
        const newNote = await notesModel.create(data);

        res.status(200).json({
            status: "success",
            data: newNote
        })
        //console.log(req.user);
    }
    catch(err)
    {
        console.log(err);
        res.status(404).json({
            status: "Error",
            data: err
        })
    }
}

exports.getAllNotes = async (req, res)=>{
    try{
        // 1) get the collection name
        const collectionName = req.body.collection || req.params.collectionName;

        // 2) Make sure collection name  is passed
        if(!collectionName) throw "Collection name not passed"

        // 3) Make sure collection exists(i.e. collecton exists in db)
        if(!req.user.collections.includes(collectionName.toLowerCase())) throw "collection doesn't exist, create it first"

        // 4) get all notes of specified collection
        const data = await notesModel.find({user:req.user._id, collections:collectionName});
        
        // 5) Send response to user
        res.status(200).json({
            status: "Success",
            data
        })
    }
    catch(err)
    {
        console.log("Error from getAllNotes function")
        console.log(err);
        res.status(404).json({
            status: "Error",
            data: err
        })
    }   
}

exports.deleteNote = async (req, res)=>{
    try{
        //console.log(req.params)
        // const id = req.params.id;
        // await notesModel.findByIdAndDelete(id);

        const id = req.params.id;
        const note = await notesModel.findById(id);

        if(!note) throw "Note with given id not found"

        const isNoteIdOfCurrentUser = String(req.user._id)===String(note.user);
        if(!isNoteIdOfCurrentUser) throw "The note Id passed is not of logged in user."
        //console.log(String(req.user._id)===String(note.user));

        await notesModel.findByIdAndDelete(id);
        res.status(200).json({
            status: "Success"
        })
    }
    catch(err)
    {
        console.log("Error from deleteNote function");
        console.log(err);
        res.status(404).json({
            status: "Error",
            data: err
        })
    }
}

exports.groupByPriority = async (req, res)=>{
    console.log("Priority called");
    try{
        const data = await notesModel.aggregate([
            {
                $group: {
                    _id:{priority:"$priority"}, 
                    count:{$sum:1}
                }
            }
        ])
        res.status(200).json({
            status: "Success",
            data
        })
    }
    catch(err)
    {
        res.status(404).json({
            status: "Error",
            data: err
        })
    }
}

exports.getById = async (req, res)=>{
    try{
        const id = req.params.id;
        const data = await notesModel.findById(id);
        res.status(200).json({
            status: "success",
            data
        })
    }
    catch(err)
    {
        res.status(404).json({
            status: "Error",
            data: err
        })
    }
}


//update note
exports.updateNote = async (req, res)=>{
    
    try{
        const user_id = req.user._id;
        const note_id = req.params.id;
        const note_data = await notesModel.findById(note_id);

        if(!note_data) throw "The note with provided ID doesn't exist"

        const isNoteIdOfCurrentUser = String(user_id)===String(note_data.user);
        if(!isNoteIdOfCurrentUser) throw "The note Id passed is not of logged in user."

        const updatedData = {}
        if(req.body.title){updatedData.title = req.body.title}
        if(req.body.description){updatedData.description = req.body.description}
        if(req.body.priority){updatedData.priority = req.body.priority}

        await notesModel.findByIdAndUpdate(note_id, updatedData, {runValidators:true});

        res.status(200).json({
            status: "success"
        })
    }
    catch(err)
    {
        console.log("Error from updateNote function");
        console.log(err);
        res.status(404).json({
            status: "Error",
            data: err
        })
    }

}


exports.deleteAllNotesOfCollection = async (collectionName, user_id)=>{
    await notesModel.deleteMany({user:user_id, collections:collectionName})
    return;
}

exports.getCollections = async (req, res)=>{
    const data = req.user.collections;
    res.status(200).json({
        status:"success",
        data
    })
}




