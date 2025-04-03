// src/lib/headerToken.js

const { auth } = require("@/auth");

const headerToken = async () => {
  const session = await auth();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.token}`,
  };
};

export default headerToken;
