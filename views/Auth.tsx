
import React, { useState } from 'react';
import { UserRole } from '../types';
import { Button } from '../components/Button';
import { Code2, ArrowLeft, Mail, Lock, Building2, ShieldCheck, Zap } from 'lucide-react';

interface AuthProps {
  role: UserRole;
  onSuccess: (user: any) => void;
  onBack: () => void;
}

export const Auth: React.FC<AuthProps> = ({ role, onSuccess, onBack }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const isEngineer = role === UserRole.ENGINEER;
  const themeColor = isEngineer ? 'indigo' : 'emerald';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onSuccess({
        id: 'u1',
        name: isEngineer ? 'Arjun Mehta' : 'Priya Sharma',
        email: 'user@example.com',
        role: role,
        avatar: isEngineer ? 'https://ui-avatars.com/api/?name=Arjun+Mehta&background=6366f1&color=fff' : 'https://ui-avatars.com/api/?name=Priya+Sharma&background=10b981&color=fff',
        trustScore: 840,
        contributionPoints: 1250,
        skills: isEngineer ? ['React', 'Node.js', 'PostgreSQL'] : [],
        companyName: !isEngineer ? 'TechFlow India' : undefined
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full">
        <button onClick={onBack} className="flex items-center text-slate-400 hover:text-slate-800 mb-8 font-bold transition-colors group">
          <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Choice
        </button>

        <div className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-2xl shadow-slate-200/50">
          <div className="flex flex-col items-center text-center mb-10">
            <div className={`p-4 rounded-3xl mb-6 shadow-xl shadow-${themeColor}-200/50 bg-${themeColor}-600 text-white`}>
              {isEngineer ? <Code2 size={40} /> : <Building2 size={40} />}
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {isEngineer ? 'Engineer Portal' : 'Recruiter Portal'}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              {isLogin ? `Welcome back to ${isEngineer ? 'building' : 'hiring'}` : `Start your ${isEngineer ? 'proof' : 'hiring'} journey`}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <label className="block text-sm font-bold text-slate-700 mb-2">{isEngineer ? 'Full Name' : 'Contact Person'}</label>
                <input required type="text" className={`w-full px-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-${themeColor}-500/10 focus:border-${themeColor}-600 outline-none transition-all font-medium`} placeholder="John Doe" />
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="email" className={`w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-${themeColor}-500/10 focus:border-${themeColor}-600 outline-none transition-all font-medium`} placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input required type="password" className={`w-full pl-12 pr-5 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-${themeColor}-500/10 focus:border-${themeColor}-600 outline-none transition-all font-medium`} placeholder="••••••••" />
              </div>
            </div>

            <Button 
              type="submit" 
              className={`w-full py-4 rounded-2xl shadow-xl shadow-${themeColor}-200/50 bg-${themeColor}-600 hover:bg-${themeColor}-700 border-none`} 
              size="lg" 
              isLoading={isLoading}
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
          </form>

          {!isEngineer && isLogin && (
            <div className="mt-6 flex items-center space-x-2 text-emerald-600 bg-emerald-50 p-3 rounded-xl border border-emerald-100">
               <ShieldCheck size={18} />
               <p className="text-xs font-bold">Verified Corporate Account Access Only</p>
            </div>
          )}

          <div className="mt-10 text-center">
            <span className="text-slate-400 font-medium">{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className={`ml-2 font-black text-${themeColor}-600 hover:text-${themeColor}-700 transition-colors`}
            >
              {isLogin ? 'Join DevProof' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
