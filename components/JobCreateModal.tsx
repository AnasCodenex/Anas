
import React, { useState } from 'react';
import { X, Briefcase, MapPin, DollarSign, Zap } from 'lucide-react';
import { Button } from './Button';
import { JobOpportunity } from '../types';

interface JobCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (job: Partial<JobOpportunity>) => void;
}

export const JobCreateModal: React.FC<JobCreateModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    role: '',
    location: '',
    salaryRange: '',
    type: 'Full-time',
    description: '',
    proofRequirement: '',
    hiringSprint: false
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      proofRequirement: formData.proofRequirement.split(',').map(s => s.trim()).filter(Boolean),
      postedAt: 'Just now'
    } as any);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-emerald-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Post Hiring Sprint</h2>
            <p className="text-sm text-slate-500 font-medium">Find engineers with verified proof-of-work</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Role Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={formData.role}
                  onChange={e => setFormData({...formData, role: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Remote / Bangalore"
                  value={formData.location}
                  onChange={e => setFormData({...formData, location: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Salary Range</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                  placeholder="₹15 - 25 LPA"
                  value={formData.salaryRange}
                  onChange={e => setFormData({...formData, salaryRange: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Employment Type</label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value as any})}
              >
                <option>Full-time</option>
                <option>Contract</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Proof Requirements (Skills)</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all"
              placeholder="e.g. React Performance, Web3, Distributed Systems"
              value={formData.proofRequirement}
              onChange={e => setFormData({...formData, proofRequirement: e.target.value})}
            />
            <p className="mt-2 text-xs text-slate-400 font-medium italic">We automatically filter applicants who don't have verified projects in these areas.</p>
          </div>

          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-amber-400 text-amber-900 rounded-lg"><Zap size={20} /></div>
              <div>
                <p className="text-sm font-bold text-amber-900">Enable Hiring Sprint</p>
                <p className="text-xs text-amber-700">Get a shortlist of 10 best candidates in 24 hours.</p>
              </div>
            </div>
            <input 
              type="checkbox" 
              className="w-6 h-6 rounded-lg border-amber-300 text-emerald-600 focus:ring-emerald-500"
              checked={formData.hiringSprint}
              onChange={e => setFormData({...formData, hiringSprint: e.target.checked})}
            />
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="secondary" className="flex-1 rounded-2xl bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200">
              Launch Opportunity
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
