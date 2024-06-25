import { forwardRef, InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

import { TriangleAlert } from "lucide-react";

interface Props {
  error: FieldError | undefined
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", error, ...props }, ref) => {
    return (
      <fieldset className="relative w-full">
        <input
          type={type}
          ref={ref}
          className="w-full px-2 py-4 text-2xl max-sm:text-xl placeholder:italic placeholder:font-normal"
          {...props}
        />
        {error?.message && (
          <TriangleAlert className="absolute top-1/2 right-4 -translate-y-1/2 text-red-800" />
        )}
      </fieldset>
    );
  }
);