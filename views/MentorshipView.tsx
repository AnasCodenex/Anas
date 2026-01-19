
import React, { useState } from 'react';
import { User, MentorshipSession } from '../types';
import { MOCK_MENTORS, MOCK_SESSIONS } from '../constants';
import { Button } from '../components/Button';
import { BecomeMentorModal } from '../components/BecomeMentorModal';
import { BookSessionModal } from '../components/BookSessionModal';
import { 
  CalendarClock, 
  Video, 
  Star, 
  ChevronRight, 
  PlusCircle, 
  Search, 
  CheckCircle2, 
  ExternalLink,
  Award,
  Clock,
  Zap
} from 'lucide-react';

interface MentorshipViewProps {
  user: User;
  setUser: (user: User) => void;
}

export const MentorshipView: React.FC<MentorshipViewProps> = ({ user, setUser }) => {
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<Partial<User> | null>(null);
  const [mentors, setMentors] = useState<Partial<User>[]>(MOCK_MENTORS);
  const [sessions, setSessions] = useState<MentorshipSession[]>(MOCK_SESSIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBecomeMentor = (mentorData: Partial<User>) => {
    const updatedUser = { ...user, ...mentorData };
    setUser(updatedUser);
    setIsMentorModalOpen(false);
    if (!mentors.find(m => m.id === user.id)) {
      setMentors([updatedUser, ...mentors]);
    }
  };

  const handleBookSessionClick = (mentor: Partial<User>) => {
    setSelectedMentor(mentor);
    setIsBookModalOpen(true);
  };

  const handleBookSessionSubmit = (sessionData: Partial<MentorshipSession>) => {
    const newSession: MentorshipSession = {
      ...sessionData,
      id: `s${sessions.length + 1}`,
    } as MentorshipSession;
    
    setSessions([newSession, ...sessions]);
    setIsBookModalOpen(false);
    setSelectedMentor(null);
  };

  const filteredMentors = mentors.filter(m => 
    m.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.skills?.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Mentorship Hub</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Exchange proof-of-work knowledge for career growth</p>
        </div>
        <div className="flex items-center space-x-3">
          {!user.isMentor ? (
            <Button onClick={() => setIsMentorModalOpen(true)} className="rounded-2xl px-6 py-4 bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-100 dark:shadow-none border-none font-black uppercase tracking-widest text-xs">
              <PlusCircle size={20} className="mr-2" /> Enable Mentorship Profile
            </Button>
          ) : (
            <div className="flex items-center bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-6 py-4 rounded-2xl border border-emerald-100 dark:border-emerald-900/50 font-black text-sm shadow-sm shadow-emerald-50 dark:shadow-none">
              <CheckCircle2 size={18} className="mr-2" /> Earning as Mentor
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Feed: Discovery */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-900 dark:from-indigo-800 dark:to-slate-900 p-8 rounded-[2.5rem] text-white overflow-hidden relative shadow-xl shadow-indigo-100 dark:shadow-none mb-4">
             <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
             <div className="relative z-10">
               <h2 className="text-2xl font-black mb-2 flex items-center">
                 <Zap className="text-amber-400 fill-amber-400 mr-2" size={24} /> 
                 Fast-Track Learning
               </h2>
               <p className="text-indigo-100 font-medium max-w-md opacity-90 leading-relaxed">
                 Don't wait for interviews. Get direct architecture feedback from engineers at India's top unicorns.
               </p>
             </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-600 dark:group-focus-within:text-indigo-400 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Filter mentors by expertise (e.g. System Design, React Performance)" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-sm focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 dark:focus:border-indigo-500/30 dark:focus:ring-indigo-500/5 outline-none transition-all text-lg font-medium dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMentors.map(mentor => (
              <div key={mentor.id} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <img src={mentor.avatar} className="w-16 h-16 rounded-2xl object-cover shadow-sm border-2 border-white dark:border-slate-800 group-hover:scale-110 transition-transform duration-500" alt="" />
                    <div>
                      <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 leading-tight">{mentor.name}</h3>
                      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-black uppercase tracking-widest mt-1">{mentor.headline}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-amber-500 font-black bg-amber-50 dark:bg-amber-950/30 px-2 py-1 rounded-lg border border-amber-100 dark:border-amber-900/50">
                    <Star size={14} className="fill-amber-500 mr-1" /> {mentor.mentorRating}
                  </div>
                </div>

                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 line-clamp-2 font-medium leading-relaxed">
                  {mentor.mentorBio}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {mentor.skills?.slice(0, 3).map(skill => (
                    <span key={skill} className="px-3 py-1 bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-wider rounded-lg border border-slate-100 dark:border-slate-700">
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none mb-1">Fee per Slot</span>
                    <span className="text-xl font-black text-slate-900 dark:text-slate-100">
                      {mentor.mentorPrice === 0 ? <span className="text-emerald-600 dark:text-emerald-400">FREE</span> : `₹${mentor.mentorPrice}`}
                    </span>
                  </div>
                  <Button 
                    onClick={() => handleBookSessionClick(mentor)}
                    className="rounded-2xl px-6 font-black uppercase tracking-widest text-xs shadow-indigo-100 dark:shadow-none border-none bg-indigo-600 hover:bg-indigo-700"
                  >
                    Book Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar: My Schedule */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100 mb-6 flex items-center">
              <CalendarClock size={22} className="mr-3 text-indigo-600 dark:text-indigo-400" /> My Sessions
            </h3>
            
            <div className="space-y-6">
              {sessions.filter(s => s.status === 'upcoming').length > 0 ? (
                sessions.filter(s => s.status === 'upcoming').map(session => (
                  <div key={session.id} className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-900/50 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black bg-indigo-600 dark:bg-indigo-700 text-white px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm shadow-indigo-100 dark:shadow-none">
                        {session.date}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center">
                        <Clock size={12} className="mr-1" /> {session.time}
                      </span>
                    </div>
                    <h4 className="font-black text-slate-900 dark:text-slate-100 mb-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{session.topic}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mb-6">with {session.mentorName}</p>
                    
                    <a 
                      href={session.meetingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-4 bg-white dark:bg-slate-900 border-2 border-indigo-600 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-700 hover:text-white transition-all shadow-sm"
                    >
                      <Video size={16} className="mr-2" /> Launch Meeting <ExternalLink size={14} className="ml-2" />
                    </a>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 opacity-40">
                  <Video size={48} className="mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                  <p className="text-xs text-slate-400 dark:text-slate-600 font-black uppercase tracking-[0.2em]">No scheduled syncs</p>
                </div>
              )}
            </div>
            
            <Button variant="outline" className="w-full mt-6 rounded-2xl font-black text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 border-slate-200 dark:border-slate-700 uppercase tracking-widest text-[10px] py-4">
              View History
            </Button>
          </div>

          <div className="bg-slate-900 dark:bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200 dark:shadow-none transition-colors duration-300">
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl"></div>
             <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-white/10 rounded-xl shadow-lg"><Award size={24} className="text-indigo-400" /></div>
                <h3 className="text-lg font-black tracking-tight">Master Builder Status</h3>
             </div>
             <p className="text-slate-400 text-sm font-medium mb-6 leading-relaxed opacity-80">
               Experienced engineers (internships or job experience) can earn by mentoring students. Top mentors get verified badges.
             </p>
             <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                   {[1,2,3].map(i => (
                     <img key={i} src={`https://ui-avatars.com/api/?background=random&name=${i}`} className="w-9 h-9 rounded-full border-2 border-slate-900 dark:border-slate-800 shadow-xl" alt="" />
                   ))}
                </div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-black uppercase tracking-widest">Joined by 1.2k+ Builders</span>
             </div>
          </div>
        </div>
      </div>

      <BecomeMentorModal 
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        onSubmit={handleBecomeMentor}
        currentUser={user}
      />

      <BookSessionModal 
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
        onSubmit={handleBookSessionSubmit}
        mentor={selectedMentor}
        currentUser={user}
      />
    </div>
  );
};