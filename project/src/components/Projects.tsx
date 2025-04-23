import React, { useState } from 'react';
import { ExternalLink, Github, Brain, Database, Globe } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  category: string;
}

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const projects: Project[] = [
    {
      id: 1,
      title: "Dermato-AI",
      description: "AI-powered dermatological disease prediction system using machine learning for accurate skin condition diagnosis.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",

      tags: ["AI/ML", "Healthcare", "Deep Learning", "React"],
      liveUrl: "https://dermatoai.vercel.app/",
      repoUrl: "https://github.com/prathamesh177/Dermato-AI",
      category: "ai"
    },
    {
      id: 2,
      title: "Number Plate Detection",
      description: "Real-time number plate detection and recognition using YOLO and computer vision techniques.",
      image: "https://mobisoftinfotech.com/resources/wp-content/uploads/2022/02/og-Number-Plate-Detection.png",
      tags: ["Python", "YOLO", "OpenCV", "Computer Vision"],
      liveUrl: "#",
      repoUrl: "https://github.com/prathamesh177/Number-Plate",
      category: "ai"
    },
    {
      id: 3,
      title: "Google Gemini Clone",
      description: "A clone of Google's Gemini AI interface with similar functionality and user experience.",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",

      tags: ["React", "AI", "Chat Interface", "Modern UI"],
      liveUrl: "#",
      repoUrl: "https://github.com/prathamesh177/gemini",
      category: "web"
    },
    {
      id: 4,
      title: "Transaction Dashboard",
      description: "Interactive dashboard for tracking and analyzing financial transactions with real-time updates.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      tags: ["React", "Dashboard", "Data Visualization", "Finance"],
      liveUrl: "https://prathamesh-task.vercel.app/",
      repoUrl: "https://github.com/prathamesh177/Transaction-DashBoard",
      category: "web"
    },
    {
      id: 5,
      title: "Student Progress Tracker",
      description: "Comprehensive platform for tracking and analyzing student academic progress and performance.",
      image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Education", "Analytics", "Progress Tracking", "Web App"],
      liveUrl: "https://edumetricsbynextin.netlify.app/",
      repoUrl: "https://github.com/prathamesh177/Evalpro",
      category: "web"
    },
    {
      id: 6,
      title: "Spotify Clone",
      description: "A feature-rich music streaming platform clone with similar functionality to Spotify.",
      image: "https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=600",
      tags: ["Music", "Streaming", "React", "Modern UI"],
      liveUrl: "#",
      repoUrl: "https://github.com/prathamesh177/SpotifyClone",
      category: "web"
    },
    {
      id: 7,
      title: "Cyber Criminal Data Analysis",
      description: "Comprehensive analysis of cyber criminal activities using data science techniques to identify patterns and trends in cybercrime.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80",
      tags: ["Data Science", "Cybersecurity", "Analytics", "Python"],
      liveUrl: "#",
      repoUrl: "#",
      category: "data"
    },
    {
      id: 8,
      title: "Multilingual Video Call System",
      description: "Advanced video conferencing platform with real-time translation, screen sharing, chat, and recording capabilities supporting multiple languages.",
      image: "https://www.ringcentral.com/content/dam/rc-www/gb/hero-image/employees-conference-call.jpg",
      tags: ["WebRTC", "Real-time Translation", "Video Conferencing", "React"],
      liveUrl: "#",
      repoUrl: "#",
      category: "web"
    }
  ];

  const filters = [
    { label: 'All', value: 'all', icon: Globe },
    { label: 'AI/ML', value: 'ai', icon: Brain },
    { label: 'Data Science', value: 'data', icon: Database },
    { label: 'Web Apps', value: 'web', icon: Globe }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            A showcase of my work in AI, Web Development, and Data Science.
          </p>
        </div>
        
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white dark:bg-gray-700 rounded-lg p-1 shadow-md">
            {filters.map((filter) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.value}
                  className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${
                    activeFilter === filter.value
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                  }`}
                  onClick={() => setActiveFilter(filter.value)}
                >
                  <Icon size={16} />
                  {filter.label}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition-transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <a 
                    href={project.liveUrl} 
                    className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-1">Live Demo</span>
                    <ExternalLink size={16} />
                  </a>
                  <a 
                    href={project.repoUrl} 
                    className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="mr-1">Code</span>
                    <Github size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;