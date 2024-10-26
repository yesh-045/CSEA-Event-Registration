import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

import { Trophy, Users, Zap, Brain, Star, Code,  Target } from 'lucide-react';
import PSGLogo from '../assets/PSG Logo.png';
import cseaLogo from '../assets/CSEAlogo.png';
import eventLogo from '../assets/Black_Yellow_Bold_Minimalist_Technology_Expo_Event_Poster-removebg-preview.png';
import gsap from 'gsap'; 
import ScrollTrigger from 'gsap/ScrollTrigger';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);


const Header = ({ scrollDirection, hasReachedRegister }) => (
  <motion.header 
    className="w-full flex flex-col md:flex-row items-center justify-between px-6 py-3 bg-gradient-to-r from-red-900/90 to-amber-800/90 backdrop-blur-md fixed top-0 z-20 shadow-lg"
    initial={{ y: 0 }}
    animate={{ y: hasReachedRegister && scrollDirection === 'down' ? -100 : 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex items-center space-x-4">
      <img src={PSGLogo} alt="PSG Logo" className="w-10 h-auto md:w-8 md:h-auto" />
      <img src={cseaLogo} alt="CSEA Logo" className="w-10 h-auto md:w-8 md:h-auto" />
    </div>
    <nav className="text-amber-100 mt-2 md:mt-0">
      <ul className="flex flex-wrap items-center justify-center space-x-6">
        <li className="hover:text-amber-300 transition font-bold text-lg"><a href="/">Home</a></li>
        <li className="hover:text-amber-300 transition font-bold text-lg"><a href="#about">About</a></li>
        <li className="hover:text-amber-300 transition font-bold text-lg"><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  </motion.header>
);

const HeroSection = ({ y, registerButtonRef }) => {
  useEffect(() => {
    const text = document.querySelector('.hero-text');
    const chars = text.textContent.split('');
    text.textContent = '';
    chars.forEach(char => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      text.appendChild(span);
    });

    const tl = gsap.timeline();
    tl.fromTo(text.children, 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0,
        duration: 0.05,
        stagger: 0.03,
        ease: 'power3.out'
      }
    );
  }, []);

  return (
    <motion.div 
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
      style={{ y }}
    >
      <motion.img 
        src={eventLogo}
        alt="Event Logo"
        className="w-full max-w-2xl mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        style={{ filter: 'contrast(1.2) brightness(1.1)' }}
      />
      
      <motion.p 
          className="hero-text text-xl md:text-xl text-amber-100 mb-8 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ 
            fontFamily: 'monospace', 
            textShadow: '0 0 10px rgba(0, 255, 0, 0.7)',
            filter: 'contrast(1.5) saturate(1.2)'
          }}
        >
          Race   Time, Code    Clean, Seize    the    Win!
        </motion.p>
      
      <motion.button
        ref={registerButtonRef}
        className="group relative bg-gradient-to-r from-amber-500 to-red-500 text-white px-12 py-5 rounded-full text-xl font-semibold overflow-hidden"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <a href="/events/CodeRush/register" className="relative z-10">Register Now </a>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600"
          initial={{ x: '100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>
    </motion.div>
  );
};

