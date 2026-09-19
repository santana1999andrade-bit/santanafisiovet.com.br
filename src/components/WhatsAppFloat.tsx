import React from 'react';
import { DOCTOR_INFO } from '../data/veterinaryData';

export const WhatsAppFloat: React.FC = () => {
  const defaultMsg = encodeURIComponent(
    "Olá Dra. Gabriela! Gostaria de tirar dúvidas e agendar uma avaliação domiciliar para meu pet."
  );

  return (
    <aside
      id="whatsapp-float-container"
      aria-label="Atendimento via WhatsApp"
      className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2"
    >
      {/* Desktop subtle tooltip */}
      <span className="hidden md:inline-block bg-white/95 text-stone-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-stone-100 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
        Falar no WhatsApp
      </span>

      {/* Primary Floating Button */}
      <a
        id="btn-whatsapp-floating"
        href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${defaultMsg}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Dra. Gabriela no WhatsApp"
        className="group relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-lg shadow-[#25D366]/30 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 min-w-[48px] min-h-[48px]"
      >
        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.07c-.24.68-1.4 1.26-1.93 1.32-.49.06-1.12.08-3.23-.78-2.69-1.1-4.4-3.83-4.54-4.01-.13-.18-1.1-1.47-1.1-2.8 0-1.33.7-1.99.95-2.26.24-.26.54-.33.72-.33.18 0 .36 0 .52.01.17.01.39-.06.61.47.23.54.78 1.9.85 2.04.07.14.12.31.02.5-.1.18-.15.3-.29.47-.14.18-.3.4-.43.54-.14.15-.29.31-.13.59.17.28.74 1.22 1.6 1.98 1.1.98 2.03 1.28 2.32 1.42.29.14.46.12.63-.07.17-.19.73-.85.92-1.14.2-.29.39-.24.66-.14.27.1.72.81 2.01.95.14.07.24.11.27.17.03.06.03.35-.21 1.03z"/>
        </svg>

        {/* Small Online Green Dot Indicator */}
        <span className="absolute top-1 right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white" />
      </a>
    </aside>
  );
};
