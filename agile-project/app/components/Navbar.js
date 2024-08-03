import Link from 'next/link';

const Navbar = () => (
  <nav className="bg-gray-800 p-4">
    <ul className="flex space-x-4">
      <li>
        <Link href="/companies">
          <a className="text-white">Companies</a>
        </Link>
      </li>
      <li>
        <Link href="/deals">
          <a className="text-white">Deals</a>
        </Link>
      </li>
      <li>
        <Link href="/dashboard">
          <a className="text-white">Dashboard</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
