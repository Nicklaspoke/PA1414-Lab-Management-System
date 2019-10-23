/**
 * Page for the user to book equipment
 *
 * @auth Nicklas König (niko14)
 */

'use strict';

import MainUserLayout from '../../components/MainUserLayout';
import { auth } from '../../utils/auth';
import config from '../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { bookingStatusToString } from '../../utils/utils';

const book = props => (
    <MainUserLayout>
        <div className='CurrentBookingsContainer'>
            <h2>Equipment Available to book</h2>

            <table className='tableContainer'>
                <thead>
                    <tr>
                        <th>Equipment Name</th>
                        <th>Max Borrow Time</th>
                    </tr>

                    {props.equipment.map(equipment => (
                        <Link href='book/[barcode]' as={`book/${equipment.barcode}`}>
                            <tr>
                                <td>{equipment.name}</td>
                                <td>{equipment.borrow_time}</td>
                            </tr>
                        </Link>
                    ))}
                </thead>
            </table>
        </div>
    </MainUserLayout>
)

book.getInitialProps = async ctx => {
    const token = await auth(ctx);

    let equipmentData;
    //Get the equipment data
    const res = await fetch(`${config.apiAddr}/equipment`, {
        headers: {
            'content-type': 'application/json',
        },
        method: 'GET'
    }).then(async function (responce) {
        equipmentData = await responce.json();
    });

    let data = {
        token: token,
        equipment: equipmentData.data.filter(function (equipment) {
            return equipment.status == 1;
        })
    };

    return data;
}

export default book
