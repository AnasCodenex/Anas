
import React, { useState } from 'react';
import { User, JobOpportunity } from '../types';
import { MOCK_OPPORTUNITIES } from '../constants';
import { Button } from '../components/Button';
import { JobCreateModal } from '../components/JobCreateModal';
import { 
  Users, 
  CreditCard, 
  Search, 
  PlusCircle, 
  ChevronRight, 
  TrendingUp,
  Mail,
  Filter,
  Zap,
  Target,
  Sparkles
} from 'lucide-react';

interface RecruiterDashboardProps {
  user: User;
}

export const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ user }) => {
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [jobs, setJobs] = useState<JobOpportunity[]>(MOCK_OPPORTUNITIES);
  const [searchQuery, setSearchQuery] = useState('');

  const candidates = [
    { name: 'Sameer Varma', score: 890, exp: 'Final Year, IIT Delhi', skills: ['React', 'Next.js', 'Typescript'], avatar: 'https://ui-avatars.com/api/?name=Sameer+Varma&background=random' },
    { name: 'Ishani Roy', score: 920, exp: '1.5 YOE @ Zomato', skills: ['PostgreSQL', 'Python', 'FastAPI'], avatar: 'https://ui-avatars.com/api/?name=Ishani+Roy&background=random' },
    { name: 'Rohan Deshmukh', score: 845, exp: 'B.Tech 2023, VIT', skills: ['Docker', 'AWS', 'Go'], avatar: 'https://ui-avatars.com/api/?name=Rohan+Deshmukh&background=random' },
    { name: 'Ananya Iyer', score: 955, exp: 'Staff SDE @ Razorpay', skills: ['Rust', 'Distributed Systems'], avatar: 'https://ui-avatars.com/api/?name=Ananya+Iyer&background=random' }
  ];

  const filteredCandidates = candidates.filter(c => 
    c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePostJob = (newJob: Partial<JobOpportunity>) => {
    const fullJob = {
      ...newJob,
      id: `j${jobs.length + 1}`,
      companyName: user.companyName || 'TechFlow India',
    } as JobOpportunity;
    setJobs([fullJob, ...jobs]);
    setIsJobModalOpen(false);
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Recruiter Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Hiring Console</h1>
          <p className="text-slate-500 font-medium">Verified talent from across the Indian engineering ecosystem</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-white border border-slate-200 px-6 py-3 rounded-2xl flex items-center space-x-4 shadow-sm">
            <CreditCard size={20} className="text-emerald-500" />
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Available Credits</p>
              <p className="text-lg font-black text-slate-900 leading-none">42 Sprints</p>
            </div>
          </div>
          <Button onClick={() => setIsJobModalOpen(true)} className="rounded-2xl px-6 py-4 bg-emerald-600 hover:bg-emerald-700 shadow-xl shadow-emerald-100 border-none">
            <PlusCircle size={20} className="mr-2" /> Start Hiring Sprint
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Talent Search Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-black text-slate-900 flex items-center">
                  <Target size={22} className="mr-3 text-emerald-600" /> Skill-Proof Search
                </h3>
                <div className="flex space-x-2">
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-black uppercase tracking-widest">Live Pool</span>
                </div>
              </div>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="Filter by specific proof (e.g. 'Kubernetes', 'Scalable Node.js')" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                />
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {filteredCandidates.map(candidate => (
                <div key={candidate.name} className="p-6 hover:bg-slate-50 transition-all cursor-pointer group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-5">
                      <img src={candidate.avatar} className="w-16 h-16 rounded-2xl shadow-sm border-2 border-white group-hover:scale-110 transition-transform" alt="" />
                      <div>
                        <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{candidate.name}</h4>
                        <p className="text-sm text-slate-500 font-bold">{candidate.exp}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-emerald-600 font-black text-2xl mb-1 tracking-tighter">{candidate.score}</div>
                      <div className="text-[10px] uppercase font-black text-slate-400 tracking-widest">Proof Score</div>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    {candidate.skills.map(skill => (
                      <span key={skill} className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-xl shadow-sm">
                        {skill}
                      </span>
                    ))}
                    <div className="flex-1"></div>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-all rounded-xl font-black text-emerald-600">
                      Proof Profile <ChevronRight size={16} className="ml-1" />
                    </Button>
                  </div>
                </div>
              ))}
              {filteredCandidates.length === 0 && (
                <div className="p-20 text-center">
                  <Sparkles size={48} className="mx-auto text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold">No engineers found with those specific proof-points.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recruiter Sidebar */}
        <div className="space-y-8">
          {/* Active Job Sprints */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 mb-6">Active Sprints</h3>
            <div className="space-y-4">
              {jobs.slice(0, 3).map(job => (
                <div key={job.id} className="p-5 border border-slate-100 rounded-2xl hover:border-emerald-200 transition-all cursor-pointer bg-slate-50 group">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-black text-slate-900 group-hover:text-emerald-600 transition-colors">{job.role}</span>
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest ${job.hiringSprint ? 'bg-amber-400 text-amber-900' : 'bg-emerald-100 text-emerald-700'}`}>
                      {job.hiringSprint ? 'Sprint' : 'Active'}
                    </span>
                  </div>
                  <div className="flex items-center text-xs text-slate-400 font-bold">
                    <Users size={14} className="mr-1" /> 124 Verified Applicants
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6 rounded-2xl font-black text-slate-500 hover:text-emerald-600 hover:border-emerald-200">
              Manage All Sprints
            </Button>
          </div>

          {/* Hiring Credits & Support */}
          <div className="bg-emerald-600 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-emerald-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-black mb-3">Enterprise Insight</h3>
            <p className="text-emerald-50 text-sm font-medium mb-6 leading-relaxed opacity-90">
              Companies using DevProof verified filters have <span className="text-white font-black underline decoration-emerald-400">92% higher retention</span> in first 12 months.
            </p>
            <Button className="w-full bg-white text-emerald-700 border-none rounded-2xl font-black hover:bg-emerald-50 transition-colors">
              Talk to Account Manager
            </Button>
          </div>

          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
             <div className="flex items-center space-x-3 mb-4">
               <Zap className="text-amber-400 fill-amber-400" size={24} />
               <h3 className="text-lg font-black">Quick Action</h3>
             </div>
             <p className="text-slate-400 text-sm font-medium mb-6">Shortlist the top 1% Python developers in India with one click.</p>
             <Button variant="primary" className="w-full bg-slate-800 border-none rounded-2xl font-black hover:bg-slate-700 text-amber-400">
                Run AI Shortlist
             </Button>
          </div>
        </div>
      </div>

      <JobCreateModal 
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onSubmit={handlePostJob}
      />
    </div>
  );
};