const AboutSection = ({ registerButtonRef2 }) => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const cards = cardRefs.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: 'power3.out',
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    cards.forEach((card) => {
      if (card) {
        gsap.set(card, { y: 50, opacity: 0 });
        observer.observe(card);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-4 max-w-7xl mx-auto">
      <div className="space-y-16">
        {/* Event Overview */}
        <motion.div
          ref={el => cardRefs.current[0] = el}
          className="bg-gradient-to-br from-red-900/30 via-red-800/20 to-red-900/30 backdrop-blur-md rounded-3xl p-12 border border-red-500/10 shadow-xl hover:shadow-2xl transition-shadow duration-300"
        >
          <div className="flex items-center justify-center mb-8">
            <Trophy className="w-12 h-12 text-amber-400 mr-4" />
            <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
              CODE RUSH 2024
            </h2>
          </div>
          
          <p className="text-amber-100 text-xl text-center leading-relaxed mb-8">
            Step into an arena where coding meets creativity, and challenges push your limits. 
            CODE RUSH isn't just a competition—it's your gateway to proving your programming prowess!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="bg-gradient-to-br from-red-900/40 to-amber-900/40 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
              <Brain className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-amber-300 font-semibold mb-2">Strategic Thinking</h3>
              <p className="text-amber-100/90">Master complex challenges under pressure</p>
            </div>
            <div className="bg-gradient-to-br from-red-900/40 to-amber-900/40 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
              <Users className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-amber-300 font-semibold mb-2">Team Synergy</h3>
              <p className="text-amber-100/90">Unite, code, and conquer together</p>
            </div>
            <div className="bg-gradient-to-br from-red-900/40 to-amber-900/40 p-6 rounded-xl text-center transform hover:scale-105 transition-transform duration-300">
              <Zap className="w-8 h-8 text-amber-400 mx-auto mb-4" />
              <h3 className="text-amber-300 font-semibold mb-2">Quick Thinking</h3>
              <p className="text-amber-100/90">Adapt and innovate at lightning speed</p>
            </div>
          </div>
        </motion.div>

        {/* Round 1 */}
        <motion.div
          ref={el => cardRefs.current[1] = el}
          className="bg-gradient-to-br from-red-800/20 to-amber-800/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-amber-500/10 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <Code className="w-8 h-8 md:w-10 md:h-10 text-amber-400 mr-3 md:mr-4" />
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
              Round 1: Code in Constraints
            </h3>
          </div>
          
          <p className="text-amber-100 text-base md:text-lg text-center leading-relaxed mb-6 md:mb-8">
            Navigate through a maze of constraints where every line of code counts! 
            Adapt to evolving requirements while maintaining perfect precision.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-red-800/30 to-amber-800/30 p-4 md:p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
              <Target className="w-6 h-6 md:w-8 md:h-8 text-amber-400 mb-2 md:mb-4" />
              <h4 className="text-lg font-semibold text-amber-300 mb-1 md:mb-2">Mission Objectives</h4>
              <ul className="text-amber-100 space-y-1 md:space-y-2 text-sm md:text-base">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Master strict constraints
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Optimize for peak efficiency
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Navigate dynamic challenges
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-800/30 to-amber-800/30 p-4 md:p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
              <Star className="w-6 h-6 md:w-8 md:h-8 text-amber-400 mb-2 md:mb-4" />
              <h4 className="text-lg font-semibold text-amber-300 mb-1 md:mb-2">Battle Conditions</h4>
              <ul className="text-amber-100 space-y-1 md:space-y-2 text-sm md:text-base">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Resource limitations
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Memory boundaries
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Time pressure
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Round 2 */}
        <motion.div
          ref={el => cardRefs.current[2] = el}
          className="bg-gradient-to-br from-red-800/20 to-amber-800/20 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-red-500/10 shadow-md hover:shadow-lg transition-shadow duration-300 mt-6 md:mt-12"
        >
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400">
              Round 2: Code Exchange Challenge
            </h3>
          </div>

          <p className="text-amber-100 text-base md:text-lg text-center leading-relaxed mb-6 md:mb-8">
            Enter the ultimate collaborative battlefield! Create, exchange, and evolve code 
            in a dynamic environment where teamwork meets technical excellence.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-gradient-to-br from-red-800/30 to-amber-800/30 p-4 md:p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-semibold text-amber-300 mb-2"> Skills Required</h4>
              <ul className="text-amber-100 space-y-1 md:space-y-2 text-sm md:text-base">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Lightning-fast code comprehension
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Seamless team collaboration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Advanced problem decomposition
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-800/30 to-amber-800/30 p-4 md:p-6 rounded-xl transform hover:scale-105 transition-transform duration-300">
              <h4 className="text-lg font-semibold text-amber-300 mb-2">Challenge Highlights</h4>
              <ul className="text-amber-100 space-y-1 md:space-y-2 text-sm md:text-base">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Real-time code adaptation
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Cross-team code integration
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                  Dynamic problem evolution
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            className="group relative bg-gradient-to-r from-amber-500 to-red-500 text-white px-12 py-5 rounded-full text-xl font-semibold overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="/events/CodeRush/register" className="relative z-10">Join the Rush</a>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
const HomePage = () => {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('down');
  const [hasReachedRegister, setHasReachedRegister] = useState(false);
  const lastScrollY = useRef(0);
  const registerButtonRef = useRef(null);
  const registerButtonRef2 = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const registerButton = registerButtonRef.current;
      const registerButton2 = registerButtonRef2.current;
      if (registerButton || registerButton2) {
        const rect = registerButton?.getBoundingClientRect();
        const rect2 = registerButton2?.getBoundingClientRect();
        if ((rect && rect.top <= window.innerHeight) || (rect2 && rect2.top <= window.innerHeight)) {
          setHasReachedRegister(true);
          if (scrollY.get() > lastScrollY.current) {
            setScrollDirection('down');
          } else {
            setScrollDirection('up');
          }
          lastScrollY.current = scrollY.get();
        }
      }
    };

    const unsubscribe = scrollY.onChange(() => handleScroll());
    return () => unsubscribe();
  }, [scrollY]);

  const y = useTransform(scrollY, [0, 0.2], scrollDirection === 'down' ? [0, -50] : [0, 50]);

  useEffect(() => {
    const text = document.querySelector('.hero-text');
    if (text) {
      const chars = text.textContent.split('');
      text.textContent = '';
      chars.forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        text.appendChild(span);
      });

      gsap.fromTo(text.children, 
        { opacity: 0 }, 
        {
          opacity: 1,
          duration: 0.05,
          ease: 'power3.out',
          stagger: {
            amount: 2,
            from: 'start'
          }
        }
      );
    }
  }, []);

  return (
    <div className="min-h-screen relative pt-24">
      <Header scrollDirection={scrollDirection} hasReachedRegister={hasReachedRegister} />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-950 via-red-900 to-amber-950">
        <div className="absolute inset-0 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 border-t border-amber-500/20"
              style={{
                transform: `rotate(${i * 15}deg) translateY(${i * 100}px)`,
                borderRadius: '50%'
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <motion.div 
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{ y }}
      >
        <HeroSection y={y} registerButtonRef={registerButtonRef} />
      </motion.div>

      <AboutSection registerButtonRef2={registerButtonRef2} />
      
      

      {/* Footer */}
      <motion.footer 
        id="footer"
        className="py-8 text-center text-amber-200/60 border-t border-amber-500/10 backdrop-blur-md"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2 md:space-x-4">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-300 transition">
              <FaLinkedin size={24} />
            </a>
          </div>
          <div className="text-amber-100 mt-2 md:mt-0">
            <p>Contact:Contact details <br />
ArulKumara B R - 86102 02823 <br />
Sanjay J - 97897 10033</p>
          </div>
        </div>
        <p>© 2024 Computer Science Engineering Association, PSG Tech. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default HomePage;
