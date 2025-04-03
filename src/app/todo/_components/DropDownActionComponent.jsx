"use client";

import TaskPopupComponent from "@/components/TaskPopupComponent";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import WorkspacePopupComponent from "@/components/WorkspacePopupComponent";
import { Ellipsis } from "lucide-react";
import { useState } from "react";

export default function DropDownActionComponent({ data, type }) {
  const [open, setOpen] = useState(false);

  const closeDropdown = () => {
    setOpen(false);
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      {/* trigger button */}
      <DropdownMenuTrigger asChild>
        <Ellipsis className="hover:cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-md rounded-md mt-2 right-0 p-2">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* edit form */}
        <DropdownMenuLabel
          className="hover:cursor-pointer hover:bg-gray-100"
          // onClick={closeDropdown}
        >
          {type === "workspace" ? (
            <WorkspacePopupComponent
              mode="edit"
              workspaceData={data}
              closeDropDown={closeDropdown}
            />
          ) : (
            <TaskPopupComponent
              mode="edit"
              taskData={data}
              closeDropDown={setOpen}
            />
          )}
        </DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
