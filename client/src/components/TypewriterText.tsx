import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  loop?: boolean;
}

export default function TypewriterText({ 
  text, 
  speed = 50, 
  delay = 0,
  className = "",
  loop = true
}: TypewriterTextProps) {
  const [displayedChars, setDisplayedChars] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedChars(prev => [...prev, text[currentIndex]]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else if (currentIndex === text.length && !isComplete) {
        setIsComplete(true);
        if (loop) {
          const resetTimeout = setTimeout(() => {
            setDisplayedChars([]);
            setCurrentIndex(0);
            setIsComplete(false);
          }, 2000);
          return () => clearTimeout(resetTimeout);
        }
      }
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [currentIndex, text, speed, delay, loop, isComplete]);

  return (
    <span className={className}>
      {displayedChars.map((char, index) => (
        <span
          key={`char-${index}`}
          className="inline-block"
          style={{
            animation: 'fall 0.4s ease-out',
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
