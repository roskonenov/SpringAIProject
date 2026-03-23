import { useEffect, useState } from "react";

export default function useTypingText(fullText, speed = 50) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);

    useEffect(() => {
        setText('');
        setIndex(0);
    }, [fullText]);

    useEffect(() => {
        if(index < fullText.length) {
            const timeout = setTimeout(() => {
                setText(t => t + fullText[index]);
                setIndex(i => i + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [index, fullText, speed]);
    return text;
} 