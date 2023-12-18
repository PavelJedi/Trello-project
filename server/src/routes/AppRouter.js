const router = require("express").Router();
const userRouter = require("./UserRoutes");
const boardsRouter = require("./BoardRoutes");
const tasksRouter = require("./TaskRoutes");
const columnsRouter = require("./ColumnRoutes");

router.use("/users", userRouter);
router.use("/boards", boardsRouter);
router.use("/tasks", tasksRouter);
router.use("/columns", columnsRouter);

module.exports = router;
