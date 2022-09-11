const { Router } = require("express");
const JobController = require("../controllers/JobController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');
const jobRoutes = Router();
const jobController = new JobController();

jobRoutes.use(ensureAuthenticated);
jobRoutes.get("/", jobController.index);
jobRoutes.post("/", jobController.create);
jobRoutes.get("/:id", jobController.show);
jobRoutes.delete("/:id", jobController.delete);
module.exports = jobRoutes;