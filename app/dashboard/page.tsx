'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, TrendingUp, Heart, Brain, Sparkles, Volume2, Calendar, Activity } from 'lucide-react';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';
import MoodChart from '@/components/MoodChart';
import CurrentMoodCard from '@/components/CurrentMoodCard';
import MotivationalSpeech from '@/components/MotivationalSpeech';
import WeeklyInsights from '@/components/WeeklyInsights';

type MoodEntry = {
  date: string;
  mood: 'happy' | 'sad' | 'neutral' | 'anxious' | 'excited' | 'tired';
  score: number;
};

export default function DashboardPage() {
  const [currentMood, setCurrentMood] = useState<'happy' | 'sad' | 'neutral'>('neutral');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [showMotivation, setShowMotivation] = useState(false);

  useEffect(() => {
    // Generate sample mood data for the last 7 days
    const generateMoodData = () => {
      const moods: ('happy' | 'sad' | 'neutral' | 'anxious' | 'excited' | 'tired')[] = 
        ['happy', 'sad', 'neutral', 'anxious', 'excited', 'tired'];
      const data: MoodEntry[] = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const mood = moods[Math.floor(Math.random() * moods.length)];
        const score = mood === 'happy' || mood === 'excited' ? 
          Math.random() * 30 + 70 : 
          mood === 'sad' || mood === 'anxious' || mood === 'tired' ?
          Math.random() * 30 + 20 :
          Math.random() * 20 + 40;
        
        data.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          mood,
          score: Math.round(score)
        });
      }
      return data;
    };

    setMoodHistory(generateMoodData());
    
    // Auto-play motivation after 2 seconds
    const timer = setTimeout(() => {
      setShowMotivation(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const calculateAverageMood = () => {
    if (moodHistory.length === 0) return 50;
    const sum = moodHistory.reduce((acc, entry) => acc + entry.score, 0);
    return Math.round(sum / moodHistory.length);
  };

  const getMoodTrend = () => {
    if (moodHistory.length < 2) return 'stable';
    const recent = moodHistory.slice(-3).reduce((acc, e) => acc + e.score, 0) / 3;
    const older = moodHistory.slice(0, 3).reduce((acc, e) => acc + e.score, 0) / 3;
    
    if (recent > older + 10) return 'improving';
    if (recent < older - 10) return 'declining';
    return 'stable';
  };

  const getPositiveDays = () => {
    return moodHistory.filter(e => e.score >= 60).length;
  };

  const stats = [
    {
      icon: <Heart className="w-6 h-6" />,
      label: 'Average Mood',
      value: `${calculateAverageMood()}%`,
      color: 'from-pink-400 to-rose-400',
      trend: getMoodTrend()
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: 'Positive Days',
      value: `${getPositiveDays()}/7`,
      color: 'from-blue-400 to-cyan-400',
      trend: 'stable'
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: 'Mood Trend',
      value: getMoodTrend(),
      color: 'from-purple-400 to-pink-400',
      trend: getMoodTrend()
    },
    {
      icon: <Brain className="w-6 h-6" />,
      label: 'Entries',
      value: moodHistory.length.toString(),
      color: 'from-green-400 to-teal-400',
      trend: 'stable'
    }
  ];

  return (
    <main className="relative min-h-screen">
      <FloatingOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass-effect p-3 rounded-full"
              >
                <Home className="w-5 h-5" />
              </motion.button>
            </Link>
            
            <div>
              <h1 className="text-3xl font-bold gradient-text">Your Dashboard</h1>
              <p className="text-sm text-gray-600">Track your emotional wellness journey</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowMotivation(!showMotivation)}
            className="glass-effect px-4 py-2 rounded-full flex items-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-purple-500" />
            <span className="text-sm">AI Motivation</span>
          </motion.button>
        </div>

        {/* Motivational Speech */}
        {showMotivation && (
          <div className="mb-6">
            <MotivationalSpeech 
              mood={getMoodTrend() as any}
              averageScore={calculateAverageMood()}
            />
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                  {stat.icon}
                </div>
                {stat.trend === 'improving' && (
                  <TrendingUp className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600 capitalize">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect rounded-3xl p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-6 h-6 text-purple-500" />
                <h2 className="text-xl font-semibold text-gray-800">7-Day Mood Trend</h2>
              </div>
              <MoodChart data={moodHistory} />
            </motion.div>

            {/* Weekly Insights */}
            <WeeklyInsights 
              moodData={moodHistory}
              averageScore={calculateAverageMood()}
              trend={getMoodTrend()}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Mood */}
            <CurrentMoodCard 
              currentMood={currentMood}
              onMoodChange={setCurrentMood}
            />

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="glass-effect rounded-3xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <h3 className="font-semibold text-gray-800">Quick Actions</h3>
              </div>
              
              <div className="space-y-3">
                <Link href="/chat">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full glass-effect p-4 rounded-xl text-left hover:bg-white/60 transition-all"
                  >
                    <div className="font-medium text-gray-800">Chat with AuraMate</div>
                    <div className="text-sm text-gray-600">Share your feelings</div>
                  </motion.button>
                </Link>

                <Link href="/journal">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full glass-effect p-4 rounded-xl text-left hover:bg-white/60 transition-all"
                  >
                    <div className="font-medium text-gray-800">Mood Journal</div>
                    <div className="text-sm text-gray-600">Log your mood</div>
                  </motion.button>
                </Link>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowMotivation(true)}
                  className="w-full bg-gradient-to-r from-purple-400 to-pink-400 text-white p-4 rounded-xl text-left"
                >
                  <div className="font-medium">Get Motivated</div>
                  <div className="text-sm opacity-90">AI encouragement</div>
                </motion.button>
              </div>
            </motion.div>

            {/* Mood Distribution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="glass-effect rounded-3xl p-6"
            >
              <h3 className="font-semibold text-gray-800 mb-4">Mood Distribution</h3>
              <div className="space-y-3">
                {['happy', 'neutral', 'sad'].map((mood, index) => {
                  const count = moodHistory.filter(e => 
                    mood === 'happy' ? ['happy', 'excited'].includes(e.mood) :
                    mood === 'sad' ? ['sad', 'anxious', 'tired'].includes(e.mood) :
                    e.mood === 'neutral'
                  ).length;
                  const percentage = moodHistory.length > 0 ? (count / moodHistory.length) * 100 : 0;
                  
                  return (
                    <div key={mood}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize text-gray-700">{mood}</span>
                        <span className="text-gray-600">{Math.round(percentage)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                          className={`h-full ${
                            mood === 'happy' ? 'bg-gradient-to-r from-yellow-400 to-pink-400' :
                            mood === 'sad' ? 'bg-gradient-to-r from-blue-400 to-purple-400' :
                            'bg-gradient-to-r from-gray-400 to-blue-400'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
