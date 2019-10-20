/**
 * Page to see all active bookings
 */
import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import { bookingStatusToString } from '../../utils/utils';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Bookings = props => (
    <AdminMainLayout>

            <table className='tableContainer'>
                <thead>
                <tr>
                    <th>User Id</th>
                    <th>Eqipment Name</th>
                    <th>Status</th>
                    <th>Borrow Time (days)</th>
                    <th>Booking Time</th>
                    <th>Checkout Time</th>
                    <th>Return Time</th>
                </tr>
                </thead>
                {props.bookings.map(booking => (
                    <Link href='booking/[id]' as={`booking/${booking.id}`}>
                            <tr>
                                <td>{booking.user_id}</td>
                                <td>{booking.equipment_name}</td>
                                <td>{bookingStatusToString(booking.status)}</td>
                                <td>{booking.borrow_time}</td>
                                <td>{booking.booking_time}</td>
                                <td>{booking.checkout_time}</td>
                                <td>{booking.return_time}</td>
                            </tr>
                    </Link>
                ))}
            </table>

    </AdminMainLayout>
);

Bookings.getInitialProps = async ctx => {
    let data;
    const token = await auth(ctx);

    let bookingData;
    //Get the booking data
    const res = await fetch(`${config.apiAddr}/booking/all`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        bookingData = await responce.json();

        console.log(bookingData);
    });

    data = {
        token: token,
        bookings: bookingData
    }
    return data;
}

export default Bookings;
