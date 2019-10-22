/**
 * Main nav for admins
 *
 * @author Nicklas König (niko14)
 */
'use strict';

import Link from 'next/link';
import { logout } from '../utils/auth';

const AdminNav = () => (
    <div className="navbar">
        <ul>
            <li>
                <Link href="/admin/dashboard">
                    <button>Home</button>
                </Link>
            </li>

            <li>
                <Link href="/admin/equipments">
                    <button>Equipment</button>
                </Link>
            </li>

            <li>
                <Link href="/admin/bookings">
                    <button>Bookings</button>
                </Link>
            </li>

            <li>
                <Link href="/admin/users">
                    <button>Users</button>
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

export default AdminNav;
