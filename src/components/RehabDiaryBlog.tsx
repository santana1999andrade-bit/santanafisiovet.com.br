import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { BlogPost } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, X, Share2, MessageCircle } from 'lucide-react';

export const RehabDiaryBlog: React.FC = () => {
  const { siteData } = useSiteData();
  const posts = siteData.blogPosts;
  const { doctorInfo } = siteData;
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const categories = ['Todos', 'Dicas de Cuidado', 'Acupuntura', 'Laserterapia', 'Cinesioterapia'];

  const filteredPosts = activeCategory === 'Todos'
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  return (
    <section id="diario" className="py-20 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-orange-100 pb-8">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 bg-orange-100 px-3.5 py-1.5 rounded-full uppercase tracking-wider border border-orange-200">
              <BookOpen className="w-3.5 h-3.5 text-orange-600" />
              <span>Diário de Casos & Dicas para Tutores</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Orientações Práticas para o Bem-Estar do Seu Pet
            </h2>
            <p className="text-base text-stone-600 leading-relaxed">
              Artigos clínicos simplificados, relatos de casos e instruções de adaptação da casa para pets em reabilitação motora.
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-2xl whitespace-nowrap transition-all min-h-[40px] ${
                activeCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-200'
                  : 'bg-white text-stone-600 hover:bg-orange-50 hover:text-orange-600 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(filteredPosts || []).map((post) => (
            <article
              key={post.id}
              id={`blog-post-${post.id}`}
              className="group bg-white rounded-3xl overflow-hidden border border-stone-100 hover:border-orange-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-stone-100">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-white/95 text-stone-900 text-[10px] font-bold px-3 py-1 rounded-full shadow-xs">
                    {post.category}
                  </span>
                </div>

                <div className="p-5 space-y-2.5">
                  <div className="flex items-center gap-3 text-[11px] text-stone-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-orange-500" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-base text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => setSelectedPost(post)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors py-1"
                >
                  <span>Ler artigo completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Post Detail Modal */}
      {selectedPost && (
        <div
          id="post-reading-modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="bg-white rounded-[36px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-stone-100 p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200">
                  {selectedPost.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 pt-1">
                  {selectedPost.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-stone-500 pt-1">
                  <span>Por Dra. Gabriela Sant'Ana</span>
                  <span>•</span>
                  <span>{selectedPost.readTime}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-600 transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="h-56 sm:h-64 rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={selectedPost.imageUrl}
                alt={selectedPost.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 text-sm text-stone-600 leading-relaxed">
              {(Array.isArray(selectedPost.content) ? selectedPost.content : [selectedPost.content]).map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            <div className="pt-6 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-stone-500">
                Dúvidas sobre o caso do seu pet? Converse diretamente com a especialista.
              </span>
              <a
                id="btn-post-consult-whatsapp"
                href={`https://wa.me/${doctorInfo.whatsappNumber}?text=${encodeURIComponent(
                  `Olá ${doctorInfo.name}! Li o artigo "${selectedPost.title}" no seu site e gostaria de agendar uma consulta para meu pet.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-2xl shadow-md shadow-orange-200 min-h-[44px] w-full sm:w-auto text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Tirar Dúvidas via WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add New Post Modal removed per request */}
    </section>
  );
};
