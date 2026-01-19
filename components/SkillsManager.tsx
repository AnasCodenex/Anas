
import React, { useState } from 'react';
import { X, Plus, Terminal, Sparkles } from 'lucide-react';
import { Button } from './Button';

interface SkillsManagerProps {
  initialSkills: string[];
  onSkillsChange: (skills: string[]) => void;
}

export const SkillsManager: React.FC<SkillsManagerProps> = ({ initialSkills, onSkillsChange }) => {
  const [skills, setSkills] = useState<string[]>(initialSkills);
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = (e?: React.FormEvent) => {
    e?.preventDefault();
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      const updated = [...skills, trimmed];
      setSkills(updated);
      onSkillsChange(updated);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updated = skills.filter(s => s !== skillToRemove);
    setSkills(updated);
    onSkillsChange(updated);
  };

  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center">
          <Terminal size={18} className="mr-2 text-indigo-600 dark:text-indigo-400" /> Skill Stack
        </h3>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
          {skills.length} Total
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5 mb-8">
        {skills.map(skill => (
          <span 
            key={skill} 
            className="group flex items-center px-3.5 py-1.5 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold rounded-xl border border-indigo-100 dark:border-indigo-900/50 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/50 hover:border-indigo-200 dark:hover:border-indigo-800"
          >
            {skill}
            <button 
              onClick={() => handleRemoveSkill(skill)}
              className="ml-2 text-indigo-300 dark:text-indigo-600 hover:text-indigo-600 dark:hover:text-indigo-400 focus:outline-none p-0.5 rounded-md hover:bg-white/50 dark:hover:bg-slate-700 transition-all"
            >
              <X size={12} />
            </button>
          </span>
        ))}
        {skills.length === 0 && (
          <p className="text-sm text-slate-400 dark:text-slate-500 italic font-medium py-2">No technical skills added yet.</p>
        )}
      </div>

      <form onSubmit={handleAddSkill} className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors">
           <Sparkles size={16} />
        </div>
        <input 
          type="text" 
          placeholder="Add skill (e.g. Go, Rust, K8s)"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="w-full pl-10 pr-12 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500/10 focus:bg-white dark:focus:bg-slate-800 outline-none transition-all dark:text-slate-100"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 dark:shadow-none hover:bg-indigo-700 transition-all"
        >
          <Plus size={18} />
        </button>
      </form>
    </div>
  );
};