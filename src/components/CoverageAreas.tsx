import React, { useState } from 'react';
import { COVERAGE_REGIONS, DOCTOR_INFO } from '../data/veterinaryData';
import { MapPin, Search, CheckCircle2, MessageCircle, Navigation, Shield } from 'lucide-react';

export const CoverageAreas: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Collect all neighborhoods across regions
  const allNeighborhoods = COVERAGE_REGIONS.flatMap((region) =>
    region.neighborhoods.map((n) => ({
      name: n,
      city: region.city,
    }))
  );

  const matched = searchTerm.trim().length > 1
    ? allNeighborhoods.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.city.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const getWhatsappCoverageUrl = (location: string) => {
    const text = encodeURIComponent(
      `Olá Dra. Gabriela! Gostaria de saber sobre a disponibilidade de atendimento domiciliar na minha região: ${location}.`
    );
    return `https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="regioes" className="py-20 bg-white border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-orange-200">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>SEO Local & Rotas Domiciliares</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            Onde Atendemos: Guarulhos, SP & Região
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Atendimento 100% domiciliar com rotas organizadas para garantir pontualidade e tranquilidade no conforto da sua residência.
          </p>
        </div>

        {/* Interactive Neighborhood Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-stone-400">
              <Search className="w-5 h-5" />
            </div>
            <input
              id="input-search-neighborhood"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Digite seu bairro ou cidade (ex: Bosque Maia, Tucuruvi, Alphaville...)"
              className="w-full pl-12 pr-4 py-3.5 text-sm rounded-2xl bg-[#FDFBF7] border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all shadow-xs"
            />
          </div>

          {/* Search Results Feedback */}
          {searchTerm.trim().length > 1 && (
            <div className="mt-3 p-4 rounded-2xl bg-orange-50/80 border border-orange-200 space-y-2 animate-in fade-in">
              {matched.length > 0 ? (
                <>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Região atendida pela Dra. Gabriela Sant'Ana!</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {matched.slice(0, 5).map((m, i) => (
                      <span
                        key={i}
                        className="text-xs bg-white px-3 py-1 rounded-full border border-orange-100 text-stone-800 font-medium shadow-xs"
                      >
                        {m.name} ({m.city.split(' ')[0]})
                      </span>
                    ))}
                  </div>
                  <div className="pt-2">
                    <a
                      id="btn-search-whatsapp-matched"
                      href={getWhatsappCoverageUrl(matched[0].name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 px-5 py-2.5 rounded-2xl shadow-md shadow-orange-200 min-h-[40px] w-full sm:w-auto text-center"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Agendar para {matched[0].name}</span>
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 text-xs text-stone-600">
                  <span>
                    Bairro não listado diretamente? Atendemos também sob consulta de rota!
                  </span>
                  <a
                    id="btn-search-whatsapp-unmatched"
                    href={getWhatsappCoverageUrl(searchTerm)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 text-xs font-bold text-orange-600 hover:text-orange-700 hover:underline"
                  >
                    Consultar no WhatsApp →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Region Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {COVERAGE_REGIONS.map((region, idx) => (
            <div
              key={idx}
              id={`coverage-card-${idx}`}
              className="p-6 rounded-3xl bg-white border border-stone-100 hover:border-orange-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                    {region.badge}
                  </span>
                  <Navigation className="w-4 h-4 text-orange-500" />
                </div>

                <h3 className="font-bold text-base text-stone-900 mb-3">
                  {region.city}
                </h3>

                <ul className="space-y-1.5 text-xs text-stone-600">
                  {region.neighborhoods.map((nh, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      <span>{nh}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100">
                <a
                  id={`btn-coverage-city-${idx}`}
                  href={getWhatsappCoverageUrl(region.city)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-stone-800 hover:text-orange-600 flex items-center justify-between group transition-colors py-1"
                >
                  <span>Verificar agenda para esta região</span>
                  <span className="group-hover:translate-x-1 transition-transform text-orange-500 font-bold">
                    →
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Comfort Pledge Bar - Styled to match Vibrant Palette dark strip */}
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-stone-800 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-stone-800 border border-stone-700 flex items-center justify-center text-orange-400 shadow-xs shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Pontualidade e Biossegurança Rigorosa
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                Todos os materiais e colchonetes são devidamente desinfetados entre cada atendimento domiciliar.
              </p>
            </div>
          </div>
          <a
            id="btn-coverage-cta-whatsapp"
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Olá Dra. Gabriela! Gostaria de consultar se há rota disponível para minha residência esta semana."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-xs sm:text-sm font-bold bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-orange-950/40 min-h-[44px] flex items-center justify-center transition-all w-full sm:w-auto text-center"
          >
            Consultar Minha Rota
          </a>
        </div>
      </div>
    </section>
  );
};
