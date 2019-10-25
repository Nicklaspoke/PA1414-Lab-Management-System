import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../../../components/MainAdminLayout';
import { auth } from '../../../../utils/auth';
import config from '../../../../config/config.json';

const equipment = props => (
    <AdminMainLayout>
        <div className='accountInfo slide-in-right'>
            <h1>Are you sure you want to remove this equipment</h1>
            <h2>Barcode: {props.equipment.barcode}</h2>
            <h3>Name: {props.equipment.name}</h3>
            <button className='LeftButton' onClick={function () {
                handleSubmit('ok', props.equipment.barcode, props.token);
            }}>Yes, Delete</button>

            <button className='RightButton' onClick={function () {
                Router.push('/admin/equipments');
            }}>No, Take Me Back</button>
        </div>
    </AdminMainLayout>
)

equipment.getInitialProps = async ctx => {
    let data;

    const barcode = ctx.query.barcode;
    const token = await auth(ctx);

    let equipmentData;

    const res = await fetch(`${config.apiAddr}/equipment`, {
        headers: {
            'content-type': 'application/json',
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

/**
 *
 * @param {string} action either approve or deny a account
 * @param {int} id the id of the account
 * @param {string} token the admins JWT token
 */
async function handleSubmit(action, barcode, token) {
    const data = {
        barcode: barcode,
    };

    const res = await fetch(`${config.apiAddr}/equipment`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'DELETE'
    });
    Router.push('/admin/equipments');
}

export default equipment;
