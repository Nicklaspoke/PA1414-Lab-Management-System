/**
 * Index page
 *
 * @author Nicklas König (niko14)
 */


import config from '../config/config.json';
import fetch from 'isomorphic-unfetch';

import MainLayout from '../components/MainLayout';


const Index = props => (
    <div>
        <MainLayout>
        <div className='index-container slide-in-left'>
            <h1>Welcome to the BTH SERL booking system</h1>
            <h2>If you already have an account, use the login button</h2>
            <h2>If you are a new student and want to apply for an account, use the register button</h2>
        </div>
        </MainLayout>
    </div>
);

Index.getInitialProps = async function() {
    let data;
    const res = await fetch(`${config.apiAddr}/test`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'GET'
    }).then(async function (responce) {
        console.log(responce)
        data = await responce.json();
    });

    console.log(data);

    return data;
}

export default Index;
