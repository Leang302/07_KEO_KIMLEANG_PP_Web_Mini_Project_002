import React from "react";
import {LoginComponent} from "@/app/(authentication)/_components/login";
import {auth} from "@/auth";
import {redirect} from "next/navigation";


export default async function LoginPage() {
  const session = await auth();
  if(session) return redirect("/todo");
  return (
    <main>
      <div className="space-y-14 w-[540px] mx-auto bg-white drop-shadow-light-steel-blue p-12 rounded-3xl h-[650px]">
        <h1 className="font-bold text-3xl text-center">
          Welcome to Plan<span className="text-watermelon-red">I</span>t{" "}
        </h1>
        <LoginComponent />

        {/* copyright */}
        <p className="text-center text-light-steel-blue">
          &copy; Copyright | 2025 Monster
        </p>
      </div>
    </main>
  );
}
