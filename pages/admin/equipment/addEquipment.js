import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

import AdminMainLayout from '../../../components/MainAdminLayout';
import Link from 'next/link';
import { auth } from '../../../utils/auth';
import config from '../../../config/config.json';
import { equipmentStatusToString } from '../../../utils/utils';

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

const addEquipment = props => (
    <AdminMainLayout>
        {errorDisplay.display ?
        <div className="errorCreationBox slide-in-top">
            <h3>{errorDisplay.titel}</h3>
            <p>{errorDisplay.message}</p>
        </div>
        : null}
        <div className='equipmentForm slide-in-right'>
            <h1>Add new equipment</h1>

            <form onSubmit={function (e) {handleSubmit(e, props.token)}}>
                <label htmlFor='barcode'>Barcode:</label>
                <input type='text' id='barcode' name='barcode' onChange={function (e) {
                    formData.barcode = e.target.value;
                }} required></input>

                <label htmlFor='name'>Name:</label>
                <input type='text' id='name' name='name' onChange={function (e) {
                    formData.name = e.target.value;
                    console.log(e.target.value)
                }} required></input>

                <label htmlFor='borrowTime'>Max Borrow Time (days):</label>
                <input type='number' id='borrowTime' name='borrowTime' min='1' onChange={function (e) {
                    formData.borrowTime = e.target.value;
                }} required></input>
                <br />
                <input className='submitButton' type="submit" value='Confirm'></input>
            </form>
        </div>
    </AdminMainLayout>
)

addEquipment.getInitialProps = async ctx => {
    let data;

    const barcode = ctx.query.barcode;
    const token = await auth(ctx);

    data = {
        token: token,
    };

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
        method: 'POST'
    });

    const data = await res.json();
    console.log(data)
    if (data.errors) {
        errorDisplay.titel = data.errors['title'];
        errorDisplay.message = data.errors['details'];
        errorDisplay.display = true;
        Router.push('/admin/equipment/addEquipment');
    } else {
        Router.push('/admin/equipments');
    }
}

export default addEquipment;
