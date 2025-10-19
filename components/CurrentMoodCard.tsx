'use client';

import { motion } from 'framer-motion';
import { Smile, Meh, Frown } from 'lucide-react';

interface CurrentMoodCardProps {
  currentMood: 'happy' | 'sad' | 'neutral';
  onMoodChange: (mood: 'happy' | 'sad' | 'neutral') => void;
}

export default function CurrentMoodCard({ currentMood, onMoodChange }: CurrentMoodCardProps) {
  const moods = [
    { value: 'happy' as const, icon: Smile, label: 'Happy', color: 'from-yellow-400 to-pink-400' },
    { value: 'neutral' as const, icon: Meh, label: 'Neutral', color: 'from-gray-400 to-blue-400' },
    { value: 'sad' as const, icon: Frown, label: 'Sad', color: 'from-blue-400 to-purple-400' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-effect rounded-3xl p-6"
    >
      <h3 className="font-semibold text-gray-800 mb-4">How are you feeling right now?</h3>
      
      <div className="space-y-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = currentMood === mood.value;
          
          return (
            <motion.button
              key={mood.value}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onMoodChange(mood.value)}
              className={`w-full p-4 rounded-xl flex items-center gap-3 transition-all ${
                isSelected 
                  ? `bg-gradient-to-r ${mood.color} text-white shadow-lg` 
                  : 'glass-effect hover:bg-white/60'
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isSelected ? 'bg-white/20' : `bg-gradient-to-br ${mood.color}`
              }`}>
                <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-white'}`} />
              </div>
              <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-800'}`}>
                {mood.label}
              </span>
            </motion.button>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-4 p-3 rounded-xl bg-purple-50 border border-purple-100"
      >
        <p className="text-sm text-gray-700">
          {currentMood === 'happy' && "🌟 That's wonderful! Keep embracing this positive energy!"}
          {currentMood === 'neutral' && "🌿 Feeling balanced is a good place to be. Stay mindful."}
          {currentMood === 'sad' && "💙 It's okay to feel this way. I'm here with you."}
        </p>
      </motion.div>
    </motion.div>
  );
}
