import { InputHTMLAttributes, forwardRef } from 'react';

interface PencilInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
}

export const PencilInput = forwardRef<HTMLInputElement, PencilInputProps>(
  (props, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className="w-full px-1 sm:px-2 py-2 pencil-input text-xl sm:text-2xl"
      />
    );
  }
);

