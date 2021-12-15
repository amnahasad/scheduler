import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";


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

        props.bookInterview(props.id, interview)
        .then(() => {
            setTimeout(() => {
                transition(SHOW);
              },2000)
        });
      }

      function deleteId() {
          transition(DELETING);
          props.cancelInterview(props.id)
          .then(() => {
              setTimeout(() => {
                transition(EMPTY);
              },2000)
          });
      }
      function confirm() {
          transition(CONFIRM);
      }
    return (
        <article className="appointment">
            <Header time={props.time} />
            {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
            {mode === SHOW && (
                <Show
                    student={props.interview.student}
                    interviewer={props.interview.interviewer.name}
                    onCancel={back}
                    onConfirm={confirm}
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
            {mode === CONFIRM && 
                <Confirm
                message="Are you sure you want to cancel this appoinement?"
                onCancel={back}
                onConfirm={deleteId} 
                />
            }
            {mode === DELETING && <Status message="Deleting" />}
            {/* {(props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty /> )} */}
        </article>
    );
}