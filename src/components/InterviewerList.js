import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from 'prop-types';


//This component holds the list of all the interviewers
function InterviewerList(props) {
  const interviewers = (props.interviewers ? Object.values(props.interviewers).map((interviewer, index) =>
    <InterviewerListItem
      key={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected={interviewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(interviewer.id)}
    />
  ) : ""
  );

  return (<section className={"interviewers"}>
    <h4 className={"interviewers__header text--light"}>Interviewer</h4>
    <ul className={"interviewers__list"}>{interviewers}</ul>
  </section>);
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;