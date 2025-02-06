import React from "react";

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={`transition-colors ease-in cursor-pointer py-2 px-4 rounded-md border text-xl disabled:opacity-50 ${className}`}></button>
  );
});
