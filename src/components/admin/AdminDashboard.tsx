import React, { useState } from 'react';
import { useSiteData } from '../../context/SiteDataContext';
import { useAuth } from '../../context/AuthContext';
import { ImageUploader } from './ImageUploader';
import {
  FileText,
  Star,
  Image as ImageIcon,
  MapPin,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Download,
  Upload,
  RefreshCw,
  Phone,
  Mail,
  Instagram,
  User,
  ShieldCheck,
  Save,
  AlertCircle
} from 'lucide-react';
import pinscherLogo from '../../assets/images/Gemini_Generated_Image_6aqzqm6aqzqm6aqz.jpg';
import { ReviewItem, CoverageRegion } from '../../types';

interface AdminDashboardProps {
  onBackToSite: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToSite }) => {
  const {
    siteData,
    updateDoctorInfo,
    updateHero,
    updateAbout,
    updateCoverageRegions,
    addReview,
    updateReview,
    deleteReview,
    updateModality,
    updateBlogPost,
    updateGoogleIntegration,
    syncGoogleReviews,
    resetToDefaults,
    exportData,
    importData,
  } = useSiteData();

  const { logout, changePassword, adminUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'textos' | 'depoimentos' | 'google' | 'imagens' | 'locais' | 'sistema'>('textos');
  const [saveToast, setSaveToast] = useState(false);

  // Form states for Texts
  const [docForm, setDocForm] = useState(siteData.doctorInfo);
  const [heroForm, setHeroForm] = useState(siteData.hero);
  const [aboutForm, setAboutForm] = useState(siteData.about);

  // Google Integration state
  const [googleForm, setGoogleForm] = useState(siteData.googleIntegration || {
    enabled: true,
    businessName: "Sant'Ana Fisioterapia & Reabilitação Veterinária",
    placeId: "ChIJ_santana_fisiovet_sp",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sant%27Ana+Fisioterapia+Veterinaria+Dra+Gabriela",
    googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJ_santana_fisiovet_sp",
    rating: 5.0,
    totalReviews: 48,
    lastSyncedAt: "Agora mesmo",
    embedWidgetCode: "",
  });
  const [isSyncingGoogle, setIsSyncingGoogle] = useState(false);
  const [googleSyncFeedback, setGoogleSyncFeedback] = useState<string | null>(null);

  // Review modal state
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [reviewForm, setReviewForm] = useState<Omit<ReviewItem, 'id'>>({
    author: '',
    petName: '',
    petType: 'Paciente Domiciliar',
    condition: '',
    location: 'Guarulhos / SP',
    rating: 5,
    date: 'Recentemente',
    comment: '',
    verified: true,
  });

  // Password state
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passFeedback, setPassFeedback] = useState<{ success?: boolean; message?: string } | null>(null);

  // Trigger Save Notification
  const notifySaved = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 3000);
  };

  const handleSaveDoctorAndHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateDoctorInfo(docForm);
    updateHero(heroForm);
    updateAbout(aboutForm);
    notifySaved();
  };

  const handleOpenNewReview = () => {
    setEditingReviewId(null);
    setReviewForm({
      author: '',
      petName: '',
      petType: 'Paciente Domiciliar',
      condition: 'Reabilitação motora',
      location: 'Guarulhos / SP',
      rating: 5,
      date: 'Recentemente',
      comment: '',
      verified: true,
    });
    setIsReviewModalOpen(true);
  };

  const handleOpenEditReview = (r: ReviewItem) => {
    setEditingReviewId(r.id);
    setReviewForm({
      author: r.author,
      petName: r.petName,
      petType: r.petType,
      condition: r.condition,
      location: r.location,
      rating: r.rating,
      date: r.date,
      comment: r.comment,
      verified: r.verified,
    });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewForm.author.trim() || !reviewForm.comment.trim()) return;

    if (editingReviewId) {
      updateReview(editingReviewId, reviewForm);
    } else {
      addReview(reviewForm);
    }
    setIsReviewModalOpen(false);
    notifySaved();
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta avaliação?')) {
      deleteReview(id);
      notifySaved();
    }
  };

  const handleSaveGoogleIntegration = (e: React.FormEvent) => {
    e.preventDefault();
    updateGoogleIntegration(googleForm);
    notifySaved();
  };

  const handleSyncGoogleNow = async () => {
    setIsSyncingGoogle(true);
    setGoogleSyncFeedback(null);
    try {
      await syncGoogleReviews();
      const now = new Date();
      const timeStr = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
      setGoogleForm((prev) => ({
        ...prev,
        lastSyncedAt: timeStr,
      }));
      setGoogleSyncFeedback('Dados do Google Maps e avaliações sincronizados com sucesso (Custo: R$ 0,00)!');
    } catch {
      setGoogleSyncFeedback('Erro ao sincronizar.');
    } finally {
      setIsSyncingGoogle(false);
      setTimeout(() => setGoogleSyncFeedback(null), 4000);
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    const res = changePassword(currentPass, newPass);
    setPassFeedback(res);
    if (res.success) {
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setPassFeedback(null), 3500);
    }
  };

  const handleExport = () => {
    const dataStr = exportData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `santana-fisiovet-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const content = ev.target?.result;
      if (typeof content === 'string') {
        const ok = importData(content);
        if (ok) {
          alert('Backup restaurado com sucesso!');
          window.location.reload();
        } else {
          alert('Falha ao restaurar: arquivo JSON inválido.');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleReset = () => {
    if (confirm('Atenção: isto restaurará todos os textos, fotos originais e avaliações aos padrões iniciais. Deseja continuar?')) {
      resetToDefaults();
      alert('Padrões restaurados com sucesso.');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-stone-800 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 overflow-hidden shrink-0">
              <img src={pinscherLogo} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wider block leading-none">
                Painel Administrativo
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-stone-900 leading-snug truncate">
                {siteData.doctorInfo.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-700 hover:text-orange-600 bg-stone-100 hover:bg-orange-50 rounded-xl transition-all border border-stone-200"
            >
              <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
              <span className="hidden sm:inline">Ver Site em Tempo Real</span>
              <span className="sm:hidden">Ver Site</span>
            </button>

            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-stone-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
              title="Sair do painel"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar gap-1 border-t border-stone-100 py-1">
          <button
            type="button"
            onClick={() => setActiveTab('textos')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'textos'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Textos & Contatos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('depoimentos')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'depoimentos'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Depoimentos ({siteData.reviews.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('google')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'google'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Google Maps & Perfil</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('imagens')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'imagens'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>Imagens & Fotos</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('locais')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'locais'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Locais de Atendimento</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sistema')}
            className={`px-3.5 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === 'sistema'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            <Settings className="w-3.5 h-3.5" />
            <span>Segurança & Backup</span>
          </button>
        </div>
      </header>

      {/* Floating Save Toast */}
      {saveToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-800 flex items-center gap-2.5 text-xs font-bold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Alterações salvas e sincronizadas em tempo real!</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        {/* TAB 1: TEXTOS & CONTATOS */}
        {activeTab === 'textos' && (
          <form onSubmit={handleSaveDoctorAndHero} className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  Textos Principais, Contatos e Redes Sociais
                </h3>
                <p className="text-xs text-stone-500">
                  Atualize as informações comerciais, WhatsApp, e-mail e textos da landing page.
                </p>
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-orange-200 transition-all min-h-[40px]"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Textos</span>
              </button>
            </div>

            {/* Informações da Veterinária */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <User className="w-4 h-4 text-orange-500" />
                <span>Identificação Profissional & Contatos</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Nome da Médica Veterinária</label>
                  <input
                    type="text"
                    value={docForm.name}
                    onChange={(e) => setDocForm({ ...docForm, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Registro CRMV</label>
                  <input
                    type="text"
                    value={docForm.crmv}
                    onChange={(e) => setDocForm({ ...docForm, crmv: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Especialidades</label>
                  <input
                    type="text"
                    value={docForm.specialties}
                    onChange={(e) => setDocForm({ ...docForm, specialties: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">WhatsApp (somente números com DDI)</label>
                  <input
                    type="text"
                    value={docForm.whatsappNumber}
                    onChange={(e) => setDocForm({ ...docForm, whatsappNumber: e.target.value })}
                    placeholder="5511947427384"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-mono"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">WhatsApp Formatado (visual)</label>
                  <input
                    type="text"
                    value={docForm.whatsappFormatted}
                    onChange={(e) => setDocForm({ ...docForm, whatsappFormatted: e.target.value })}
                    placeholder="(11) 94742-7384"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">E-mail de Contato</label>
                  <input
                    type="email"
                    value={docForm.email}
                    onChange={(e) => setDocForm({ ...docForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Instagram (@)</label>
                  <input
                    type="text"
                    value={docForm.instagram}
                    onChange={(e) => setDocForm({ ...docForm, instagram: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700">Link Completo do Instagram</label>
                  <input
                    type="url"
                    value={docForm.instagramUrl}
                    onChange={(e) => setDocForm({ ...docForm, instagramUrl: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 pt-2">
                <label className="text-xs font-bold text-stone-700">Frase de Destaque / Filosofia</label>
                <input
                  type="text"
                  value={docForm.quote}
                  onChange={(e) => setDocForm({ ...docForm, quote: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Biografia / Apresentação</label>
                <textarea
                  rows={3}
                  value={docForm.bio}
                  onChange={(e) => setDocForm({ ...docForm, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                />
              </div>
            </div>

            {/* H1 e Textos do Hero */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-4">
              <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
                <FileText className="w-4 h-4 text-orange-500" />
                <span>Textos do Banner Principal (Hero)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Título Inicial</label>
                  <input
                    type="text"
                    value={heroForm.title}
                    onChange={(e) => setHeroForm({ ...heroForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Parte com Destaque Laranja</label>
                  <input
                    type="text"
                    value={heroForm.titleHighlight}
                    onChange={(e) => setHeroForm({ ...heroForm, titleHighlight: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700">Menção de Locais no Título</label>
                  <input
                    type="text"
                    value={heroForm.titleLocations}
                    onChange={(e) => setHeroForm({ ...heroForm, titleLocations: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700">Subtítulo Explicativo</label>
                  <textarea
                    rows={2}
                    value={heroForm.subtitle}
                    onChange={(e) => setHeroForm({ ...heroForm, subtitle: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-orange-200 transition-all min-h-[44px]"
              >
                <Save className="w-4 h-4" />
                <span>Salvar Todas as Modificações de Texto</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: DEPOIMENTOS / AVALIAÇÕES */}
        {activeTab === 'depoimentos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  Gerenciamento de Depoimentos & Avaliações
                </h3>
                <p className="text-xs text-stone-500">
                  Edite, adicione novos relatos reais ou remova avaliações exibidas na seção do Google Reviews.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenNewReview}
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-200 transition-all min-h-[40px]"
              >
                <Plus className="w-4 h-4" />
                <span>Adicionar Novo Depoimento</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(siteData.reviews || []).map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {Array.from({ length: Math.max(1, Math.min(5, Math.floor(rev.rating || 5))) }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>

                    <h4 className="text-sm font-bold text-stone-900">
                      {rev.author} <span className="text-xs text-stone-500 font-normal">({rev.petName})</span>
                    </h4>

                    <span className="inline-block text-[10px] font-semibold bg-orange-50 text-orange-700 px-2 py-0.5 rounded-md border border-orange-100">
                      {rev.condition} • {rev.location}
                    </span>

                    <p className="text-xs text-stone-600 line-clamp-4 italic">
                      "{rev.comment}"
                    </p>
                  </div>

                  <div className="pt-3 border-t border-stone-100 flex items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenEditReview(rev)}
                      className="p-1.5 text-stone-600 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                      title="Editar depoimento"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                      <span>Editar</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteReview(rev.id)}
                      className="p-1.5 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors text-xs font-semibold flex items-center gap-1"
                      title="Excluir depoimento"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Excluir</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB GOOGLE: GOOGLE MAPS & INTEGRAÇÃO */}
        {activeTab === 'google' && (
          <form onSubmit={handleSaveGoogleIntegration} className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                  Google Maps & Perfil de Empresa
                </h3>
                <p className="text-xs text-stone-500">
                  Configure o link oficial do Perfil do Google da Sant'Ana Fisioterapia Veterinária para avaliações e visualização no mapa.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSyncGoogleNow}
                  disabled={isSyncingGoogle}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-all shadow-xs disabled:opacity-50 min-h-[40px]"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-orange-500 ${isSyncingGoogle ? 'animate-spin' : ''}`} />
                  <span>{isSyncingGoogle ? 'Sincronizando...' : 'Sincronizar Google'}</span>
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md shadow-orange-200 transition-all min-h-[40px]"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Salvar Links do Google</span>
                </button>
              </div>
            </div>

            {googleSyncFeedback && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{googleSyncFeedback}</span>
              </div>
            )}

            {/* Google Link Status Card */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-orange-600 font-bold shrink-0">
                    <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-stone-900">
                      Link Oficial do Perfil Google Conectado
                    </h4>
                    <span className="text-xs text-stone-500 block">
                      Usado nos botões "Avaliar no Google" e "Google Maps"
                    </span>
                  </div>
                </div>

                <a
                  href={googleForm.googleMapsUrl || 'https://share.google/iOCFqF29KqiwEHT8S'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 bg-orange-50 hover:bg-orange-100 px-3.5 py-2 rounded-xl border border-orange-200 transition-colors self-start sm:self-auto"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Testar Link no Google</span>
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-stone-700 flex items-center gap-1.5">
                    <span>Link do Perfil no Google / Google Maps (share.google)</span>
                    <span className="text-[10px] text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full font-normal border border-orange-100">
                      Oficial
                    </span>
                  </label>
                  <input
                    type="url"
                    value={googleForm.googleMapsUrl}
                    onChange={(e) => setGoogleForm({ ...googleForm, googleMapsUrl: e.target.value })}
                    placeholder="https://share.google/iOCFqF29KqiwEHT8S"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-mono"
                  />
                  <p className="text-[11px] text-stone-500">
                    Link oficial gerado pelo Google para o Perfil da empresa (Sant'Ana Fisioterapia e Reabilitação Veterinária).
                  </p>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-xs font-bold text-stone-700">
                    Link Direto para o Tutor Deixar Avaliação (Review URL)
                  </label>
                  <input
                    type="url"
                    value={googleForm.googleReviewUrl}
                    onChange={(e) => setGoogleForm({ ...googleForm, googleReviewUrl: e.target.value })}
                    placeholder="https://share.google/iOCFqF29KqiwEHT8S"
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none font-mono"
                  />
                  <p className="text-[11px] text-stone-500">
                    Ao clicar em "Avaliar no Google", o tutor será direcionado diretamente para este link.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Nota Média Exibida (Ex: 5.0)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={googleForm.rating}
                    onChange={(e) => setGoogleForm({ ...googleForm, rating: parseFloat(e.target.value) || 5.0 })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">
                    Contador Total de Avaliações (Ex: 48)
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={googleForm.totalReviews}
                    onChange={(e) => setGoogleForm({ ...googleForm, totalReviews: parseInt(e.target.value) || 48 })}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: IMAGENS & FOTOS */}
        {activeTab === 'imagens' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Substituição de Imagens e Fotos do Site
              </h3>
              <p className="text-xs text-stone-500">
                Faça upload de fotos reais do seu celular/computador ou insira links da web. As alterações são refletidas na hora!
              </p>
            </div>

            {/* Imagens Principais */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-200">
                1. Imagens de Destaque
              </h4>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ImageUploader
                  label="Foto Principal do Banner (Hero)"
                  description="Aparece no topo ao lado do título principal."
                  currentValue={siteData.hero.imageUrl}
                  aspectRatio="landscape"
                  onImageChange={(val) => {
                    updateHero({ imageUrl: val });
                    notifySaved();
                  }}
                />

                <ImageUploader
                  label="Foto da Dra. Gabriela Sant'Ana (Seção Sobre)"
                  description="Aparece no perfil profissional da veterinária."
                  currentValue={siteData.about.imageUrl}
                  aspectRatio="portrait"
                  onImageChange={(val) => {
                    updateAbout({ imageUrl: val });
                    notifySaved();
                  }}
                />
              </div>
            </div>

            {/* Imagens das Modalidades */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-200">
                2. Fotos das Modalidades Terapêuticas
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(siteData.modalities || []).map((mod) => (
                  <ImageUploader
                    key={mod.id}
                    label={mod.name}
                    description={`Card da modalidade ${mod.name}`}
                    currentValue={mod.imageUrl}
                    aspectRatio="square"
                    onImageChange={(val) => {
                      updateModality(mod.id, { imageUrl: val });
                      notifySaved();
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Imagens do Diário de Reabilitação */}
            <div className="space-y-4 pt-4">
              <h4 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-200">
                3. Fotos dos Artigos do Diário de Reabilitação
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(siteData.blogPosts || []).map((post) => (
                  <ImageUploader
                    key={post.id}
                    label={post.title}
                    description={`Categoria: ${post.category}`}
                    currentValue={post.imageUrl}
                    aspectRatio="landscape"
                    onImageChange={(val) => {
                      updateBlogPost(post.id, { imageUrl: val });
                      notifySaved();
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: LOCAIS DE ATENDIMENTO */}
        {activeTab === 'locais' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Locais de Atendimento Consolidados
              </h3>
              <p className="text-xs text-stone-500">
                Conforme solicitado, os locais foram simplificados para exibir apenas: Grande São Paulo, Guarulhos e Cidade de São Paulo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(siteData.coverageRegions || []).map((region, idx) => (
                <div key={idx} className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
                      {region.badge}
                    </span>
                    <MapPin className="w-4 h-4 text-orange-500" />
                  </div>

                  <h4 className="text-base font-bold text-stone-900">
                    {region.city}
                  </h4>

                  <p className="text-xs text-stone-600">
                    {region.description || 'Atendimento domiciliar planejado e personalizado.'}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100 inline-block">
                      ✓ Rota Domiciliar Ativa
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs text-stone-700 space-y-1">
              <span className="font-bold text-orange-800 block">Status da Simplificação:</span>
              <p>
                Os excessos de dezenas de bairros avulsos foram removidos para evitar poluição visual. Agora os clientes visualizam de forma clara e objetiva que o atendimento cobre <strong>Grande São Paulo, Guarulhos e Cidade de São Paulo</strong>.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: SEGURANÇA & SISTEMA */}
        {activeTab === 'sistema' && (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-stone-900">
                Segurança, Acesso e Backup de Dados
              </h3>
              <p className="text-xs text-stone-500">
                Altere sua senha de acesso e faça download de cópias de segurança do conteúdo do site.
              </p>
            </div>

            {/* Troca de Senha */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs max-w-xl space-y-4">
              <h4 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Alterar Senha do Administrador</span>
              </h4>

              {passFeedback && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                    passFeedback.success ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                >
                  {passFeedback.success ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                  )}
                  <span>{passFeedback.message}</span>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Senha Atual</label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    placeholder="Digite a senha atual"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Nova Senha</label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    placeholder="Mínimo de 4 caracteres"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-stone-900 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
                >
                  Atualizar Senha
                </button>
              </form>
            </div>

            {/* Backup & Restauração */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs max-w-xl space-y-4">
              <h4 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                <Download className="w-4 h-4 text-orange-500" />
                <span>Backup e Restauração de Dados</span>
              </h4>

              <p className="text-xs text-stone-600">
                Você pode salvar uma cópia de todos os seus textos, fotos e avaliações em um arquivo JSON e restaurá-la a qualquer momento.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleExport}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Exportar Backup (JSON)</span>
                </button>

                <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold border border-stone-200 cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5 text-stone-600" />
                  <span>Restaurar Backup</span>
                  <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
                </label>
              </div>
            </div>

            {/* Reset aos Padrões */}
            <div className="bg-white p-6 rounded-3xl border border-rose-200 shadow-xs max-w-xl space-y-3">
              <h4 className="text-sm font-bold text-rose-800 flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-rose-600" />
                <span>Restaurar Padrões de Fábrica</span>
              </h4>
              <p className="text-xs text-stone-600">
                Caso deseje descartar todas as alterações e retornar ao design e textos originais da Dra. Gabriela Sant'Ana.
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all"
              >
                Limpar Personalizações e Restaurar
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Modal for Adding/Editing Reviews */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95">
            <h3 className="text-base font-extrabold text-stone-900">
              {editingReviewId ? 'Editar Depoimento' : 'Adicionar Novo Depoimento'}
            </h3>

            <form onSubmit={handleSaveReview} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Nome do Tutor</label>
                  <input
                    type="text"
                    value={reviewForm.author}
                    onChange={(e) => setReviewForm({ ...reviewForm, author: e.target.value })}
                    placeholder="Ex: Mariana Silva"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Nome do Pet</label>
                  <input
                    type="text"
                    value={reviewForm.petName}
                    onChange={(e) => setReviewForm({ ...reviewForm, petName: e.target.value })}
                    placeholder="Ex: Thor"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Condição / Tratamento</label>
                  <input
                    type="text"
                    value={reviewForm.condition}
                    onChange={(e) => setReviewForm({ ...reviewForm, condition: e.target.value })}
                    placeholder="Ex: Hérnia de disco, Artrose"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-stone-700">Local / Bairro</label>
                  <input
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="Ex: Guarulhos / SP"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Avaliação (1 a 5 estrelas)</label>
                <div className="flex gap-2 items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= reviewForm.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-stone-700 ml-2">
                    {reviewForm.rating} estrelas
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">Texto do Relato / Depoimento</label>
                <textarea
                  rows={4}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  placeholder="Escreva a experiência e a recuperação do pet com a Dra. Gabriela..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 outline-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReviewModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-xl shadow-xs"
                >
                  {editingReviewId ? 'Atualizar Depoimento' : 'Salvar Depoimento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
