export const getAppointmentsForDay = (state, day) =>
    (((state.days || [])
        .find(stateDay => stateDay.name === day) || {}).appointments || [])
        .map(appointmentId => state.appointments[appointmentId]);

    

export const getInterview = (state, interview) => {
    if(!interview){
        return null;
      }
    
      const interviewer = state.interviewers[interview.interviewer];
      const interviewReturn = {
        student: interview.student,
        interviewer
      };
    
      return interviewReturn;
};
