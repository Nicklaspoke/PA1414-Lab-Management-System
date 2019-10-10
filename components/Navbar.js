import Link from 'next/link';

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
        </ul>
    </div>
)

export default Navbar;
