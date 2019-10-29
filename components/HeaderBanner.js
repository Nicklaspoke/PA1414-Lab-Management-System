/**
 * Common header component
 *
 * @author Nicklas König (niko14)
 */

import Link from 'next/link';

const Header = () => (
    <div className="headerBanner">
        <Link href="/">
            <a>
                <img className="imageFit" src="/static/img/serl_bth.png" alt="SERL-BTH-Logo"></img>
            </a>
        </Link>
    </div>
);

export default Header;
