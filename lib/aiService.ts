// AI Service for enhanced responses
type Emotion = 'happy' | 'sad' | 'neutral' | 'anxious' | 'excited' | 'tired';

interface ConversationContext {
  recentEmotions: Emotion[];
  messageCount: number;
  dominantMood: Emotion;
}

export class AIService {
  private context: ConversationContext = {
    recentEmotions: [],
    messageCount: 0,
    dominantMood: 'neutral'
  };

  // Enhanced emotion detection with more nuance
  detectEmotion(text: string): Emotion {
    const lowerText = text.toLowerCase();
    
    // Anxious/Stressed
    if (/stress|anxious|worried|nervous|overwhelm|panic/.test(lowerText)) {
      return 'anxious';
    }
    
    // Tired/Exhausted
    if (/tired|exhaust|sleep|drain|fatigue|worn/.test(lowerText)) {
      return 'tired';
    }
    
    // Excited/Energetic
    if (/excit|amaz|awesome|fantastic|incredible|love|great/.test(lowerText)) {
      return 'excited';
    }
    
    // Happy
    if (/happy|good|nice|wonderful|joy|glad|pleased/.test(lowerText)) {
      return 'happy';
    }
    
    // Sad/Down
    if (/sad|down|depress|lonely|hurt|bad|terrible|awful/.test(lowerText)) {
      return 'sad';
    }
    
    return 'neutral';
  }

  // Get empathetic AI response with context awareness
  getResponse(userText: string, emotion: Emotion): string {
    this.context.recentEmotions.push(emotion);
    this.context.messageCount++;
    
    // Keep only last 5 emotions
    if (this.context.recentEmotions.length > 5) {
      this.context.recentEmotions.shift();
    }

    // Update dominant mood
    this.updateDominantMood();

    const responses = this.getResponsesByEmotion(emotion, userText);
    return responses[Math.floor(Math.random() * responses.length)];
  }

  private getResponsesByEmotion(emotion: Emotion, userText: string): string[] {
    const responses: Record<Emotion, string[]> = {
      anxious: [
        "I can sense the stress in your words. Let's take this one step at a time. Would you like to try a 2-minute breathing exercise? 🌬️",
        "Feeling overwhelmed is completely valid. Remember, you don't have to handle everything at once. What's one small thing we can tackle together? 💙",
        "Your anxiety is real, and I'm here with you. Let me suggest a calming lo-fi playlist to help ease your mind. 🎵",
        "When stress builds up, sometimes we need to pause. How about a quick 5-minute walk or some gentle stretching? 🌿"
      ],
      tired: [
        "I hear you. Rest isn't weakness—it's essential. Your body is asking for what it needs. Can you take a short break? 😴",
        "Exhaustion is your body's way of saying 'I need care.' You deserve rest. Let's find a moment for you to recharge. ✨",
        "Being tired means you've been working hard. It's okay to slow down. Would a power nap or some quiet time help? 🌙",
        "Your energy matters. Let me remind you: it's okay to not be productive right now. Rest is productive too. 💫"
      ],
      excited: [
        "Your energy is contagious! ✨ I love seeing you this happy. Tell me more about what's making you feel so good!",
        "This is wonderful! 🎉 Your excitement is beautiful. Keep riding this positive wave—you deserve all this joy!",
        "Yes! This is the energy we love to see! 🌟 Your happiness makes the world brighter. What's next on your adventure?",
        "I'm celebrating with you! 🎊 This positive momentum is powerful. How can we keep this good feeling going?"
      ],
      happy: [
        "Your positive energy is beautiful! ✨ I'm so glad you're feeling good. What's bringing you joy today?",
        "This makes me happy too! 😊 Keep embracing these good moments—they matter so much.",
        "Love this for you! 🌸 Your happiness is important. Let's savor this feeling together.",
        "You're glowing with positivity! ☀️ These moments are precious. What made today special?"
      ],
      sad: [
        "I'm here with you in this moment. 💙 Your feelings are valid, and it's okay to not be okay right now.",
        "I can feel the weight in your words. You're not alone in this. Would talking more help, or would you prefer some comforting music? 🎵",
        "Sadness is part of being human. You're allowed to feel this way. I'm here to listen without judgment. 🌙",
        "Sometimes we just need someone to acknowledge our pain. I see you, I hear you, and your feelings matter. 💫"
      ],
      neutral: [
        "I'm here with you. 💭 Tell me more about what's on your mind.",
        "I'm listening. Sometimes just sharing helps. What would you like to talk about? 🌿",
        "Thanks for checking in with me. How has your day been treating you? ✨",
        "I'm here whenever you need. What's been on your mind lately? 💙"
      ]
    };

    return responses[emotion] || responses.neutral;
  }

