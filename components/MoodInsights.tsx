'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Calendar } from 'lucide-react';

interface MoodData {
  date: string;
  mood: 'happy' | 'sad' | 'neutral';
  count: number;
}

interface MoodInsightsProps {
  moodData: MoodData[];
}

export default function MoodInsights({ moodData }: MoodInsightsProps) {
  const totalEntries = moodData.reduce((sum, day) => sum + day.count, 0);
  const happyCount = moodData.filter(d => d.mood === 'happy').reduce((sum, d) => sum + d.count, 0);
  const sadCount = moodData.filter(d => d.mood === 'sad').reduce((sum, d) => sum + d.count, 0);
  
  const happyPercentage = totalEntries > 0 ? Math.round((happyCount / totalEntries) * 100) : 0;
  const trend = happyPercentage > 50 ? 'up' : happyPercentage < 30 ? 'down' : 'stable';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-effect rounded-3xl p-6"
    >
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-semibold gradient-text">Your Mood Insights</h2>
      </div>

      {/* Mood Trend */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Overall Mood Trend</span>
          <div className="flex items-center gap-1">
            {trend === 'up' && <TrendingUp className="w-5 h-5 text-green-500" />}
            {trend === 'down' && <TrendingDown className="w-5 h-5 text-red-500" />}
            {trend === 'stable' && <Minus className="w-5 h-5 text-gray-500" />}
            <span className={`text-sm font-medium ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {trend === 'up' ? 'Improving' : trend === 'down' ? 'Needs Care' : 'Stable'}
            </span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${happyPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-yellow-400 to-pink-400"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">{happyPercentage}% positive moments</p>
      </div>

      {/* Mood Breakdown */}
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-yellow-100 to-pink-100">
          <div className="text-2xl font-bold text-gray-800">{happyCount}</div>
          <div className="text-xs text-gray-600">Happy</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-gray-100 to-blue-100">
          <div className="text-2xl font-bold text-gray-800">
            {totalEntries - happyCount - sadCount}
          </div>
          <div className="text-xs text-gray-600">Neutral</div>
        </div>
        <div className="text-center p-3 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100">
          <div className="text-2xl font-bold text-gray-800">{sadCount}</div>
          <div className="text-xs text-gray-600">Sad</div>
        </div>
      </div>

      {/* Insight Message */}
      <div className="mt-6 p-4 rounded-xl bg-purple-50 border border-purple-100">
        <p className="text-sm text-gray-700">
          {trend === 'up' && "🌟 You're doing great! Your positive moments are increasing."}
          {trend === 'down' && "💙 Remember to be gentle with yourself. Tough times don't last forever."}
          {trend === 'stable' && "🌿 You're maintaining balance. Keep checking in with yourself."}
        </p>
      </div>
    </motion.div>
  );
}
