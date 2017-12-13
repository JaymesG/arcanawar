const profileRoutes = require("./privategame");
const privateRoutes = require("./profile");
const app = require("../app");


module.exports = RouterConstructor;

function RouterConstructor(app) {

    app.use("/profile", app.protectPrivate, profileRoutes);
    // app.use("/private", privateRoutes);


    // app.use("*", (req, res) => {
     //    res.sendStatus(404);
	// });
}
