const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "A note must have a title"],
        maxLength: [50, "A title can't have more than 50 characters."]
    },
    description: {
        type: String,
        required: [true, "A note must have a description"]
    },
    priority: {
        type: Number,
        required: [true, "Every note must have a priority"],
        min: [1, "priority can't be less than 1"],
        max: [5, "priority can't be greater than 5"]
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", //model name is user
        required:true 
    },
    collections: {
        type: String,
        required: [true, "Collection name not passed, Each note must be associated with a Collection."]
    }
});


//DOCUMENT PRE-MIDDLEWARE WITH "save" HOOK
//***** 'this' won't work wiith arrow function*******
// noteSchema.pre("save", function(next){
    //this refers to doc about to be saved
//    console.log(this);
//     this.title = this.title.toUpperCase();
//     next();
// })

//DOCUMENT POST-MIDDLEWARE WITH "save" HOOK
//***** 'this' won't work wiith arrow function*******
//this refers to doc just saved
// noteSchema.post("save", function(doc, next){
//     console.log("saved doc : ", doc);
//     next();
// })


//QUERY PRE-MIDDLEWARE WITH "find" HOOK
//***** 'this' won't work wiith arrow function*******
// noteSchema.pre("find", function(next){
//     //this refers to query object
//     this.find({priority : { $lte : 3 }});
//     this.secret = "secret"
//     console.log(this);
//     next();
// })

//QUERY POST-MIDDLEWARE WITH "find" HOOK
//***** 'this' won't work wiith arrow function*******
// noteSchema.post("find", function(doc, next){
//     console.log(this.secret);
//     next();
// })

const notes = mongoose.model("note", noteSchema, "note");
module.exports = notes;

