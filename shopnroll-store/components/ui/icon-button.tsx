import React, { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

interface IconButtonProps {
  icon: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

const IconButton = ({ icon, onClick, className }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
