import React from 'react';
import "./styles.scss"
import classNames from 'classnames';


export default function Appointment(props) {
    // const appointmentClass = classNames("appointment", {});
    return(
        <article className="appointment">
            {props.time ? `Appointment at  ${props.time}` : `No Appointments`}
        </article>
    );
}