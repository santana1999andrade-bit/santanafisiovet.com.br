import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { TREATED_CONDITIONS, ALERT_SYMPTOMS } from '../data/veterinaryData';
import { ShieldAlert, Bone, Stethoscope, Activity, Layers, HeartPulse, CheckSquare, Square, AlertCircle, MessageCircle, ArrowRight } from 'lucide-react';

export const ConditionsAndAlerts: React.FC = () => {
  const { siteData } = useSiteData();
  const { doctorInfo } = siteData;
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const toggleSymptom = (id: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const getConditionIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-orange-500" />;
      case 'Bone':
        return <Bone className="w-6 h-6 text-orange-500" />;
      case 'Stethoscope':
        return <Stethoscope className="w-6 h-6 text-orange-500" />;
      case 'Activity':
        return <Activity className="w-6 h-6 text-orange-500" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-orange-500" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-orange-500" />;
      default:
        return <Activity className="w-6 h-6 text-orange-500" />;
    }
  };

  const buildSymptomWhatsappUrl = () => {
    if (selectedSymptoms.length === 0) {
      const text = encodeURIComponent(
        `Olá ${doctorInfo.name}! Gostaria de relatar os sintomas que meu pet está apresentando e agendar uma avaliação domiciliar.`
      );
      return `https://wa.me/${doctorInfo.whatsappNumber}?text=${text}`;
    }

    const symptomLabels = ALERT_SYMPTOMS.filter((s) =>
      selectedSymptoms.includes(s.id)
    )
      .map((s) => `• ${s.label}`)
      .join('\n');

    const text = encodeURIComponent(
      `Olá ${doctorInfo.name}! Fiz o teste no site e notei os seguintes sinais de alerta no meu pet:\n\n${symptomLabels}\n\nGostaria de entender se é caso de fisioterapia domiciliar e como podemos agendar a avaliação.`
    );
    return `https://wa.me/${doctorInfo.whatsappNumber}?text=${text}`;
  };

  return (
    <section id="tratamentos" className="py-20 bg-white border-b border-orange-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header: O que Tratamos */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-orange-200">
            Reabilitação & Fisiatria Clínica
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            O Que Tratamos
          </h2>
          <p className="text-base text-stone-600 leading-relaxed">
            Do alívio imediato de dores agudas à recuperação motora completa de casos neurológicos complexos e cuidados na terceira idade do seu melhor amigo.
          </p>
        </div>

        {/* Conditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TREATED_CONDITIONS.map((cond) => (
            <div
              key={cond.id}
              id={`condition-item-${cond.id}`}
              className="p-6 rounded-3xl bg-white border border-stone-100 hover:border-orange-200 transition-all duration-200 shadow-xs hover:shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center shadow-xs mb-4">
                  {getConditionIcon(cond.icon)}
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2">
                  {cond.title}
                </h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {cond.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 text-[11px] text-stone-500">
                <strong className="text-stone-800 block mb-0.5 font-bold">Observação clínica:</strong>
                <span>{cond.commonIn}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Tutor Self-Triage Section */}
        <div
          id="alerta-tutor"
          className="bg-[#FDFBF7] rounded-[36px] p-6 sm:p-10 border border-orange-100 shadow-sm scroll-mt-24"
        >
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-orange-200">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-stone-900">
                  Sinais de Alerta: Quando Chamar a Fisioterapia Veterinária?
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  Marque abaixo os sintomas observados no seu pet nas últimas 48 horas para orientar a Dra. Gabriela:
                </p>
              </div>
            </div>

            {/* Checklist of symptoms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {ALERT_SYMPTOMS.map((symptom) => {
                const isChecked = selectedSymptoms.includes(symptom.id);
                return (
                  <button
                    key={symptom.id}
                    type="button"
                    onClick={() => toggleSymptom(symptom.id)}
                    className={`p-4 rounded-2xl text-left border transition-all flex items-start gap-3 min-h-[48px] ${
                      isChecked
                        ? 'bg-white border-orange-500 ring-2 ring-orange-200 shadow-sm'
                        : 'bg-white border-stone-200 hover:border-orange-200'
                    }`}
                  >
                    <div className="mt-0.5 text-orange-500 shrink-0">
                      {isChecked ? (
                        <CheckSquare className="w-5 h-5 fill-orange-100 text-orange-600" />
                      ) : (
                        <Square className="w-5 h-5 text-stone-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <span className={`text-xs sm:text-sm font-bold block leading-tight ${
                        isChecked ? 'text-stone-900' : 'text-stone-700'
                      }`}>
                        {symptom.label}
                      </span>
                      <span className="text-[11px] text-stone-500 mt-1 block">
                        {symptom.description}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* CTA bar with count and direct WhatsApp */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <span className="text-xs font-bold text-orange-600 block">
                  {selectedSymptoms.length === 0
                    ? 'Nenhum sintoma selecionado ainda'
                    : `${selectedSymptoms.length} sintoma(s) marcado(s)`}
                </span>
                <span className="text-[11px] text-stone-500">
                  A mensagem será montada automaticamente para o WhatsApp da Dra. Gabriela.
                </span>
              </div>

              <a
                id="btn-send-triage-whatsapp"
                href={buildSymptomWhatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 transition-all min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enviar Sinais via WhatsApp</span>
                <ArrowRight className="w-4 h-4 hidden sm:inline" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
