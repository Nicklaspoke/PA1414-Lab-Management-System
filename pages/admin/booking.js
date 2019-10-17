import { useRouter } from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../components/MainAdminLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';



const booking = props => (
        <AdminMainLayout>
            <div className='bookingInfo'>
                <h1>Booking: {props.booking.id}</h1>
                <h2>Booker: {props.booking.user_id}</h2>
                <h2>Equipment: {props.booking.equipment_name}</h2>
                <h2>Borrow Time: {props.booking.borrow_time} days</h2>
                <h2>Booking Time: {props.booking.booking_time}</h2>
                <h2></h2>
            </div>
        </AdminMainLayout>
)

booking.getInitialProps = async ctx => {
    let data;
    console.log(ctx.query.id)
    const id = ctx.query.id;
    const token = await auth(ctx);

    let bookingData;

    const res = await fetch(`${config.apiAddr}/booking/all`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        bookingData = await responce.json();
    });

    data = {
        token: token,
        booking: bookingData.filter(function (booking) {
            return booking.id == id;
        })[0]
    }
    console.log(data.booking.id);
    return data;
}

export default booking;
