import React from 'react';
import { Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: number;
  title: string;
  location: string;
  description: string;
  date: string;
  icon: 'work' | 'education';
}

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const words = text.split(' ');
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-1"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Experience: React.FC = () => {
  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      title: "SDE Intern",
      location: "GrapplTech (Remote)",
      description: "Software Development Engineering Intern",
      date: "Jun 2024 - July 2024",
      icon: 'work'
    },
    {
      id: 2,
      title: "SDE Intern",
      location: "Quantbit Technologies PVT LTD",
      description: "Software Development Engineering Intern",
      date: "2024",
      icon: 'work'
    },
    {
      id: 3,
      title: "Freelancing Web Developer",
      location: "Remote",
      description: "Developing and maintaining web applications for clients",
      date: "2024",
      icon: 'work'
    },
    {
      id: 4,
      title: "B.Tech in Computer Science and Engineering (Data Science)",
      location: "KIT's College Of Engineering, Kolhapur, Maharashtra",
      description: "• Cumulative GPA: 8.1/10.0\n• Relevant Coursework: Machine Learning, Deep Learning, Probability and Applied Statistics, Data Structure and Algorithms, Natural Language Processing, Operating System, Computer Networks, Database Management System",
      date: "Dec 2021 - July 2025",
      icon: 'education'
    },
    {
      id: 5,
      title: "B.Tech (Hons.) in Cyber Security",
      location: "KIT's College Of Engineering, Kolhapur, Maharashtra",
      description: "Relevant Coursework: Cryptography, Information Security, Ethical Hacking, Blockchain Technology",
      date: "Dec 2022 - July 2025",
      icon: 'education'
    }
  ];

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800 min-h-screen relative">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Experience & Education
          </h2>
          <div className="w-32 h-1.5 bg-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-6 max-w-2xl mx-auto text-lg font-medium">
            My professional journey and educational background.
          </p>
        </motion.div>
        
        {/* Timeline Container */}
        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-0.5 bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
          
          {/* Timeline Items */}
          <div className="relative z-10">
            {timelineItems.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="mb-24 relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className={`flex items-center justify-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  {/* Content */}
                  <div className="w-[calc(50%-2rem)]">
                    <motion.div 
                      className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-blue-900/20 transition-all duration-300 border border-gray-200 dark:border-gray-600 hover:border-blue-500/50 transform hover:-translate-y-1"
                      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <TypewriterText text={item.title} delay={0.4} />
                      <motion.div 
                        className="text-blue-600 dark:text-blue-400 font-medium mb-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                      >
                        {item.location}
                      </motion.div>
                      <TypewriterText text={item.description} delay={0.8} />
                      <motion.div 
                        className="text-sm text-gray-500 dark:text-gray-400 font-medium border-t border-gray-200 dark:border-gray-600 pt-3"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1 }}
                      >
                        {item.date}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Center icon */}
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.3)] border-2 border-blue-400 mx-8 z-20 hover:scale-110 transition-transform duration-300"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      delay: 0.5
                    }}
                  >
                    {item.icon === 'work' ? (
                      <Briefcase size={24} className="text-white drop-shadow-lg" />
                    ) : (
                      <GraduationCap size={24} className="text-white drop-shadow-lg" />
                    )}
                  </motion.div>

                  {/* Empty space for opposite side */}
                  <div className="w-[calc(50%-2rem)]"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;