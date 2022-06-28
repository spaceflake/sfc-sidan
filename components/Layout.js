import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex flex-col bg-base-100 grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
