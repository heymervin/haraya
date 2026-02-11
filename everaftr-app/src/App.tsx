import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DreamLine from './components/DreamLine';
import Home from './pages/Home';
import About from './pages/About';
import Plan from './pages/Plan';
import PlanChecklist from './pages/PlanChecklist';
import PlanBudget from './pages/PlanBudget';
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
import KasaTest from './pages/KasaTest';
import CelebrationSite from './pages/CelebrationSite';
import PhotoUpload from './pages/PhotoUpload';
import PhotoAlbum from './pages/PhotoAlbum';
import ClaimListing from './pages/ClaimListing';
import NotFound from './pages/NotFound';

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <DreamLine variant="full" />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Guest-facing celebration websites — no Navbar/Footer */}
        <Route path="/c/:slug" element={<CelebrationSite />} />
        <Route path="/c/:slug/photos" element={<PhotoUpload />} />
        <Route path="/c/:slug/album" element={<PhotoAlbum />} />

        {/* Dev tools — no Navbar/Footer */}
        <Route path="/kasa/test" element={<KasaTest />} />

        {/* Main app layout with Navbar + DreamLine + Footer */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
          <Route path="/vendors/:id" element={<VendorProfile />} />
          <Route path="/claim/:slug" element={<ClaimListing />} />
          <Route path="/plan" element={<Plan />} />
          <Route path="/plan/checklist" element={<PlanChecklist />} />
          <Route path="/plan/budget" element={<PlanBudget />} />
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
