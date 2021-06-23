const Router = require("express");
const router = new Router();
const wkInfoController = require("../controllers/wkInfoController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), wkInfoController.create);
router.get("/", wkInfoController.getAll);
router.get("/:id", wkInfoController.getOne);

module.exports = router;
