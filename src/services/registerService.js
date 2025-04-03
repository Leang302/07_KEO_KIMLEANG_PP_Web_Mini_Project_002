export const registerService = async (user) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    }
  );

  const newUser = await response.json();

  if (!response.ok) {
    throw new Error(
      newUser?.payload?.message || newUser?.message || "Registration failed"
    );
  }

  return newUser;
};
