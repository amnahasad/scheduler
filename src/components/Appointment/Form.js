import React, { useState } from 'react';
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";


export default function Form(props) {

    const [student, setStudent] = useState(props.student || "");
    const [interviewer, setInterviewer] = useState(props.interviewer || null);

    const reset = () => {
        setStudent(null);
        setInterviewer(null);
        props.onCancel();
    }


    const clickHandler = () => {
        props.onSave(student, interviewer)
    }
    return (
        <main className="appointment__card appointment__card--create">
            <section className="appointment__card-left">
                <form autoComplete="off" onSubmit={event => event.preventDefault()}>
                    <input
                        className="appointment__create-input text--semi-bold"
                        name="studentName"
                        type="text"
                        value={student}
                        placeholder="Enter Student Name"
                        onChange={(event) => setStudent(event.target.value)}
                    />
                </form>
                <InterviewerList
                    interviewers={props.interviewers}
                    interviewer={interviewer}
                    setInterviewer={setInterviewer}
                />
            </section>
            <section className="appointment__card-right">
                <section className="appointment__actions">
                    <Button danger onClick={reset}>Cancel</Button>
                    <Button confirm onClick={clickHandler} >Save</Button>
                </section>
            </section>
        </main>
    );
}