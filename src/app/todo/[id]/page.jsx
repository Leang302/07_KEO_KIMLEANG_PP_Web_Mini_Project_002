import { getAllTasksByWorkspaceId } from "@/services/TaskService";
import { getWorkSpaceById } from "@/services/WorkspaceService";
import SpecificWorkspaceBarComponent from "../_components/SpecificWorkspaceBarComponent";
import StatusLabelComponent from "../_components/StatusLabelComponent";
import TaskListComponent from "../_components/TaskListComponent";

export default async function page({ params }) {
  const { id } = await params;

  const workspace = id ? await getWorkSpaceById(id) : null;
  const tasks = await getAllTasksByWorkspaceId(id);
  const taskStatusColors = {
    NOT_STARTED: "watermelon-red",
    IN_PROGRESS: "royal-blue",
    FINISHED: "persian-green",
  };
  return (
    <div className="px-16 py-12 ">
      <SpecificWorkspaceBarComponent workspace={workspace?.payload} />
      <div className="grid grid-cols-3 mt-6 gap-x-10 gap-y-6">
        {/* status bar */}
        <StatusLabelComponent
          title="Not Started"
          textColor="text-watermelon-red"
          bgColor="bg-watermelon-red"
        />
        <StatusLabelComponent
          title="In Progress"
          textColor="text-royal-blue"
          bgColor="bg-royal-blue"
        />
        <StatusLabelComponent
          title="Finished"
          textColor="text-persian-green"
          bgColor="bg-persian-green"
        />
        {/* not started tasks */}
        <TaskListComponent
          workspaceId={id}
          tasks={tasks}
          status="NOT_STARTED"
          color={taskStatusColors.NOT_STARTED}
        />
        {/* not started tasks */}
        <TaskListComponent
          workspaceId={id}
          tasks={tasks}
          status="IN_PROGRESS"
          color={taskStatusColors.IN_PROGRESS}
        />
        {/* not started tasks */}
        <TaskListComponent
          workspaceId={id}
          tasks={tasks}
          status="FINISHED"
          color={taskStatusColors.FINISHED}
        />
      </div>
    </div>
  );
}
