"use client";
import {
  addWorkspaceAction,
  updateWorkSpaceAction,
} from "@/action/WorkspaceAction";
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
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import addIcon from "../../public/add-square.png";

export default function WorkspacePopupComponent({
  mode = "add",
  workspaceData = null,
  closeDropDown = null,
}) {
  const [workspaceName, setWorkspaceName] = useState(
    workspaceData?.workspaceName || ""
  );
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!workspaceName.trim()) {
      setError("Workspace name is required.");
      return;
    }
    let response;
    if (mode === "add") {
      response = await addWorkspaceAction({ workspaceName });
    } else if (mode === "edit") {
      response = await updateWorkSpaceAction({
        id: workspaceData?.workspaceId,
        request: workspaceName,
      });
      closeDropDown();
    }

    setIsOpen(false);
    if (response?.error) {
      toast("An error occurred, please try again.", {
        style: {
          background: "#f8d7da",
          color: "#721c24",
        },
      });
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
  };

  useEffect(() => {
    if (mode === "edit" && workspaceData) {
      setWorkspaceName(workspaceData.workspaceName);
    }
  }, [mode, workspaceData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {mode === "add" ? (
        <button className="mr-1" onClick={() => setIsOpen(true)}>
          <Image
            src={addIcon}
            alt={"plus button"}
            width={20}
            className="hover:cursor-pointer"
          />
        </button>
      ) : (
        // action buttons

        <button
          className="mr-1 hover:bg-blue-200 p-2 w-full rounded hover:cursor-pointer text-start"
          onClick={() => setIsOpen(true)}
        >
          Edit Workspace
        </button>
      )}

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Workspace" : "Create a New Workspace"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid flex-1 gap-2">
              <DialogDescription className="text-black">
                Workspace Name
              </DialogDescription>

              <Input
                name="workspaceName"
                placeholder="Please type your workspace name"
                value={workspaceName}
                onChange={(e) => {
                  setWorkspaceName(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
    </Dialog>
  );
}
