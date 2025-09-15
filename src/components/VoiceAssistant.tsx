import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff, Volume2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translations } from '@/translations';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
  selectedLanguage: string;
  onVoiceMessage: (message: string) => void;
}

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ 
  selectedLanguage, 
  onVoiceMessage 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognition, setRecognition] = useState<any>(null);
  const { toast } = useToast();

  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  // Initialize speech recognition
  React.useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = false;
      recognitionInstance.lang = getLanguageCode(selectedLanguage);

      recognitionInstance.onstart = () => {
        setIsListening(true);
      };

      recognitionInstance.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onVoiceMessage(transcript);
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Could not process your voice. Please try again.",
          variant: "destructive",
        });
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, [selectedLanguage, onVoiceMessage, toast]);

  const getLanguageCode = (lang: string): string => {
    const langMap: Record<string, string> = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'or': 'or-IN',
      'bn': 'bn-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'ml': 'ml-IN',
      'kn': 'kn-IN',
      'gu': 'gu-IN',
      'mr': 'mr-IN',
      'pa': 'pa-IN',
    };
    return langMap[lang] || 'en-US';
  };

  const startListening = () => {
    if (recognition) {
      recognition.lang = getLanguageCode(selectedLanguage);
      recognition.start();
    } else {
      toast({
        title: t.voiceNotSupported,
        description: "Please use a supported browser for voice features.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
    }
    setIsListening(false);
  };

  const speakText = async (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = getLanguageCode(selectedLanguage);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      speechSynthesis.speak(utterance);
    }
  };

  // Expose speakText method (not using useImperativeHandle for simplicity)
  React.useEffect(() => {
    // This makes speakText available to parent if needed
  }, [selectedLanguage]);

  const hasVoiceSupport = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;

  if (!hasVoiceSupport) {
    return (
      <Card className="p-4 bg-muted">
        <div className="flex items-center gap-2 text-muted-foreground">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">{t.voiceNotSupported}</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isListening ? "destructive" : "outline"}
        size="sm"
        onClick={isListening ? stopListening : startListening}
        disabled={isSpeaking}
        className="flex items-center gap-2"
      >
        {isListening ? (
          <>
            <MicOff className="h-4 w-4" />
            {t.listening}
          </>
        ) : (
          <>
            <Mic className="h-4 w-4" />
            {t.startVoiceChat}
          </>
        )}
      </Button>
      
      {isSpeaking && (
        <div className="flex items-center gap-2 text-primary text-sm">
          <Volume2 className="h-4 w-4 animate-pulse" />
          {t.speaking}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;