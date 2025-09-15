import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import LanguageSelector from '@/components/LanguageSelector';
import ChatInterface from '@/components/ChatInterface';
import { MessageCircle, Users, Shield, Globe, Heart, Stethoscope, Phone, AlertCircle } from 'lucide-react';
import heroImage from '@/assets/hero-healthcare.jpg';
import { translations } from '@/translations';

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showChat, setShowChat] = useState(false);
  
  const t = translations[selectedLanguage as keyof typeof translations] || translations.en;

  const features = [
    {
      icon: MessageCircle,
      title: t.multilingualSupport,
      description: t.multilingualDescription
    },
    {
      icon: Stethoscope,
      title: t.expertHealthGuidance,
      description: t.expertDescription
    },
    {
      icon: Shield,
      title: t.vaccinationSchedules,
      description: t.vaccinationDescription
    },
    {
      icon: AlertCircle,
      title: t.realTimeAlerts,
      description: t.alertsDescription
    }
  ];

  const stats = [
    { number: '80%', label: t.queryAccuracy },
    { number: '15+', label: t.languagesSupported },
    { number: '24/7', label: t.alwaysAvailable },
    { number: '100K+', label: t.communitiesServed }
  ];

  if (showChat) {
    return (
      <div className="min-h-screen bg-gradient-trust p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-healthcare flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Sensily</h1>
                <p className="text-muted-foreground">{t.healthcareAssistant}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSelector 
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
              />
              <Button variant="outline" onClick={() => setShowChat(false)}>
                {t.backToHome}
              </Button>
            </div>
          </div>
          <ChatInterface selectedLanguage={selectedLanguage} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-trust">
      {/* Header */}
      <header className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-healthcare flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Sensily</h1>
              <p className="text-muted-foreground text-sm">{t.healthcareForEveryone}</p>
            </div>
          </div>
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={setSelectedLanguage}
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {t.healthcare}
                <br />
                <span className="bg-gradient-healthcare bg-clip-text text-transparent">
                  {t.inYourLanguage}
                </span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                {t.heroDescription}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  variant="healthcare" 
                  size="lg"
                  onClick={() => setShowChat(true)}
                  className="text-lg px-8 py-6"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {t.startChatting}
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-6"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  {t.whatsappSupport}
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Healthcare assistance for diverse communities"
                className="w-full h-auto rounded-2xl shadow-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center shadow-soft">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t.healthcareMadeAccessible.split(' ').slice(0, 2).join(' ')} <span className="text-primary">{t.healthcareMadeAccessible.split(' ').slice(2).join(' ')}</span>
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.breakingLanguageBarriers}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 shadow-soft hover:shadow-medical transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-6 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 md:p-12 bg-gradient-healthcare text-white shadow-float">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              {t.readyToGetStarted}
            </h3>
            <p className="text-lg mb-8 opacity-90">
              {t.joinThousands}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="secondary"
                size="lg"
                onClick={() => setShowChat(true)}
                className="text-lg px-8 py-6"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                {t.tryNowFree}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary"
              >
                <Globe className="h-5 w-5 mr-2" />
                {t.learnMore}
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-6 py-8 border-t">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-gradient-healthcare flex items-center justify-center">
              <Heart className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Sensily</span>
          </div>
          <p className="text-muted-foreground">
            {t.empoweringCommunities}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
