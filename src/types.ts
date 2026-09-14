export interface Project {
  id: string;
  codeName: string;
  title: string;
  year: string;
  category: 'Embedded & IoT' | 'Web & Systems' | 'AI & ML' | 'Robotics & Hardware' | 'C++ Systems';
  shortDescription: string;
  techStack: string[];
  status: 'Completed' | 'Active Deployment' | 'Production' | 'Archived';
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: {
    name: string;
    role: string;
  }[];
  challenges: string;
  learnings: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  iconType: 'terminal' | 'circuit' | 'globe' | 'cpu' | 'shield';
  metrics?: string[];
}

export interface Experience {
  id: string;
  code: string;
  year: string;
  role: string;
  organization: string;
  location: string;
  type: 'Internship' | 'Leadership' | 'Research';
  description: string;
  responsibilities: string[];
  technologies: string[];
  badgeColor?: string;
}

export interface Education {
  institution: string;
  degree: string;
  specialization: string;
  period: string;
  gpa: string;
  location: string;
  highlights: string[];
}

export interface JourneyMilestone {
  year: string;
  quarter?: string;
  title: string;
  category: 'Education' | 'Internship' | 'Project' | 'Award' | 'Community' | 'Leadership';
  description: string;
  details: string[];
  systemLogCode: string;
}

export interface SkillItem {
  name: string;
  tag: string;
  highlight?: boolean;
}

export interface SkillCard {
  id: string;
  codeName: string;
  title: string;
  year: string;
  category: 'Programming & C++' | 'Embedded & Hardware' | 'AI & Computer Vision' | 'Web & Systems' | 'Developer Tools & EDA';
  status: 'Driver Active' | 'Core Discipline' | 'Production Tested' | 'Hardware Verified' | 'Award Winner' | 'Active Deployment';
  shortDescription: string;
  techStack: string[];
  iconType: 'terminal' | 'circuit' | 'globe' | 'cpu' | 'shield' | 'wrench' | 'layers';
  proficiencyLevel: 'Expert (95%)' | 'Advanced (90%)' | 'Proficient (85%)';
  metrics?: string[];
  overview?: string;
  practicalApplications?: string[];
  relatedRepoUrl?: string;
  relatedProjectName?: string;
}

export interface SkillModule {
  id: string;
  title: string;
  subTitle: string;
  icon: string;
  skills: SkillItem[];
  color: string;
}

export interface Achievement {
  id: string;
  code: string;
  title: string;
  organization: string;
  year: string;
  type: 'Hackathon' | 'Certification' | 'Membership' | 'Honor';
  description: string;
  verificationId?: string;
  badge: string;
}

export interface ActiveLabProcess {
  id: string;
  processId: string;
  title: string;
  status: 'IN PROGRESS' | 'RUNNING' | 'TESTING' | 'BUILDING';
  category: string;
  progressPercent: number;
  description: string;
  stack: string[];
  lastUpdate: string;
}

export interface PortfolioData {
  name: string;
  titleRole: string;
  specialization: string;
  statusText: string;
  tagline: string;
  bio: string;
  education: Education;
  interests: string[];
  quickStats: {
    label: string;
    value: string;
    detail: string;
  }[];
  journey: JourneyMilestone[];
  projects: Project[];
  experience: Experience[];
  skills: {
    programming: SkillItem[];
    web: SkillItem[];
    electronics: SkillItem[];
    tools: SkillItem[];
    foundations: SkillItem[];
  };
  skillCards?: SkillCard[];
  achievements: Achievement[];
  currentWork: ActiveLabProcess[];
  social: {
    github: string;
    linkedin: string;
    email: string;
    phone: string;
    location: string;
  };
}
