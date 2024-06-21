import { TriangleAlert } from "lucide-react";
import { forwardRef, InputHTMLAttributes } from "react";
import { FieldErrors } from "react-hook-form";

type Props = {
  errors?: FieldErrors
}

type  InputProps = InputHTMLAttributes<HTMLInputElement> & Props

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", errors = "", ...props }, ref) => {
    return (
      <fieldset className="relative w-full">
        <input
          type={type}
          ref={ref}
          className="w-full px-2 py-4 text-2xl placeholder:italic placeholder:font-normal"
          {...props}
        />
      {errors && (
        <TriangleAlert className="absolute top-1/2 right-4 -translate-y-1/2 text-red-800" />
      )}
      </fieldset>
    );
  }
);