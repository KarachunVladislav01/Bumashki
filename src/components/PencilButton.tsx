import { ButtonHTMLAttributes } from 'react';

interface PencilButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  rotation?: number;
  isLoading?: boolean;
  loadingText?: string;
}

export function PencilButton({ 
  children, 
  rotation = 0, 
  isLoading, 
  loadingText,
  disabled,
  ...props 
}: PencilButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled || isLoading}
      className="w-full py-3 sm:py-4 px-4 sm:px-6 pencil-btn text-xl sm:text-2xl font-semibold"
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {isLoading ? (loadingText || 'Loading...') : children}
    </button>
  );
}

