const Router = require("express");
const router = new Router();
const farkopInfoController = require("../controllers/farkopInfoController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), farkopInfoController.create);
router.get("/", farkopInfoController.getAll);
router.get("/:id", farkopInfoController.getOne);

module.exports = router;
