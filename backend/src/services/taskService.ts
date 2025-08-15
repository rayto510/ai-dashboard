// taskService.ts
import { Task } from "../models/task";
import { v4 as uuidv4 } from "uuid";
import * as O from "fp-ts/Option";

// Pure task creator
export const createTaskObj = (title: string, description?: string): Task => ({
  id: uuidv4(),
  title,
  description,
  completed: false,
});

// Immutable add
export const addTask = (tasks: Task[], task: Task): Task[] => [...tasks, task];

// Immutable update
export const updateTask = (
  tasks: Task[],
  id: string,
  data: Partial<Task>
): O.Option<Task[]> => {
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return O.none;
  const updatedTask: Task = { ...tasks[index], ...data };
  return O.some([
    ...tasks.slice(0, index),
    updatedTask,
    ...tasks.slice(index + 1),
  ]);
};

// Immutable delete
export const deleteTask = (tasks: Task[], id: string): O.Option<Task[]> => {
  const newTasks = tasks.filter((t) => t.id !== id);
  return newTasks.length === tasks.length ? O.none : O.some(newTasks);
};

// Read
export const getTasks = (tasks: Task[]): Task[] => tasks;
export const getTaskById = (tasks: Task[], id: string): O.Option<Task> =>
  O.fromNullable(tasks.find((t) => t.id === id));
