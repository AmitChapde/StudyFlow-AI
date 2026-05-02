import { getDueLabelAndStyle } from "@/lib/task-utils";
import { Task } from "@/models/Task";
import {
  deleteTaskById,
  updateTaskContent,
  updateTaskStatus,
} from "@/services/task.service";

jest.mock("@/models/Task", () => ({
  Task: {
    findByIdAndDelete: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  },
}));

const validObjectId = "507f1f77bcf86cd799439011";

function toDateInput(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

describe("task due-date utility", () => {
  it("labels tasks due today", () => {
    const result = getDueLabelAndStyle(toDateInput(new Date()), "TODO");

    expect(result.label).toBe("Due today");
    expect(result.style).toContain("yellow");
  });

  it("labels tasks due tomorrow", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const result = getDueLabelAndStyle(toDateInput(tomorrow), "TODO");

    expect(result.label).toBe("Due tomorrow");
    expect(result.style).toContain("yellow");
  });

  it("labels pending overdue tasks", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    const result = getDueLabelAndStyle(toDateInput(yesterday), "TODO");

    expect(result.label).toBe("Overdue by 1 days");
    expect(result.style).toContain("red");
  });
});

describe("task service", () => {
  it("updates task status with the expected mongoose call", async () => {
    const updatedTask = { _id: validObjectId, status: "DONE" };
    jest.mocked(Task.findByIdAndUpdate).mockResolvedValue(updatedTask);

    await expect(updateTaskStatus(validObjectId, "DONE")).resolves.toBe(
      updatedTask,
    );

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(
      validObjectId,
      { status: "DONE" },
      { new: true },
    );
  });

  it("updates editable task content with due date and priority", async () => {
    const dueDate = new Date("2026-05-10");
    const payload = {
      title: "Updated task",
      description: "Updated description",
      dueDate,
      priority: "HIGH" as const,
    };

    jest.mocked(Task.findByIdAndUpdate).mockResolvedValue({
      _id: validObjectId,
      ...payload,
    });

    await updateTaskContent(validObjectId, payload);

    expect(Task.findByIdAndUpdate).toHaveBeenCalledWith(validObjectId, payload, {
      new: true,
    });
  });

  it("deletes a task by id", async () => {
    jest.mocked(Task.findByIdAndDelete).mockResolvedValue({
      _id: validObjectId,
    });

    await deleteTaskById(validObjectId);

    expect(Task.findByIdAndDelete).toHaveBeenCalledWith(validObjectId);
  });

  it("rejects invalid task ids before calling mongoose", async () => {
    await expect(updateTaskStatus("bad-id", "DONE")).rejects.toThrow(
      "Invalid taskId",
    );

    expect(Task.findByIdAndUpdate).not.toHaveBeenCalled();
  });
});
