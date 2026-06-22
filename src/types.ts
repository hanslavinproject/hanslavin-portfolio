export interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  description: string;
  longDescription: string;
  role: string;
  achievements: string[];
  technologies: string[];
  outcomes: string;
  badge?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  label: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  iconName: string;
}

export interface InteractiveScenario {
  id: string;
  businessNeed: string;
  solutionTitle: string;
  approachText: string;
  appliedSkills: { category: string; explanation: string }[];
  impactQuote: string;
}
