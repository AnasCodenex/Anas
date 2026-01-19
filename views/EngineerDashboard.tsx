
import React, { useState } from 'react';
import { User, Project } from '../types';
import { MOCK_PROJECTS, MOCK_OPPORTUNITIES } from '../constants';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectCreateModal } from '../components/ProjectCreateModal';
import { SkillsManager } from '../components/SkillsManager';
import { Button } from '../components/Button';
import { 
  TrendingUp, 
  ShieldCheck, 
  Plus, 
  Users, 
  ChevronRight,
  Clock,
  PlusCircle,
  Zap,
  Star
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface EngineerDashboardProps {
  user: User;
}

const CONTRIBUTION_DATA = [
  { name: 'Mon', count: 4 },
  { name: 'Tue', count: 7 },
  { name: 'Wed', count: 5 },
  { name: 'Thu', count: 12 },
  { name: 'Fri', count: 8 },
  { name: 'Sat', count: 15 },
  { name: 'Sun', count: 2 },
];

export const EngineerDashboard: React.FC<EngineerDashboardProps> = ({ user }) => {
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userSkills, setUserSkills] = useState<string[]>(user.skills || []);

  const handleCreateProject = (newProjectData: Partial<Project>) => {
    const newProject: Project = {
      id: `p${projects.length + 1}`,
      title: newProjectData.title || 'Untitled Project',
      description: newProjectData.description || '',
      ownerId: user.id,
      ownerName: user.name,
      techStack: newProjectData.techStack || [],
      githubUrl: newProjectData.githubUrl,
      demoUrl: newProjectData.demoUrl,
      verified: false,
      contributorsCount: 1,
      createdAt: 'Just now'
    };
    
    setProjects([newProject, ...projects]);
    setIsModalOpen(false);
  };

  const handleSkillsChange = (newSkills: string[]) => {
    setUserSkills(newSkills);
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="relative mb-10 p-8 rounded-[2rem] bg-indigo-600 dark:bg-indigo-700 text-white overflow-hidden shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/20">
         <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 -ml-10 -mb-10 w-40 h-40 bg-indigo-400/20 rounded-full blur-2xl"></div>
         
         <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
           <div>
             <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">Good morning, {user.name.split(' ')[0]}!</h1>
             <p className="text-indigo-100 text-lg opacity-90 max-w-md font-medium">You have <span className="text-white font-bold">3 new</span> hiring sprint invites based on your React proficiency.</p>
           </div>
           <div className="flex gap-4">
             <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center">
                <span className="text-3xl font-black">{user.trustScore}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Trust Score</span>
             </div>
             <div className="bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex flex-col items-center">
                <span className="text-3xl font-black">+{user.contributionPoints}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-200">Impact</span>
             </div>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Feed Column */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Proof of Work Feed</h2>
            <div className="flex items-center space-x-3">
              <Button size="sm" className="rounded-xl px-5 shadow-lg shadow-indigo-100 dark:shadow-none" onClick={() => setIsModalOpen(true)}>
                <PlusCircle size={18} className="mr-2" /> Share Project
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 shadow-sm">
              <p className="text-slate-400 dark:text-slate-500 font-medium">No projects to show. Start building something!</p>
            </div>
          )}

          <div className="text-center py-4">
            <Button variant="ghost" className="text-indigo-600 dark:text-indigo-400 font-bold">Discover more projects</Button>
          </div>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Active Sprint Widget */}
          <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-8 rounded-[2rem] text-white shadow-xl shadow-orange-100 dark:shadow-none">
             <div className="flex items-center justify-between mb-6">
                <div className="p-2 bg-white/20 rounded-xl"><Zap size={24} className="fill-white" /></div>
                <span className="text-[10px] font-black tracking-widest uppercase bg-white/20 px-2 py-1 rounded">Flash Hiring</span>
             </div>
             <h3 className="text-xl font-bold mb-2">Zomato Engineering</h3>
             <p className="text-orange-50 text-sm font-medium mb-6 opacity-90">Urgent need for SDE-1 with verified React Performance proof.</p>
             <Button variant="outline" className="w-full bg-white/10 border-white/30 text-white hover:bg-white hover:text-orange-600 border-none rounded-xl">
               Apply with Proof
             </Button>
          </div>

          {/* Skills Manager */}
          <SkillsManager initialSkills={userSkills} onSkillsChange={handleSkillsChange} />

          {/* Activity Chart */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-6 flex items-center">
               <TrendingUp size={18} className="mr-2 text-indigo-600 dark:text-indigo-400" /> Skill Growth
            </h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CONTRIBUTION_DATA}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} hide />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', backgroundColor: isModalOpen ? '#fff' : '#1e293b', color: '#fff'}} 
                    cursor={{fill: 'rgba(99, 102, 241, 0.1)'}}
                    itemStyle={{color: '#fff'}}
                    labelStyle={{color: '#94a3b8'}}
                  />
                  <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 6, 6]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Opportunities Preview */}
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Featured Jobs</h3>
              <a href="#" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">See all</a>
            </div>
            <div className="space-y-4">
              {MOCK_OPPORTUNITIES.slice(0, 2).map(job => (
                <div key={job.id} className="group p-4 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 rounded-2xl transition-all cursor-pointer">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{job.role}</h4>
                    <button className="text-slate-300 dark:text-slate-600 hover:text-rose-500 transition-colors"><Star size={16} /></button>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 font-medium">{job.companyName} • {job.location}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider bg-indigo-50 dark:bg-indigo-950/30 px-2 py-0.5 rounded">
                      <Zap size={10} className="mr-1" /> Hiring Sprint
                    </div>
                    <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ProjectCreateModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleCreateProject} 
      />
    </div>
  );
};