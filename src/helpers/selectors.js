export const getAppointmentsForDay = (state, day) =>
    (((state.days || [])
        .find(stateDay => stateDay.name === day) || {}).appointments || [])
        .map(appointmentId => state.appointments[appointmentId]);
