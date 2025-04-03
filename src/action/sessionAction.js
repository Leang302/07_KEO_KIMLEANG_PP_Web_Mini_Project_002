"use server";
const { auth } = require("@/auth");

export const getSession = async () => {
  return await auth();
};
