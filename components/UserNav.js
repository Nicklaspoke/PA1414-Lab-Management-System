/**
 * Main nav for admins
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import Link from 'next/link';

const UserNav = () => (
    <div className="navbar">
        <ul>
            <li>
                <Link href="/user/dashboard">
                    <a>Home</a>
                </Link>
            </li>

            <li>
                <Link href="/user/book">
                    <a>Book Equipment</a>
                </Link>
            </li>

            <li>
                <Link href="/user/bookings">
                    <a>Current Bookings</a>
                </Link>
            </li>

            <li>
                <Link href="/logout">
                    <a>Logout</a>
                </Link>
            </li>
        </ul>
    </div>
)

export default UserNav;
