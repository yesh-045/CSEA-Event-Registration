import React, { useEffect, useRef, useState } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { FaBolt } from 'react-icons/fa';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import cseaLogo from '../assets/CSEAlogo.png';
import PSGLogo from '../assets/PSG Logo.png';
import eventLogo from '../assets/Black_Yellow_Bold_Minimalist_Technology_Expo_Event_Poster-removebg-preview.png';

gsap.registerPlugin(ScrollTrigger);

// Header 
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

const AboutSection = ({ registerButtonRef2 }) => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const title = titleRef.current;

    gsap.fromTo(title, 
      { y: 100, opacity: 0 }, 
      {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1
        },
        y: 0,
        opacity: 1,
        duration: 1
      }
    );

    gsap.fromTo(text.children, 
      { y: 50, opacity: 0 }, 
      {
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2
      }
    );
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

          <motion.button
            ref={registerButtonRef2}
            className="group relative bg-gradient-to-r from-amber-500 to-red-500 text-white px-10 py-4 rounded-full text-lg font-semibold overflow-hidden mt-8 mx-auto block"
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
              style={{ filter: 'contrast(1.5) saturate(1.2)' }}
            />
          </motion.button>
          
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

    const unsubscribe = scrollY.onChange(handleScroll);
    return () => unsubscribe();
  }, [scrollY]);

  const y = useTransform(scrollY, [0, 0.2], scrollDirection === 'down' ? [0, -50] : [0, 50]);

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
  }, []);

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
        <motion.img 
          src={eventLogo}
          alt="Event Logo"
          className="w-full max-w-2xl mb-6"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ filter: 'contrast(1.5) saturate(1.2)' }}
        />
        
        <motion.p 
          className="hero-text text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl"
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
            style={{ filter: 'contrast(1.5) saturate(1.2)' }}
          />
        </motion.button>
      </motion.div>

      <AboutSection registerButtonRef2={registerButtonRef2} />

      <motion.footer 
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
            <p>Contact: +1 234 567 890</p>
          </div>
        </div>
        <p>© 2024 Computer Science Engineering Association, PSG Tech. All rights reserved.</p>
      </motion.footer>
    </div>
  );
};

export default HomePage;
