import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { MessageCircle, ShieldCheck, Home, Heart, Award, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteData } = useSiteData();
  const { doctorInfo, hero } = siteData;
  const [selectedQuickNeed, setSelectedQuickNeed] = useState<string>('Hérnia de disco');

  const quickNeeds = [
    'Hérnia de disco',
    'Artrose / Dor ao andar',
    'Pós-operatório',
    'Pet Idoso',
    'Acupuntura em Felinos',
  ];

  const buildWhatsappUrl = (need: string) => {
    const text = encodeURIComponent(
      `Olá ${doctorInfo.name}! Vi o site e gostaria de agendar uma avaliação domiciliar para meu pet com foco em: ${need}. Poderia me orientar sobre dias e horários em minha região?`
    );
    return `https://wa.me/${doctorInfo.whatsappNumber}?text=${text}`;
  };

  return (
    <section
      id="inicio"
      className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-gradient-to-b from-[#FFF9F3] via-[#FDFBF7] to-white"
    >
      {/* Subtle geometric ambient accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-orange-400/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-0 w-80 h-80 bg-orange-100/60 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Main Copy (7 cols on lg) */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Trust Pill matching Vibrant Palette */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3.5 py-1.5 rounded-full border border-orange-200 shadow-xs whitespace-nowrap">
                {hero.badge}
              </div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-stone-100 text-stone-600 px-3 py-1.5 rounded-full border border-stone-200 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span>{doctorInfo.crmv}</span>
              </div>
            </div>

            {/* H1 Primary SEO Title */}
            <h1
              id="hero-title"
              className="text-2xl sm:text-4xl md:text-5xl lg:text-[44px] font-extrabold leading-tight text-stone-900 tracking-tight"
            >
              {hero.title}{' '}
              <span className="text-orange-500">{hero.titleHighlight}</span>{' '}
              {hero.titleLocations}
            </h1>

            {/* Subtitle */}
            <p
              id="hero-subtitle"
              className="text-sm sm:text-base md:text-lg text-stone-600 leading-relaxed max-w-2xl font-normal"
            >
              {hero.subtitle}
            </p>

            {/* Quick Consultation Selector */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-100 shadow-sm max-w-xl">
              <p className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2.5">
                Selecione o quadro do seu pet para direcionar o atendimento:
              </p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {quickNeeds.map((need) => (
                  <button
                    key={need}
                    type="button"
                    onClick={() => setSelectedQuickNeed(need)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl transition-all min-h-[38px] whitespace-nowrap ${
                      selectedQuickNeed === need
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                        : 'bg-stone-50 text-stone-600 hover:bg-orange-50 hover:text-orange-600 border border-stone-200'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button (Target >= 48px) and Social Proof Stack */}
            <div className="flex flex-col gap-3.5 pt-1">
              <a
                id="btn-hero-primary-whatsapp"
                href={buildWhatsappUrl(selectedQuickNeed)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold py-3.5 px-6 sm:py-4 sm:px-8 rounded-2xl shadow-lg shadow-orange-200 hover:shadow-xl hover:shadow-orange-300 flex items-center justify-center gap-2.5 sm:gap-3 text-sm sm:text-base md:text-lg transition-all min-h-[52px] text-center w-full sm:w-fit"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white shrink-0" />
                <span className="hidden sm:inline whitespace-nowrap">Agendar Avaliação Domiciliar via WhatsApp</span>
                <span className="sm:hidden whitespace-nowrap">Agendar Avaliação no WhatsApp</span>
                <ArrowRight className="w-5 h-5 hidden sm:inline" />
              </a>

              {/* +100 Pets Reabilitados Social Proof Stack from Vibrant Palette Design */}
              <div className="flex gap-3 items-center mt-0.5">
                <div className="flex -space-x-2 shrink-0">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-stone-200 overflow-hidden shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Golden Retriever atendido em casa"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-stone-300 overflow-hidden shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Gato paciente de acupuntura"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white bg-stone-400 overflow-hidden shadow-xs">
                    <img
                      src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=120&h=120&q=80"
                      alt="Cão idoso em reabilitação"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs font-semibold text-stone-500">
                  <strong className="text-stone-800 font-bold">+500 pets</strong> reabilitados com carinho e ciência
                </p>
              </div>
            </div>

            {/* Trust Badges Under CTA */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-4 pt-4 border-t border-stone-200 max-w-xl">
              <div className="flex items-center xs:items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-800 block whitespace-nowrap">Zero Estresse</span>
                  <span className="text-[11px] text-stone-500 whitespace-nowrap">No conforto do lar</span>
                </div>
              </div>

              <div className="flex items-center xs:items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-800 block whitespace-nowrap">Ética & Ciência</span>
                  <span className="text-[11px] text-stone-500 whitespace-nowrap">Dra. Gabriela</span>
                </div>
              </div>

              <div className="flex items-center xs:items-start gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                  <Heart className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-stone-800 block whitespace-nowrap">Alívio da Dor</span>
                  <span className="text-[11px] text-stone-500 whitespace-nowrap">Foco no bem-estar</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Showcase (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-400/20 to-orange-200/20 rounded-[36px] transform rotate-2 scale-98" />

              {/* Main Professional Photo Card */}
              <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
                <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-100">
                  <img
                    src={hero.imageUrl}
                    alt={doctorInfo.name}
                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                  {/* Floating Doctor Badge Inside Photo */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 p-2.5 sm:p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-white/60 shadow-md flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="text-xs font-extrabold text-stone-900 block truncate">
                        {doctorInfo.name}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium block truncate">
                        Médica Veterinária • {doctorInfo.crmv}
                      </span>
                    </div>
                    <span className="px-2 py-1 rounded-xl bg-orange-100 text-orange-700 text-[10px] font-bold whitespace-nowrap shrink-0">
                      Fisiatria & Acupuntura
                    </span>
                  </div>
                </div>

                {/* Floating Quick Stat Bubble */}
                <div className="mt-3 grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FDFBF7] border border-stone-200">
                    <span className="text-sm sm:text-base font-extrabold text-orange-600 block leading-none">
                      {hero.statReviews}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-1 block">
                      Google Reviews
                    </span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-[#FDFBF7] border border-stone-200">
                    <span className="text-sm sm:text-base font-extrabold text-stone-900 block leading-none">
                      {hero.statLocations}
                    </span>
                    <span className="text-[10px] sm:text-[11px] text-stone-500 font-medium mt-1 block">
                      Rotas Domiciliares
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Pill on top-left */}
              <div className="hidden sm:flex items-center gap-2 absolute -top-4 -left-4 bg-white py-2 px-4 rounded-full shadow-lg border border-stone-200 text-xs font-bold text-stone-800">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                <span>Atendimento no próprio lar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
