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

    //This function updates the spots available to book an appoinment when an appointment is booked or cancelled
    function updateSpots() {
        axios.get("/api/days").then((response) => {
            setState(prev => ({ ...prev, days: response.data }))
        })
    }

    //This function is for booking an interview
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

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(() => {
                setState({
                    ...state,
                    appointments
                })
                updateSpots()
            })
    }

    //This function is for cancelling an appointment
    function cancelInterview(id) {
        const appointment = {
            id,
            interview: null
        };

        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        return axios.delete(`/api/appointments/${id}`, appointment)
            .then(() => {
                setState({
                    ...state,
                    appointments
                })
                updateSpots()
            })
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