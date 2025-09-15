import React from 'react';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Stethoscope, Calendar, Shield, Phone, AlertTriangle, Clock, MapPin, Users } from 'lucide-react';

interface HealthcareInfoProps {
  selectedLanguage: string;
}

const HealthcareInfo: React.FC<HealthcareInfoProps> = ({ selectedLanguage }) => {
  const healthInfoCards = [
    {
      icon: AlertTriangle,
      title: 'Emergency Contacts',
      items: [
        '🚨 Emergency: 108',
        '🏥 Ambulance: 102', 
        '☎️ Health Helpline: 104',
        '🔥 Fire: 101'
      ],
      color: 'destructive'
    },
    {
      icon: Calendar,
      title: 'Vaccination Schedule',
      items: [
        '👶 Birth: BCG, OPV, Hepatitis B',
        '6️⃣ 6 weeks: DPT, IPV, Hib, Rotavirus',
        '🔟 10 weeks: DPT, IPV, Hib, Rotavirus',
        '1️⃣4️⃣ 14 weeks: DPT, IPV, Hib, Rotavirus'
      ],
      color: 'medical'
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      items: [
        '🧼 Wash hands frequently',
        '😷 Wear masks in crowded places',
        '💧 Drink clean, boiled water',
        '🥗 Eat fresh, nutritious food'
      ],
      color: 'success'
    },
    {
      icon: Stethoscope,
      title: 'Common Symptoms',
      items: [
        '🤒 Fever: Rest, fluids, paracetamol',
        '😷 Cold: Steam, warm liquids',
        '🤢 Nausea: Light food, ORS',
        '😪 Fatigue: Rest, balanced diet'
      ],
      color: 'healthcare'
    }
  ];

  const nearbyServices = [
    { icon: MapPin, name: 'Primary Health Centre', distance: '2.3 km', status: 'Open' },
    { icon: Phone, name: 'Community Health Worker', contact: '+91-XXXXX-XXXXX', status: 'Available' },
    { icon: Users, name: 'ASHA Worker', area: 'Local Ward', status: 'On Call' },
    { icon: Clock, name: '24/7 Pharmacy', distance: '1.8 km', status: 'Open' }
  ];

  return (
    <div className="space-y-6">
      {/* Health Alert */}
      <Alert className="border-warning-orange bg-warning-orange/10">
        <AlertTriangle className="h-4 w-4 text-warning-orange" />
        <AlertDescription className="text-warning-orange font-medium">
          Seasonal Flu Alert: Vaccination recommended for high-risk groups. Visit nearest PHC.
        </AlertDescription>
      </Alert>

      {/* Quick Health Info Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {healthInfoCards.map((card, index) => (
          <Card key={index} className="p-6 shadow-soft hover:shadow-medical transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                card.color === 'destructive' ? 'bg-destructive/10 text-destructive' :
                card.color === 'medical' ? 'bg-gradient-primary text-white' :
                card.color === 'success' ? 'bg-success-green/10 text-success-green' :
                'bg-gradient-healthcare text-white'
              }`}>
                <card.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
            </div>
            <ul className="space-y-2">
              {card.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-sm text-muted-foreground flex items-center">
                  {item}
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      {/* Nearby Services */}
      <Card className="p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Nearby Healthcare Services
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {nearbyServices.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <service.icon className="h-4 w-4 text-primary" />
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.distance || service.contact || service.area}
                  </p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'Open' || service.status === 'Available' || service.status === 'On Call'
                  ? 'bg-success-green/10 text-success-green'
                  : 'bg-muted text-muted-foreground'
              }`}>
                {service.status}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Button variant="medical" className="flex-1 sm:flex-none">
          <Phone className="h-4 w-4 mr-2" />
          Call Health Helpline
        </Button>
        <Button variant="trust" className="flex-1 sm:flex-none">
          <MapPin className="h-4 w-4 mr-2" />
          Find Nearby PHC
        </Button>
        <Button variant="outline" className="flex-1 sm:flex-none">
          <Calendar className="h-4 w-4 mr-2" />
          Book Appointment
        </Button>
      </div>
    </div>
  );
};

export default HealthcareInfo;