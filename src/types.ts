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
}
