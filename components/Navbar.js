import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar">
        <Link href="/">
            <button>Home</button>
        </Link>

        <Link href="/login">
            <button>Login</button>
        </Link>
    </nav>
)

export default Navbar;
