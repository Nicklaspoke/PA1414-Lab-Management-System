/**
 * Main navbar for the pages
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import Link from 'next/link';
import AdminNav from './AdminNav';
import cookies from 'next-cookies';

const Navbar = () => (
    <div className="navbar">
        <ul>
            <li>
                <Link href="/">
                    <a>Home</a>
                </Link>
            </li>
            <li>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </li>
            <li>
                <Link href="/register">
                    <a>Register</a>
                </Link>
            </li>
        </ul>
    </div>
)

export default Navbar;
