'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';
import { voiceService } from '@/lib/voiceService';

interface MotivationalSpeechProps {
  mood: 'improving' | 'stable' | 'declining';
  averageScore: number;
}

export default function MotivationalSpeech({ mood, averageScore }: MotivationalSpeechProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  const getMotivationalMessage = () => {
    if (mood === 'improving' && averageScore >= 70) {
      return "You're doing absolutely amazing! Your mood has been improving consistently, and that's a testament to your strength and resilience. Keep up this incredible momentum! 🌟";
    } else if (mood === 'improving') {
      return "I see real progress in your emotional journey! You're moving in the right direction, and every small step counts. I'm so proud of how far you've come! 💪";
    } else if (mood === 'stable' && averageScore >= 60) {
      return "You're maintaining a beautiful balance! Stability is a sign of emotional maturity. Keep nurturing your well-being with the same care you've been showing. 🌿";
    } else if (mood === 'stable') {
      return "You're holding steady, and that takes strength. Remember, it's okay to have ups and downs. What matters is that you're here, checking in with yourself. That's powerful! 💙";
    } else if (averageScore < 40) {
      return "I know things feel heavy right now, but please remember: this is temporary. You've survived 100% of your difficult days so far. You're stronger than you know, and I'm here with you every step of the way. 💜";
    } else {
      return "I see you're going through a challenging time. It's okay to not be okay. What you're feeling is valid. Take it one moment at a time, and remember to be gentle with yourself. You deserve compassion, especially from yourself. 🌸";
    }
  };

  useEffect(() => {
    const message = getMotivationalMessage();
    setCurrentMessage(message);
  }, [mood, averageScore]);

  const handleSpeak = () => {
    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    setIsSpeaking(true);
    
    const emotion = averageScore >= 60 ? 'happy' : averageScore >= 40 ? 'neutral' : 'sad';
    voiceService.speak(currentMessage, emotion);

    // Reset after estimated speech time
    setTimeout(() => {
      setIsSpeaking(false);
    }, currentMessage.length * 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-effect rounded-3xl p-6 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-blue-400/10 animate-pulse" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center"
            >
              <Sparkles className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-800">AI Motivation</h3>
              <p className="text-xs text-gray-600">Personalized for you</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSpeak}
            className={`p-3 rounded-full transition-all ${
              isSpeaking 
                ? 'bg-red-400 text-white animate-pulse' 
                : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
            }`}
          >
            {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-700 leading-relaxed"
        >
          {currentMessage}
        </motion.p>

        {/* Mood indicator */}
        <div className="mt-4 flex items-center gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            mood === 'improving' ? 'bg-green-100 text-green-700' :
            mood === 'declining' ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            Trend: {mood}
          </div>
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
            Score: {averageScore}%
          </div>
        </div>

        {/* Wave animation when speaking */}
        <AnimatePresence>
          {isSpeaking && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-1"
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
                  animate={{
                    height: [8, 24, 8],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
