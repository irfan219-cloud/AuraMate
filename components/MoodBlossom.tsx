'use client';

import { motion } from 'framer-motion';
import { Smile, Cloud, Heart } from 'lucide-react';

type MoodType = 'happy' | 'sad' | 'neutral';

interface MoodBlossomProps {
  mood: MoodType;
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

export default function MoodBlossom({ mood, size = 'md', delay = 0 }: MoodBlossomProps) {
  const sizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const gradients = {
    happy: 'from-yellow-300 via-pink-300 to-rose-300',
    sad: 'from-blue-300 via-purple-300 to-indigo-300',
    neutral: 'from-gray-300 via-blue-200 to-teal-200',
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: 0, opacity: 0 }}
      animate={{ scale: 1, rotate: 180, opacity: 1 }}
      transition={{ 
        delay, 
        duration: 0.6,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      whileHover={{ scale: 1.1, rotate: 200 }}
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradients[mood]} flex items-center justify-center shadow-lg cursor-pointer`}
    >
      {mood === 'happy' && <Smile className={`${iconSizes[size]} text-white`} />}
      {mood === 'sad' && <Cloud className={`${iconSizes[size]} text-white`} />}
      {mood === 'neutral' && <Heart className={`${iconSizes[size]} text-white`} />}
    </motion.div>
  );
}
