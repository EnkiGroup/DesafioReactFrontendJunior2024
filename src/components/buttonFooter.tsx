import { ComponentProps } from 'react';

interface ButtonFooterProps extends ComponentProps<'button'> {
  activeFilter: string;
  nameItem: string;
  children: React.ReactNode;
}

export const ButtonFooter = ({
  activeFilter,
  nameItem,
  children,
  ...props
}: ButtonFooterProps) => {
  return (
    <button
      {...props}
      className={`${
        activeFilter === `${nameItem}` ? 'border' : 'border border-transparent'
      }  hover:border-slate-300 rounded-md px-2`}
    >
      {children}
    </button>
  );
};
