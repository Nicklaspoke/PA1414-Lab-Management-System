import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../../../components/MainAdminLayout';
import Link from 'next/link';
import { auth } from '../../../../utils/auth';
import config from '../../../../config/config.json';
import { equipmentStatusToString } from '../../../../utils/utils';

let errorDisplay = {
    "titel": "",
    "message": "",
    "display": false
}

let formData = {
    barcode: "",
    name: "",
    borrowTime: 1
}

const equipment = props => (
    <AdminMainLayout>
        {errorDisplay.display ?
        <div className="errorCreationBox">
            <h3>{errorDisplay.titel}</h3>
            <p>{errorDisplay.message}</p>
        </div>
        : null}
        <div className='equipmentForm slide-in-right'>
            <h1>Edit: {props.equipment.name}</h1>

            <form onSubmit={function (e) {handleSubmit(e, props.token)}}>
                <label htmlFor='barcode'>Barcode:</label>
                <input type='text' id='barcode' name='barcode' value={props.equipment.barcode} readOnly></input>

                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' placeholder={props.equipment.name} onChange={function (e) {
                    formData.name = e.target.value;
                    console.log(e.target.value)
                }}></input>

                <label htmlFor='borrowTime'>Max Borrow Time (days):</label>
                <input type='number' id='borrowTime' name='borrowTime' min='1' placeholder={props.equipment.borrow_time} onChange={function (e) {
                    formData.borrowTime = e.target.value;
                }}></input>
                <br />
                <input className='submitButton' type="submit" value='Confirm'></input>
            </form>
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

    formData.barcode = barcode;
    formData.name = data.equipment.name;
    formData.borrowTime = data.equipment.borrow_time;
    console.log(formData);
    return data;
}

async function handleSubmit(e, token) {
    errorDisplay.display = false;
    e.preventDefault();
    console.log(formData);

    const res = await fetch(`${config.apiAddr}/equipment`, {
        body: JSON.stringify(formData),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'PUT'
    });

    const data = await res.json();

    Router.push('/admin/equipments')
}

export default equipment;
