import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Loader from '../components/Loader.jsx';
import Navbar from '../components/Navbar.jsx';
import { useSite } from '../context/SiteContext.jsx';

const LOADER_DURATION_MS = 1000;

export default function MainLayout() {
  const { pathname } = useLocation();
  const { ready } = useSite();
  const [animating, setAnimating] = useState(true);

  // Show the branded loader on every page change.
  useEffect(() => {
    setAnimating(true);
    window.scrollTo(0, 0);

    const timer = setTimeout(() => setAnimating(false), LOADER_DURATION_MS);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Keep the loader up until the website data has arrived too.
  const showLoader = animating || !ready;

  useEffect(() => {
    document.body.style.overflow = showLoader ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoader]);

  return (
    <>
      <Loader show={showLoader} />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
