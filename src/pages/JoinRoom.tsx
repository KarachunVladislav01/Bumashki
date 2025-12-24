import { useState, useEffect, useRef } from 'react';
import { CodeInput } from '../components/CodeInput';
import { SketchBox } from '../components/SketchBox';
import { PencilInput } from '../components/PencilInput';

interface JoinRoomProps {
  onCreateRoom: (name: string) => Promise<string>;
  onJoinRoom: (code: string, name: string) => Promise<void>;
  error: string | null;
  onClearError: () => void;
}

export function JoinRoom({ onCreateRoom, onJoinRoom, error, onClearError }: JoinRoomProps) {
  const [ name, setName ] = useState('');
  const [ code, setCode ] = useState('');
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isJoining, setIsJoining ] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const isNameValid = name.trim().length > 0;
  const hasCode = code.length > 0;

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const handleCreate = async () => {
    if (!isNameValid) return;
    setIsLoading(true);
    onClearError();
    try {
      await onCreateRoom(name.trim());
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = async (code: string) => {
    if (!isNameValid) return;
    setIsJoining(true);
    onClearError();
    try {
      await onJoinRoom(code, name.trim());
    } finally {
      setIsJoining(false);
    }
  };

  return (
    <div className="min-h-screen paper-bg flex justify-center p-10 sm:p-4">
      <div className="w-full max-w-md mt-52 sm:mt-32">
        <div className="text-center mb-10 sm:mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold pencil-text tracking-wide"
            style={{ transform: 'rotate(-1deg)' }}>
            Bumashki
          </h1>
        </div>

        <SketchBox>
          <div className="px-4 sm:px-8 pt-6 sm:pt-8 pb-3 sm:pb-4">
            <PencilInput
              ref={nameInputRef}
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); onClearError(); }}
              placeholder="Your name"
              maxLength={20}
            />

            <div className="mt-6 sm:mt-8">
              <CodeInput
                onSubmit={handleJoin}
                disabled={!isNameValid}
                isLoading={isJoining}
                onInputChange={onClearError}
                onCodeChange={setCode}
              />

              {error && (
                <div className="p-2 sm:p-3 error-box text-base sm:text-lg" style={{ transform: 'rotate(0.3deg)' }}>
                  {error}
                </div>
              )}

              <div className="text-center mt-10 sm:mt-16">
                <button
                  onClick={handleCreate}
                  disabled={!isNameValid || hasCode || isLoading}
                  className="text-base sm:text-lg text-[var(--pencil-faint)] hover:text-[var(--pencil)] active:text-[var(--pencil)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors underline decoration-1 underline-offset-4"
                >
                  {isLoading ? 'Creating...' : 'or create new room'}
                </button>
              </div>
            </div>
          </div>
        </SketchBox>
      </div>
    </div>
  );
}
