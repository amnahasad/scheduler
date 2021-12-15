import React from 'react';
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';


const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";


export default function Appointment(props) {
    const { mode, transition, back } = useVisualMode(
        props.interview ? SHOW : EMPTY
    );

    function save(name, interviewer) {

        const interview = {
            student: name,
            interviewer
        };

        transition(SAVING);

        props.bookInterview(props.id, interview)
            .then(() => {
                console.log("This is a testttt before show----");
                
                transition(SHOW)})
            .catch(error => {
                console.log("This is a testttt AFTERRR show----");
                transition(ERROR_SAVE, true)});
    
            
    }

    function deleteId() {
        transition(DELETING, true);

        props.cancelInterview(props.id)
            .then(() => transition(EMPTY))
            .catch(error => transition(ERROR_DELETE, true));
    }
    function confirm() {
        transition(CONFIRM);
    }

    function edit() {
        transition(EDIT);
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
                    onEdit={edit}
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
            {mode === EDIT &&
                <Form
                    name={props.interview.student}
                    interviewer={props.interview.interviewer.id}
                    interviewers={props.interviewers}
                    onCancel={back}
                    onSave={save}
                />}
            {mode === ERROR_SAVE &&
                <Error
                    message="Error, appoinment could not be saved"
                    onClose={back}
                />
            }
            {mode === ERROR_DELETE &&
                <Error
                    message="Error, appointment could not be deleted"
                    onClose={back}
                />
            }
            {/* {(props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer.name} /> : <Empty /> )} */}
        </article>
    );
}