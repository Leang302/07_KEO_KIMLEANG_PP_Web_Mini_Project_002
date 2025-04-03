"use client";
import { updateTaskStatusAction } from "@/action/TaskAction";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateTaskStatus } from "@/services/TaskService";
import React from "react";
import { toast } from "sonner";

export default function StatusSelectComponent({
  taskId,
  workspaceId,
  status,
  colors,
}) {
  const handleStatusChange = (newStatus) => {
    const task = updateTaskStatusAction(taskId, workspaceId, newStatus);
    console.log(colors);

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
        <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
        <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
        <SelectItem value="FINISHED">FINISHED</SelectItem>
      </SelectContent>
    </Select>
  );
}
