const Router = require("express");
const router = new Router();
const accessoriesController = require("../controllers/accessoriesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), accessoriesController.create);
router.get("/", accessoriesController.getAll);
router.get("/:id", accessoriesController.getOne);

module.exports = router;
