'use client';

import { motion } from 'framer-motion';
import { Heart, Mic, MessageCircle, Sparkles, Music, BookHeart } from 'lucide-react';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <FloatingOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="inline-block mb-6"
          >
            <Heart className="w-20 h-20 text-pink-400 fill-pink-300" />
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text">
            AuraMate
          </h1>
          
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light">
            Your Emotional AI Companion 💫
          </p>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I don't just hear your words… I feel your emotions. When you sound tired, 
            I'll remind you to rest. When you sound low, I'll lift your mood with music or a quote.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Mic className="w-8 h-8" />}
            title="Voice Emotion"
            description="Analyzes your tone and pitch to detect stress, sadness, or happiness"
            delay={0.2}
            gradient="from-pink-400 to-purple-400"
          />
          
          <FeatureCard
            icon={<MessageCircle className="w-8 h-8" />}
            title="Text Sentiment"
            description="Understands the emotional depth behind your words"
            delay={0.4}
            gradient="from-purple-400 to-blue-400"
          />
          
          <FeatureCard
            icon={<BookHeart className="w-8 h-8" />}
            title="Mood Journal"
            description="Logs daily moods and gives small actions to uplift you"
            delay={0.6}
            gradient="from-blue-400 to-teal-400"
          />
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full text-lg font-medium text-gray-800 hover:bg-white/60 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Start Chatting
            </motion.button>
          </Link>
          
          <Link href="/journal">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect px-8 py-4 rounded-full text-lg font-medium text-gray-800 hover:bg-white/60 transition-all flex items-center gap-2"
            >
              <BookHeart className="w-5 h-5" />
              My Mood Journal
            </motion.button>
          </Link>

          <Link href="/dashboard">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-medium transition-all flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Dashboard
            </motion.button>
          </Link>
        </motion.div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-20 text-center"
        >
          <p className="text-xl text-gray-600 italic max-w-3xl mx-auto">
            "In this busy world, even AI should care about how you feel."
          </p>
        </motion.div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description, delay, gradient }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="glass-effect p-6 rounded-3xl"
    >
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}
