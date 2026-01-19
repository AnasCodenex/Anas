
import React from 'react';
import { ShieldCheck, Code2, Users, Target, ArrowRight, Zap, CheckCircle2, Building2 } from 'lucide-react';
import { Button } from '../components/Button';

interface LandingProps {
  onStart: (role: 'ENGINEER' | 'RECRUITER') => void;
}

export const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur-xl z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-slate-900 p-2 rounded-xl">
              <Code2 className="text-white" size={28} />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight">DevProof</span>
          </div>
          <div className="hidden md:flex items-center space-x-10 text-slate-500 font-bold text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-indigo-600 transition-colors">Network</a>
            <a href="#" className="hover:text-indigo-600 transition-colors">Mentorship</a>
            <a href="#" className="hover:text-emerald-600 transition-colors">For Hiring</a>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="font-black text-slate-600" onClick={() => onStart('ENGINEER')}>Login</Button>
            <Button className="rounded-2xl px-8 bg-slate-900 text-white font-black" onClick={() => onStart('ENGINEER')}>Join Now</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 overflow-hidden relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
           <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200 rounded-full blur-[100px]"></div>
           <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-[100px]"></div>
        </div>
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1.5 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8 shadow-xl">
            <Zap size={14} className="mr-2 text-amber-400 fill-amber-400" />
            Proof-of-Work Identity Protocol
          </div>
          <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter mb-8 leading-[0.9]">
            The resume <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 italic">is dead.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Build projects, verify your skill-stack, and get hired by India's top unicorns based on real engineering output. 
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
               <Button 
                size="lg" 
                className="relative bg-indigo-600 hover:bg-indigo-700 text-white rounded-3xl px-10 py-5 text-xl font-black shadow-2xl shadow-indigo-200 border-none" 
                onClick={() => onStart('ENGINEER')}
               >
                 Build as Engineer <ArrowRight className="ml-3 group-hover:translate-x-1 transition-transform" />
               </Button>
            </div>
            <div className="group relative">
               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
               <Button 
                variant="outline" 
                size="lg" 
                className="relative bg-white hover:bg-emerald-50 text-emerald-600 border-2 border-emerald-100 rounded-3xl px-10 py-5 text-xl font-black shadow-2xl shadow-emerald-100" 
                onClick={() => onStart('RECRUITER')}
               >
                 <Building2 className="mr-3" /> Hire with Proof
               </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-slate-50 py-32 px-6 rounded-[5rem] mx-4 my-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                icon: <ShieldCheck size={32} />, 
                color: 'indigo', 
                title: 'Verified Skill-Proof', 
                desc: 'GitHub commits, project deployments, and peer reviews form your dynamic rank. No influencers allowed.' 
              },
              { 
                icon: <Target size={32} />, 
                color: 'emerald', 
                title: 'Outcome-Driven Hiring', 
                desc: 'Recruiters filter by specific verified repositories. Skip the 5-round interview process with direct proof.' 
              },
              { 
                icon: <Users size={32} />, 
                color: 'amber', 
                title: 'Micro-Mentorship', 
                desc: 'Focused 15-min sessions with SDE-2s from India\'s top startups. Direct, actionable career growth.' 
              }
            ].map((f, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group">
                <div className={`w-16 h-16 bg-${f.color}-50 text-${f.color}-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiter Trust */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
           <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 text-white flex flex-col md:flex-row items-center gap-16 overflow-hidden relative">
              <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px]"></div>
              <div className="md:w-1/2 relative z-10">
                <div className="text-emerald-400 font-black uppercase tracking-[0.3em] text-[10px] mb-6">Enterprise Protocol</div>
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1]">Hiring at the speed of <span className="text-emerald-500 italic">execution.</span></h2>
                <div className="space-y-6 mb-12">
                   {[
                     "No bulk messaging - Intentional outreach",
                     "Rank candidates by actual system design proof",
                     "24-hour Hiring Sprints for urgent roles",
                     "Direct access to top 1% Indian builders"
                   ].map(item => (
                     <div key={item} className="flex items-center space-x-4">
                       <CheckCircle2 className="text-emerald-500" size={24} />
                       <span className="text-slate-300 font-bold text-lg">{item}</span>
                     </div>
                   ))}
                </div>
                <Button variant="outline" size="lg" className="rounded-3xl bg-white/5 border-white/10 text-white font-black hover:bg-white hover:text-slate-900 transition-all px-10 py-5 border-none" onClick={() => onStart('RECRUITER')}>
                   Request Demo Access
                </Button>
              </div>
              <div className="md:w-1/2 bg-slate-800 p-8 rounded-[3rem] border border-white/5 shadow-2xl">
                 <div className="space-y-6">
                   <div className="flex items-center justify-between">
                     <div className="w-24 h-4 bg-slate-700 rounded-full"></div>
                     <div className="w-12 h-6 bg-emerald-500 rounded-full"></div>
                   </div>
                   <div className="h-40 bg-slate-700/50 rounded-2xl animate-pulse"></div>
                   <div className="grid grid-cols-3 gap-4">
                      <div className="h-16 bg-slate-700 rounded-2xl"></div>
                      <div className="h-16 bg-slate-700 rounded-2xl"></div>
                      <div className="h-16 bg-slate-700 rounded-2xl"></div>
                   </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-24 px-6 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex items-center space-x-3">
             <div className="bg-slate-900 p-2 rounded-xl">
               <Code2 className="text-white" size={24} />
             </div>
             <span className="text-2xl font-black text-slate-900 tracking-tight">DevProof</span>
          </div>
          <div className="flex space-x-12 text-slate-400 font-bold text-sm uppercase tracking-widest">
            <a href="#" className="hover:text-slate-900">Privacy</a>
            <a href="#" className="hover:text-slate-900">Ethics</a>
            <a href="#" className="hover:text-slate-900">Impact</a>
          </div>
          <p className="text-slate-400 text-sm font-medium italic">© 2025 DevProof Technologies. Made with precision for India.</p>
        </div>
      </footer>
    </div>
  );
};
