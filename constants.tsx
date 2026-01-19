
import React from 'react';
import { 
  LayoutDashboard, 
  UserCircle, 
  FolderGit2, 
  Users2, 
  CalendarClock, 
  Briefcase, 
  MessageSquare, 
  Settings,
  ShieldCheck,
  TrendingUp,
  Search,
  PlusCircle,
  CreditCard,
  BarChart3,
  FilePlus,
  Mail
} from 'lucide-react';
import { UserRole, Project, User, JobOpportunity, MentorshipSession } from './types';

export const NAVBAR_LINKS = {
  [UserRole.ENGINEER]: [
    { name: 'Home', icon: <LayoutDashboard size={20} />, path: '/home' },
    { name: 'Profile', icon: <UserCircle size={20} />, path: '/profile' },
    { name: 'Projects', icon: <FolderGit2 size={20} />, path: '/projects' },
    { name: 'Communities', icon: <Users2 size={20} />, path: '/communities' },
    { name: 'Mentorship', icon: <CalendarClock size={20} />, path: '/mentorship' },
    { name: 'Opportunities', icon: <Briefcase size={20} />, path: '/opportunities' },
    { name: 'Messages', icon: <MessageSquare size={20} />, path: '/messages' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/settings' },
  ],
  [UserRole.RECRUITER]: [
    { name: 'Overview', icon: <BarChart3 size={20} />, path: '/overview' },
    { name: 'Post Job', icon: <FilePlus size={20} />, path: '/post-job' },
    { name: 'Talent Search', icon: <Search size={20} />, path: '/search' },
    { name: 'Applicants', icon: <Users2 size={20} />, path: '/applicants' },
    { name: 'Messages', icon: <Mail size={20} />, path: '/recruiter-messages' },
    { name: 'Billing', icon: <CreditCard size={20} />, path: '/billing' },
  ],
  [UserRole.ADMIN]: [
    { name: 'Users', icon: <Users2 size={20} />, path: '/admin/users' },
    { name: 'Content', icon: <ShieldCheck size={20} />, path: '/admin/content' },
    { name: 'Analytics', icon: <TrendingUp size={20} />, path: '/admin/analytics' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/admin/settings' },
  ]
};

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'DeFi Dashboard for Indian Retail',
    description: 'A simplified crypto management dashboard integrating with local UPI gateways for easy on-ramping.',
    ownerId: 'u1',
    ownerName: 'Arjun Mehta',
    techStack: ['React', 'Web3.js', 'Solidity', 'Tailwind'],
    githubUrl: 'https://github.com/arjun/defi-dashboard',
    verified: true,
    contributorsCount: 3,
    createdAt: '2 days ago'
  },
  {
    id: 'p2',
    title: 'AI Traffic Optimizer',
    description: 'Using computer vision to predict congestion in Bangalore traffic hotspots.',
    ownerId: 'u2',
    ownerName: 'Sneha Rao',
    techStack: ['Python', 'TensorFlow', 'FastAPI'],
    githubUrl: 'https://github.com/sneha/traffic-ai',
    verified: true,
    contributorsCount: 5,
    createdAt: '5 days ago'
  }
];

export const MOCK_OPPORTUNITIES: JobOpportunity[] = [
  {
    id: 'j1',
    companyName: 'Zomato Engineering',
    role: 'SDE-1 (Frontend)',
    location: 'Gurugram / Remote',
    salaryRange: '₹12 - 18 LPA',
    type: 'Full-time',
    description: 'Join Zomato’s frontend team to build high-performance web applications that serve millions of hungry users across India.',
    proofRequirement: ['React Performance', 'System Design'],
    hiringSprint: true,
    postedAt: '1 day ago'
  },
  {
    id: 'j2',
    companyName: 'Razorpay',
    role: 'Backend Developer',
    location: 'Bangalore',
    salaryRange: '₹15 - 22 LPA',
    type: 'Full-time',
    description: 'Scale our payment gateway systems to handle millions of transactions per second. Deep knowledge of Node.js and distributed systems required.',
    proofRequirement: ['Node.js Scaling', 'Payment Gateways'],
    hiringSprint: false,
    postedAt: '3 days ago'
  }
];

export const MOCK_MENTORS: Partial<User>[] = [
  {
    id: 'm1',
    name: 'Karan Singh',
    avatar: 'https://ui-avatars.com/api/?name=Karan+Singh&background=6366f1&color=fff',
    headline: 'Staff Engineer @ Uber',
    skills: ['System Design', 'Go', 'Distributed Systems'],
    mentorPrice: 500,
    mentorRating: 4.9,
    isMentor: true,
    mentorBio: 'Ex-Google, Ex-Microsoft. Helping engineers scale their systems and careers.'
  },
  {
    id: 'm2',
    name: 'Megha Gupta',
    avatar: 'https://ui-avatars.com/api/?name=Megha+Gupta&background=10b981&color=fff',
    headline: 'Senior Architect @ Flipkart',
    skills: ['Frontend', 'React', 'Web Performance'],
    mentorPrice: 0,
    mentorRating: 4.8,
    isMentor: true,
    mentorBio: 'Passionate about frontend architecture and performance optimization.'
  }
];

export const MOCK_SESSIONS: MentorshipSession[] = [
  {
    id: 's1',
    mentorId: 'm1',
    menteeId: 'u1',
    mentorName: 'Karan Singh',
    menteeName: 'Arjun Mehta',
    topic: 'System Design Interview Prep',
    date: 'Oct 24, 2025',
    time: '4:00 PM',
    status: 'upcoming',
    meetingLink: 'https://zoom.us/j/123456789',
    price: 500
  }
];
