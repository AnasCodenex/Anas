
import React, { useState } from 'react';
import { User } from '../types';
import { Button } from '../components/Button';
import { User as UserIcon, Bell, Lock, Shield, CreditCard, ChevronRight } from 'lucide-react';

interface SettingsViewProps {
  user: User;
  setUser: (user: User) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, setUser }) => {
  const [activeTab, setActiveTab] = useState<'GENERAL' | 'SECURITY' | 'NOTIFICATIONS' | 'BILLING'>('GENERAL');

  return (
    <div className="p-6 lg:p-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Account Settings</h1>
        <p className="text-slate-500">Manage your profile information and account preferences</p>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Settings Navigation */}
        <div className="md:w-64 space-y-1">
          <button 
            onClick={() => setActiveTab('GENERAL')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'GENERAL' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <div className="flex items-center">
              <UserIcon size={20} className="mr-3" />
              <span className="font-semibold text-sm">General</span>
            </div>
            <ChevronRight size={16} className={activeTab === 'GENERAL' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button 
            onClick={() => setActiveTab('SECURITY')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'SECURITY' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <div className="flex items-center">
              <Lock size={20} className="mr-3" />
              <span className="font-semibold text-sm">Security</span>
            </div>
            <ChevronRight size={16} className={activeTab === 'SECURITY' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button 
            onClick={() => setActiveTab('NOTIFICATIONS')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'NOTIFICATIONS' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <div className="flex items-center">
              <Bell size={20} className="mr-3" />
              <span className="font-semibold text-sm">Notifications</span>
            </div>
            <ChevronRight size={16} className={activeTab === 'NOTIFICATIONS' ? 'opacity-100' : 'opacity-0'} />
          </button>
          <button 
            onClick={() => setActiveTab('BILLING')}
            className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all ${activeTab === 'BILLING' ? 'bg-white shadow-sm border border-slate-200 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
          >
            <div className="flex items-center">
              <CreditCard size={20} className="mr-3" />
              <span className="font-semibold text-sm">Billing</span>
            </div>
            <ChevronRight size={16} className={activeTab === 'BILLING' ? 'opacity-100' : 'opacity-0'} />
          </button>
        </div>

        {/* Main Form Area */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
            {activeTab === 'GENERAL' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center space-x-6 mb-8">
                  <img src={user.avatar} className="w-20 h-20 rounded-2xl object-cover" alt="" />
                  <Button variant="outline">Change Avatar</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Public Email</label>
                    <input 
                      type="email" 
                      defaultValue={user.email} 
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">Bio</label>
                    <textarea 
                      rows={4}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <Button className="rounded-xl px-8 shadow-indigo-100">Save Changes</Button>
                </div>
              </div>
            )}

            {activeTab === 'SECURITY' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold mb-4">Password & Access</h3>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">Current Password</label>
                   <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 mb-2">New Password</label>
                   <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                </div>
                <div className="pt-4">
                  <Button variant="danger" className="rounded-xl">Update Password</Button>
                </div>
              </div>
            )}

            {activeTab === 'NOTIFICATIONS' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <h3 className="text-lg font-bold mb-6">Preferences</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Job Recommendations', desc: 'Get notified when a new hiring sprint matches your proof-of-work.' },
                    { label: 'Mentorship Requests', desc: 'Alerts for scheduled or requested mentor sessions.' },
                    { label: 'Community Mentions', desc: 'Someone tagged you in a community project discussion.' }
                  ].map(pref => (
                    <div key={pref.label} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-bold text-slate-800">{pref.label}</p>
                        <p className="text-sm text-slate-500">{pref.desc}</p>
                      </div>
                      <div className="w-12 h-6 bg-indigo-600 rounded-full flex items-center justify-end px-1 cursor-pointer transition-colors">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'BILLING' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="bg-indigo-600 text-white p-6 rounded-2xl flex items-center justify-between mb-8 shadow-lg shadow-indigo-200">
                  <div>
                    <p className="text-indigo-200 text-xs font-bold uppercase tracking-widest mb-1">Current Plan</p>
                    <p className="text-2xl font-black">Free Tier</p>
                  </div>
                  <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">Upgrade</Button>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-4">Payment Methods</h3>
                <div className="p-4 border border-slate-200 rounded-2xl flex items-center text-slate-500 italic">
                  No payment methods added.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
