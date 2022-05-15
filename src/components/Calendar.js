import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function TrainingCalendar() {
	const [training, setTraining] = useState([]);
    
    const fetchTraining = () => {
        fetch(process.env.REACT_APP_API_GETTRAINING)
        .then(response => response.json())
        .then(data =>setTraining(data))
        .catch(err => console.error(err))
    }

    useEffect(() => fetchTraining(), []);

	let events = [];
	for (let i = 0; i < training.length; i++) {
		events[i] = {
			title:
				training[i].activity +
				" / " +
				training[i].customer.firstname +
				" " +
				training[i].customer.lastname,
			start: new Date(training[i].date),
			end: new Date(training[i].date + training[i].duration * 60000),

			
		};
	}
	

	return (
		<div className="container mt-3" style={{ height: "80vh" }}>
			<Calendar
				localizer={localizer}
				events={events}
				startAccessor="start"
				endAccessor="end"
			/>
		</div>
	);
}

export default TrainingCalendar;