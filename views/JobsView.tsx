
import React, { useState } from 'react';
import { User, JobOpportunity } from '../types';
import { MOCK_OPPORTUNITIES } from '../constants';
import { Button } from '../components/Button';
import { Search, MapPin, Briefcase, DollarSign, Zap, Filter, ChevronRight, Clock, Star } from 'lucide-react';

interface JobsViewProps {
  user: User;
}

export const JobsView: React.FC<JobsViewProps> = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('All');

  const jobs: JobOpportunity[] = [
    ...MOCK_OPPORTUNITIES,
    {
      id: 'j3',
      companyName: 'Groww',
      role: 'DevOps Engineer',
      location: 'Remote',
      salaryRange: '₹18 - 25 LPA',
      type: 'Full-time',
      description: 'Scale our cloud infrastructure to handle 10M+ daily active users.',
      proofRequirement: ['Terraform', 'Kubernetes'],
      hiringSprint: true,
      postedAt: '4h ago'
    },
    {
      id: 'j4',
      companyName: 'Postman',
      role: 'Node.js Developer',
      location: 'Bangalore / Hybrid',
      salaryRange: '₹22 - 35 LPA',
      type: 'Full-time',
      description: 'Build core features for the world\'s leading API platform.',
      proofRequirement: ['API Architecture', 'Distributed Systems'],
      hiringSprint: false,
      postedAt: '2d ago'
    }
  ];

  const filteredJobs = jobs.filter(job => 
    (job.role.toLowerCase().includes(searchTerm.toLowerCase()) || 
     job.companyName.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterType === 'All' || job.type === filterType)
  );

  return (
    <div className="p-6 lg:p-10 max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Hiring Sprints</h1>
          <p className="text-slate-500">Exclusive opportunities for verified engineers</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
          {['All', 'Full-time', 'Internship'].map(t => (
            <button 
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${filterType === t ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:text-slate-700'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Job List */}
        <div className="flex-1 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Filter by role, company or required skill-proof..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-3xl shadow-sm focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all text-lg"
            />
          </div>

          <div className="grid grid-cols-1 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => (
                <div 
                  key={job.id} 
                  className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  {job.hiringSprint && (
                    <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 px-4 py-1 font-black text-[10px] uppercase tracking-widest rounded-bl-2xl flex items-center">
                      <Zap size={12} className="mr-1 fill-amber-900" /> Fast Track
                    </div>
                  )}
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xl overflow-hidden ring-4 ring-slate-50">
                        {job.logo ? <img src={job.logo} /> : job.companyName.charAt(0)}
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">{job.role}</h3>
                        <p className="text-slate-500 font-bold mt-1">{job.companyName}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 text-sm">
                       <div className="flex items-center px-4 py-2 bg-slate-50 text-slate-600 rounded-xl font-semibold">
                         <MapPin size={16} className="mr-2 text-slate-400" /> {job.location}
                       </div>
                       <div className="flex items-center px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl font-bold">
                         <DollarSign size={16} className="mr-1" /> {job.salaryRange}
                       </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-slate-600 line-clamp-2 leading-relaxed mb-6">{job.description || "A challenging role that requires high agency and deep technical knowledge of modern architectures."}</p>
                    
                    <div className="flex flex-wrap items-center justify-between gap-6">
                       <div className="flex flex-wrap gap-2">
                         {job.proofRequirement.map(skill => (
                           <span key={skill} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 text-xs font-black uppercase tracking-wider rounded-lg border border-indigo-100">
                             {skill}
                           </span>
                         ))}
                       </div>
                       <div className="flex items-center space-x-3">
                         <button className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all">
                           <Star size={20} />
                         </button>
                         <Button className="rounded-2xl px-6 shadow-indigo-100">
                           Apply Now <ChevronRight size={16} className="ml-2" />
                         </Button>
                       </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-50 flex items-center text-xs text-slate-400 font-bold uppercase tracking-widest">
                    <Clock size={14} className="mr-2" /> Posted {job.postedAt}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300">
                <p className="text-slate-500 text-lg font-medium">No matches found for your search.</p>
                <Button variant="ghost" className="mt-4 text-indigo-600" onClick={() => setSearchTerm('')}>Clear Filters</Button>
              </div>
            )}
          </div>
        </div>

        {/* Filters Sidebar */}
        <div className="hidden lg:block w-72 space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm sticky top-32">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
               <Filter size={18} className="mr-2 text-indigo-600" /> Fine-tune
             </h3>
             
             <div className="space-y-8">
                <div>
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Location</label>
                   <div className="space-y-3">
                     {['Remote', 'Bangalore', 'Mumbai', 'Delhi NCR'].map(loc => (
                       <label key={loc} className="flex items-center text-sm font-semibold text-slate-600 hover:text-slate-900 cursor-pointer group">
                         <div className="w-5 h-5 border-2 border-slate-200 rounded flex items-center justify-center mr-3 group-hover:border-indigo-400 transition-colors">
                           <div className="w-2.5 h-2.5 bg-indigo-600 rounded-sm opacity-0 group-checked:opacity-100"></div>
                         </div>
                         {loc}
                       </label>
                     ))}
                   </div>
                </div>

                <div>
                   <label className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-4">Salary Range</label>
                   <input type="range" className="w-full accent-indigo-600" min="0" max="100" />
                   <div className="flex justify-between text-xs font-bold text-slate-500 mt-2">
                     <span>5 LPA</span>
                     <span>50+ LPA</span>
                   </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <div className="bg-emerald-50 p-4 rounded-2xl text-emerald-800 text-sm">
                    <p className="font-black uppercase text-[10px] tracking-widest mb-2 flex items-center">
                      <Zap size={14} className="mr-1" /> Pro Tip
                    </p>
                    <p className="font-medium leading-tight">Complete your <span className="font-bold underline">Skills Proof</span> to unlock high-intent salary tiers.</p>
                  </div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};
