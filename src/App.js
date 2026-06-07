import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Contact from './pages/contact/Contact.jsx';
import Home from './pages/home/home.jsx';
import Project from './pages/project/project.jsx';
import PageLoader from './components/PageLoader.jsx';
import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import Overview from './pages/admin/components/Overview.jsx';
import ProjectsManagement from './pages/admin/components/ProjectsManagement.jsx';
import MediaLibrary from './pages/admin/components/MediaLibrary.jsx';
import ContactSubmissions from './pages/admin/components/ContactSubmissions.jsx';
import TestimonialsManagement from './pages/admin/components/TestimonialsManagement.jsx';
import Settings from './pages/admin/components/Settings.jsx';
import ProtectedRoute from './utils/ProtectedRoute.jsx';
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
  const [loading, setLoading] = useState(true);
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (!isAdminRoute) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isAdminRoute]);

  useEffect(() => {
    if (!isAdminRoute) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isAdminRoute]);

  return (
    <div className="App bg-black">
      {!isAdminRoute && loading && <PageLoader />}
      {!isAdminRoute && <ScrollToTop />}
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }>
          <Route index element={<Overview />} />
          <Route path="projects" element={<ProjectsManagement />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="contacts" element={<ContactSubmissions />} />
          <Route path="testimonials" element={<TestimonialsManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;