import config from '../config/config.json';
import fetch from 'isomorphic-unfetch';

const Index = props => (
    <div>
        <h1>{props.message}</h1>
    </div>
);

Index.getInitialProps = async function() {
    const res = await fetch(`${config.apiAddr}/test`)
    const data = await res.json();

    console.log(data.message);

    return data;
}

export default Index;
