"use server";

import {
  addWorkSpace,
  getWorkSpaceById,
  updateWorkspace,
  updateWorkspaceStatusByWorkspaceId,
} from "@/services/WorkspaceService";
import { revalidatePath, revalidateTag } from "next/cache";
// create workspace
export const addWorkspaceAction = async (request) => {
  const newWorkSpace = await addWorkSpace(request);
  revalidateTag("workspace");
  return newWorkSpace;
};
// get workspace by id
export const getWorkSpaceByIdAction = async (id) => {
  const workspace = await getWorkSpaceById(id);
  return await workspace;
};
// update workspace favorite status
export const updateWorkspaceStatusAction = async (id, status) => {
  const workspace = await updateWorkspaceStatusByWorkspaceId(id, status);
  revalidateTag("workspace");
  return workspace;
};
//update workspace info
export const updateWorkSpaceAction = async ({ id, request }) => {
  const updatedWorkspace = await updateWorkspace(id, request);
  revalidatePath("/todo");
  return updatedWorkspace;
};
