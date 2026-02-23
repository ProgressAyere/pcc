import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import Contact from './pages/contact/Contact.jsx';
import Home from './pages/home/home.jsx';
import Project from './pages/project/project.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App bg-black">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
