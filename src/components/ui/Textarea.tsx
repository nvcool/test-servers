import React, { ComponentProps } from "react";

interface ITextareaProps extends ComponentProps<"textarea"> {
  isError?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, ITextareaProps>(
  ({ className, isError, ...props }: ITextareaProps, ref) => {
    return (
      <textarea
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
