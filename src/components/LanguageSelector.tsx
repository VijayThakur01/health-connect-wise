import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe, ChevronDown, Check } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
}

const nationalLanguages: Language[] = [
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
];

const regionalLanguages: Language[] = [
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
];

const internationalLanguages: Language[] = [
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский', flag: '🇷🇺' },
  { code: 'zh', name: 'Chinese', nativeName: '中文', flag: '🇨🇳' },
];

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selectedLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'national' | 'regional' | 'international'>('national');

  const allLanguages = [...nationalLanguages, ...regionalLanguages, ...internationalLanguages];
  const currentLanguage = allLanguages.find(lang => lang.code === selectedLanguage) || nationalLanguages[0];

  const handleLanguageSelect = (langCode: string) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  const renderLanguageList = (languages: Language[]) => (
    <div className="grid grid-cols-1 gap-2">
      {languages.map((language) => (
        <button
          key={language.code}
          onClick={() => handleLanguageSelect(language.code)}
          className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors text-left"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">{language.flag}</span>
            <div>
              <div className="font-medium">{language.name}</div>
              <div className="text-sm text-muted-foreground">{language.nativeName}</div>
            </div>
          </div>
          {selectedLanguage === language.code && (
            <Check className="h-4 w-4 text-primary" />
          )}
        </button>
      ))}
    </div>
  );

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 min-w-[160px]"
      >
        <Globe className="h-4 w-4" />
        <span className="flex items-center gap-2">
          <span>{currentLanguage.flag}</span>
          <span>{currentLanguage.name}</span>
        </span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <Card className="absolute top-full mt-2 right-0 w-80 max-h-96 overflow-hidden shadow-float z-50">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('national')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${
                  activeTab === 'national' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                National
              </button>
              <button
                onClick={() => setActiveTab('regional')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${
                  activeTab === 'regional' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Regional
              </button>
              <button
                onClick={() => setActiveTab('international')}
                className={`flex-1 p-3 text-sm font-medium transition-colors ${
                  activeTab === 'international' 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                International
              </button>
            </div>
          </div>
          
          <div className="p-4 max-h-64 overflow-y-auto">
            {activeTab === 'national' && renderLanguageList(nationalLanguages)}
            {activeTab === 'regional' && renderLanguageList(regionalLanguages)}
            {activeTab === 'international' && renderLanguageList(internationalLanguages)}
          </div>
        </Card>
      )}
    </div>
  );
};

export default LanguageSelector;