import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Contact from './pages/contact/Contact.jsx';
import Home from './pages/home/home.jsx';
import Project from './pages/project/project.jsx';
import PageLoader from './components/PageLoader.jsx';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // true = shows on first load

  // Initial page load/reload
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Route change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="App bg-black">
      {loading && <PageLoader />}
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;