import React from 'react';
import { Code, GraduationCap, Lightbulb, Target } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="text-blue-600 dark:text-blue-400 mb-3">
              <GraduationCap size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Education</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Recent graduate with a strong foundation in computer science and software development.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="text-blue-600 dark:text-blue-400 mb-3">
              <Code size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Technical Skills</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Proficient in modern web technologies and eager to learn new frameworks and tools.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
            <div className="text-blue-600 dark:text-blue-400 mb-3">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Career Goals</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Seeking opportunities to apply my knowledge and grow as a software developer.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white dark:bg-gray-700 p-8 rounded-lg shadow-md">
          <div className="flex items-center mb-6">
            <div className="text-blue-600 dark:text-blue-400 mr-4">
              <Lightbulb size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">My Journey</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            As a recent graduate, I bring fresh perspectives and up-to-date knowledge in software development. 
            I'm passionate about creating efficient, user-friendly applications and continuously expanding my skill set. 
            My academic projects have given me hands-on experience with various technologies, and I'm excited to 
            apply this knowledge in a professional setting. I'm particularly interested in Software development 
            and always eager to learn new technologies and best practices.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;