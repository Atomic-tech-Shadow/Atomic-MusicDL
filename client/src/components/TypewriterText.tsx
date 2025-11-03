import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0,
  className = "" 
}: TypewriterTextProps) {
  const [displayedChars, setDisplayedChars] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedChars(prev => [...prev, text[currentIndex]]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, speed, delay]);

  return (
    <span className={className}>
      {displayedChars.map((char, index) => (
        <span
          key={index}
          className="inline-block animate-[fall_0.4s_ease-out]"
          style={{
            animationFillMode: 'backwards'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
