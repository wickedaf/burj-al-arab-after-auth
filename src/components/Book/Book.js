import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] = React.useState({
        checkIn: new Date(),
        checkOut: new Date()
    });
    const handleCheckInDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkIn = date
        setSelectedDate(newDate);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOut = date
        setSelectedDate(newDate);
    };

    const handleBooking = () => {
        const newBooking = {...loggedInUser, ...selectedDate};
        fetch("http://localhost:5000/addBooking", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBooking) 
        })
        .then(res => res.json())
        .then(result => console.log(result))
    }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Hello!! {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Check In Date"
                        value={selectedDate.checkIn}
                        onChange={handleCheckInDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    <KeyboardDatePicker
                        margin="normal"
                        id="date-picker-dialog"
                        label="Check Out Date"
                        format="dd/MM/yyyy"
                        value={selectedDate.checkOut}
                        onChange={handleCheckOutDate}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </Grid>
                <Button onClick={handleBooking} variant="contained" color="primary">
                    Book Now
                </Button>
            </MuiPickersUtilsProvider>
            <Bookings></Bookings>
        </div>
    );
};

export default Book;