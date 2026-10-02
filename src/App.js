import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from './components/common/Navbar';
import { NotificationToast } from './components/common/NotificationToast';
import { CartDrawer } from './components/cart/CartDrawer';
import { MenuPage } from './pages/MenuPage';
import { SignupPage } from './pages/SignupPage';
import { CheckoutPage } from './pages/CheckoutPage';
import './App.css';

export default function App() {
  const activeTab = useSelector((state) => state.ui.activeTab);

  return (
    <div className="app-wrapper">
      <Navbar />
      <NotificationToast />
      <CartDrawer />

      <main className="main-content">
        {activeTab === 'menu' && <MenuPage />}
        {activeTab === 'signup' && <SignupPage />}
        {activeTab === 'checkout' && <CheckoutPage />}
      </main>

      <footer className="footer">
        <p>© 2026 SliceMaster Inc. Built with React & Redux Toolkit.</p>
      </footer>
    </div>
  );
}