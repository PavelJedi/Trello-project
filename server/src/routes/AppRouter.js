const router = require("express").Router();
const userRouter = require("./UserRoutes");

router.use("/users", userRouter);

module.exports = router;
