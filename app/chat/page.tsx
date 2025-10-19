'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Home, Smile, Frown, Meh, Volume2, Sparkles, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import FloatingOrbs from '@/components/FloatingOrbs';
import InspiringQuote from '@/components/InspiringQuote';
import VoiceVisualizer from '@/components/VoiceVisualizer';
import RecommendationCard from '@/components/RecommendationCard';
import { voiceService } from '@/lib/voiceService';
import { aiService } from '@/lib/aiService';

type Emotion = 'happy' | 'sad' | 'neutral' | 'anxious' | 'excited' | 'tired';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  emotion?: Emotion;
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there 💫 I'm AuraMate, your emotional AI companion. I can hear your voice and understand your feelings. How are you today?",
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentRecommendations, setCurrentRecommendations] = useState<any[]>([]);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if voice is supported
    setVoiceEnabled(voiceService.isSupported());
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text?: string) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const emotion = aiService.detectEmotion(messageText);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      emotion,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Get AI response
    setTimeout(() => {
      const aiResponse = aiService.getResponse(messageText, emotion);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);

      // Speak response if voice enabled
      if (voiceEnabled) {
        const voiceEmotion = emotion === 'anxious' || emotion === 'tired' ? 'sad' : 
                            emotion === 'excited' ? 'happy' : emotion as 'happy' | 'sad' | 'neutral';
        voiceService.speak(aiResponse, voiceEmotion);
      }

      // Show recommendations for certain emotions
      if (['anxious', 'tired', 'sad'].includes(emotion)) {
        const recommendations = aiService.getRecommendations(emotion);
        setCurrentRecommendations(recommendations);
        setShowRecommendations(true);
      }
    }, 1000);
  };

  const toggleVoice = () => {
    if (!voiceEnabled) {
      alert('Voice recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      voiceService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      voiceService.startListening(
        (transcript) => {
          setInput(transcript);
        },
        () => {
          setIsListening(false);
          // Auto-send when voice stops
          if (input.trim()) {
            handleSend(input);
          }
        }
      );
    }
  };

  const getEmotionIcon = (emotion?: Emotion) => {
    switch (emotion) {
      case 'happy':
      case 'excited':
        return <Smile className="w-4 h-4" />;
      case 'sad':
      case 'anxious':
      case 'tired':
        return <Frown className="w-4 h-4" />;
      default:
        return <Meh className="w-4 h-4" />;
    }
  };

  const getEmotionColor = (emotion?: Emotion) => {
    switch (emotion) {
      case 'happy':
        return 'text-yellow-600';
      case 'excited':
        return 'text-orange-600';
      case 'sad':
        return 'text-blue-600';
      case 'anxious':
        return 'text-purple-600';
      case 'tired':
        return 'text-gray-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <main className="relative min-h-screen">
      <FloatingOrbs />
      
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-effect p-3 rounded-full"
            >
              <Home className="w-5 h-5" />
            </motion.button>
          </Link>
          
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-semibold gradient-text">Chat with AuraMate</h1>
            {voiceEnabled && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-1 glass-effect px-3 py-1 rounded-full text-xs"
              >
                <Volume2 className="w-3 h-3 text-purple-500" />
                <span className="text-gray-600">Voice Enabled</span>
              </motion.div>
            )}
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInsights(!showInsights)}
            className="glass-effect p-3 rounded-full"
          >
            <TrendingUp className="w-5 h-5" />
          </motion.button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Section */}
          <div className="lg:col-span-2">
            {/* Inspiring Quote */}
            <div className="mb-4">
              <InspiringQuote />
            </div>

            {/* AI Insights */}
            <AnimatePresence>
              {showInsights && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-effect rounded-2xl p-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    <h3 className="font-semibold text-gray-800">AI Insights</h3>
                  </div>
                  <p className="text-sm text-gray-600">{aiService.getMoodInsights()}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Chat Container */}
            <div className="glass-effect rounded-3xl p-6 mb-4 h-[55vh] overflow-y-auto">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[75%] ${
                      message.sender === 'user' 
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white' 
                        : 'bg-white/60'
                    } rounded-2xl px-5 py-3 shadow-lg`}>
                      {message.sender === 'user' && message.emotion && (
                        <div className={`flex items-center gap-2 mb-1 text-xs opacity-90 ${getEmotionColor(message.emotion)}`}>
                          {getEmotionIcon(message.emotion)}
                          <span className="capitalize font-medium">{message.emotion}</span>
                        </div>
                      )}
                      <p className="leading-relaxed">{message.text}</p>
                      <p className="text-xs opacity-60 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </div>

            {/* Voice Visualizer */}
            {isListening && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-effect rounded-2xl p-4 mb-4"
              >
                <div className="flex items-center justify-center gap-3">
                  <span className="text-sm text-gray-600">Listening...</span>
                  <VoiceVisualizer isActive={isListening} />
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="glass-effect rounded-full p-2 flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleVoice}
                className={`p-3 rounded-full transition-colors ${
                  isListening 
                    ? 'bg-red-400 text-white animate-pulse' 
                    : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
                }`}
                title={voiceEnabled ? 'Click to speak' : 'Voice not supported'}
              >
                <Mic className="w-5 h-5" />
              </motion.button>
              
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder={voiceEnabled ? "Type or speak how you're feeling..." : "Share how you're feeling..."}
                className="flex-1 bg-transparent outline-none px-4 text-gray-800 placeholder-gray-500"
              />
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSend()}
                className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-teal-400 text-white"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Recommendations Sidebar */}
          <div className="lg:col-span-1">
            <AnimatePresence>
              {showRecommendations && currentRecommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="glass-effect rounded-3xl p-6">
                    <h3 className="text-lg font-semibold mb-4 gradient-text">
                      Recommendations for You
                    </h3>
                    <div className="space-y-3">
                      {currentRecommendations.map((rec, index) => (
                        <RecommendationCard
                          key={index}
                          type={rec.type}
                          title={rec.title}
                          description={rec.description}
                          action={rec.action}
                          delay={index * 0.1}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}
