import React from 'react';
import { DOCTOR_INFO } from '../data/veterinaryData';
import { ShieldCheck, Heart, Sparkles, Check, Clock, UserCheck, MessageSquare } from 'lucide-react';

export const AboutDoctor: React.FC = () => {
  const pillars = [
    {
      title: "Respeito ao Limite Biológico",
      description: "Cada sessão avança no ritmo seguro do paciente, sem forçar além da dor e com pausas carinhosas para descanso e petiscos."
    },
    {
      title: "Manejo Amigável (Cat & Fear Free)",
      description: "Técnicas com toalhas aromatizadas, toques suaves e sem contenção bruta, reduzindo drasticamente o estresse de cães e gatos."
    },
    {
      title: "Equipamentos Portáteis Hospitalares",
      description: "Mesma tecnologia empregada nas melhores clínicas mundiais (Laser de alta precisão, Magnetoterapia e Eletroterapia) na sua sala."
    },
    {
      title: "Aliança com o Tutor e Cirurgião",
      description: "Relatórios de evolução contínua, orientações práticas para a rotina da casa e contato direto com o veterinário responsável."
    }
  ];

  const whatsappMessage = encodeURIComponent(
    "Olá Dra. Gabriela! Li sobre sua metodologia de atendimento domiciliar e gostaria de agendar uma consulta para meu pet."
  );

  return (
    <section id="sobre" className="py-20 bg-white border-y border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Doctor Image & Profile Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md">
              <div className="relative rounded-[36px] overflow-hidden shadow-xl border-4 border-[#FDFBF7] bg-orange-50">
                <img
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=900&q=80"
                  alt="Dra. Gabriela Sant'Ana - Fisioterapia e Acupuntura Veterinária"
                  className="w-full h-[460px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-bold mb-2 shadow-xs">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{DOCTOR_INFO.crmv}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    {DOCTOR_INFO.name}
                  </h3>
                  <p className="text-sm text-stone-200 mt-1 font-medium">
                    {DOCTOR_INFO.specialties}
                  </p>
                </div>
              </div>

              {/* Floating Philosophy Card */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-white border border-orange-100 p-4 rounded-3xl shadow-lg max-w-[260px]">
                <div className="flex items-center gap-2 text-orange-600 font-bold text-xs mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Cuidado Humanizado</span>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Sem gaiolas, sem trânsito e sem sala de espera estressante.
                </p>
              </div>
            </div>
          </div>

          {/* Bio & Authority Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full border border-orange-200">
              <UserCheck className="w-4 h-4 text-orange-600" />
              <span>Autoridade & Empatia Médica</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
              Dedicada ao alívio da dor e à qualidade de vida do seu pet
            </h2>

            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {DOCTOR_INFO.bio}
            </p>

            {/* Emphatic Quote */}
            <div className="p-6 rounded-3xl bg-[#FDFBF7] border-l-4 border-orange-500 shadow-sm relative">
              <span className="text-4xl font-serif text-orange-300 absolute top-2 right-4">“</span>
              <p className="text-base sm:text-lg font-medium text-stone-900 italic leading-relaxed">
                "{DOCTOR_INFO.quote}"
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs font-bold text-orange-600">
                <span>— Dra. Gabriela Sant'Ana</span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-500">{DOCTOR_INFO.crmv}</span>
              </div>
            </div>

            {/* Methodological Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-white border border-stone-100 hover:border-orange-200 transition-colors shadow-xs"
                >
                  <div className="flex items-center gap-2 text-sm font-bold text-stone-900 mb-1.5">
                    <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span>{pillar.title}</span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed pl-7">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Direct Consultation Link */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <a
                id="btn-about-whatsapp"
                href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm px-6 py-3.5 rounded-2xl shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all min-h-[48px] w-full sm:w-auto text-center"
              >
                <MessageSquare className="w-4 h-4 shrink-0" />
                <span className="whitespace-nowrap">Falar com a Dra. Gabriela</span>
              </a>

              <a
                id="btn-about-instagram"
                href={DOCTOR_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-orange-50 text-stone-800 border border-stone-200 font-semibold text-sm px-5 py-3.5 rounded-2xl transition-all min-h-[48px] w-full sm:w-auto text-center"
              >
                <span className="whitespace-nowrap">Instagram:</span>
                <span className="text-orange-600 font-bold whitespace-nowrap">{DOCTOR_INFO.instagram}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
