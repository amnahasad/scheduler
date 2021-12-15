import { useState } from 'react';

export default function useVisualMode(initial) {

    const [history, setHistory] = useState([initial]);

    function transition(mode, replace = false) {
      
        setHistory(prev => {
            if (replace) {
                prev.pop();
            }
            return [...prev, mode];
        })
    }

    function back() {
        if (history.length > 1) {
            setHistory(prev => {
                prev.pop();
                return [...prev];
            })
           
        }
    }
    return {
        mode : history[history.length - 1],
        transition,
        back
    };
}