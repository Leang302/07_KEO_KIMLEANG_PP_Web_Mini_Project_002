"use server";

import { registerService } from "@/services/registerService";

export const registerAction = async (formData) => {
  let respond;
  try {
    const userRequest = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    respond = await registerService(userRequest);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
    };
  }
};
