import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean,
  children: ReactNode
}

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button>
      {children}
    </button>
  );
}