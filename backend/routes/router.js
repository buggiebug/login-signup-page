const routerRoute = require("express").Router();

const {
  signupRoute,
  loginRoute,
  userRoute,
  getAllUsersRoute,
  updateUserRoute,
  deleteUserRoute,
} = require("../controller/userController");

routerRoute.get("/",async(req,res,next)=>{
  return res.status(200).json({success:true,message:`API is working 🥳🥳🥳`});
});

routerRoute.route("/signup").post(signupRoute);
routerRoute.route("/login").post(loginRoute);
routerRoute.route("/me").get(userRoute);
routerRoute.route("/all_users").get(getAllUsersRoute);
routerRoute.route("/update_user/:id").put(updateUserRoute);
routerRoute.route("/delete_user/:id").delete(deleteUserRoute);

module.exports = routerRoute;
