import MainUserLayout from '../../../components/MainUserLayout';
import { auth } from '../../../utils/auth';
import config from '../../../config/config.json';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import Router from 'next/router';

let formData = {
    barcode: "",
    borrowTime: 1
}

const book = props => (
    <MainUserLayout>
        <div className='equipmentForm slide-in-right'>
            <h1>Book: {props.equipment.name}</h1>
            <form onSubmit={function (e) {
                handleSubmit(e, props.token, props.equipment.barcode)
                }}>
                <label htmlFor='barcode'>Barcode:</label>
                <input type='text' id='barcode' name='barcode' value={props.equipment.barcode} readOnly></input>

                <label htmlFor='borrowTime'>Borrow Time (days):</label>
                <input type='number' id='borrowTime' name='borrowTime' min='1' onChange={function (e) {
                    formData.borrowTime = e.target.value;
                }} required></input>
                <br />
                <input type='submit' className='submitButton' value='Book'></input>
                <button className='submitButton' onClick={function () {
                    Router.push('/user/book');
                }}>Go Back</button>
            </form>
        </div>
    </MainUserLayout>
)

book.getInitialProps = async ctx => {
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
    formData.barcode = data.equipment.barcode;

    return data;
}

async function handleSubmit(e, token, barcode) {
    e.preventDefault();
    const data = {
        barcode: barcode,
        borrowTime: formData.borrowTime
    };

    const res = await fetch(`${config.apiAddr}/booking`, {
        body: JSON.stringify(data),
        headers: {
            'content-type': 'application/json',
            'x-access-token': token
        },
        method: 'POST'
    });

    Router.push('/user/dashboard');
}

export default book;
