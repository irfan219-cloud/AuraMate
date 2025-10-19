'use client';

import { motion } from 'framer-motion';

interface VoiceVisualizerProps {
  isActive: boolean;
}

export default function VoiceVisualizer({ isActive }: VoiceVisualizerProps) {
  return (
    <div className="flex items-center justify-center gap-1 h-8">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 bg-gradient-to-t from-purple-400 to-pink-400 rounded-full"
          animate={isActive ? {
            height: [8, 24, 8],
            opacity: [0.5, 1, 0.5]
          } : {
            height: 8,
            opacity: 0.3
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}
