import { useState, useEffect } from "react";
import axios from 'axios';

//This component holds all the application data for the app - cancelling and booking interviews
export default function useApplicationData(props) {
    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });


    const setDay = day => setState({ ...state, day });

    function bookInterview(id, interview) {
        console.log(id, interview);

        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const request = axios.put(`/api/appointments/${id}`, appointment)

        setState({
            ...state,
            appointments
        });
        return request;
    }


    function cancelInterview(id) {
        const appointment = {
            id,
            interview: null
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const request = axios.delete(`/api/appointments/${id}`, appointment)
        setState({
            ...state,
            appointments
        });
        return request;
    }


    useEffect(() => {
        Promise.all([
            axios.get('/api/days'),
            axios.get('/api/appointments'),
            axios.get('/api/interviewers')
        ]).then((all) => {
            setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));

            console.log(all);
        })
    }, []);

    return { state, setDay, bookInterview, cancelInterview };
}