import HeaderToken from "@/lib/headerToken";
//get all workspaces
export const getAllWorkspaces = async () => {
  const headers = await HeaderToken();
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspaces?pageSize=50`,
    {
      headers,
      next: {
        tags: "workspace",
      },
    }
  );

  const workspaces = await responses.json();
  return workspaces;
};
// create workspace
export const addWorkSpace = async (request) => {
  const headers = await HeaderToken();
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(request),
    }
  );
  const workspace = await responses.json();

  return workspace;
};
//update workspace name
export const updateWorkspace = async (wordspaceId, request) => {
  const headers = await HeaderToken();
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${wordspaceId}`,
    {
      method: "PUT",
      headers,
      body: JSON.stringify(request),
    }
  );
  const workspace = await responses.json();
  console.log(workspace);

  return workspace;
};
// update workspace status
export const updateWorkspaceStatusByWorkspaceId = async (id, status) => {
  const headers = await HeaderToken();
  const responses = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${id}/favorite?favorite=${status}`,
    {
      method: "PATCH",
      headers,
    }
  );
  const workspace = await responses.json();

  return workspace;
};
// get workspace by id
export const getWorkSpaceById = async (id) => {
  const authHeader = await HeaderToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${id}`,
    {
      headers: authHeader,
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }

  return await response.json();
};
