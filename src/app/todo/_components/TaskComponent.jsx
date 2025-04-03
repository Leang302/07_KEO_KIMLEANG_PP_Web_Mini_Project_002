import { Clock, Ellipsis } from "lucide-react";
import StatusSelectComponent from "./SelectComponent";
import DropDownActionComponent from "./DropDownActionComponent";

export default function CardComponent({ task, status, workspaceId }) {
  let colors = {};
  if (status === "NOT_STARTED") {
    colors = {
      bgColor: `bg-watermelon-red`,
      textColor: `text-watermelon-red`,
      borderColor: `border-watermelon-red`,
    };
  } else if (status === "IN_PROGRESS") {
    colors = {
      bgColor: `bg-royal-blue`,
      textColor: `text-royal-blue`,
      borderColor: `border-royal-blue`,
    };
  } else if (status === "FINISHED") {
    colors = {
      bgColor: `bg-persian-green`,
      textColor: `text-persian-green`,
      borderColor: `border-persian-green`,
    };
  }
  const getDate = () => {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const dueDate = new Date(task?.endDate);
    const differenceInDays = (dueDate - currentDate) / (1000 * 60 * 60 * 24);

    return dueDate - differenceInDays;
  };

  return (
    <div className="border border-gray-300 rounded-xl mt-8">
      <div className="p-5">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold capitalize">{task?.taskTitle}</h2>
          <DropDownActionComponent data={task} />
        </div>

        {/* task detials */}
        <p className="line-clamp-2 text-light-steel-blue my-2 h-12">
          {task?.taskDetails}
        </p>

        <div className="flex justify-between items-center mt-4">
          {/* tag */}
          <p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
            {task?.tag}
          </p>

          {/* status */}
          <div className={`rounded-full w-8 h-8 ${colors.bgColor}`}></div>
        </div>
      </div>

      {/* progress */}
      <div className="flex justify-between items-center border-t border-t-gray-300 p-5">
        <StatusSelectComponent
          taskId={task?.taskId}
          workspaceId={workspaceId}
          status={task?.status}
          colors={colors}
        />
        {/* date */}
        <p className="flex gap-3 text-light-steel-blue">
          <Clock size={22} />
          {new Date(getDate()).toLocaleDateString("en-us", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}
