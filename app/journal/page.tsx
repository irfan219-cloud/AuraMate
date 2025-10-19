'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Home, Plus, Smile, Frown, Meh, Heart, Cloud, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';
import MoodInsights from '@/components/MoodInsights';
import { format } from 'date-fns';

type MoodEntry = {
  id: string;
  date: Date;
  mood: 'happy' | 'sad' | 'neutral';
  note: string;
};

export default function JournalPage() {
  const [entries, setEntries] = useState<MoodEntry[]>([
    {
      id: '1',
      date: new Date(),
      mood: 'happy',
      note: 'Had a great day with friends!',
    }
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<'happy' | 'sad' | 'neutral'>('neutral');
  const [note, setNote] = useState('');
  const [showInsights, setShowInsights] = useState(false);

  const moodColors = {
    happy: 'from-yellow-300 to-pink-300',
    sad: 'from-blue-300 to-purple-300',
    neutral: 'from-gray-300 to-blue-200',
  };

  const handleSave = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date(),
      mood: selectedMood,
      note,
    };
    setEntries([newEntry, ...entries]);
    setShowModal(false);
    setNote('');
    setSelectedMood('neutral');
  };

  return (
    <main className="relative min-h-screen">
      <FloatingOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect p-3 rounded-full"
            >
              <Home className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <h1 className="text-2xl font-semibold gradient-text">My Mood Journal</h1>
          
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowInsights(!showInsights)}
              className="glass-effect p-3 rounded-full"
              title="View Insights"
            >
              <TrendingUp className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowModal(true)}
              className="glass-effect p-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 text-white"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Mood Insights */}
        {showInsights && entries.length > 0 && (
          <div className="mb-8">
            <MoodInsights moodData={entries.map(e => ({
              date: format(e.date, 'yyyy-MM-dd'),
              mood: e.mood,
              count: 1
            }))} />
          </div>
        )}

        {/* Mood Garden Visualization */}
        <div className="glass-effect rounded-3xl p-8 mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your Mood Garden 🌸</h2>
          <div className="flex flex-wrap gap-3">
            {entries.map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ scale: 0, rotate: 0 }}
                animate={{ scale: 1, rotate: 180 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`w-16 h-16 rounded-full bg-gradient-to-br ${moodColors[entry.mood]} flex items-center justify-center shadow-lg`}
              >
                {entry.mood === 'happy' && <Smile className="w-8 h-8 text-white" />}
                {entry.mood === 'sad' && <Cloud className="w-8 h-8 text-white" />}
                {entry.mood === 'neutral' && <Heart className="w-8 h-8 text-white" />}
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-4">
            {entries.length} mood blossoms planted 🌱
          </p>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${moodColors[entry.mood]} flex items-center justify-center flex-shrink-0`}>
                  {entry.mood === 'happy' && <Smile className="w-6 h-6 text-white" />}
                  {entry.mood === 'sad' && <Frown className="w-6 h-6 text-white" />}
                  {entry.mood === 'neutral' && <Meh className="w-6 h-6 text-white" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">
                    {format(entry.date, 'MMMM d, yyyy • h:mm a')}
                  </p>
                  <p className="text-gray-800">{entry.note}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Add Entry Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-effect rounded-3xl p-8 max-w-md w-full"
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-semibold mb-6 gradient-text">How are you feeling?</h2>
            
            <div className="flex gap-4 mb-6 justify-center">
              {(['happy', 'neutral', 'sad'] as const).map((mood) => (
                <motion.button
                  key={mood}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedMood(mood)}
                  className={`w-16 h-16 rounded-full bg-gradient-to-br ${moodColors[mood]} flex items-center justify-center ${
                    selectedMood === mood ? 'ring-4 ring-purple-400' : ''
                  }`}
                >
                  {mood === 'happy' && <Smile className="w-8 h-8 text-white" />}
                  {mood === 'sad' && <Frown className="w-8 h-8 text-white" />}
                  {mood === 'neutral' && <Meh className="w-8 h-8 text-white" />}
                </motion.button>
              ))}
            </div>

            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full h-32 bg-white/60 rounded-2xl p-4 outline-none resize-none mb-4"
            />

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowModal(false)}
                className="flex-1 glass-effect py-3 rounded-full"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-purple-400 to-pink-400 text-white py-3 rounded-full"
              >
                Save
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}
