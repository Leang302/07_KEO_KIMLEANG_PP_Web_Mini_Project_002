import { LogOut, Star } from "lucide-react";

import { signOutAction } from "@/action/signOutAction";
import SidebarNavItemComponent from "@/app/todo/_components/SidebarNavItemComponent";
import Logo from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { getAllWorkspaces } from "@/services/WorkspaceService";
import WorkspacePopupComponent from "./WorkspacePopupComponent";

export default async function SidebarComponent() {
  const workspaces = await getAllWorkspaces();

  const colors = [
    "bg-watermelon-red",
    "bg-royal-blue",
    "bg-persian-green",
    "bg-custom-purple",
  ];
  return (
    <Sidebar>
      <div className="flex justify-center items-center h-20 my-10 ">
        <Logo />
      </div>
      <SidebarContent>
        <SidebarGroup>
          {/*all workspaces*/}
          <SidebarGroupLabel className="flex w-full justify-between ">
            <h4 className="text-light-steel-blue text-xl font-semibold ">
              Workspace
            </h4>
            <WorkspacePopupComponent />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="h-[200px] overflow-y-auto ">
              {workspaces?.payload?.map((workspace, index) => {
                const color = colors[index % colors.length];
                return (
                  <SidebarNavItemComponent
                    key={workspace.workspaceId}
                    color={color}
                    workspace={workspace}
                  />
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          {/*favorite work space*/}
          <SidebarGroupLabel className="flex w-full justify-between mt-18">
            <h4 className="text-light-steel-blue text-xl font-semibold">
              Favorite
            </h4>
            <Star className="size-10 mr-2" />
          </SidebarGroupLabel>
          <SidebarGroupContent className="mt-2">
            <SidebarMenu className="h-[200px] overflow-y-auto">
              {workspaces?.payload
                ?.filter((workspace) => workspace?.isFavorite)
                .map((workspace, index) => {
                  const color = colors[index % colors.length];
                  return (
                    <SidebarNavItemComponent
                      key={workspace.workspaceId}
                      color={color}
                      workspace={workspace}
                    />
                  );
                }) ?? <p>No favorite workspace</p>}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        {/*Logout*/}
        <form action={signOutAction}>
          <button className="mt-4 hover:text-persian-green hover:underline flex items-center gap-2 px-4 py-3 text-persian-green">
            <LogOut size={18} />
            Log out
          </button>
        </form>
      </SidebarContent>
    </Sidebar>
  );
}
