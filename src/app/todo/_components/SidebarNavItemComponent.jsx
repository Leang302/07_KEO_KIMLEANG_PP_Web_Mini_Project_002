import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import Link from "next/link";
import DropDownActionComponent from "./DropDownActionComponent";

export default function SidebarNavItemComponent({ color, workspace }) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <div>
          <Link
            href={{
              pathname: `${workspace.workspaceId}`,
              query: {
                q: "workspace",
              },
            }}
            className="text-center capitalize w-full flex justify-between"
          >
            <p className="flex items-center gap-2 font-semibold text-[16px]">
              <span className={`${color} size-2 rounded-full block `}></span>
              {workspace?.workspaceName}
            </p>
          </Link>
          <DropDownActionComponent data={workspace} type="workspace" />
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
