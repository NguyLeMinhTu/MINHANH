// src/App.jsx - add routing for pages
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Product from './components/pages/Product';
import ProductDetail from './components/pages/ProductDetail';
import DongPhucMaySan from './components/pages/DongPhucMaySan';
import News from './components/pages/News';
import Store from './components/pages/Store';
import Contact from './components/pages/Contact';

// footer pages
import CauHoiThuongGap from './components/pages/FooterPages/CauHoiThuongGap';
import ChinhSachDoiTra from './components/pages/FooterPages/ChinhSachDoiTra';
import ChinhSachHoTro from './components/pages/FooterPages/ChinhSachHoTro';
import DieuKhoan from './components/pages/FooterPages/DieuKhoan';
import ThanhToan from './components/pages/FooterPages/ThanhToan';
import TuyenDung from './components/pages/FooterPages/TuyenDung';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gioi-thieu" element={<About />} />
        <Route path="/san-pham" element={<Product />} />
        <Route path="/san-pham/:slug" element={<ProductDetail />} />
        <Route path="/dong-phuc" element={<DongPhucMaySan />} />
        <Route path="/dong-phuc-may-san" element={<DongPhucMaySan />} />
        <Route path="/news" element={<News />} />
        <Route path="/tin-tuc" element={<News />} />
        <Route path="/store" element={<Store />} />
        <Route path="/cua-hang" element={<Store />} />
        <Route path="/lien-he" element={<Contact />} />

        {/* Footer pages */}
        <Route path="/faq" element={<CauHoiThuongGap />} />
        <Route path="/doi-tra" element={<ChinhSachDoiTra />} />
        <Route path="/ho-tro" element={<ChinhSachHoTro />} />
        <Route path="/dieu-khoan" element={<DieuKhoan />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/tuyen-dung" element={<TuyenDung />} />

        {/* fallback to home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}

export default App;