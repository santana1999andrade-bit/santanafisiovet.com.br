import React, { useState } from 'react';
import { MODALITIES, DOCTOR_INFO } from '../data/veterinaryData';
import { TherapyModality } from '../types';
import { Zap, Sparkles, Activity, Waves, HeartHandshake, Cpu, CheckCircle2, ArrowUpRight, MessageCircle, X } from 'lucide-react';

export const ModalitiesSection: React.FC = () => {
  const [selectedModality, setSelectedModality] = useState<TherapyModality | null>(null);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-orange-500" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-orange-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-orange-500" />;
      case 'Waves':
        return <Waves className="w-6 h-6 text-orange-500" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-orange-500" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-orange-500" />;
      default:
        return <Zap className="w-6 h-6 text-orange-500" />;
    }
  };

  const getWhatsappUrlForModality = (modalityName: string) => {
    const text = encodeURIComponent(
      `Olá Dra. Gabriela! Gostaria de saber mais sobre a sessão domiciliar de ${modalityName} para meu pet. Como funciona a avaliação?`
    );
    return `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="modalidades" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-orange-200">
            Tecnologia Hospitalar no Conforto do Lar
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Modalidades Terapêuticas Especializadas
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Protocolos integrativos e baseados em evidências, planejados de forma personalizada para combater a dor e restabelecer a independência do seu animal.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MODALITIES.map((modality) => (
            <div
              key={modality.id}
              id={`card-modality-${modality.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-100 hover:border-orange-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container with Badge */}
              <div className="relative h-48 sm:h-52 overflow-hidden bg-stone-100">
                <img
                  src={modality.imageUrl}
                  alt={modality.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-70" />
                
                <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-stone-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                  {modality.badge}
                </span>

                <div className="absolute bottom-3 left-3 w-12 h-12 rounded-2xl bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center">
                  {getIcon(modality.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-stone-800 group-hover:text-orange-600 transition-colors">
                    {modality.name}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                    {modality.shortDesc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block mb-2">
                      Principais Indicações:
                    </span>
                    <ul className="space-y-1.5">
                      {modality.indications.slice(0, 3).map((ind, i) => (
                        <li key={i} className="text-xs text-stone-600 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                          <span>{ind}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedModality(modality)}
                    className="text-xs font-bold text-stone-600 hover:text-orange-600 flex items-center gap-1 transition-colors py-2 whitespace-nowrap min-h-[38px]"
                  >
                    <span>Ver detalhes</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    id={`btn-whatsapp-${modality.id}`}
                    href={getWhatsappUrlForModality(modality.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white px-3.5 py-2 rounded-2xl transition-colors min-h-[38px] shadow-xs whitespace-nowrap"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Dúvidas</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Banner matching Vibrant Palette stone-900 strip */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-stone-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-stone-800">
          <div className="space-y-1.5 text-center md:text-left">
            <h4 className="text-xs uppercase tracking-widest text-orange-400 font-bold mb-1">
              Atendimento Personalizado Domiciliar
            </h4>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Não sabe qual a modalidade ideal para o seu pet?
            </h3>
            <p className="text-sm text-stone-300 max-w-xl leading-relaxed">
              Na consulta de avaliação domiciliar, a Dra. Gabriela examina o histórico do animal e monta um protocolo combinado para acelerar a melhora.
            </p>
          </div>
          <a
            id="btn-modalities-general-whatsapp"
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Olá Dra. Gabriela! Gostaria de agendar uma avaliação domiciliar para entender o tratamento mais indicado para meu pet."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-lg shadow-orange-950/40 transition-all shrink-0 min-h-[48px] w-full md:w-auto text-center whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Falar com a Dra. Gabriela</span>
          </a>
        </div>
      </div>

      {/* Modality Detail Modal */}
      {selectedModality && (
        <div
          id="modality-detail-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedModality(null)}
        >
          <div
            className="bg-white rounded-[36px] max-w-lg w-full overflow-hidden shadow-2xl border border-stone-100 p-6 sm:p-8 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-2.5">
                <div className="w-11 h-11 rounded-2xl bg-orange-100 flex items-center justify-center">
                  {getIcon(selectedModality.iconName)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900">
                    {selectedModality.name}
                  </h3>
                  <span className="text-xs font-semibold text-orange-600">
                    {selectedModality.badge}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModality(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-44 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={selectedModality.imageUrl}
                alt={selectedModality.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                Como Funciona na Sessão Domiciliar:
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed">
                {selectedModality.description}
              </p>

              <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wide pt-2">
                Indicações Terapêuticas:
              </h4>
              <ul className="space-y-1.5">
                {selectedModality.indications.map((ind, i) => (
                  <li key={i} className="text-xs sm:text-sm text-stone-600 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedModality(null)}
                className="px-4 py-2.5 rounded-2xl text-xs font-bold text-stone-500 hover:bg-stone-100"
              >
                Fechar
              </button>
              <a
                id="btn-modal-whatsapp-action"
                href={getWhatsappUrlForModality(selectedModality.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-orange-200 min-h-[44px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Agendar no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
