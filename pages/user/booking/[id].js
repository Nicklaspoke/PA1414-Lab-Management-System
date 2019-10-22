import MainUserLayout from '../../../components/MainUserLayout';
import { auth } from '../../../utils/auth';
import config from '../../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { bookingStatusToString } from '../../../utils/utils';

const booking = props => (
    <MainUserLayout>
        <div className='bookingInfo'>
            <h2>Equipment Name: {props.booking.equipment_name}</h2>
            <h2>Borrow Time (days): {props.booking.borrow_time}</h2>
            <h2>Status: {bookingStatusToString(props.booking.status)}</h2>
            <h2>Booking Time: {props.booking.booking_time}</h2>
            <h2>Checkout Time: {props.booking.checkout_time}</h2>
            <h2>Return Time: {props.booking.return_time}</h2>
        </div>
    </MainUserLayout>
)

booking.getInitialProps = async ctx => {
    let data;

    const bookingId = ctx.query.id;
    console.log(bookingId)
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

    data = {
        token: token,
        booking: bookings.filter(function (booking) {
            return booking.id == bookingId;
        })[0]
    }

    return data;
}

export default booking;
