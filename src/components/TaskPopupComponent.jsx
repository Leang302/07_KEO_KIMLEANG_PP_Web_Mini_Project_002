"use client";
import { createTaskAction, updateTaskAction } from "@/action/TaskAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, ClipboardList } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "sonner";
import { DeleteModalComponent } from "./DeleteModalComponent";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function TaskPopupComponent({
  mode = "add",
  taskData = null,
  closeDropDown = null,
}) {
  const path = usePathname();
  const workspaceId = path.replace("/todo/", "");
  const tags = [
    "DESIGN",
    "HOMEWORK",
    "ASSIGNMENT",
    "DEPLOYMENT",
    "GIT",
    "DATABASE",
    "MINI_PROJECT",
    "DOCUMENTATION",
    "FEATURE",
  ];
  const [date, setDate] = useState(taskData?.endDate || "");
  const [task, setTask] = useState({
    taskTitle: taskData?.taskTitle || "",
    taskDetails: taskData?.taskDetails || "",
    tag: taskData?.tag || "",
    endDate: taskData?.endDate || "",
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validate each field
    const taskErrors = {
      taskTitle: task?.taskTitle?.trim() ? "" : "*Task title is required.",
      tag: task?.tag?.trim() ? "" : "*Tag is required.",
      endDate: date ? "" : "*Please choose the deadline of your project.",
    };
    //validate data
    if (date) {
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const dueDate = new Date(date).setHours(0, 0, 0, 0);
      if (!(dueDate > currentDate)) {
        taskErrors.endDate =
          "*Selected date cannot be lower or equal than current date.";
      }
    }
    setErrors(taskErrors);

    if (!taskErrors.taskTitle && !taskErrors.tag && !taskErrors.endDate) {
      //add or update task
      let response;
      if (mode === "add") {
        response = await createTaskAction({
          workspaceId: workspaceId,
          taskRequest: { ...task, endDate: date },
        });
      } else if (mode === "edit") {
        response = await updateTaskAction({
          taskId: taskData?.taskId,
          workspaceId: workspaceId,
          taskRequest: { ...task, endDate: date },
        });
      }

      setIsOpen(false);
      setTask({
        taskTitle: "",
        taskDetails: "",
        tag: "",
        endDate: "",
      });
      if (mode === "edit") {
        closeDropDown(false);
      }
      if (response?.error) {
        toast("An error occurred, please try again.", {
          style: {
            background: "#f8d7da",
            color: "#721c24",
          },
        });
        set;
      } else {
        toast(
          mode === "add"
            ? "Workspace has been created"
            : "Workspace has been updated",
          {
            style: {
              background: "#d4edda",
              color: "#155724",
            },
          }
        );
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {mode === "add" ? (
        <Button
          onClick={() => setIsOpen(true)}
          variant="fab"
          size="lg"
          className="bg-royal-blue text-gray-50 hover:bg-blue-800 rounded-4xl"
        >
          <ClipboardList />
          <span>New task</span>
        </Button>
      ) : (
        // action buttons
        <div className="hover:bg-none">
          {/* edit button */}
          <button
            className="mr-1 hover:bg-blue-200 p-2 w-full rounded hover:cursor-pointer text-start"
            onClick={() => setIsOpen(true)}
          >
            Edit Task
          </button>
          {/* delete button */}
          <button
            className="mr-1 hover:bg-blue-200 p-2 w-full rounded hover:cursor-pointer text-start"
            onClick={() => setIsDeleteOpen(true)}
          >
            Delete Task
          </button>
        </div>
      )}

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Task" : "Create a New Task"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              {/* Title */}
              <DialogDescription className="text-black">
                Task Title
              </DialogDescription>
              <Input
                name="taskTitle"
                placeholder="Please type your task title"
                value={task?.taskTitle}
                onChange={handleInputChange}
              />
              {errors.taskTitle && (
                <p className="text-red-500 text-sm">{errors.taskTitle}</p>
              )}

              {/* Description */}
              <DialogDescription className="text-black">
                Description
              </DialogDescription>
              <Input
                name="taskDetails"
                placeholder="Please type your task description"
                value={task?.taskDetails}
                onChange={handleInputChange}
              />

              {/* Tag */}
              <DialogDescription className="text-black">Tag</DialogDescription>
              <Select
                onValueChange={(value) => setTask({ ...task, tag: value })}
                name="tag"
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={task.tag ? task.tag : "Please select a tag"}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    {tags.map((tag) => (
                      <SelectItem key={tag} value={tag}>
                        {tag}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.tag && (
                <p className="text-red-500 text-sm">{errors.tag}</p>
              )}

              {/* End Date */}
              <DialogDescription className="text-black">
                Dateline
              </DialogDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    {date
                      ? new Date(date).toISOString().split("T")[0]
                      : "Pick a date"}

                    <CalendarIcon className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="p-2 min-w-[250px]"
                  onMouseDown={(e) => e.stopPropagation()}
                >
                  <div className="bg-white p-2 rounded-md shadow">
                    <DatePicker
                      selected={date}
                      onChange={(newDate) => {
                        const utcDate = new Date(
                          Date.UTC(
                            newDate.getFullYear(),
                            newDate.getMonth(),
                            newDate.getDate()
                          )
                        );
                        setDate(utcDate);
                      }}
                      inline
                    />
                  </div>
                </PopoverContent>
              </Popover>
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate}</p>
              )}
            </div>
          </div>
          <DialogFooter className="sm:justify-end mt-4">
            <Button
              type="submit"
              variant="secondary"
              className="bg-black text-white hover:bg-black/75"
            >
              {mode === "edit" ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
      {/* delete dialog */}
      <DeleteModalComponent
        isOpen={isDeleteOpen}
        setIsOpen={setIsDeleteOpen}
        taskId={taskData?.taskId}
        workspaceId={workspaceId}
      />
    </Dialog>
  );
}
