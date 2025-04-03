"use server";
import { signIn } from "@/auth";

export const signInAction = async (formData) => {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { success: true };
  } catch (error) {
    return {
      success: false,
      message: "Invalid credentials. Please try again.",
    };
  }
};
