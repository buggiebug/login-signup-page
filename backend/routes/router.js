const routerRoute = require("express").Router();

const { homeRoute, signupRoute, loginRoute, userRoute } = require("../controller/userController");

routerRoute.route("/").get(homeRoute);
routerRoute.route("/signup").post(signupRoute);
routerRoute.route("/login").post(loginRoute);
routerRoute.route("/me").get(userRoute);

module.exports = routerRoute;

