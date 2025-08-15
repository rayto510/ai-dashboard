import { Router } from "express";
import * as taskController from "../controllers/taskController";

const router = Router();

router.get("/", taskController.getAllTasks);
router.get("/:id", taskController.getTask);
router.post("/", taskController.createNewTask);
router.put("/:id", taskController.updateExistingTask);
router.delete("/:id", taskController.deleteTaskById);

export default router;
