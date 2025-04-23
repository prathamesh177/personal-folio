import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-white text-4xl font-bold">
          <span className="inline-block animate-pulse">P</span>
          <span className="inline-block animate-pulse delay-100">o</span>
          <span className="inline-block animate-pulse delay-200">r</span>
          <span className="inline-block animate-pulse delay-300">t</span>
          <span className="inline-block animate-pulse delay-400">f</span>
          <span className="inline-block animate-pulse delay-500">o</span>
          <span className="inline-block animate-pulse delay-600">l</span>
          <span className="inline-block animate-pulse delay-700">i</span>
          <span className="inline-block animate-pulse delay-800">o</span>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <ThemeToggle />
        <Cursor />
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;