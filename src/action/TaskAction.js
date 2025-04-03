"use server";
import {
  createTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
} from "@/services/TaskService";
import { revalidatePath, revalidateTag } from "next/cache";
// update task status
export const updateTaskStatusAction = async (taskId, workspaceId, status) => {
  const task = await updateTaskStatus(taskId, workspaceId, status);
  revalidateTag("task");
  return task;
};
//create task
export const createTaskAction = async ({ workspaceId, taskRequest }) => {
  try {
    await createTask(workspaceId, taskRequest);
    revalidateTag("task");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Creating tasked failed. Please try again.",
    };
  }
};
//update task info
export const updateTaskAction = async ({
  taskId,
  workspaceId,
  taskRequest,
}) => {
  try {
    await updateTask(taskId, workspaceId, taskRequest);
    revalidateTag("task");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Creating tasked failed. Please try again.",
    };
  }
};
// delete task
export const deleteTaskAction = async ({ workspaceId, taskId }) => {
  console.log(workspaceId);
  console.log(taskId);

  try {
    await deleteTask(workspaceId, taskId);
    revalidateTag("task");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Creating tasked failed. Please try again.",
    };
  }
};
