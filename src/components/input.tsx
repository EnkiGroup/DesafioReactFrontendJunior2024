import { ComponentProps } from 'react';

interface InputProps extends ComponentProps<'input'> {}

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className='italic text-2xl font-thin w-full text-[#747474] p-1 outline-none'
    />
  );
};
