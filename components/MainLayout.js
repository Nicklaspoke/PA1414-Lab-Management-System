/**
 * Component file for the Main layout of the page
 *
 * @author Nicklas König (niko14)
 */

import Head from './Head';
import Header from './Header';

import '../static/style.min.css';

const MainLayout = props => (
    <div>
        <Header />
        <div className="mainContainer">
            {props.children}
        </div>
    </div>
);

export default MainLayout;
