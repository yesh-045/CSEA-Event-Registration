import React, { useState } from 'react';
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import cseaLogo from '../assets/CSEAlogo.png';
import PSGLogo from '../assets/PSG Logo.png'




// Floating particles background
const FloatingParticle = ({ index }) => {
  const randomDelay = Math.random() * 2;
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-white/10"
      initial={{ 
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight 
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.sin(index) * 20, 0],
        scale: [1, 1.2, 1],
        opacity: [0.2, 0.5, 0.2]
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: randomDelay
      }}
    />
  );
};

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-black"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundSize: '200% 200%'
        }}
      />
      {[...Array(50)].map((_, i) => (
        <FloatingParticle key={i} index={i} />
      ))}
    </div>
  );
};

// Enhanced card component with interactive hover effects
const AnimatedCard = ({ title, description, buttonText }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 h-full border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 35px -5px rgb(0 0 0 / 0.3)",
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-purple-500/20"
        animate={{
          x: isHovered ? ['100%', '-100%'] : '100%',
        }}
        transition={{
          duration: 1.5,
          ease: "linear",
          repeat: isHovered ? Infinity : 0,
        }}
      />
      <div className="relative z-10">
        <motion.h3 
          className="text-2xl font-bold mb-4 text-white"
          animate={{ color: isHovered ? '#fff' : '#f0f0f0' }}
        >
          {title}
        </motion.h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-lg"
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
};

const Header = () => {
  return (
    <motion.header 
      className="w-full flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-1000 to-purple-600 backdrop-blur-md fixed top-0 z-20 shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-center space-x-4">
      <img src={PSGLogo} alt="PSG Logo" className="w-18 h-20" />
      <img src={cseaLogo} alt="CSEA Logo" className="w-16 h-17" />

        <h1 className="text-2xl font-semibold text-white">
          Computer Science and Engineering Association - PSG College of Technology
        </h1>
      </div>
      <nav className="text-white">
        <ul className="flex space-x-8">
          <li className="hover:text-blue-300 transition">Home</li>
          <li className="hover:text-blue-300 transition">About</li>
          <li className="hover:text-blue-300 transition"><a href ="/events/CodeRush/register">Events</a></li>
          <li className="hover:text-blue-300 transition">Contact</li>
        </ul>
      </nav>
    </motion.header>
  );
};

const HomePage = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

  return (
    <div className="min-h-screen relative pt-24">
      <Header />
      <AnimatedBackground />
      
      {/* Hero Section */}
      <motion.div 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{ opacity, y }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-6"
            animate={{ 
              backgroundPosition: ['0%', '100%', '0%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              backgroundSize: '200% auto',
            }}
          >
            CodeRush 2024
          </motion.h1>
        </motion.div>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          The ultimate coding challenge for 1st and 2nd-year students of CSE and CSE AIML at PSG Tech!
        </motion.p>
        
        <motion.button
          className="group relative bg-gradient-to-r from-blue-500 to-purple-500 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/events/CodeRush/register" className="relative z-10">Register Now</a>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.1 }}
          />
        </motion.button>
      </motion.div>

      {/* About Section */}
      <motion.section 
        className="py-20 px-4 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="bg-white/5 backdrop-blur-md rounded-3xl p-12 border border-white/10"
          whileHover={{ boxShadow: "0 30px 50px -15px rgb(0 0 0 / 0.3)" }}
        >
          <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-8 text-center">
            About CodeRush
          </h2>
          <p className="text-gray-200 text-lg mb-6 text-center leading-relaxed">
          “CODE RUSH” event is to test students on their problem solving skills and their skills in working as a team and their approach to the problem and understanding. 
<br/><br/>Round 1 : Code in constraints 
Teams will be given a problem statement and be asked to code with a set of constraints by facing challenges which will be given in between the development of the code. <br/><br/>
Round 2 : Code exchange challenge 
Teams will be given a new problem statement where they have to develop half of the code and we will swap the codes , so teams has to look on to others code (different problem statement) and continue the code to complete . This will enhance the code understanding ability of the participant. 

          </p>
          <p className="text-gray-200 text-lg text-center leading-relaxed">
            Team up with your peers (2-3 members) and tackle challenging coding problems in a test of 
            creativity, knowledge, and programming prowess.
          </p>
        </motion.div>
      </motion.section>

      {/* Cards Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedCard
            title="Previous Events"
            description="Discover the past events conducted by the CSEA and how CodeRush has evolved over the years."
            buttonText="View Past Events"
          />
          <AnimatedCard
            title="Ongoing Events"
            description="Stay updated with the current events happening in CSEA, including CodeRush."
            buttonText="Ongoing Events"
            href=""
          />
          <AnimatedCard
            title="Upcoming Events"
            description="Check out the upcoming events hosted by CSEA and start preparing early."
            buttonText="Upcoming Events"
          />
        </div>
      </section>

      {/* Footer */}
      <motion.footer 
        className="py-8 text-center text-gray-400 border-t border-white/10 backdrop-blur-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p>© 2024 Computer Science Engineering Association, PSG Tech. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default HomePage;

