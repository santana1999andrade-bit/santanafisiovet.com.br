/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { SiteDataProvider } from './context/SiteDataContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutDoctor } from './components/AboutDoctor';
import { ModalitiesSection } from './components/ModalitiesSection';
import { ConditionsAndAlerts } from './components/ConditionsAndAlerts';
import { RehabDiaryBlog } from './components/RehabDiaryBlog';
import { CoverageAreas } from './components/CoverageAreas';
import { GoogleReviews } from './components/GoogleReviews';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { AdminLayout } from './components/admin/AdminLayout';

function checkIsAdminRoute(): boolean {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return (
    path === '/admin' ||
    path.endsWith('/admin') ||
    path.endsWith('/admin/') ||
    hash === '#admin' ||
    hash === '#/admin' ||
    hash.startsWith('#admin') ||
    hash.startsWith('#/admin')
  );
}

const MainSite: React.FC<{ onOpenAdmin: () => void }> = ({ onOpenAdmin }) => {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] flex flex-col selection:bg-[#FF6B00] selection:text-white">
      {/* Sticky Header with Smooth Anchor Navigation */}
      <Navbar onOpenAdmin={onOpenAdmin} />

      {/* Main One-Page Content Flow */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Sobre a Dra. Gabriela Sant'Ana */}
        <AboutDoctor />

        {/* 3. Modalidades Terapêuticas */}
        <ModalitiesSection />

        {/* 4. O Que Tratamos & Sinais de Alerta */}
        <ConditionsAndAlerts />

        {/* 5. Diário de Reabilitação & Dicas (Blog) */}
        <RehabDiaryBlog />

        {/* 6. Cobertura Local (Grande São Paulo, Guarulhos e Cidade de São Paulo) */}
        <CoverageAreas />

        {/* 7. Prova Social / Google Reviews (5.0 Estrelas) */}
        <GoogleReviews />

        {/* 8. Perguntas Frequentes (FAQ) */}
        <FaqSection />
      </main>

      {/* Persistent Footer */}
      <Footer onOpenAdmin={onOpenAdmin} />

      {/* Floating Interactive WhatsApp CTA */}
      <WhatsAppFloat />
    </div>
  );
};

export default function App() {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => checkIsAdminRoute());

  useEffect(() => {
    const handleLocationChange = () => {
      setIsAdmin(checkIsAdminRoute());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const handleOpenAdmin = () => {
    window.location.hash = 'admin';
    setIsAdmin(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToSite = () => {
    if (window.location.hash.includes('admin')) {
      window.history.pushState(null, '', window.location.pathname);
    }
    setIsAdmin(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <SiteDataProvider>
      <AuthProvider>
        {isAdmin ? (
          <AdminLayout onBackToSite={handleBackToSite} />
        ) : (
          <MainSite onOpenAdmin={handleOpenAdmin} />
        )}
      </AuthProvider>
    </SiteDataProvider>
  );
}
