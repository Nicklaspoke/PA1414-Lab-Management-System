/**
 * Main nav for admins
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import Link from 'next/link';
import Router from 'next/Router';
import { logout } from '../utils/auth';

const AdminNav = () => (
    <div className="navbar">
        <ul>
            <li>
                <Link href="/admin/dashboard">
                    <a>Home</a>
                </Link>
            </li>

            <li>
                <Link href="/admin/equipments">
                    <a>Equipment</a>
                </Link>
            </li>

            <li>
                <Link href="/admin/bookings">
                    <a>Bookings</a>
                </Link>
            </li>

            <li>
                <Link href="/admin/users">
                    <a>Users</a>
                </Link>
            </li>

            <li>
                <Link href="/login">
                    <a onClick={function (e) {
                        logout();
                    }}>Logout</a>
                </Link>
            </li>
        </ul>
    </div>
)

export default AdminNav;
