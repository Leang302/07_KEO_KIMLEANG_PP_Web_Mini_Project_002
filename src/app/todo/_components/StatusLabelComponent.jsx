import React from "react";

export default function StatusLabelComponent({ title, textColor, bgColor }) {
  return (
    <div className={`space-y-2 ${textColor} block`}>
      <p className="font-semibold text-lg">{title}</p>
      <span className={`w-full h-[0.5px] ${bgColor} block`}></span>
    </div>
  );
}
