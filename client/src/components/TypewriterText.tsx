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
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const startTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    if (!isDeleting) {
      if (currentIndex < text.length) {
        const timeout = setTimeout(() => {
          setDisplayedChars(prev => [...prev, text[currentIndex]]);
          setCurrentIndex(prev => prev + 1);
        }, speed);
        return () => clearTimeout(timeout);
      } else if (currentIndex === text.length && loop) {
        const pauseTimeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
        return () => clearTimeout(pauseTimeout);
      }
    } else {
      if (displayedChars.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayedChars(prev => prev.slice(0, -1));
        }, speed / 2);
        return () => clearTimeout(timeout);
      } else {
        const resetTimeout = setTimeout(() => {
          setCurrentIndex(0);
          setIsDeleting(false);
        }, 500);
        return () => clearTimeout(resetTimeout);
      }
    }
  }, [currentIndex, displayedChars.length, text, speed, delay, loop, isDeleting, hasStarted]);

  return (
    <span className={className}>
      {displayedChars.map((char, index) => (
        <span
          key={`char-${index}`}
          className={isDeleting ? "inline-block" : "inline-block animate-[fall_0.4s_ease-out_backwards]"}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
      {!isDeleting && currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
