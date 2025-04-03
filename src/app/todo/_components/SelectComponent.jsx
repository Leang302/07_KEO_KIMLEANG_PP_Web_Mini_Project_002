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
  borderColor,
  textColor,
}) {
  console.log(borderColor);
  console.log(textColor);

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
      <SelectTrigger className={`w-36 ${borderColor} ${textColor} `}>
        <SelectValue placeholder={status} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
        <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
        <SelectItem value="FINISHED">FINISHED</SelectItem>
      </SelectContent>
    </Select>
  );
}
