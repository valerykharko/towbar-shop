const Router = require("express");
const router = new Router();
const generationController = require("../controllers/generationController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), generationController.create);
router.get("/", generationController.getAll);
router.get("/:id", generationController.getOne);

module.exports = router;