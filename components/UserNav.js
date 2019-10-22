/**
 * Main nav for admins
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import Link from 'next/link';
import { logout } from '../utils/auth';


const UserNav = () => (
    <div className="navbar">
        <ul>
            <li>
                <Link href="/user/dashboard">
                    <button>Home</button>
                </Link>
            </li>

            <li>
                <Link href="/user/book">
                    <button >Book Equipment</button>
                </Link>
            </li>

            <li>
                <Link href="/user/allBookings" as={'/user/bookings'}>
                    <button >All bookings</button>
                </Link>
            </li>

            <li>
                <Link href="/login">
                    <button onClick={function (e) {
                        logout();
                    }}>Logout</button>
                </Link>
            </li>
        </ul>
    </div>
)

export default UserNav;
