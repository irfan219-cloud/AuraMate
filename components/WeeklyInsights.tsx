'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lightbulb } from 'lucide-react';

interface WeeklyInsightsProps {
  moodData: any[];
  averageScore: number;
  trend: string;
}

export default function WeeklyInsights({ moodData, averageScore, trend }: WeeklyInsightsProps) {
  const getInsights = () => {
    const insights = [];
    
    if (trend === 'improving') {
      insights.push({
        icon: <TrendingUp className="w-5 h-5 text-green-500" />,
        title: 'Positive Trend',
        message: 'Your mood has been improving! Keep doing what you\'re doing.',
        color: 'bg-green-50 border-green-200'
      });
    } else if (trend === 'declining') {
      insights.push({
        icon: <TrendingDown className="w-5 h-5 text-red-500" />,
        title: 'Needs Attention',
        message: 'Your mood has been declining. Consider reaching out for support.',
        color: 'bg-red-50 border-red-200'
      });
    }

    if (averageScore >= 70) {
      insights.push({
        icon: <Lightbulb className="w-5 h-5 text-yellow-500" />,
        title: 'Great Week!',
        message: 'You\'ve had a wonderful week! Celebrate your wins.',
        color: 'bg-yellow-50 border-yellow-200'
      });
    } else if (averageScore < 40) {
      insights.push({
        icon: <Lightbulb className="w-5 h-5 text-purple-500" />,
        title: 'Self-Care Reminder',
        message: 'Remember to prioritize self-care and rest.',
        color: 'bg-purple-50 border-purple-200'
      });
    }

    return insights;
  };

  const insights = getInsights();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-effect rounded-3xl p-6"
    >
      <h3 className="font-semibold text-gray-800 mb-4">Weekly Insights</h3>
      
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className={`p-4 rounded-xl border ${insight.color}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">{insight.icon}</div>
              <div>
                <h4 className="font-medium text-gray-800 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.message}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
