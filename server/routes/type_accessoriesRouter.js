const Router = require("express");
const router = new Router();
const type_accessoriesController = require("../controllers/type_accessoriesController");
const checkRole = require("../middleware/checkRoleMiddleware");

router.post("/", checkRole("ADMIN"), type_accessoriesController.create);
router.get("/", type_accessoriesController.getAll);

module.exports = router;
