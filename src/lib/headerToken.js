import { auth } from "@/auth";
import { registerService } from "@/services/registerService";
import { signInService } from "@/services/signInService"; // Assuming signInService exists

const headerToken = async () => {
  const session = await auth();
  // for google login
  if (session?.user?.email) {
    try {
      // register  credential
      await registerService({
        username: session.user.name,
        email: session.user.email,
        password: process.env.AUTH_GOOGLE_ID,
      });
      //if not exist login
      const loggedInUser = await signInService({
        email: session.user.email,
        password: process.env.AUTH_GOOGLE_ID,
      });
      return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loggedInUser.token}`, // Use the token from login
      };
    } catch (error) {
      // if already exist
      if (
        error?.message?.includes(
          "duplicate key value violates unique constraint"
        ) ||
        error?.message?.includes("Email is already in use")
      ) {
        //log in
        const loggedInUser = await signInService({
          email: session.user.email,
          password: process.env.AUTH_GOOGLE_ID,
        });

        return {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loggedInUser.token}`,
        };
      }
      throw new Error(error.message || "Registration failed");
    }
  }
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${session?.user?.token}`,
  };
};

export default headerToken;
