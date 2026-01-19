
import React from 'react';
import { FolderGit2, Github, ExternalLink, ShieldCheck, Users, Code2 } from 'lucide-react';
import { Project } from '../types';
import { Button } from './Button';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] hover:shadow-2xl dark:hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 group">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-6">
        <div className="flex items-center space-x-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-2xl shadow-sm group-hover:scale-110 transition-transform duration-300">
            <FolderGit2 size={28} />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{project.title}</h3>
            <p className="text-sm font-medium text-slate-400 dark:text-slate-500 mt-1 flex items-center">
              by <span className="text-slate-600 dark:text-slate-300 ml-1 font-bold">{project.ownerName}</span> 
              <span className="mx-2">•</span> 
              {project.createdAt}
            </p>
          </div>
        </div>
        {project.verified && (
          <div className="flex items-center text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-widest border border-emerald-100 dark:border-emerald-900/50 shadow-sm">
            <ShieldCheck size={14} className="mr-2" />
            Verified Proof
          </div>
        )}
      </div>
      
      <p className="text-slate-600 dark:text-slate-400 mb-8 line-clamp-2 leading-relaxed text-base font-medium">{project.description}</p>
      
      <div className="flex flex-wrap gap-2.5 mb-8">
        {project.techStack.map(tech => (
          <span key={tech} className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-bold rounded-xl border border-slate-100 dark:border-slate-700 flex items-center">
            <Code2 size={12} className="mr-2 opacity-50" /> {tech}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-6 text-slate-400 text-sm">
          <div className="flex items-center group/stat cursor-help">
            <div className="p-1.5 rounded-lg group-hover/stat:bg-indigo-50 dark:group-hover/stat:bg-indigo-950/30 transition-colors mr-2">
              <Users size={18} className="group-hover/stat:text-indigo-500 dark:group-hover/stat:text-indigo-400" />
            </div>
            <span className="font-bold text-slate-600 dark:text-slate-400">{project.contributorsCount}</span>
          </div>
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center font-bold text-slate-600 dark:text-slate-400 transition-colors"
            >
              <Github size={18} className="mr-2" /> Code
            </a>
          )}
        </div>
        <div className="flex gap-2">
           <Button variant="ghost" size="sm" className="rounded-xl font-bold text-indigo-600 dark:text-indigo-400">
             Details
           </Button>
           <Button variant="outline" size="sm" className="rounded-xl border-slate-200 dark:border-slate-700 dark:text-slate-300 shadow-sm font-bold">
             Collaborate <ExternalLink size={14} className="ml-2" />
           </Button>
        </div>
      </div>
    </div>
  );
};