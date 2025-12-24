interface SketchBoxProps {
  children: React.ReactNode;
  className?: string;
}

export function SketchBox({ children, className = '' }: SketchBoxProps) {
  return (
    <div className={`sketch-box-container ${className}`}>
      <svg className="sketch-border" preserveAspectRatio="none" viewBox="0 0 100 100">
        <path d="M -7 1.5 Q 15 -0.5, 40 2.5 Q 65 0, 108 3" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round"/>
        <path d="M -3 2.5 Q 30 4.5, 55 1 Q 80 3.5, 104 1.5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.85"/>
        <path d="M -5 3.5 Q 20 1.5, 45 4 Q 70 2, 102 3.5" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7"/>
        
        <path d="M -4 98.5 Q 18 101, 42 97 Q 68 100.5, 107 97.5" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round"/>
        <path d="M -6 97.5 Q 25 95.5, 52 99 Q 78 96.5, 103 99.5" fill="none" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.85"/>
        <path d="M -2 96.5 Q 32 98.5, 58 96 Q 82 99, 105 97" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7"/>
        
        <path d="M 1.5 -6 Q -0.5 18, 3 42 Q 0.5 68, 2.5 107" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round"/>
        <path d="M 2.5 -3 Q 4 28, 1.5 55 Q 4.5 78, 2 104" fill="none" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.85"/>
        <path d="M 3.5 -7 Q 1.5 22, 4 48 Q 1 75, 3 103" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7"/>
        
        <path d="M 98.5 -4 Q 101 15, 97 40 Q 100 65, 98 106" fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinecap="round"/>
        <path d="M 97.5 -7 Q 96 30, 99 52 Q 96.5 80, 98.5 103" fill="none" stroke="currentColor" strokeWidth="0.4" strokeLinecap="round" opacity="0.85"/>
        <path d="M 96.5 -3 Q 98 25, 96 58 Q 99 82, 97 107" fill="none" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" opacity="0.7"/>
      </svg>
      <div className="sketch-box-content">
        {children}
      </div>
    </div>
  );
}

