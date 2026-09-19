import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lock, User, Eye, EyeOff, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import pinscherLogo from '../../assets/images/Gemini_Generated_Image_6aqzqm6aqzqm6aqz.jpg';

interface AdminLoginProps {
  onBackToSite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onBackToSite }) => {
  const { login } = useAuth();
  const [identity, setIdentity] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identity.trim() || !password) {
      setErrorMsg('Por favor preencha o usuário e a senha.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const ok = login(identity, password);
      setIsLoading(false);
      if (!ok) {
        setErrorMsg('Usuário ou senha incorretos. Verifique os dados digitados.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center px-4 py-12">
      {/* Top back button */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToSite}
          className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 hover:text-orange-600 transition-colors bg-white px-3.5 py-2 rounded-xl border border-stone-200 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para o Site</span>
        </button>

        <span className="text-xs text-stone-400 font-medium">Sant'Ana Fisio Vet</span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-white rounded-3xl border border-stone-200/80 shadow-xl p-6 sm:p-8 space-y-6">
        {/* Header with Logo */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 overflow-hidden shadow-xs">
            <img
              src={pinscherLogo}
              alt="Sant'Ana Fisio Vet"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1 border border-orange-200">
              <Lock className="w-3 h-3 text-orange-600" />
              Área Restrita
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-stone-900 tracking-tight">
              Painel Administrativo
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Gerencie textos, avaliações, imagens e locais do site em tempo real.
            </p>
          </div>
        </div>

        {/* Error Notice */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Usuário ou E-mail
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="admin-identity-input"
                type="text"
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="admin ou seu e-mail"
                className="w-full pl-10 pr-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-stone-700 block">
              Senha de Acesso
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha secreta"
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 active:scale-[0.99] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md shadow-orange-200 transition-all min-h-[44px] cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <span>Entrando no painel...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Acessar Painel de Controle</span>
              </>
            )}
          </button>
        </form>

        {/* Credentials helper note */}
        <div className="pt-2 border-t border-stone-100 text-center">
          <p className="text-[11px] text-stone-500 bg-stone-50 p-2.5 rounded-xl border border-stone-100">
            <strong className="text-stone-700">Acesso Padrão:</strong> Usuário <code className="bg-stone-200/80 px-1 py-0.5 rounded text-orange-700">admin</code> e senha <code className="bg-stone-200/80 px-1 py-0.5 rounded text-orange-700">admin123</code>.
            (Você pode alterar a senha dentro do painel).
          </p>
        </div>
      </div>
    </div>
  );
};
