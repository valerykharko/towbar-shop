const Router = require("express");
const router = new Router();
const userRouter = require("./userRouter");
const farkopRouter = require("./farkopRouter");
const accessoriesRouter = require("./accessoriesRouter");
const accessoriesInfoRouter = require("./accessoriesInfoRouter");
const type_accessoriesRouter = require("./type_accessoriesRouter");
const wiring_kitRouter = require("./wiring_kitRouter");
const wiring_kitInfoRouter = require("./wkInfoRouter");
const brandRouter = require("./brandRouter");
const modelRouter = require("./modelRouter");
const generationRouter = require("./generationRouter");
const body_styleRouter = require("./body_styleRouter");
const farkopInfoRouter = require("./farkopInfoRouter");
const mailSenderRouter = require("./mailSenderRouter");

router.use("/user", userRouter);
router.use("/farkop", farkopRouter);
router.use("/farkop-info", farkopInfoRouter);
router.use("/brand", brandRouter);
router.use("/model", modelRouter);
router.use("/generation", generationRouter);
router.use("/body-style", body_styleRouter);
router.use("/accessories", accessoriesRouter);
router.use("/accessories-info", accessoriesInfoRouter);
router.use("/type-accessories", type_accessoriesRouter);
router.use("/wiring-kit", wiring_kitRouter);
router.use("/wiring-kit-info", wiring_kitInfoRouter);
router.use("/mail-sender", mailSenderRouter);

module.exports = router;
