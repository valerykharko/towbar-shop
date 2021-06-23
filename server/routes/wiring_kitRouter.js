const Router = require("express");
const router = new Router();
const wiring_kitController = require("../controllers/wiring_kitController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), wiring_kitController.create);
router.get("/", wiring_kitController.getAll);
router.get("/:id", wiring_kitController.getOne);


module.exports = router;
