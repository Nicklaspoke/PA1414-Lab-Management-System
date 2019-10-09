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
    const res = await fetch(`${config.apiAddr}/test`)
    const data = await res.json();

    console.log(data.message);

    return data;
}

export default Index;
