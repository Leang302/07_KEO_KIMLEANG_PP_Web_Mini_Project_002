import headerToken from "@/lib/headerToken";
// get all task by workspaceId
export const getAllTasksByWorkspaceId = async (workspaceId) => {
  const headers = await headerToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tasks/workspace/${workspaceId}`,
    {
      headers,
      next: {
        tags: "task",
      },
    }
  );
  const tasks = await response.json();
  console.log(tasks);

  return tasks;
};
// update task status
export const updateTaskStatus = async (taskId, workspaceId, status) => {
  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}/status?status=${status}`,
    {
      method: "PATCH",
      headers,
    }
  );
  const task = await response.json();
  return task;
};
//update task info
export const updateTask = async (taskId, workspaceId, taskRequest) => {
  console.log(taskRequest);
  console.log(taskId);
  console.log(workspaceId);

  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(taskRequest),
    }
  );
  const task = await response.json();
  console.log(task);

  return task;
};
//create task
export const createTask = async (workspaceId, taskRequest) => {
  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/workspace/${workspaceId}`,
    {
      method: "POST",
      headers: headers,
      body: JSON.stringify(taskRequest),
    }
  );
  const task = await response.json();

  return task;
};
//delete task
export const deleteTask = async (workspaceId, taskId) => {
  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
    {
      method: "DELETE",
      headers: headers,
    }
  );
  const task = await response.json();
  console.log(task);

  return task;
};
