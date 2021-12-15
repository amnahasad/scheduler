import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {
        transition(SAVING);
        const interview = {
          student: name,
          interviewer
        };

        props.bookInterview(props.id, interview);
        transition(SHOW);
      }
    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer.name}
                />
            )}
            {mode === CREATE &&
                <Form
                    interviewers={props.interviewers}
                    onCancel={back} 
                    onSave={save}
                />
            }
            {mode === SAVING && <Status message="Saving" />}
            {/* {(props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty /> )} */}
        </article>
    );
}