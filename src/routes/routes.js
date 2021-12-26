const userRoutes = require("./projects");

const appRouter = (app, fs) => {
   userRoutes(app, fs);
};

module.exports = appRouter;
