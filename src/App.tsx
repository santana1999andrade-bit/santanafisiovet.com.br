/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
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

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2D2D] flex flex-col selection:bg-[#FF6B00] selection:text-white">
      {/* Sticky Header with Smooth Anchor Navigation */}
      <Navbar />

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

        {/* 6. Cobertura Local (Guarulhos, SP, Arujá, Itaquaquecetuba) */}
        <CoverageAreas />

        {/* 7. Prova Social / Google Reviews (5.0 Estrelas) */}
        <GoogleReviews />

        {/* 8. Perguntas Frequentes (FAQ) */}
        <FaqSection />
      </main>

      {/* Persistent Footer */}
      <Footer />

      {/* Floating Interactive WhatsApp CTA */}
      <WhatsAppFloat />
    </div>
  );
}

