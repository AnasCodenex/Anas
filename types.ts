
export enum UserRole {
  ENGINEER = 'ENGINEER',
  RECRUITER = 'RECRUITER',
  ADMIN = 'ADMIN'
}

export type AppView = 'DASHBOARD' | 'PROFILE' | 'SETTINGS' | 'JOBS' | 'MESSAGES' | 'COMMUNITIES' | 'MENTORSHIP' | 'TALENT_SEARCH';

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  year: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  headline?: string;
  trustScore: number;
  contributionPoints: number;
  skills: string[];
  location?: string;
  bio?: string;
  companyName?: string;
  // Professional Background
  experience?: Experience[];
  education?: Education[];
  // Mentorship specific fields
  isMentor?: boolean;
  isLookingForMentor?: boolean;
  mentorBio?: string;
  mentorPrice?: number; // Price in INR
  meetingLink?: string;
  mentorRating?: number;
}

export interface MentorshipSession {
  id: string;
  mentorId: string;
  menteeId: string;
  mentorName: string;
  menteeName: string;
  topic: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  meetingLink: string;
  price: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  ownerId: string;
  ownerName: string;
  techStack: string[];
  githubUrl?: string;
  demoUrl?: string;
  verified: boolean;
  contributorsCount: number;
  createdAt: string;
}

export interface JobOpportunity {
  id: string;
  companyName: string;
  role: string;
  location: string;
  salaryRange: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  description: string;
  proofRequirement: string[];
  hiringSprint: boolean;
  postedAt: string;
  logo?: string;
}
