export interface TherapyModality {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  indications: string[];
  imageUrl: string;
  iconName: string;
  badge: string;
}

export interface TreatedCondition {
  id: string;
  title: string;
  description: string;
  icon: string;
  commonIn: string;
}

export interface AlertSymptom {
  id: string;
  label: string;
  severity: 'moderate' | 'high' | 'urgent';
  description: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  petName: string;
  petType: string;
  condition: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Acupuntura' | 'Laserterapia' | 'Cinesioterapia' | 'Dicas de Cuidado';
  summary: string;
  content: string[];
  imageUrl: string;
  readTime: string;
  date: string;
}

export interface CoverageRegion {
  city: string;
  neighborhoods: string[];
  badge: string;
  description?: string;
}

export interface DoctorInfo {
  name: string;
  crmv: string;
  specialties: string;
  whatsappNumber: string;
  whatsappFormatted: string;
  instagram: string;
  instagramUrl: string;
  email: string;
  quote: string;
  bio: string;
  serviceType: string;
  locationsShort: string;
}

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  titleLocations: string;
  subtitle: string;
  imageUrl: string;
  statReviews: string;
  statLocations: string;
}

export interface AboutContent {
  title: string;
  specialties: string;
  imageUrl: string;
  quote: string;
  bio: string;
}

export interface GoogleIntegrationConfig {
  enabled: boolean;
  businessName: string;
  placeId: string;
  googleMapsUrl: string;
  googleReviewUrl: string;
  rating: number;
  totalReviews: number;
  lastSyncedAt: string;
  embedWidgetCode?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface SiteData {
  doctorInfo: DoctorInfo;
  hero: HeroContent;
  about: AboutContent;
  coverageRegions: CoverageRegion[];
  reviews: ReviewItem[];
  modalities: TherapyModality[];
  blogPosts: BlogPost[];
  googleIntegration: GoogleIntegrationConfig;
  faqs: FAQItem[];
}
