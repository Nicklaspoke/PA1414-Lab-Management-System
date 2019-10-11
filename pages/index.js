import config from '../config/config.json';
import fetch from 'isomorphic-unfetch';

import MainLayout from '../components/MainLayout';


const Index = props => (
    <div>
        <MainLayout>

        <h1>{props.message}</h1>

        </MainLayout>
    </div>
);

Index.getInitialProps = async function() {
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
