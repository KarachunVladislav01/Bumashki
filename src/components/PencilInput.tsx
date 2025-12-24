import { InputHTMLAttributes, ChangeEvent, forwardRef } from 'react';

interface PencilInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
}

export const PencilInput = forwardRef<HTMLInputElement, PencilInputProps>(
  ({ onChange, ...props }, ref) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const filtered = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
      e.target.value = filtered;
      onChange?.(e);
    };

    return (
      <input
        ref={ref}
        {...props}
        onChange={handleChange}
        className="w-full px-1 sm:px-2 py-2 pencil-input text-xl sm:text-2xl"
      />
    );
  }
);

