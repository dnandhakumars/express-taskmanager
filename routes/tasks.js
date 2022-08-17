const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasksController");

router.route("/").get(getAllTasks);
router.route("/:id").get(getTask);
router.route("/").post(createTask);
router.route("/:id").patch(updateTask);
router.route("/:id").delete(deleteTask);

module.exports = router;
