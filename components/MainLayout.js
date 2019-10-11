/**
 * Component file for the Main layout of the page
 *
 * @author Nicklas König (niko14)
 */

import HeaderBanner from './HeaderBanner';
import NavBar from './Navbar';
import cookies from 'next-cookies';
import Router from 'next/router';

import '../static/style.min.css';

const MainLayout = props => (
    <div className="site-wrapper">
        <HeaderBanner />
        <NavBar />
        <div className="mainContainer">
            {props.children}
        </div>
    </div>
);
export default MainLayout;
