// Voice Recognition and Synthesis Service
export class VoiceService {
  private recognition: any;
  private synthesis: SpeechSynthesis | null = null;
  private isListening: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';
      }
      this.synthesis = window.speechSynthesis || null;
    }
  }

  // Start listening to user's voice
  startListening(onResult: (text: string) => void, onEnd: () => void) {
    if (!this.recognition) {
      console.error('Speech recognition not supported');
      return;
    }

    this.isListening = true;

    this.recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join('');
      
      onResult(transcript);
    };

    this.recognition.onend = () => {
      this.isListening = false;
      onEnd();
    };

    this.recognition.start();
  }

  // Stop listening
  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Speak text with emotion
  speak(text: string, emotion: 'happy' | 'sad' | 'neutral' = 'neutral') {
    if (!this.synthesis || typeof window === 'undefined') return;

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Adjust voice parameters based on emotion
    switch (emotion) {
      case 'happy':
        utterance.pitch = 1.2;
        utterance.rate = 1.1;
        break;
      case 'sad':
        utterance.pitch = 0.8;
        utterance.rate = 0.9;
        break;
      default:
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
    }

    utterance.volume = 0.8;
    this.synthesis.speak(utterance);
  }

  // Analyze voice tone (simplified - in production use Hume AI)
  analyzeVoiceTone(audioData: any): 'happy' | 'sad' | 'neutral' {
    // This is a placeholder - real implementation would use ML
    // For demo, we'll use text sentiment
    return 'neutral';
  }

  // Check if voice is supported
  isSupported(): boolean {
    return !!(this.recognition && this.synthesis);
  }
}

export const voiceService = new VoiceService();
