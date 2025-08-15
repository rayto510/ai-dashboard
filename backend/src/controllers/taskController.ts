import { Request, Response } from "express";
import { Task } from "../models/task";
import * as taskService from "../services/taskService";
import * as O from "fp-ts/Option";

let tasks: Task[] = []; // controller-level immutable state

export const getAllTasks = (_req: Request, res: Response) =>
  res.json(taskService.getTasks(tasks));

export const createNewTask = (req: Request, res: Response) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const task = taskService.createTaskObj(title, description);
  tasks = taskService.addTask(tasks, task); // immutable update
  res.status(201).json(task);
};

export const getTask = (req: Request, res: Response) => {
  const taskOpt = taskService.getTaskById(tasks, req.params.id);
  O.fold(
    () => res.status(404).json({ error: "Task not found" }),
    (task) => res.json(task)
  )(taskOpt);
};

export const updateExistingTask = (req: Request, res: Response) => {
  const taskOpt = taskService.updateTask(tasks, req.params.id, req.body);
  return O.fold<Task[], Response>(
    () => res.status(404).json({ error: "Task not found" }),
    (newTasks) => {
      tasks = newTasks; // assign new immutable array
      const updatedTask = newTasks.find((t) => t.id === req.params.id)!;
      return res.json(updatedTask);
    }
  )(taskOpt);
};

export const deleteTaskById = (req: Request, res: Response) => {
  const taskOpt = taskService.deleteTask(tasks, req.params.id);
  O.fold<Task[], Response>(
    () => res.status(404).json({ error: "Task not found" }),
    (newTasks) => {
      tasks = newTasks;
      return res.status(204).send();
    }
  )(taskOpt);
};
