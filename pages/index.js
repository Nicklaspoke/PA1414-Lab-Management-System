import config from '../config/config.json';
import fetch from 'isomorphic-unfetch';

import MainLayout from '../components/MainLayout';
import Navbar from '../components/Navbar';


const Index = props => (
    <div>
        <MainLayout>

        <h1>{props.message}</h1>

        </MainLayout>
    </div>
);

Index.getInitialProps = async function() {
    const bodyData = {
        "userId": "niko14",
        "password": "CMC3BFF"
    };
    let data;
    console.log(bodyData);
    const res = await fetch(`${config.apiAddr}/login`, {
        body: await JSON.stringify(bodyData),
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST'
    }).then(async function (responce) {
        console.log(responce)
        data = await responce.json();
    });

    console.log(data);

    return data;
}

export default Index;
