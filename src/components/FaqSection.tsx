import React, { useState } from 'react';
import { FAQS, DOCTOR_INFO } from '../data/veterinaryData';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="duvidas" className="py-20 bg-white border-b border-orange-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-orange-200">
            <HelpCircle className="w-3.5 h-3.5 text-orange-600" />
            <span>Tire Suas Dúvidas</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Perguntas Frequentes dos Tutores
          </h2>
          <p className="text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            Esclareça os principais pontos sobre como a fisioterapia e a acupuntura domiciliar são realizadas na sua residência.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                id={`faq-item-${idx}`}
                className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-orange-300 bg-orange-50/40 shadow-sm'
                    : 'border-stone-200 bg-[#FDFBF7] hover:border-orange-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleIndex(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 focus:outline-none min-h-[48px]"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold ${
                    isOpen ? 'text-orange-600' : 'text-stone-900'
                  }`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-orange-500 text-white shadow-xs' : 'bg-stone-100 text-stone-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-0 text-sm sm:text-base text-stone-600 leading-relaxed animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="p-8 rounded-[32px] bg-[#FDFBF7] border border-orange-100 text-center space-y-3 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-stone-900">
            Tem outra dúvida sobre o quadro clínico do seu pet?
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
            Envie laudos ou exames diretamente para a Dra. Gabriela no WhatsApp para uma triagem inicial sem compromisso.
          </p>
          <div className="pt-2">
            <a
              id="btn-faq-whatsapp-direct"
              href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
                "Olá Dra. Gabriela! Tenho uma dúvida sobre o tratamento fisioterapêutico para meu animal."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-orange-200 transition-all min-h-[44px] w-full sm:w-auto text-center"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Tirar Dúvidas no WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
