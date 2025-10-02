'use client';

import { useState, useEffect } from 'react';

const TypewriterText = () => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  const phrases = [
    'concerts',
    'sports', 
    'events',
    'theater shows',
    'and more'
  ];

  const typingSpeed = 100;
  const deletingSpeed = 50;
  const pauseBetweenPhrases = 1500;

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentIndex < currentPhrase.length) {
          setDisplayText(currentPhrase.substring(0, currentIndex + 1));
          setCurrentIndex(currentIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), pauseBetweenPhrases);
        }
      } else {
        if (currentIndex > 0) {
          setDisplayText(currentPhrase.substring(0, currentIndex - 1));
          setCurrentIndex(currentIndex - 1);
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((currentPhraseIndex + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentIndex, isDeleting, currentPhraseIndex, phrases, typingSpeed, deletingSpeed]);

  return (
    <h1 className="text-xl md:text-4xl text-white mb-12 text-pretty max-w-2xl mx-auto">
      Discover and book tickets for {""}
      <span className="text-gradient bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent font-bold inline-block min-w-[150px] text-center">
        {displayText}
        <span className="text-white animate-pulse ml-1">|</span>
      </span> 
      
    </h1>
  );
};

export default TypewriterText;