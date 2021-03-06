/**
 * Component file for the layout of the user side of things
 *
 * @auth Nicklas König (niko14)
 */
import HeaderBanner from './HeaderBanner';
import Usernav from './UserNav';

import '../static/style.min.css';

const MainAdminLayout = props => (
    <div className="site-wrapper">
        <HeaderBanner />
        <Usernav />
        <div className="mainContainer">
            {props.children}
        </div>
    </div>
);

export default MainAdminLayout;
