import React from "react";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export default function layout({ children }) {
  return (
    <html lang="en">
      <body className="text-charcoal bg-gray-100">
        <Toaster position="top-center" duration={2500} />
        {children}
      </body>
    </html>
  );
}
