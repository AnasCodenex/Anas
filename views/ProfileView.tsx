
import React, { useState } from 'react';
import { User, Project, Experience, Education } from '../types';
import { MOCK_PROJECTS } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { SkillsManager } from '../components/SkillsManager';
import { Button } from '../components/Button';
import { 
  MapPin, 
  Mail, 
  Link as LinkIcon, 
  Calendar, 
  Github, 
  ShieldCheck, 
  Trophy, 
  Briefcase, 
  GraduationCap, 
  Plus, 
  Edit3,
  ToggleLeft,
  ToggleRight,
  Info,
  FolderGit2
} from 'lucide-react';

interface ProfileViewProps {
  user: User;
  setUser: (user: User) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, setUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const userProjects = MOCK_PROJECTS.filter(p => p.ownerId === user.id);

  const handleSkillsChange = (newSkills: string[]) => {
    setUser({ ...user, skills: newSkills });
  };

  const toggleMentorshipInterest = () => {
    setUser({ ...user, isLookingForMentor: !user.isLookingForMentor });
  };

  const mockExperiences: Experience[] = user.experience || [
    { id: '1', company: 'TechFlow Solutions', role: 'SDE Intern', duration: 'Jun 2023 - Aug 2023', description: 'Worked on microservices migration.' },
    { id: '2', company: 'Google Summer of Code', role: 'Contributor', duration: 'May 2022 - Aug 2022', description: 'Implemented a new data visualization engine for OpenHealth.' }
  ];

  const mockEducation: Education[] = user.education || [
    { id: '1', institution: 'IIT Bombay', degree: 'B.Tech in Computer Science', year: '2024' }
  ];

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Cover & Profile Header */}
      <div className="relative mb-8">
        <div className="h-48 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 rounded-3xl shadow-lg overflow-hidden relative">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        </div>
        
        <div className="px-8 -mt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col md:flex-row items-end gap-6">
            <div className="relative">
              <img 
                src={user.avatar} 
                className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl bg-white" 
                alt={user.name} 
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-xl border-4 border-white shadow-lg">
                <ShieldCheck size={20} />
              </div>
            </div>
            <div className="pb-2">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
                {user.name}
              </h1>
              <p className="text-slate-500 font-bold flex items-center mt-1">
                {user.headline || "Final Year Engineering Student @ IITB"} • <MapPin size={14} className="mx-1" /> Mumbai, IN
              </p>
            </div>
          </div>
          <div className="flex space-x-3 pb-2">
            <Button variant="outline" className="rounded-xl shadow-sm bg-white border-slate-200">
              <Github size={18} className="mr-2" /> GitHub
            </Button>
            <Button className="rounded-xl shadow-indigo-100 bg-indigo-600 border-none" onClick={() => setIsEditing(!isEditing)}>
              {isEditing ? 'Save Profile' : <><Edit3 size={18} className="mr-2" /> Edit Profile</>}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Mentorship Status Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
               <Calendar size={48} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center">
              <Calendar size={18} className="mr-2 text-indigo-600" /> Mentorship Status
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">Open to be Mentored</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Active Search</p>
                </div>
                <button onClick={toggleMentorshipInterest} className="text-indigo-600 transition-colors">
                  {user.isLookingForMentor ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-300" />}
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-sm font-bold text-slate-800">Provide Mentorship</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Help Others</p>
                </div>
                <button onClick={() => setUser({...user, isMentor: !user.isMentor})} className="text-emerald-600 transition-colors">
                  {user.isMentor ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-slate-300" />}
                </button>
              </div>

              {user.isMentor && (
                <div className="pt-2 animate-in fade-in slide-in-from-top-2">
                   <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Session Rate</p>
                   <p className="text-lg font-black text-slate-900">₹{user.mentorPrice || 0} <span className="text-xs text-slate-400 font-medium">/ 30 min</span></p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
               <Info size={18} className="mr-2 text-indigo-600" /> Bio
            </h3>
            <p className="text-slate-600 leading-relaxed font-medium">
              {user.bio || "Full-stack enthusiast focused on building highly responsive and scalable web applications. Open to discussing React architectures and system design."}
            </p>
          </div>

          <SkillsManager initialSkills={user.skills} onSkillsChange={handleSkillsChange} />

          {/* Accomplishments */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
               <Trophy size={18} className="mr-2 text-indigo-600" /> Impact Score
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                <ShieldCheck className="text-indigo-600 mb-2" size={20} />
                <p className="text-2xl font-black text-indigo-900">{user.trustScore}</p>
                <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Trust</p>
              </div>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <Briefcase className="text-emerald-600 mb-2" size={20} />
                <p className="text-2xl font-black text-emerald-900">{userProjects.length}</p>
                <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Proof-of-Work</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Areas */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Work Experience Section */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                 <Briefcase size={22} className="mr-3 text-indigo-600" /> Experience
               </h2>
               <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-indigo-600">
                 <Plus size={20} />
               </button>
            </div>
            
            <div className="space-y-8">
               {mockExperiences.map(exp => (
                 <div key={exp.id} className="relative pl-8 border-l-2 border-slate-100 last:pb-0 pb-8">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-white border-2 border-indigo-500 shadow-sm shadow-indigo-200"></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                       <h4 className="text-lg font-black text-slate-900">{exp.role}</h4>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                         {exp.duration}
                       </span>
                    </div>
                    <p className="text-sm font-bold text-indigo-600 mb-2">{exp.company}</p>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed">{exp.description}</p>
                 </div>
               ))}
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                 <GraduationCap size={22} className="mr-3 text-indigo-600" /> Education
               </h2>
               <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-indigo-600">
                 <Plus size={20} />
               </button>
            </div>
            
            <div className="space-y-6">
               {mockEducation.map(edu => (
                 <div key={edu.id} className="flex items-center space-x-5">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-indigo-600 border border-slate-100 shadow-sm">
                       <GraduationCap size={24} />
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900">{edu.institution}</h4>
                       <p className="text-sm text-slate-500 font-bold">{edu.degree} • Class of {edu.year}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>

          {/* Proof of Work Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center">
                <FolderGit2 size={22} className="mr-3 text-indigo-600" /> Verified Projects
              </h2>
              <div className="flex items-center text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-xl uppercase tracking-widest border border-indigo-100">
                Artifact Proof
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {userProjects.length > 0 ? (
                userProjects.map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))
              ) : (
                <div className="py-20 text-center bg-white rounded-[2rem] border border-dashed border-slate-300">
                  <p className="text-slate-400 font-bold">No verified artifacts found.</p>
                  <Button variant="ghost" className="mt-4 text-indigo-600 font-black uppercase tracking-widest text-xs">
                    Connect GitHub to Import
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
