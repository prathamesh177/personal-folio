import React, { useEffect, useState, useRef } from 'react';
import { motion, useAnimation, AnimationControls, useTransform, useSpring, useMotionValue, useInView } from 'framer-motion';
import { Brain, Database, Code, Terminal, BarChart as ChartBar, Network } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  color: string;
}

interface SkillCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  skills: string[];
}

// Custom hook for counting animation
const useCountUp = (end: number, duration: number = 2) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const steps = 30; // Reduced steps for more noticeable counting
  const stepDuration = (duration * 1000) / steps;
  const increment = end / steps;

  useEffect(() => {
    if (isInView) {
      let currentCount = 0;
      const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.round(currentCount));
        }
      }, stepDuration);

      return () => clearInterval(timer);
    }
  }, [isInView, end, increment, stepDuration]);

  return { count, ref };
};

const Skills: React.FC = () => {
  const technicalSkills: Skill[] = [
    { name: 'Java', level: 90, color: 'bg-red-600' },
    { name: 'Python', level: 70, color: 'bg-yellow-500' },
    { name: 'JavaScript/TypeScript', level: 85, color: 'bg-blue-600' },
    { name: 'C#', level: 65, color: 'bg-purple-600' },
    { name: 'Machine Learning', level: 85, color: 'bg-green-600' },
    { name: 'Data Science', level: 80, color: 'bg-blue-400' },
    { name: 'Web Development', level: 85, color: 'bg-indigo-600' },
    { name: 'Database Management', level: 80, color: 'bg-orange-600' },
  ];

  const skillCategories: SkillCategory[] = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI & Machine Learning',
      description: 'Advanced AI and ML expertise',
      skills: ['Machine Learning', 'Natural Language Processing', 'Exploratory Data Analysis', 'Gen-AI']
    },
    {
      icon: <ChartBar className="w-8 h-8" />,
      title: 'Data Science & Analytics',
      description: 'Comprehensive data analysis and visualization',
      skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'PowerBI']
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Frontend Development',
      description: 'Modern web development expertise',
      skills: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'TypeScript', 'JavaScript']
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Backend & Database',
      description: 'Full-stack development capabilities',
      skills: ['Node.js', 'Express.js', 'Flask', 'MongoDB', 'MySQL', 'C#']
    },
    {
      icon: <Network className="w-8 h-8" />,
      title: 'Enterprise Solutions',
      description: 'Business application development',
      skills: ['Frappe', 'ERPNEXT', 'Java', 'Python']
    },
    {
      icon: <Terminal className="w-8 h-8" />,
      title: 'Development Tools',
      description: 'Professional development workflow',
      skills: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook']
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 overflow-hidden">
      <motion.div 
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Expertise
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Specialized in AI, Data Science, and Full Stack Development with a focus on building intelligent and scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Core Competencies</h3>
            <div className="space-y-6">
              {technicalSkills.map((skill, index) => {
                const { count, ref } = useCountUp(skill.level, 2);
                return (
                  <motion.div 
                    key={skill.name}
                    ref={ref}
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                      <span className="text-gray-700 dark:text-gray-300 font-bold transition-colors duration-300">
                        {count}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div 
                        className={`${skill.color} h-2.5 rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { title: 'Personal Projects', value: 10 },
              { title: 'Technical Skills', value: 15 },
              { title: 'Certifications', value: 5 },
              { title: 'Learning Hours', value: 500 }
            ].map((stat, index) => {
              const { count, ref } = useCountUp(stat.value, 2);
              return (
                <motion.div
                  key={stat.title}
                  ref={ref}
                  variants={itemVariants}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center group hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div 
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                  >
                    <span className="transition-colors duration-300">{count}</span>+
                  </motion.div>
                  <div className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {stat.title}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {skillCategories.map((category, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg shadow-lg group hover:bg-blue-50 dark:hover:bg-blue-900/20"
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="text-blue-600 dark:text-blue-400 mb-4 group-hover:text-blue-700 dark:group-hover:text-blue-300"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                {category.icon}
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-700 dark:group-hover:text-blue-300">
                {category.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span 
                    key={skillIndex}
                    className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-20 text-center"
          variants={containerVariants}
        >
          <motion.h3 
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-8"
            variants={itemVariants}
          >
            Tools & Technologies
          </motion.h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {[
              { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg' },
              { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
              { name: 'Frappe', icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8af8iw4kSGzCF9olL-kXPLN8uzHA6QFH8CA&s' },
              { name: 'ERPNEXT', icon: 'data:image/png;base64,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' },
            ].map((tech, index) => (
              <motion.div 
                key={tech.name}
                variants={itemVariants}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md flex flex-col items-center justify-center group hover:bg-blue-50 dark:hover:bg-blue-900/20"
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <motion.img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-12 h-12 mb-3 group-hover:transform group-hover:scale-110 transition-transform"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <h4 className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {tech.name}
                </h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;