import Link from 'next/link';

const Navbar = () => (
    <div className="navbar">
        <Link href="/">
            <a>Home</a>
        </Link>

        <Link href="/login">
            <a>Login</a>
        </Link>
    </div>
)

export default Navbar;
