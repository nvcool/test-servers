import React, { ComponentProps } from "react";

interface IInputProps extends ComponentProps<"input"> {
  isError?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  ({ className, isError, ...props }: IInputProps, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={`p-4 outline-0 border rounded-xl 
          ${
            isError
              ? "border-red-500 text-red-500 rounded-xl"
              : "border-gray-500/50 text-gray-800"
          } 
          ${className}`}
      />
    );
  }
);
