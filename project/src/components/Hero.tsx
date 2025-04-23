import React, { useState, useEffect } from 'react';
import { Download, Github as GitHub, Linkedin, Twitter } from 'lucide-react';
import profileImage from '../assets/2122000117_Walvekar_prathamesh_shivanand.jpg';

const Hero: React.FC = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrases = ['Software Engineer', 'Full Stack Developer', 'Machine Learning Engineer', 'Problem Solver'];

  useEffect(() => {
    const currentPhrase = phrases[index];
    let timeout: number;

    if (!isDeleting && text === currentPhrase) {
      // Pause at the end of typing
      timeout = window.setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === '') {
      // Move to next phrase after deleting
      setIsDeleting(false);
      setIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    } else {
      // Typing or deleting
      const delta = isDeleting ? -1 : 1;
      timeout = window.setTimeout(() => {
        setText(currentPhrase.substring(0, text.length + delta));
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeout);
  }, [text, index, isDeleting, phrases]);

  const handleDownload = () => {
    // Open the resume in a new tab
    window.open('https://drive.google.com/file/d/1SkcMrWHCO2RDTS9hDbNuge9FsNZ7k2MY/view?usp=sharing', '_blank');
  };

  return (
    <section 
      id="home"
      className="min-h-screen pt-24 pb-16 flex items-center relative overflow-hidden bg-white dark:bg-gray-900"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 -z-10"></div>
      
      {/* Background pattern/mesh */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.4"%3E%3Cpath d="M0 0h20L0 20z"/%3E%3C/g%3E%3C/svg%3E")',
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <p className="text-xl text-blue-600 dark:text-blue-400 font-medium">Hello, I'm</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
            Prathamesh Walvekar
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 h-10">
            {text}<span className="animate-blink">|</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            I build exceptional and accessible digital experiences for the web. Passionate about creating beautiful, functional, and user-friendly websites.
          </p>
          
          <div className="flex gap-4 justify-center md:justify-start">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-1"
            >
              Contact Me
            </a>
            <button 
              onClick={handleDownload}
              className="px-6 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-md hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2 hover:shadow-md transform hover:-translate-y-1"
            >
              <Download size={18} />
              Resume
            </button>
          </div>
          
          <div className="pt-4 flex gap-6 justify-center md:justify-start">
            <a 
              href="https://github.com/prathamesh177" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors transform hover:-translate-y-1" 
              aria-label="GitHub"
            >
              <GitHub size={24} />
            </a>
            <a 
              href="https://www.linkedin.com/in/prathamesh-walvekar-53310524b/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors transform hover:-translate-y-1" 
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
            <img 
              src={profileImage}
              alt="Prathamesh Walvekar" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-t from-blue-600/30 to-transparent"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a 
          href="#about" 
          className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;