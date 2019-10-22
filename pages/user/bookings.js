/**
 * User page to see all their bookings
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import MainUserLayout from '../../components/MainUserLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { bookingStatusToString } from '../../utils/utils';

const allBookings = props => (
    <MainUserLayout>
        <div className='CurrentBookingsContainer'>
            <h2>All Bookings</h2>
            <table className='tableContainer'>
                <thead>
                    <tr>
                        <th>Equipment Name</th>
                        <th>Borrow Time (days)</th>
                        <th>Status</th>
                        <th>Booking Time</th>
                        <th>Checkout Time</th>
                        <th>Return Time</th>

                    </tr>
                </thead>

                    {props.bookings.map(booking => (
                        <Link href='booking/[id]' as={`booking/${booking.id}`}>
                            <tr>
                                <td>{booking.equipment_name}</td>
                                <td>{booking.borrow_time}</td>
                                <td>{bookingStatusToString(booking.status)}</td>
                                <td>{booking.booking_time}</td>
                                <td>{booking.checkout_time}</td>
                                <td>{booking.return_time}</td>
                            </tr>
                        </Link>
                    ))}

            </table>
        </div>
    </MainUserLayout>
);

allBookings.getInitialProps = async ctx => {
    const token = await auth(ctx);

    let bookings;

    let res = await fetch(`${config.apiAddr}/booking`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        bookings = await responce.json();
    });

    let data = {
        token: token,
        bookings: bookings,
    }

    return data;
}
export default allBookings;
