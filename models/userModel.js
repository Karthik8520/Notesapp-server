const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, "name is required"],
    },
    email: {
        type:String,
        required: [true, "Email is required"],
        validate: {
            validator: (val)=>{
                return validator.isEmail(val)
            }
        },
        unique: [true, "User with given email-id already exists"]
    },
    password: {
        type: String,
        required: [true, "Password id required"],
        select: false
    },
    role: {
        type: String,
        enum : ["user", "admin"],
        default: "user"
    },
    collections: {
        type:Array
    },
    passwordChangedAt : Date,
    passwordResetToken: String,
    resetTokenExpire: Date
})


//always use regular functions and nor arrow function
//if you use arrow function then 'this' keyword won't work as desired
userSchema.pre("save", async function(next){
    // console.log("is password modified? : ", this.isModified("password"));
    if(!this.isModified("password")) {next(); return;}
    // console.log("hashing password starts..")
    this.password = await bcrypt.hash(this.password, 12);
    // console.log("hashed password : ",this.password);
    // console.log("hashing password ends..");
    next();

});

const userModel = mongoose.model("user", userSchema,"user");
module.exports = userModel;