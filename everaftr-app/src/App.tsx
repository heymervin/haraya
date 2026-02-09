import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DreamLine from './components/DreamLine';
import Home from './pages/Home';
import About from './pages/About';
import Plan from './pages/Plan';
import Vendors from './pages/Vendors';
import VendorProfile from './pages/VendorProfile';
import Matchmaker from './pages/Matchmaker';
import GuestList from './pages/GuestList';
import Celebrations from './pages/Celebrations';
import Community from './pages/Community';
import CoupleWebsite from './pages/CoupleWebsite';
import VendorDashboard from './pages/VendorDashboard';
import Favorites from './pages/Favorites';
import Kasa from './pages/Kasa';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <DreamLine variant="full" />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vendors" element={<Vendors />} />
            <Route path="/vendors/:id" element={<VendorProfile />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/guests" element={<GuestList />} />
            <Route path="/matchmaker" element={<Matchmaker />} />
            <Route path="/celebrations" element={<Celebrations />} />
            <Route path="/community" element={<Community />} />
            <Route path="/our-wedding" element={<CoupleWebsite />} />
            <Route path="/vendor-dashboard" element={<VendorDashboard />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/kasa" element={<Kasa />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
