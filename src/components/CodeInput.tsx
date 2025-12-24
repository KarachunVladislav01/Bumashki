import { useState } from 'react';

interface CodeInputProps {
  onSubmit: (code: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  onInputChange?: () => void;
  onCodeChange?: (code: string) => void;
}

export function CodeInput({ onSubmit, disabled, isLoading, onInputChange, onCodeChange }: CodeInputProps) {
  const [ code, setCode ] = useState('');

  const canSubmit = code.length === 5 && !disabled && !isLoading;

  const handleSubmit = () => {
    if (canSubmit) {
      onSubmit(code);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && canSubmit) {
      handleSubmit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setCode(value);
    onInputChange?.();
    onCodeChange?.(value);
  };

  return (
    <div className={`${disabled ? 'opacity-40' : ''}`}>
      <div className="flex items-center border-b-2 border-[var(--pencil-faint)] focus-within:border-[var(--pencil)] transition-colors">
        <input
          type="text"
          value={code}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="XXXXX"
          maxLength={5}
          disabled={disabled}
          autoComplete="off"
          spellCheck={false}
          className="flex-1 px-1 sm:px-2 py-2 sm:py-3 bg-transparent border-none text-xl sm:text-2xl tracking-[0.15em] sm:tracking-[0.2em] text-[var(--pencil)] placeholder:text-[var(--pencil-faint)] focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`px-3 sm:px-4 py-2 sm:py-3 transition-all ${canSubmit
              ? 'text-[var(--pencil)] hover:bg-[var(--pencil)] hover:text-[var(--paper)] active:bg-[var(--pencil)] active:text-[var(--paper)]'
              : 'text-[var(--pencil-faint)]'
            }`}
        >
          {isLoading ? (
            <svg className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
