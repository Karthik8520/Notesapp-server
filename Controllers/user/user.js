const userModel = require("../../models/userModel");
const { deleteAllNotesOfCollection } = require("../notes/notes");

exports.addCollection = async (req, res)=>{
    try{
        // 1) get data from req body
        const user_id = req.user._id;
        const collectionName = String(req.body.collection).trim();

        // 2) Make sure collection name is passed and it's length>=1
        if(!collectionName || collectionName.length<=1) throw "Collection name not passed or name is too short"

        // 3) Make sure that collection name passed already doesn't exist
        if(req.user.collections.includes(collectionName))  throw "Collection name already exists!!"

        // 4) Add collection to databse
        const user = await userModel.findById(user_id);
        user.collections.push(collectionName.toLowerCase());
        await user.save()

        res.status(200).json({
            status:"success"
        })
    }
    catch(err)
    {
        console.log("Error from addCollection ");
        console.log(err);
        res.status(404).json({
            status: "Error",
            err
        })
    }
}

exports.deleteCollection = async (req, res)=>{
    try{
        // 1) get collection name from req.params
        const collectionName = String(req.params.cname);
        if(!collectionName) throw "Collection name not provided"

        // 2) check if collection name actually exists with user
        if(!req.user.collections.includes(collectionName)) throw "Collection name doesn't exist"

        // 3) Delete from user DB 
        const user = await userModel.findById(req.user._id);

        user.collections = user.collections.filter((collec_name)=>{
            if(collec_name==collectionName) {return false}
            else {return true}
        })

        await user.save();

        // 4) delete fron notes db
        deleteAllNotesOfCollection(collectionName, req.user._id);

        //5) send Succes msg to user
        res.status(200).json({
            status:"success"
        })
    }
    catch(err)
    {
        console.log("Error from deleteCollection function");
        console.log(err);
        res.status(404).json({
            status:"Error",
            err
        })
    }

}