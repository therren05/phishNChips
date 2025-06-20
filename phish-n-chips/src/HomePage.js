import React from 'react';
import './Home.css';
import './index.css';
import phish from './phish.png';
import ScrollToggleButton from './ScrollToggleButton';
import { useEffect } from "react";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { useRef } from 'react';
import { FaArrowDown } from 'react-icons/fa'; // for down arrow icon


function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, []);
  const Button = ({ className, ...props }) => (
    <button className={`rounded ${className}`} {...props} />
  );
  const [userInput, setUserInput] = useState('');
  const [error, setError] = useState('');
  
  


  // For sticky reveal effect
  const buttonRef = useRef(null);
  const isInView = useInView(buttonRef, { once: false, margin: "-50% 0px -50% 0px" });

  return (
    <div className="container" style={{backgroundColor: '#ED1D24', minHeight: '100vh', minWidth: '100vw', overflowX: 'hidden', color: 'white' }}>
      {/* Main content section */}
      <div className="white-top-padding"></div>
      <div className="svg-curve top">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>
      <div className="introSection">
        <motion.h1 
          className="title"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Welcome to Phish-n-Chips
        </motion.h1>
        <motion.img
          src={phish}
          alt="Phish-n-Chips Logo"
          className="intro-image"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        />

        <motion.h2
          className="sub-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          A Hack Day project by:
        </motion.h2>
        <motion.p
          className="text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Adam Hopf
        </motion.p>
        <motion.p
          className="text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Colin Feaman 
        </motion.p>
        <motion.p
          className="text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Jake Clause
        </motion.p>
        <motion.p
          className="text"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Tyler Herren
        </motion.p>
        <ScrollToggleButton />
      </div>

      <div className="body">
        <motion.div
          className="white-box"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="white-box-heading">What is Phish-n-Chips?</h2>
          <p className="text-lg">
          Being aware of and trained to recognize phishing attacks is essential in defending against modern cyber threats, particularly from sophisticated groups like Scattered Spider. This hacking group is known for using advanced social engineering and phishing tactics to infiltrate high-value targets, including insurance companies. Scattered Spider often impersonates IT staff or executives to trick employees into handing over login credentials or approving access requests. Once inside, they can move laterally across systems, steal sensitive data, or deploy ransomware. Insurance companies are especially attractive targets due to the vast amount of personal and financial data they hold. Without proper phishing awareness training, employees may unknowingly open the door to these attacks. Regular training helps staff recognize red flags, avoid falling for impersonation attempts, and respond quickly to suspicious activity—making it a crucial line of defense against threat actors like Scattered Spider.
          </p>
        </motion.div>
      </div>

     
      <div className="svg-curve">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,0 C480,100 960,0 1440,100 L1440,100 L0,100 Z" fill="white" />
        </svg>
      </div>

      <footer className="footer">
      
        <div
          className={`stickyButtonWrapper ml-auto mr-auto flex ${isInView ? "show" : ""}`}
          ref={buttonRef}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-[#ED1D24] justify-center flex font-semibold mb-4 text-2xl">
              <h2>Enter Your Alias Below To Begin</h2>
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                
                placeholder="Enter your alias"
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  setError(''); // clear error on change
                }}
                className="input-box"
              />
              {error && <p className="error-text">{error}</p>}
            </div>

            <Button
              className="button ml-auto mr-auto flex mb-[calc(50%)]"
              onClick={() => {
                if (!userInput.trim()) {
                  setError("Please enter your alias.");
                } else {
                  navigate("/game", { state: { userInput } });
                }
              }}
            >
              Start Game
            </Button>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
