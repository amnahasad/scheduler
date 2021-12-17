import { useState } from 'react';

//This is the visual mode component that sets the history of booking appoinments
export default function useVisualMode(initial) {

    const [history, setHistory] = useState([initial]);

    //The transition helps with the flow of the features for booking an appoinment/schedule changes
    function transition(mode, replace = false) {
        setHistory(prev => {
            if (replace) {
                prev.pop();
            }
            return [...prev, mode];
        })
    }
    //This function takes the user back to the previous action, when the user cancels and wants to go back
    function back() {
        if (history.length > 1) {
            setHistory(prev => {
                prev.pop();
                return [...prev];
            })

        }
    }
    return {
        mode: history[history.length - 1],
        transition,
        back
    };
}