'use client';

import { motion } from 'framer-motion';
import { Music, Activity, Wind, Quote } from 'lucide-react';

interface RecommendationCardProps {
  type: 'music' | 'activity' | 'breathing' | 'quote';
  title: string;
  description: string;
  action: string;
  delay?: number;
}

export default function RecommendationCard({ 
  type, 
  title, 
  description, 
  action, 
  delay = 0 
}: RecommendationCardProps) {
  const icons = {
    music: <Music className="w-6 h-6" />,
    activity: <Activity className="w-6 h-6" />,
    breathing: <Wind className="w-6 h-6" />,
    quote: <Quote className="w-6 h-6" />
  };

  const gradients = {
    music: 'from-purple-400 to-pink-400',
    activity: 'from-blue-400 to-teal-400',
    breathing: 'from-green-400 to-cyan-400',
    quote: 'from-orange-400 to-rose-400'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="glass-effect rounded-2xl p-4 cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[type]} flex items-center justify-center text-white flex-shrink-0`}>
          {icons[type]}
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <p className="text-sm text-gray-700 font-medium">{action}</p>
        </div>
      </div>
    </motion.div>
  );
}
