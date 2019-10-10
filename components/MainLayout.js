/**
 * Component file for the Main layout of the page
 *
 * @author Nicklas König (niko14)
 */

import Header from './Header';
import cookies from 'next-cookies';
import Router from 'next/router';
import '../static/style.min.css';

const MainLayout = props => (
    <div className="site-wrapper">
        <Header />
        <div className="mainContainer">
            {props.children}
        </div>
    </div>
);

MainLayout.getInitialProps = async function {
    const token = cookies().token

    if(!token) {
        Router.push('/login');
    }
}
export default MainLayout;
