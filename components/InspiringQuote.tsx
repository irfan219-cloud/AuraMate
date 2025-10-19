'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const quotes = [
  "You are doing better than you think. 🌸",
  "Small steps are still progress. Keep going. ✨",
  "It's okay to rest. You deserve it. 💫",
  "Your feelings are valid. All of them. 🌙",
  "Tomorrow is a fresh start. 🌅",
  "You're stronger than your struggles. 💪",
  "Be gentle with yourself today. 🤗",
];

export default function InspiringQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-effect rounded-2xl p-6 text-center"
    >
      <Sparkles className="w-6 h-6 mx-auto mb-3 text-purple-400" />
      <p className="text-lg text-gray-700 italic">{randomQuote}</p>
    </motion.div>
  );
}
