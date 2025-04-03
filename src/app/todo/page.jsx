import { getAllWorkspaces } from "@/services/WorkspaceService";
import Image from "next/image";
import { redirect } from "next/navigation";
import fallbackImg from "../../../public/workspaceFallback.png";

export default async function page() {
  const response = await getAllWorkspaces();
  const workspaces = response.payload;
  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="w-[100%] h-[70%] flex justify-center items-center flex-col">
        <Image src={fallbackImg} width={300} alt="Not found" />
        <h2 className="text-3xl font-bold">There's no work Space avaibale</h2>
      </div>
    );
  }
  const firstWorkspace = workspaces[0];
  const params = new URLSearchParams({
    q: "workspace",
  });
  return redirect(`/todo/${firstWorkspace.workspaceId}?${params.toString()}`);
}
