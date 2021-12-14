export const getAppointmentsForDay = (state, day) => {

    let thisDay = day;
    let appointmentsPerDay = [];

    const daySelected = state.days.filter(day => day.name === thisDay)[0];

    if (!daySelected) {
        return appointmentsPerDay;
    }
    for (const appointment of daySelected.appointments) {
        appointmentsPerDay.push(appointment);
    }
    appointmentsPerDay = appointmentsPerDay.map(appointment => state.appointments[appointment]);
    return appointmentsPerDay;
};


export const getInterview = (state, interview) => {
    if (!interview) {
        return null;
    }

    const interviewer = state.interviewers[interview.interviewer];
    const interviewReturn = {
        student: interview.student,
        interviewer
    };

    return interviewReturn;
};


export const getInterviewersForDay = (state, day) => {

    let thisDay = day;
    let InterviewsPerDay = [];

    const daySelected = state.days.filter(day => day.name === thisDay)[0];

    if (!daySelected) {
        return InterviewsPerDay;
    }
    for (const interviewer of daySelected.interviewers) {
        InterviewsPerDay.push(interviewer);
    }
    InterviewsPerDay = InterviewsPerDay.map(interviewer => state.interviewers[interviewer]);
    return InterviewsPerDay;
};