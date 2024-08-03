import Header from './Header';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div>
    <Header />
    <Navbar />
    <main className="p-4">{children}</main>
  </div>
);

export default Layout;
