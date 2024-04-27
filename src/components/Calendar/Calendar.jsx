import React, { useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <Calendar onChange={setStartDate} value={startDate} />
    );
};
export default CalendarComponent;