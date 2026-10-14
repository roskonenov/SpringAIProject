import { useEffect, useState } from 'react';

export default function useTypingText(fullText, speed = 20) {
  const [prevFullText, setPrevFullText] = useState(fullText);
  const [displayedLength, setDisplayedLength] = useState(0);

  if (fullText !== prevFullText) {
    setPrevFullText(fullText);
    setDisplayedLength(0);
  }

  useEffect(() => {
    if (!fullText || displayedLength >= fullText.length) return;

    const timer = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [fullText, displayedLength, speed]);

  return fullText ? fullText.slice(0, displayedLength) : '';
}
 