import headerToken from "@/lib/headerToken";

export const getCurrentUser = async () => {
  const headers = await headerToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/user`,
    { headers }
  );
  const users = await response.json();
  console.log(users);
  return users;
};
