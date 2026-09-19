import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Check, RefreshCw, X } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  description?: string;
  currentValue: string;
  onImageChange: (newUrlOrBase64: string) => void;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  description,
  currentValue,
  onImageChange,
  aspectRatio = 'landscape',
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [urlInput, setUrlInput] = useState(currentValue.startsWith('data:') ? '' : currentValue);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (max 4MB for localStorage comfort)
    if (file.size > 4 * 1024 * 1024) {
      alert('A imagem é muito pesada (máximo 4MB). Por favor escolha uma imagem menor ou use uma URL.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        onImageChange(reader.result);
        setPreviewError(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    onImageChange(urlInput.trim());
    setPreviewError(false);
  };

  const aspectClasses = {
    landscape: 'h-40 sm:h-48 w-full',
    portrait: 'h-56 sm:h-64 w-44 sm:w-52',
    square: 'h-40 sm:h-48 w-40 sm:w-48',
  }[aspectRatio];

  return (
    <div className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-bold text-stone-900 flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-orange-500" />
            <span>{label}</span>
          </h4>
          {description && <p className="text-xs text-stone-500 mt-0.5">{description}</p>}
        </div>

        {/* Switch Mode */}
        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'upload' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Upload className="w-3 h-3 inline mr-1" />
            Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
              mode === 'url' ? 'bg-white text-orange-600 shadow-xs' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LinkIcon className="w-3 h-3 inline mr-1" />
            URL Direta
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
        {/* Image Preview Box */}
        <div className="sm:col-span-5 flex justify-center sm:justify-start">
          <div
            className={`relative rounded-xl overflow-hidden bg-stone-100 border border-stone-200 flex items-center justify-center ${aspectClasses}`}
          >
            {currentValue && !previewError ? (
              <img
                src={currentValue}
                alt={label}
                className="w-full h-full object-cover object-center"
                onError={() => setPreviewError(true)}
              />
            ) : (
              <div className="text-center p-3 text-stone-400">
                <ImageIcon className="w-8 h-8 mx-auto mb-1 text-stone-300" />
                <span className="text-[11px] block">Sem imagem válida</span>
              </div>
            )}
            {currentValue && (
              <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] px-2 py-0.5 rounded-md font-mono">
                {currentValue.startsWith('data:') ? 'Arquivo Local' : 'Link Web'}
              </span>
            )}
          </div>
        </div>

        {/* Control Inputs */}
        <div className="sm:col-span-7 space-y-3">
          {mode === 'upload' ? (
            <div className="space-y-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                id={`upload-input-${label.replace(/\s+/g, '-').toLowerCase()}`}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-orange-200 bg-orange-50/50 hover:bg-orange-50 hover:border-orange-400 text-orange-700 text-xs font-bold transition-all cursor-pointer min-h-[44px]"
              >
                <Upload className="w-4 h-4 text-orange-500" />
                <span>Escolher Imagem do Computador/Celular</span>
              </button>
              <p className="text-[11px] text-stone-500">
                Formatos aceitos: JPG, PNG, WebP (máx. 4MB). A foto é salva localmente e aplicada em tempo real.
              </p>
            </div>
          ) : (
            <form onSubmit={handleApplyUrl} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://exemplo.com/foto.jpg"
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-200 outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl transition-all shrink-0"
                >
                  Aplicar
                </button>
              </div>
              <p className="text-[11px] text-stone-500">
                Cole o link direto da imagem hospedada na web.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
