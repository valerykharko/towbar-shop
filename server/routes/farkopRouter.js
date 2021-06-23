const Router = require("express");
const router = new Router();
const farkopController = require("../controllers/farkopController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), farkopController.create);
router.get("/", farkopController.getAll);
router.get("/:id", farkopController.getOne);

module.exports = router;
