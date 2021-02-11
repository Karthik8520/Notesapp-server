const {Router} = require("express");
const { signup, login, forgotPassword, protect, restrict } = require("../Controllers/auth/auth");
const { addCollection, deleteCollection } = require("../Controllers/user/user");

const userRouter = Router();

//This route ("/") in userRouter is reserved for requests comming from 
// -> api/v1/notes/addCollection
// So if you are adding any other requets to this route, then do consider this if any error/unexpected things occur
userRouter.post("/", protect, restrict("user"), addCollection);
userRouter.delete("/:cname", protect, restrict("user"), deleteCollection);


userRouter.post("/signup", signup);
userRouter.post("/login", login);

userRouter.post("/forgotPassword", forgotPassword);
//userRouter.post("/resetPassword/:token", reset)


module.exports = userRouter;