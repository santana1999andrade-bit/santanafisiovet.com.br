import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Phone, Mail, Instagram, MapPin, Shield, Clock, ArrowUp, Lock, Star } from 'lucide-react';
import pinscherLogo from '../assets/images/Gemini_Generated_Image_6aqzqm6aqzqm6aqz.jpg';

interface FooterProps {
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const { siteData } = useSiteData();
  const { doctorInfo, googleIntegration } = siteData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contato" className="bg-stone-950 text-white pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white p-1 flex items-center justify-center shadow-md shadow-orange-950/40 overflow-hidden">
                <img
                  src={pinscherLogo}
                  alt="Silhueta Pinscher - Sant'Ana Fisiovet"
                  className="w-full h-full object-contain filter contrast-125"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                Sant'Ana <span className="text-orange-500">Fisiovet</span>
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              Fisioterapia, Fisiatria e Acupuntura Veterinária em domicílio. Alívio de dores articulares e reabilitação neurológica com amor e respeito ao tempo do seu pet.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs text-orange-400 font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>{doctorInfo.crmv}</span>
            </div>
          </div>

          {/* Col 2: Direct Contacts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contatos Diretos
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-300">
              <li>
                <a
                  id="footer-link-whatsapp"
                  href={`https://wa.me/${doctorInfo.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
                >
                  <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>WhatsApp: {doctorInfo.whatsappFormatted}</span>
                </a>
              </li>
              <li>
                <a
                  id="footer-link-instagram"
                  href={doctorInfo.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Instagram: {doctorInfo.instagram}</span>
                </a>
              </li>
              <li>
                <a
                  id="footer-link-email"
                  href={`mailto:${doctorInfo.email}`}
                  className="flex items-center gap-2.5 hover:text-orange-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>{doctorInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  id="footer-link-google-maps"
                  href={googleIntegration?.googleMapsUrl || 'https://share.google/iOCFqF29KqiwEHT8S'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-amber-400 hover:text-amber-300 transition-colors"
                >
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 shrink-0" />
                  <span>Perfil no Google Maps (5.0 ★)</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-stone-400 pt-1">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>Atendimento 100% Domiciliar: Grande São Paulo, Guarulhos e Cidade de São Paulo.</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Routes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Horários de Atendimento
            </h4>
            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Segunda a Sexta-Feira:</span>
                  <span className="text-stone-400">08:00 às 19:00 (Rotas Agendadas)</span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-white">Sábados:</span>
                  <span className="text-stone-400">08:00 às 14:00 (Com agendamento prévio)</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 pt-2 italic">
                * Os horários são distribuídos por regiões para priorizar o bem-estar e a pontualidade na sua casa.
              </p>
            </div>
          </div>

          {/* Col 4: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Links Rápidos
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-stone-400">
              <a href="#inicio" className="hover:text-orange-400 transition-colors">Início</a>
              <a href="#sobre" className="hover:text-orange-400 transition-colors">Sobre</a>
              <a href="#modalidades" className="hover:text-orange-400 transition-colors">Modalidades</a>
              <a href="#tratamentos" className="hover:text-orange-400 transition-colors">O que Tratamos</a>
              <a href="#alerta-tutor" className="hover:text-orange-400 transition-colors">Sinais de Alerta</a>
              <a href="#diario" className="hover:text-orange-400 transition-colors">Diário & Dicas</a>
              <a href="#regioes" className="hover:text-orange-400 transition-colors">Onde Atendemos</a>
              <a href="#avaliacoes" className="hover:text-orange-400 transition-colors">Avaliações</a>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-stone-300 hover:text-white bg-stone-900 hover:bg-stone-800 border border-stone-800 px-3.5 py-2 rounded-2xl transition-colors min-h-[36px]"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Voltar ao topo</span>
              </button>
            </div>
          </div>
        </div>

        {/* Ethical disclaimer & Copyright & Admin link */}
        <div className="pt-8 border-t border-stone-900 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-stone-500 text-center md:text-left">
          <p>
            © {new Date().getFullYear()} Sant'Ana Fisioterapia & Reabilitação Veterinária • {doctorInfo.name} ({doctorInfo.crmv}). Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenAdmin ? onOpenAdmin : () => { window.location.hash = 'admin'; }}
              className="inline-flex items-center gap-1.5 text-stone-500 hover:text-orange-400 transition-colors text-[11px]"
            >
              <Lock className="w-3 h-3" />
              <span>Área Administrativa</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
