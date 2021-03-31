import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    useEffect(() => {
        fetch('https://still-citadel-77164.herokuapp.com/bookings?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'authorization': `Bearer ${sessionStorage.getItem('token')}`              
            }

        })
        .then(res => res.json())
        .then(data => setBookings(data))
    }, [loggedInUser]);

    return (
        <div>
            <h3>You have {bookings.length} Bookings</h3>
            {
                bookings.map(booking => <p>{booking.name} From: {(new Date(booking.checkIn).toDateString('dd/MM/YYYY'))} <span>  </span >To:{(new Date(booking.checkOut).toDateString('dd/MM/YYYY'))}</p>)
            }
        </div>
    );
};

export default Bookings;