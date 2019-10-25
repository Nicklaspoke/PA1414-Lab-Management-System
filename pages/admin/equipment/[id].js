import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../../components/MainAdminLayout';
import Link from 'next/link';
import { auth } from '../../../utils/auth';
import config from '../../../config/config.json';
import { equipmentStatusToString } from '../../../utils/utils';




const equipment = props => (
        <AdminMainLayout>
            <div className='accountInfo slide-in-right'>
                <h1>Barcode: {props.equipment.barcode}</h1>
                <h2>Name: {props.equipment.name}</h2>
                <h2>Status: {equipmentStatusToString(props.equipment.status)}</h2>
                <h2>Max borrow time: {props.equipment.borrow_time} days</h2>

            </div>
                <Link href="edit/[barcode]" as={`edit/${props.equipment.barcode}`}>
                    <a className='LeftButton'>Edit</a>
                </Link>

                <Link href="delete/[barcode]" as={`delete/${props.equipment.barcode}`}>
                    <a className='RightButton'>Delete</a>
                </Link>
        </AdminMainLayout>
)

equipment.getInitialProps = async ctx => {
    let data;

    const barcode = ctx.query.id;
    const token = await auth(ctx);

    let equipmentData;

    const res = await fetch(`${config.apiAddr}/equipment`, {
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'GET'
    }).then(async function (responce) {
        equipmentData = await responce.json();
    });

    data = {
        token: token,
        equipment: equipmentData.data.filter(function (equipment) {
            return equipment.barcode == barcode;
        })[0]
    }

    return data;
}

export default equipment;
