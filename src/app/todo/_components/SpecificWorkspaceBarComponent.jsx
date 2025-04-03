"use client";
import { updateWorkspaceStatusAction } from "@/action/WorkspaceAction";
import { LocateFixed, Star } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

export default function SpecificWorkspaceBarComponent({ workspace }) {
  const [isFavorite, setIsFavorite] = useState(workspace.isFavorite);
  const handleStarclick = () => {
    const newFavoriteStatus = !isFavorite;
    setIsFavorite(newFavoriteStatus);
    const updatedWorkspace = updateWorkspaceStatusAction(
      workspace.workspaceId,
      newFavoriteStatus
    );
    if (newFavoriteStatus) {
      toast("The workspace has been added to your favorite", {
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
    } else {
      toast("This Workspace has been removed from your favorite", {
        style: {
          background: "#d4edda",
          color: "#155724",
        },
      });
    }
  };
  return (
    <div className="w-full flex justify-between">
      <h4 className="font-bold text-3xl capitalize">
        {workspace.workspaceName}
      </h4>
      <form className="hover:cursor-pointer">
        <Star
          onClick={handleStarclick}
          className="p-2 rounded-md bg-gray-200 size-8"
          fill={`${isFavorite ? "#ef9c06" : "none"}`}
          stroke={isFavorite ? "ef9c06" : "black"}
        />
      </form>
    </div>
  );
}
