const Router = require("express");
const router = new Router();
const mailSenderController = require("../controllers/mailSenderController");

router.post("/", mailSenderController.create);
router.get("/", mailSenderController.open);

module.exports = router;