"use client";
import { signInAction } from "@/action/signInAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export function LoginComponent() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.target);
    try {
      const response = await signInAction(formData);

      if (response.success) {
        toast("Login successful!", {
          style: { background: "#d4edda", color: "#155724" },
        });

        router.push("/todo");
      } else {
        toast(response.message, {
          style: { background: "#ffcece", color: "#a6001b" },
        });
      }
    } catch (error) {
      toast("An error occurred. Please try again.", {
        style: { background: "#ffcece", color: "#a6001b" },
      });
    }

    setLoading(false);
  };

  return (
    <form className="space-y-8 bg-white" onSubmit={handleSubmit}>
      {/* Email */}
      <div>
        <Label
          htmlFor="email"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <Mail size={20} /> Email
        </Label>
        <Input
          name="email"
          type="text"
          placeholder="Please type your email"
          required
          className="bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90"
        />
      </div>

      {/* Password */}
      <div>
        <Label
          htmlFor="password"
          className="text-light-steel-blue flex gap-2 items-start mb-2 text-base"
        >
          <KeyRound size={20} /> Password
        </Label>
        <Input
          name="password"
          type="password"
          placeholder="Please type your password"
          required
          className="bg-ghost-white py-2.5 px-4 rounded-lg w-full text-light-steel-blue/90"
        />
      </div>

      {/* Sign In Button */}
      <Button
        type="submit"
        disabled={loading}
        className="text-base cursor-pointer bg-persian-green text-white py-2.5 rounded-lg w-full font-bold"
      >
        {loading ? "Logging in..." : "Login"}
      </Button>

      {/* Sign Up Link */}
      <div>
        <div className="border-b border-b-light-steel-blue"></div>
        <div className="capitalize text-right mt-2 font-semibold">
          Create new account?{" "}
          <Link
            href="/register"
            className="hover:text-persian-green hover:underline"
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Sign In with Google */}
      <div className="bg-ghost-white rounded-lg text-center">
        <Button className="flex gap-2 items-start justify-center w-full bg-ghost-white text-charcoal shadow-none hover:bg-ghost-white/50">
          <img src="/Google Icon.svg" alt="google icon" /> Login with Google
        </Button>
      </div>
    </form>
  );
}
