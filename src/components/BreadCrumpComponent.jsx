"use client";
import { getSession } from "@/action/sessionAction";
import { getWorkSpaceByIdAction } from "@/action/WorkspaceAction";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export default function BreadCrumpComponent() {
  const [workspace, setWorkspace] = useState(null);
  const pathname = usePathname();

  const workspaceId = pathname.replace("/todo/" || "/todo", "").trim();

  useEffect(() => {
    async function fetchWorkspace() {
      try {
        const session = await getSession();

        if (!session?.user?.token && !session.user.email) return;

        if (!workspaceId || workspaceId.trim() === "") return;
        const workspace = await getWorkSpaceByIdAction(workspaceId);
        setWorkspace(workspace);
      } catch (error) {
        console.log(error);
      }
    }

    if (workspaceId && workspaceId.trim() !== "") {
      fetchWorkspace();
    }
  }, [workspaceId]);
  return (
    <Breadcrumb>
      <BreadcrumbList className="text-lg">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {workspaceId && workspace?.payload?.workspaceName && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize text-watermelon-red font-semibold">
                {workspace ? (
                  workspace?.payload?.workspaceName
                ) : (
                  <Skeleton className="h-5 w-32 rounded-md" />
                )}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
