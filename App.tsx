
import React, { useState, useEffect } from 'react';
import { User, UserRole, AppView } from './types';
import { Landing } from './views/Landing';
import { Auth } from './views/Auth';
import { EngineerDashboard } from './views/EngineerDashboard';
import { RecruiterDashboard } from './views/RecruiterDashboard';
import { ProfileView } from './views/ProfileView';
import { SettingsView } from './views/SettingsView';
import { JobsView } from './views/JobsView';
import { MentorshipView } from './views/MentorshipView';
import { NAVBAR_LINKS } from './constants';
import { Bell, Search, LogOut, Code2, Menu, X, Sun, Moon } from 'lucide-react';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [activeRole, setActiveRole] = useState<UserRole | null>(null);
  const [authStage, setAuthStage] = useState<'LANDING' | 'AUTH' | 'APP'>('LANDING');
  const [currentView, setCurrentView] = useState<AppView>('DASHBOARD');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleStart = (role: 'ENGINEER' | 'RECRUITER') => {
    setActiveRole(role as UserRole);
    setAuthStage('AUTH');
  };

  const handleAuthSuccess = (user: User) => {
    setCurrentUser(user);
    setAuthStage('APP');
    setCurrentView('DASHBOARD');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveRole(null);
    setAuthStage('LANDING');
  };

  const navigateTo = (view: string) => {
    const v = view.toUpperCase() as AppView;
    setCurrentView(v);
    setIsSidebarOpen(false);
  };

  if (authStage === 'LANDING') {
    return <Landing onStart={handleStart} />;
  }

  if (authStage === 'AUTH' && activeRole) {
    return <Auth role={activeRole} onBack={() => setAuthStage('LANDING')} onSuccess={handleAuthSuccess} />;
  }

  if (authStage === 'APP' && currentUser) {
    const navLinks = NAVBAR_LINKS[currentUser.role];

    const renderView = () => {
      switch (currentView) {
        case 'DASHBOARD':
          return currentUser.role === UserRole.ENGINEER ? <EngineerDashboard user={currentUser} /> : <RecruiterDashboard user={currentUser} />;
        case 'PROFILE':
          return <ProfileView user={currentUser} setUser={setCurrentUser} />;
        case 'SETTINGS':
          return <SettingsView user={currentUser} setUser={setCurrentUser} />;
        case 'JOBS':
        case 'OPPORTUNITIES':
          return <JobsView user={currentUser} />;
        case 'MENTORSHIP':
          return <MentorshipView user={currentUser} setUser={setCurrentUser} />;
        default:
          return (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-600">
              <Code2 size={48} className="mb-4 opacity-20" />
              <p className="text-lg font-medium">{currentView} view is under construction.</p>
            </div>
          );
      }
    };

    return (
      <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans transition-colors duration-300">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 dark:bg-slate-900 text-white transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          flex flex-col border-r border-slate-800 dark:border-slate-800
        `}>
          <div className="p-6 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                <Code2 className="text-white" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight">DevProof</span>
            </div>
            <button className="lg:hidden text-slate-400" onClick={() => setIsSidebarOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex-1 py-8 px-4 space-y-2 overflow-y-auto hide-scrollbar">
            {navLinks.map((link) => {
              const isActive = currentView === link.name.toUpperCase() || 
                               (currentView === 'DASHBOARD' && (link.name === 'Home' || link.name === 'Overview')) ||
                               (currentView === 'JOBS' && link.name === 'Opportunities') ||
                               (currentView === 'MENTORSHIP' && link.name === 'Mentorship');
              return (
                <button 
                  key={link.name} 
                  onClick={() => navigateTo(link.name === 'Home' || link.name === 'Overview' ? 'DASHBOARD' : link.name === 'Opportunities' ? 'JOBS' : link.name)}
                  className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} transition-colors`}>
                    {link.icon}
                  </span>
                  <span className="font-semibold text-sm tracking-wide">{link.name}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white" />}
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-slate-800 bg-slate-900/50 backdrop-blur">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/5 rounded-xl transition-all"
            >
              <LogOut size={20} />
              <span className="font-semibold text-sm">Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          {/* Header */}
          <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30 transition-colors duration-300">
            <div className="flex items-center">
               <button 
                 className="p-2 mr-4 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg lg:hidden"
                 onClick={() => setIsSidebarOpen(true)}
               >
                 <Menu size={24} />
               </button>
               <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 hidden sm:block">
                 {currentView.charAt(0) + currentView.slice(1).toLowerCase()}
               </h2>
            </div>
            
            <div className="hidden md:flex items-center max-w-md w-full relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search projects, skills or mentors..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 dark:bg-slate-800/50 border border-transparent dark:border-slate-700 rounded-2xl focus:bg-white dark:focus:bg-slate-800 focus:border-indigo-500/30 dark:focus:border-indigo-500/30 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all dark:text-slate-100"
              />
            </div>

            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleTheme}
                className="p-2.5 text-slate-400 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-all relative"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button className="p-2.5 text-slate-400 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-xl transition-all relative">
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900"></span>
              </button>
              
              <button 
                onClick={() => setCurrentView('PROFILE')}
                className="flex items-center space-x-3 group pl-2 py-1 pr-1 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-2xl transition-all"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">{currentUser.name}</p>
                  <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider opacity-80">
                    {currentUser.role}
                  </p>
                </div>
                <div className="relative">
                  <img src={currentUser.avatar} alt="Profile" className="w-10 h-10 rounded-xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 group-hover:ring-indigo-100 dark:group-hover:ring-indigo-900 transition-all shadow-sm" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                </div>
              </button>
            </div>
          </header>

          {/* View Dashboard */}
          <div className="flex-1 overflow-y-auto hide-scrollbar bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300">
            {renderView()}
          </div>
        </main>
      </div>
    );
  }

  return null;
};

export default App;