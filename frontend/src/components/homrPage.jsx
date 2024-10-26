import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, useScroll, AnimatePresence } from 'framer-motion';
import { Camera } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import cseaLogo from '../assets/CSEAlogo.png';
import PSGLogo from '../assets/PSG Logo.png';

gsap.registerPlugin(ScrollTrigger);

// Header Component
const Header = ({ scrollDirection, hasReachedRegister }) => (
  <motion.header 
    className="w-full flex flex-col md:flex-row items-center justify-between px-4 py-2 bg-gradient-to-r from-red-900 to-amber-800 backdrop-blur-md fixed top-0 z-20 shadow-lg"
    initial={{ y: 0 }}
    animate={{ y: hasReachedRegister && scrollDirection === 'down' ? -100 : 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
  >
    <div className="flex items-center space-x-2 md:space-x-4">
      <img src={PSGLogo} alt="PSG Logo" className="w-10 h-auto md:w-8 md:h-auto" />
      <img src={cseaLogo} alt="CSEA Logo" className="w-10 h-auto md:w-8 md:h-auto" />
    </div>
    <nav className="text-amber-100 mt-2 md:mt-0">
      <ul className="flex flex-wrap items-center justify-center space-x-4">
        <li className="hover:text-amber-300 transition font-bold"><a href="/">Home</a></li>
        <li className="hover:text-amber-300 transition font-bold">About</li>
        <li className="hover:text-amber-300 transition font-bold">Contact</li>
      </ul>
    </nav>
  </motion.header>
);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const title = titleRef.current;

    gsap.from(title, {
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1
      },
      y: 100,
      opacity: 0,
      duration: 1
    });

    gsap.from(text.children, {
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "bottom center",
        scrub: 1
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2
    });
  }, []);

  return (
    <motion.section 
      ref={sectionRef}
      className="py-20 px-4 max-w-6xl mx-auto"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="bg-gradient-to-br from-red-900/30 via-red-800/20 to-red-900/30 backdrop-blur-md rounded-3xl p-12 border border-red-500/10 shadow-xl"
        whileHover={{ boxShadow: "0 30px 50px -15px rgb(0 0 0 / 0.3)" }}
      >
        <h2 
          ref={titleRef}
          className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400 mb-8 text-center"
        >
          About CodeRush
        </h2>
        <div ref={textRef} className="space-y-6">
          <p className="text-amber-100 text-lg text-center leading-relaxed">
            "CODE RUSH" event is designed to test students on their problem solving skills, teamwork abilities, and approach to complex challenges.
          </p>
          
          <div className="bg-gradient-to-r from-red-900/30 to-amber-900/30 p-6 rounded-xl mb-6">
            <h3 className="font-bold text-2xl text-amber-400 mb-4">Round 1: Code in Constraints</h3>
            <p className="text-amber-100">
              Teams will tackle problem statements under unique constraints, facing dynamic challenges throughout their development process.
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-amber-900/30 to-red-900/30 p-6 rounded-xl">
            <h3 className="font-bold text-2xl text-amber-400 mb-4">Round 2: Code Exchange Challenge</h3>
            <p className="text-amber-100">
              A collaborative coding experience where teams develop partial solutions before exchanging and completing each other's code.
            </p>
          </div>
          
          <p className="text-amber-100 text-lg text-center leading-relaxed mt-8">
            Form your team of 2-3 members and prepare to showcase your programming prowess in this ultimate coding challenge!
          </p>
        </div>
      </motion.div>
    </motion.section>
  );
};

const HomePage = () => {
  const { scrollY } = useScroll();
  const [scrollDirection, setScrollDirection] = useState('down');
  const [hasReachedRegister, setHasReachedRegister] = useState(false);
  const lastScrollY = useRef(0);
  const registerButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const registerButton = registerButtonRef.current;
      if (registerButton) {
        const rect = registerButton.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          setHasReachedRegister(true);
          if (scrollY.get() > lastScrollY.current) {
            setScrollDirection('down');
          } else {
            setScrollDirection('up');
          }
          lastScrollY.current = scrollY.get();
        } else {
          setHasReachedRegister(false);
        }
      }
    };

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const y = useTransform(scrollY, [0, 0.2], scrollDirection === 'down' ? [0, -50] : [0, 50]);

  return (
    <div className="min-h-screen relative pt-24">
      <Header scrollDirection={scrollDirection} hasReachedRegister={hasReachedRegister} />
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-red-950 via-red-900 to-amber-950">
        {/* Curved lines similar to the poster */}
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

      {/* Hero Section */}
      <motion.div 
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{ y }}
      >
        <motion.h1 
          className="text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-400 mb-6"
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
        
        <motion.p 
          className="text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          THINK FAST, CODE SMART, CONQUER THE CHALLENGE!!!
        </motion.p>
        
        <motion.button
          ref={registerButtonRef}
          className="group relative bg-gradient-to-r from-amber-500 to-red-500 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/events/CodeRush/register" className="relative z-10">Register Now</a>
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-red-600 to-amber-600"
            initial={{ x: '100%' }}
            whileHover={{ x: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </motion.div>

      <AboutSection />

      <motion.footer 
        className="py-8 text-center text-amber-200/60 border-t border-amber-500/10 backdrop-blur-md"
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