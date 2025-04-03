"use client";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import React from "react";

export default function GoogleSignInComponent() {
  //   const { data: session, status } = useSession();

  const handleGoogleSignIn = async () => {
    await signIn("google");
  };
  return (
    <div className="bg-ghost-white rounded-lg text-center">
      <Button
        className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-ghost-white/50"
        onClick={handleGoogleSignIn}
      >
        <img src="/Google Icon.svg" alt="google icon" /> Login with Google
      </Button>
    </div>
  );
}
