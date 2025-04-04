import TaskCardComponent from "./TaskComponent";
export default function TaskListComponent({ status, tasks, workspaceId }) {
  const filteredTasks = tasks?.payload?.filter(
    (task) => task.status === status
  );

  if (!filteredTasks || filteredTasks.length === 0) {
    return <p className="text-center text-gray-500">No tasks found.</p>;
  }

  return (
    <div>
      {filteredTasks.map((task) => (
        <TaskCardComponent
          key={task?.taskId}
          task={task}
          status={status}
          workspaceId={workspaceId}
        />
      ))}
    </div>
  );
}
