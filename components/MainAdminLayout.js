/**
 * Component file for the layout of the admin side of things
 *
 * @auth Nicklas König (niko14)
 */
import HeaderBanner from './HeaderBanner';
import AdminNav from './AdminNav';

import '../static/style.min.css';

const MainAdminLayout = props => (
    <div className="site-wrapper">
        <HeaderBanner />
        <AdminNav />
        <div className="mainContainer">
            {props.children}
        </div>
    </div>
);

export default MainAdminLayout;
