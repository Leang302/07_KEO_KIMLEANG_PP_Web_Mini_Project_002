"use client";
import { updateTaskStatusAction } from "@/action/TaskAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function StatusSelectComponent({
  taskId,
  workspaceId,
  status,
  colors,
}) {
  const handleStatusChange = (newStatus) => {
    const task = updateTaskStatusAction(taskId, workspaceId, newStatus);

    if (task) {
      toast("Task has been updated", {
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
    }
  };
  return (
    <Select onValueChange={handleStatusChange}>
      <SelectTrigger
        className={`w-36 ${colors.borderColor} ${colors.textColor} `}
      >
        <SelectValue placeholder={status} className={colors.textColor} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="NOT_STARTED"
          disabled={
            status.includes("NOT_STARTED") ||
            status.includes("FINISHED") ||
            status.includes("IN_PROGRESS")
          }
        >
          NOT_STARTED
        </SelectItem>
        <SelectItem
          value="IN_PROGRESS"
          disabled={
            status.includes("FINISHED") ||
            status.includes("IN_PROGRESS") ||
            status.includes("FINISHED")
          }
        >
          IN_PROGRESS
        </SelectItem>
        <SelectItem
          value="FINISHED"
          disabled={
            status.includes("NOT_STARTED") || status.includes("FINISHED")
          }
        >
          FINISHED
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
