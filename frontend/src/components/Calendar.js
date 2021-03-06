import React from "react";
import Card from '@material-ui/core/Card';
import CalendarComponent from 'react-calendar';

class Calendar extends React.Component{
    render(){
        return(
            <Card className="app-card-box-shadow app-list-card">
                <CalendarComponent
                    calendarType="US"
                />
            </Card>
        )
    }
}
export default Calendar;