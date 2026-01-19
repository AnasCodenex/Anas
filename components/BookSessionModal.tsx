
import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, CreditCard, Sparkles } from 'lucide-react';
import { Button } from './Button';
import { User, MentorshipSession } from '../types';

interface BookSessionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sessionData: Partial<MentorshipSession>) => void;
  mentor: Partial<User> | null;
  currentUser: User;
}

export const BookSessionModal: React.FC<BookSessionModalProps> = ({ isOpen, onClose, onSubmit, mentor, currentUser }) => {
  const [formData, setFormData] = useState({
    topic: '',
    date: '',
    time: '',
  });

  if (!isOpen || !mentor) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      mentorId: mentor.id,
      menteeId: currentUser.id,
      mentorName: mentor.name || 'Unknown Mentor',
      menteeName: currentUser.name,
      topic: formData.topic,
      date: formData.date,
      time: formData.time,
      price: mentor.mentorPrice || 0,
      status: 'upcoming',
      meetingLink: mentor.meetingLink || 'https://zoom.us/j/default',
    });
    setFormData({ topic: '', date: '', time: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-indigo-50/30">
          <div className="flex items-center space-x-4">
            <img src={mentor.avatar} className="w-12 h-12 rounded-xl object-cover border-2 border-white shadow-sm" alt="" />
            <div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">Book Session</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">with {mentor.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-100 transition-all">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Session Topic</label>
            <div className="relative">
              <BookOpen className="absolute left-3 top-3 text-slate-400" size={18} />
              <input 
                required
                type="text" 
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                placeholder="e.g. React performance audit or mock interview"
                value={formData.topic}
                onChange={e => setFormData({...formData, topic: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="date" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.date}
                  onChange={e => setFormData({...formData, date: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-slate-400" size={18} />
                <input 
                  required
                  type="time" 
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all"
                  value={formData.time}
                  onChange={e => setFormData({...formData, time: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="p-5 bg-indigo-50 rounded-[2rem] border border-indigo-100">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-3 text-indigo-900">
                  <CreditCard size={20} />
                  <span className="text-sm font-black uppercase tracking-widest">Payment Info</span>
               </div>
               <span className="text-xl font-black text-slate-900">
                 {mentor.mentorPrice === 0 ? 'FREE' : `₹${mentor.mentorPrice}`}
               </span>
            </div>
            <div className="flex items-center space-x-2 text-[10px] text-indigo-400 font-bold uppercase tracking-widest leading-relaxed">
               <Sparkles size={12} className="shrink-0" />
               <span>You will be charged after the mentor accepts your session request.</span>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" className="flex-1 rounded-2xl" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="flex-1 rounded-2xl bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-100">
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
