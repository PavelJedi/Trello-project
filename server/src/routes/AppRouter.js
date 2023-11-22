const router = require("express").Router();
const userRouter = require("./UserRoutes");
const boardsRouter = require("./BoardRoutes");

router.use("/users", userRouter);
router.use("/boards", boardsRouter);

module.exports = router;
