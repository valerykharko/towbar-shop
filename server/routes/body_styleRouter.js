const Router = require("express");
const router = new Router();
const body_styleController = require("../controllers/body_styleController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), body_styleController.create);
router.get("/", body_styleController.getAll);
router.get("/:id", body_styleController.getOne);

module.exports = router;