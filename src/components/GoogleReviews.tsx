import React, { useState } from 'react';
import { REVIEWS, DOCTOR_INFO } from '../data/veterinaryData';
import { Star, CheckCircle, MessageCircle, Heart, ThumbsUp } from 'lucide-react';

export const GoogleReviews: React.FC = () => {
  const [reviewsList, setReviewsList] = useState(REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [petName, setPetName] = useState('');
  const [petCondition, setPetCondition] = useState('');
  const [commentText, setCommentText] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !commentText.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: authorName,
      petName: petName || 'Meu pet',
      petType: 'Paciente domiciliar',
      condition: petCondition || 'Reabilitação motora',
      location: 'Guarulhos / SP',
      rating: userRating,
      date: 'Hoje',
      comment: commentText,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setAuthorName('');
    setPetName('');
    setPetCondition('');
    setCommentText('');
    setFeedbackSubmitted(true);
    setTimeout(() => {
      setFeedbackSubmitted(false);
      setShowReviewForm(false);
    }, 2500);
  };

  return (
    <section id="avaliacoes" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-orange-200">
              <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
              <span>Avaliações Verificadas no Google</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              O Carinho e a Confiança de Quem Já Viveu a Transformação
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              A evolução e a gratidão de famílias que viram seus pets voltarem a andar sem dor, no conforto do próprio lar.
            </p>
          </div>

          {/* Google Score Summary Card */}
          <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-100 shadow-sm flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-[#FDFBF7] border border-stone-200 flex items-center justify-center shadow-xs">
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-stone-900">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-xs text-stone-500 font-medium block">
                Avaliações 100% Positivas no Google
              </span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="p-6 rounded-3xl bg-white border border-stone-100 hover:border-orange-200 transition-all shadow-sm hover:shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center font-bold text-sm text-orange-600">
                      {rev.author.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-stone-900">
                          {rev.author}
                        </h4>
                        {rev.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-blue-500 fill-blue-50" />
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {rev.location} • {rev.date}
                      </span>
                    </div>
                  </div>

                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Pet condition pill */}
                <div className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-700 bg-orange-100 px-3 py-1 rounded-full border border-orange-200">
                  <Heart className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <span>{rev.petType} — {rev.condition}</span>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed italic">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 flex items-center justify-between text-xs text-stone-400 border-t border-stone-100">
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 font-bold">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  Atendimento Domiciliar Concluído
                </span>
                <span className="text-[10px] text-stone-400 font-medium">Google Review</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Row: Tutor Can Add Review or Agendar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            id="btn-toggle-add-review"
            type="button"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="text-xs font-bold text-stone-800 hover:text-orange-600 underline underline-offset-4 py-2 transition-colors"
          >
            {showReviewForm ? 'Ocultar formulário de depoimento' : '+ Já é tutor atendido? Deixe sua avaliação aqui'}
          </button>

          <a
            id="btn-reviews-cta-whatsapp"
            href={`https://wa.me/${DOCTOR_INFO.whatsappNumber}?text=${encodeURIComponent(
              "Olá Dra. Gabriela! Vi as avaliações no site e gostaria de agendar uma consulta para meu pet."
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-orange-200 min-h-[44px] w-full sm:w-auto text-center"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Agendar Consulta Domiciliar</span>
          </a>
        </div>

        {/* Simulated Review Submission Form */}
        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="p-6 sm:p-8 bg-white rounded-[32px] border border-stone-100 shadow-xl space-y-4 max-w-xl mx-auto animate-in fade-in"
          >
            <h4 className="text-sm font-bold text-stone-900">
              Compartilhe a experiência do seu pet com a Dra. Gabriela Sant'Ana:
            </h4>

            {feedbackSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl text-xs font-bold text-center border border-emerald-200">
                Muito obrigado! Seu depoimento foi registrado com sucesso.
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Seu Nome:
                    </label>
                    <input
                      type="text"
                      required
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      placeholder="Ex: Mariana Silva"
                      className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-700 mb-1">
                      Nome e Raça do Pet:
                    </label>
                    <input
                      type="text"
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
                      placeholder="Ex: Bob (Spitz, 7 anos)"
                      className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Tratamento / Condição Reabilitada:
                  </label>
                  <input
                    type="text"
                    value={petCondition}
                    onChange={(e) => setPetCondition(e.target.value)}
                    placeholder="Ex: Hérnia de disco, Laserterapia, Acupuntura"
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Sua Avaliação (Estrelas):
                  </label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setUserRating(star)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= userRating ? 'fill-amber-400' : 'text-stone-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-stone-700 mb-1">
                    Seu Relato sobre o Atendimento Domiciliar:
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Conte como seu pet se sentiu e a evolução dele..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-2xl border border-stone-200 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-4 py-2 text-xs font-bold text-stone-500 hover:bg-stone-100 rounded-2xl"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 rounded-2xl shadow-md shadow-orange-200"
                  >
                    Publicar Depoimento
                  </button>
                </div>
              </>
            )}
          </form>
        )}
      </div>
    </section>
  );
};
