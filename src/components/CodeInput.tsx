import { useState } from 'react';

interface CodeInputProps {
  onSubmit: (code: string) => void;
  disabled?: boolean;
  isLoading?: boolean;
  onInputChange?: () => void;
}

export function CodeInput({ onSubmit, disabled, isLoading, onInputChange }: CodeInputProps) {
  const [code, setCode] = useState('');

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
  };

  return (
    <div className={`relative ${disabled ? 'opacity-40' : ''}`}>
      <div className="flex rounded-xl bg-slate-900/50 border border-slate-600/50 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-amber-500/50 focus-within:border-amber-500/50">
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
          className="flex-1 px-4 py-3 bg-transparent text-slate-100 placeholder-slate-500 text-lg tracking-[0.2em] font-mono text-center focus:outline-none disabled:cursor-not-allowed"
        />
        <button
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={`w-12 flex items-center justify-center transition-all border-l border-slate-600/50 ${
            canSubmit
              ? 'bg-amber-500 text-slate-900 hover:bg-amber-400 border-amber-500'
              : 'text-slate-600'
          }`}
        >
          {isLoading ? (
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
