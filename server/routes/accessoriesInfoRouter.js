const Router = require("express");
const router = new Router();
const accessoriesInfoController = require("../controllers/accessoriesInfoController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), accessoriesInfoController.create);
router.get("/", accessoriesInfoController.getAll);
router.get("/:id", accessoriesInfoController.getOne);

module.exports = router;
