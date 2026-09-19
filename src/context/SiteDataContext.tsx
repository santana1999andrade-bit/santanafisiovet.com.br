import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, DoctorInfo, HeroContent, AboutContent, CoverageRegion, ReviewItem, TherapyModality, BlogPost, GoogleIntegrationConfig } from '../types';
import { INITIAL_SITE_DATA, INITIAL_GOOGLE_INTEGRATION } from '../data/veterinaryData';

const STORAGE_KEY = 'santana_fisiovet_site_data_v1';

interface SiteDataContextType {
  siteData: SiteData;
  updateDoctorInfo: (info: Partial<DoctorInfo>) => void;
  updateHero: (hero: Partial<HeroContent>) => void;
  updateAbout: (about: Partial<AboutContent>) => void;
  updateCoverageRegions: (regions: CoverageRegion[]) => void;
  addReview: (review: Omit<ReviewItem, 'id'>) => void;
  updateReview: (id: string, review: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;
  updateModality: (id: string, updates: Partial<TherapyModality>) => void;
  updateBlogPost: (id: string, updates: Partial<BlogPost>) => void;
  updateGoogleIntegration: (config: Partial<GoogleIntegrationConfig>) => void;
  syncGoogleReviews: () => Promise<void>;
  resetToDefaults: () => void;
  exportData: () => string;
  importData: (jsonStr: string) => boolean;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const mergedGoogle = { ...INITIAL_SITE_DATA.googleIntegration, ...(parsed.googleIntegration || {}) };
        // If the saved google urls are still the generic search query or empty, upgrade them to the official share link
        if (!mergedGoogle.googleMapsUrl || mergedGoogle.googleMapsUrl.includes('search/?api=1') || mergedGoogle.googleMapsUrl.includes('ChIJ_santana')) {
          mergedGoogle.googleMapsUrl = INITIAL_GOOGLE_INTEGRATION.googleMapsUrl;
        }
        if (!mergedGoogle.googleReviewUrl || mergedGoogle.googleReviewUrl.includes('local/writereview') || mergedGoogle.googleReviewUrl.includes('ChIJ_santana')) {
          mergedGoogle.googleReviewUrl = INITIAL_GOOGLE_INTEGRATION.googleReviewUrl;
        }

        return {
          ...INITIAL_SITE_DATA,
          ...parsed,
          doctorInfo: { ...INITIAL_SITE_DATA.doctorInfo, ...(parsed.doctorInfo || {}) },
          hero: { ...INITIAL_SITE_DATA.hero, ...(parsed.hero || {}) },
          about: { ...INITIAL_SITE_DATA.about, ...(parsed.about || {}) },
          coverageRegions: parsed.coverageRegions || INITIAL_SITE_DATA.coverageRegions,
          reviews: parsed.reviews || INITIAL_SITE_DATA.reviews,
          modalities: parsed.modalities || INITIAL_SITE_DATA.modalities,
          blogPosts: parsed.blogPosts || INITIAL_SITE_DATA.blogPosts,
          googleIntegration: mergedGoogle,
          faqs: (parsed.faqs && Array.isArray(parsed.faqs) && parsed.faqs.length > 0) ? parsed.faqs : INITIAL_SITE_DATA.faqs,
        };
      }
    } catch (e) {
      console.error('Failed to load site data from localStorage:', e);
    }
    return INITIAL_SITE_DATA;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(siteData));
    } catch (e) {
      console.error('Failed to save site data to localStorage:', e);
    }
  }, [siteData]);

  const updateDoctorInfo = (info: Partial<DoctorInfo>) => {
    setSiteData((prev) => ({
      ...prev,
      doctorInfo: { ...prev.doctorInfo, ...info },
    }));
  };

  const updateHero = (hero: Partial<HeroContent>) => {
    setSiteData((prev) => ({
      ...prev,
      hero: { ...prev.hero, ...hero },
    }));
  };

  const updateAbout = (about: Partial<AboutContent>) => {
    setSiteData((prev) => ({
      ...prev,
      about: { ...prev.about, ...about },
    }));
  };

  const updateCoverageRegions = (regions: CoverageRegion[]) => {
    setSiteData((prev) => ({
      ...prev,
      coverageRegions: regions,
    }));
  };

  const addReview = (reviewData: Omit<ReviewItem, 'id'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    };
    setSiteData((prev) => ({
      ...prev,
      reviews: [newReview, ...prev.reviews],
    }));
  };

  const updateReview = (id: string, reviewData: Partial<ReviewItem>) => {
    setSiteData((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => (r.id === id ? { ...r, ...reviewData } : r)),
    }));
  };

  const deleteReview = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id),
    }));
  };

  const updateModality = (id: string, updates: Partial<TherapyModality>) => {
    setSiteData((prev) => ({
      ...prev,
      modalities: prev.modalities.map((m) => (m.id === id ? { ...m, ...updates } : m)),
    }));
  };

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setSiteData((prev) => ({
      ...prev,
      blogPosts: prev.blogPosts.map((b) => (b.id === id ? { ...b, ...updates } : b)),
    }));
  };

  const updateGoogleIntegration = (config: Partial<GoogleIntegrationConfig>) => {
    setSiteData((prev) => ({
      ...prev,
      googleIntegration: { ...prev.googleIntegration, ...config },
    }));
  };

  const syncGoogleReviews = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
    const now = new Date();
    const formatted = `${now.toLocaleDateString('pt-BR')} às ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;
    setSiteData((prev) => ({
      ...prev,
      googleIntegration: {
        ...prev.googleIntegration,
        lastSyncedAt: formatted,
      },
    }));
  };

  const resetToDefaults = () => {
    localStorage.removeItem(STORAGE_KEY);
    setSiteData(INITIAL_SITE_DATA);
  };

  const exportData = () => {
    return JSON.stringify(siteData, null, 2);
  };

  const importData = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed && typeof parsed === 'object') {
        const merged: SiteData = {
          ...INITIAL_SITE_DATA,
          ...parsed,
          doctorInfo: { ...INITIAL_SITE_DATA.doctorInfo, ...(parsed.doctorInfo || {}) },
          hero: { ...INITIAL_SITE_DATA.hero, ...(parsed.hero || {}) },
          about: { ...INITIAL_SITE_DATA.about, ...(parsed.about || {}) },
          coverageRegions: parsed.coverageRegions || INITIAL_SITE_DATA.coverageRegions,
          reviews: parsed.reviews || INITIAL_SITE_DATA.reviews,
          modalities: parsed.modalities || INITIAL_SITE_DATA.modalities,
          blogPosts: parsed.blogPosts || INITIAL_SITE_DATA.blogPosts,
          googleIntegration: { ...INITIAL_SITE_DATA.googleIntegration, ...(parsed.googleIntegration || {}) },
        };
        setSiteData(merged);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
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
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
};
