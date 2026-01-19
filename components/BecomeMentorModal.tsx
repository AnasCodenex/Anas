
import React, { useState } from 'react';
import { X, Video, DollarSign, BookOpen, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { User } from '../types';

interface BecomeMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mentorData: Partial<User>) => void;
  currentUser: User;
}

export const BecomeMentorModal: React.FC<BecomeMentorModalProps> = ({ isOpen, onClose, onSubmit, currentUser }) => {
  const [formData, setFormData] = useState({
    mentorBio: currentUser.mentorBio || '',
    mentorPrice: currentUser.mentorPrice || 0,
    meetingLink: currentUser.meetingLink || '',
    headline: currentUser.headline || ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      isMentor: true,
      mentorRating: 5.0
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
          <div>
            <h2 className="text-2xl font-black text-slate-900">Become a Mentor</h2>
            <p className="text-sm text-slate-500 font-medium">Share your proof with others</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Mentor Headline</label>
            <div className="relative">
              <Sparkles className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                required
                type="text" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. SDE-2 @ Amazon | 4 YOE Backend"
                value={formData.headline}
                onChange={e => setFormData({...formData, headline: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Bio / Mentorship Focus</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-slate-400" size={18} />
              <textarea 
                required
                rows={3}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="What can you help with? (e.g. System design, Mock interviews)"
                value={formData.mentorBio}
                onChange={e => setFormData({...formData, mentorBio: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Price (per session)</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="number" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="INR"
                  value={formData.mentorPrice}
                  onChange={e => setFormData({...formData, mentorPrice: parseInt(e.target.value)})}
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase">Set to 0 for free sessions</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Meeting Link</label>
              <div className="relative">
                <Video className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="url" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  placeholder="Zoom / GMeet link"
                  value={formData.meetingLink}
                  onChange={e => setFormData({...formData, meetingLink: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100">
              Register as Mentor
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
