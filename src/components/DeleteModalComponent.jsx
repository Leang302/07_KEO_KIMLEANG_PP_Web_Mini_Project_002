"use client";
import { deleteTaskAction } from "@/action/TaskAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export function DeleteModalComponent({
  isOpen,
  setIsOpen,
  taskId,
  workspaceId,
}) {
  const closeDialog = () => setIsOpen(false);
  const handleDelete = async () => {
    const response = await deleteTaskAction({
      workspaceId: workspaceId,
      taskId: taskId,
    });

    if (response.success) {
      toast("Task deleted successfully", {
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">
            Are you sure you want to delete this task?
          </DialogTitle>
        </DialogHeader>

        <DialogFooter className="mt-6 ">
          <Button type="submit" className="bg-red-500" onClick={handleDelete}>
            Delete
          </Button>
          <Button type="button" onClick={closeDialog}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
