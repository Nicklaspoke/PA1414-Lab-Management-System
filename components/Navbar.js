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
                    <button>Home</button>
                </Link>
            </li>

            <li>
            <Link href="/login">
                    <button>Login</button>
                </Link>
            </li>

            <li>
            <Link href="/register">
                    <button>Register</button>
                </Link>

            </li>
        </ul>
    </div>
)

export default Navbar;
