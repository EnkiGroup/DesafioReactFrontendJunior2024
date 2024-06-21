import { InputHTMLAttributes, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  input_cn?: string;
  box_cn?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", input_cn, box_cn, ...rest }, ref) => {
    return (
      <section className={twMerge("flex flex-col gap-2 w-full", box_cn)}>
        <input
          className={twMerge("w-full outline-none", input_cn)}
          type={type}
          ref={ref}
          {...rest}
        />
      </section>
    );
  }
);

export default Input;