  // Get smart recommendations based on emotion
  getRecommendations(emotion: Emotion): {
    type: 'music' | 'activity' | 'breathing' | 'quote';
    title: string;
    description: string;
    action: string;
  }[] {
    const recommendations: Record<Emotion, any[]> = {
      anxious: [
        {
          type: 'breathing',
          title: '4-7-8 Breathing',
          description: 'Calm your nervous system in 2 minutes',
          action: 'Breathe in for 4, hold for 7, out for 8'
        },
        {
          type: 'music',
          title: 'Calming Ambient Sounds',
          description: 'Gentle nature sounds to ease anxiety',
          action: '🎵 Rain sounds, ocean waves, forest ambience'
        },
        {
          type: 'activity',
          title: 'Grounding Exercise',
          description: '5-4-3-2-1 technique to center yourself',
          action: 'Name 5 things you see, 4 you touch, 3 you hear, 2 you smell, 1 you taste'
        }
      ],
      tired: [
        {
          type: 'activity',
          title: 'Power Nap',
          description: '15-20 minute rest to recharge',
          action: 'Set a timer and rest your eyes'
        },
        {
          type: 'music',
          title: 'Gentle Sleep Sounds',
          description: 'Soft melodies for relaxation',
          action: '🎵 Soft piano, meditation music'
        }
      ],
      excited: [
        {
          type: 'music',
          title: 'Upbeat Energy Playlist',
          description: 'Keep the momentum going!',
          action: '🎵 Pop, dance, feel-good hits'
        },
        {
          type: 'activity',
          title: 'Capture This Moment',
          description: 'Journal about what makes you happy',
          action: 'Write down 3 things you\'re grateful for right now'
        }
      ],
      happy: [
        {
          type: 'music',
          title: 'Feel-Good Vibes',
          description: 'Music to match your mood',
          action: '🎵 Happy indie, sunshine pop'
        },
        {
          type: 'activity',
          title: 'Share the Joy',
          description: 'Spread positivity to someone else',
          action: 'Send a kind message to a friend'
        }
      ],
      sad: [
        {
          type: 'music',
          title: 'Comforting Melodies',
          description: 'Gentle music for healing',
          action: '🎵 Soft acoustic, emotional ballads'
        },
        {
          type: 'activity',
          title: 'Self-Compassion Break',
          description: 'Be kind to yourself',
          action: 'Place hand on heart and say: "This is hard, and I\'m doing my best"'
        },
        {
          type: 'quote',
          title: 'Reminder',
          description: 'You won\'t feel this way forever',
          action: '"This too shall pass. You\'re stronger than you know." 💙'
        }
      ],
      neutral: [
        {
          type: 'activity',
          title: 'Mood Check-In',
          description: 'Take a moment to reflect',
          action: 'How are you really feeling right now?'
        }
      ]
    };

    return recommendations[emotion] || recommendations.neutral;
  }

  // Update dominant mood based on recent emotions
  private updateDominantMood() {
    if (this.context.recentEmotions.length === 0) return;

    const emotionCounts: Record<string, number> = {};
    this.context.recentEmotions.forEach(emotion => {
      emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
    });

    const dominant = Object.entries(emotionCounts).reduce((a, b) => 
      a[1] > b[1] ? a : b
    )[0] as Emotion;

    this.context.dominantMood = dominant;
  }

  // Get mood insights
  getMoodInsights(): string {
    const { recentEmotions, dominantMood, messageCount } = this.context;
    
    if (messageCount < 3) {
      return "I'm getting to know you. Keep sharing how you feel! 🌱";
    }

    const insights: Record<Emotion, string> = {
      anxious: "I've noticed you've been feeling stressed lately. Remember to take breaks and breathe. You're doing better than you think. 💙",
      tired: "Your energy seems low recently. Rest is not a luxury—it's necessary. Be gentle with yourself. 🌙",
      excited: "Your positive energy has been amazing! Keep embracing these good moments. ✨",
      happy: "You've been in a good place lately. That's wonderful! Keep nurturing what brings you joy. 🌸",
      sad: "I see you've been going through something difficult. It's okay to feel this way. I'm here with you. 💫",
      neutral: "You seem balanced. That's a good place to be. Keep checking in with yourself. 🌿"
    };

    return insights[dominantMood];
  }

  // Reset context (for new session)
  resetContext() {
    this.context = {
      recentEmotions: [],
      messageCount: 0,
      dominantMood: 'neutral'
    };
  }
}

export const aiService = new AIService();
