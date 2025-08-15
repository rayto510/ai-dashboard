import request from "supertest";
import express from "express";
import taskRoutes from "../src/routes/taskRoutes";

const app = express();
app.use(express.json());
app.use("/api/tasks", taskRoutes);

describe("Task API", () => {
  let taskId: string;

  it("creates a new task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({ title: "Test Task" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
    taskId = res.body.id;
  });

  it("gets all tasks", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("updates a task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .send({ completed: true });
    expect(res.status).toBe(200);
    expect(res.body.completed).toBe(true);
  });

  it("deletes a task", async () => {
    const res = await request(app).delete(`/api/tasks/${taskId}`);
    expect(res.status).toBe(204);
  });
});
