import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Bot, User, Heart, Shield, Calendar, AlertTriangle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  originalText?: string; // For showing translations
}

interface ChatInterfaceProps {
  selectedLanguage: string;
}

// Mock translations for demonstration
const translations: Record<string, Record<string, string>> = {
  'en': {
    'paracetamol': 'Paracetamol',
    'fever': 'Fever',
    'headache': 'Headache',
    'vaccination': 'Vaccination',
    'symptoms': 'Symptoms',
  },
  'hi': {
    'paracetamol': 'पैरासिटामोल',
    'fever': 'बुखार',
    'headache': 'सिरदर्द',
    'vaccination': 'टीकाकरण',
    'symptoms': 'लक्षण',
  },
  'or': {
    'paracetamol': 'ପାରାସେଟାମଲ',
    'fever': 'ଜର',
    'headache': 'ମୁଣ୍ଡ ବିଷ',
    'vaccination': 'ଟୀକାକରଣ',
    'symptoms': 'ଲକ୍ଷଣ',
  },
  'bn': {
    'paracetamol': 'প্যারাসিটামল',
    'fever': 'জ্বর',
    'headache': 'মাথা ব্যথা',
    'vaccination': 'টিকাদান',
    'symptoms': 'উপসর্গ',
  }
};

const quickActions = [
  { icon: Heart, text: 'Common Symptoms', key: 'symptoms' },
  { icon: Shield, text: 'Vaccination Schedule', key: 'vaccination' },
  { icon: Calendar, text: 'Health Calendar', key: 'calendar' },
  { icon: AlertTriangle, text: 'Emergency Info', key: 'emergency' },
];

const ChatInterface: React.FC<ChatInterfaceProps> = ({ selectedLanguage }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sensily, your healthcare assistant. I can help you with symptoms, medications, vaccination schedules, and health information in your local language. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const translateText = (text: string, targetLang: string): string => {
    const langTranslations = translations[targetLang] || translations['en'];
    let translatedText = text;
    
    // Simple translation logic for demonstration
    Object.entries(langTranslations).forEach(([english, translated]) => {
      const regex = new RegExp(`\\b${english}\\b`, 'gi');
      translatedText = translatedText.replace(regex, translated);
    });
    
    return translatedText;
  };

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('fever') || lowerMessage.includes('बुखार') || lowerMessage.includes('ଜର')) {
      return `For fever management: 1) Take ${translateText('paracetamol', selectedLanguage)} 500mg every 6 hours, 2) Stay hydrated, 3) Rest well, 4) If fever persists for more than 3 days, consult a doctor. Would you like vaccination information or emergency contacts?`;
    }
    
    if (lowerMessage.includes('paracetamol') || lowerMessage.includes('पैरासिटामोल') || lowerMessage.includes('ପାରାସେଟାମଲ')) {
      return `${translateText('Paracetamol', selectedLanguage)} is safe for fever and pain relief. Adult dose: 500-1000mg every 4-6 hours (max 4g/day). Not suitable for liver problems. Always consult your local healthcare provider for persistent symptoms.`;
    }
    
    if (lowerMessage.includes('vaccination') || lowerMessage.includes('टीकाकरण') || lowerMessage.includes('ଟୀକାକରଣ')) {
      return `Current ${translateText('vaccination', selectedLanguage)} schedule: COVID-19 booster available, Hepatitis B for adults, seasonal flu vaccine recommended. Visit your nearest PHC or government hospital. Would you like specific age-group recommendations?`;
    }
    
    return `I understand you're asking about "${userMessage}". Based on current health guidelines, I recommend consulting your local healthcare provider for personalized advice. I can also help with general information about ${translateText('symptoms', selectedLanguage)}, medications, or vaccination schedules. What specific health topic interests you?`;
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    const quickMessages: Record<string, string> = {
      symptoms: 'What are the common symptoms of viral fever?',
      vaccination: 'What vaccinations do I need this year?',
      calendar: 'Show me the health calendar for this month',
      emergency: 'What should I do in a medical emergency?'
    };
    
    setInputText(quickMessages[action] || '');
  };

  return (
    <Card className="flex flex-col h-[600px] max-w-2xl mx-auto shadow-float">
      {/* Chat Header */}
      <div className="flex items-center gap-3 p-4 border-b bg-gradient-healthcare text-white rounded-t-lg">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-semibold">Sensily Health Assistant</h3>
          <p className="text-sm opacity-90">Always here to help with your health queries</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-trust">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start gap-2 max-w-[80%] ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-primary text-white' 
                  : 'bg-secondary text-secondary-foreground'
              }`}>
                {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              <div className={`p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-primary text-white'
                  : 'bg-white shadow-soft'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-1 opacity-70 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="bg-white p-3 rounded-2xl shadow-soft">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-3">
          {quickActions.map((action) => (
            <Button
              key={action.key}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.key)}
              className="flex items-center gap-2 text-xs"
            >
              <action.icon className="h-3 w-3" />
              {action.text}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Ask about symptoms, medications, or health advice..."
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1"
          />
          <Button 
            onClick={handleSendMessage}
            variant="medical"
            size="icon"
            disabled={!inputText.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ChatInterface;