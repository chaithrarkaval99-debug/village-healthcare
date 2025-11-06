import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, AlertTriangle, MapPin } from 'lucide-react';
import { toast } from 'sonner';

export function EmergencyCard() {
  const handleEmergencyCall = () => {
    toast.error('For immediate medical assistance, call 911 or your local emergency number', {
      duration: 5000,
    });
    // In a real app, this could integrate with the device's phone dialer
  };

  const emergencyContacts = [
    { name: 'Emergency Services', number: '911', icon: AlertTriangle },
    { name: 'Poison Control', number: '1-800-222-1222', icon: Phone },
    { name: 'Mental Health Crisis', number: '988', icon: Phone },
  ];

  return (
    <Card className="p-6 shadow-lg border-2 border-destructive/20 bg-gradient-to-br from-destructive/5 to-background">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
          <AlertTriangle className="w-6 h-6 text-destructive" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Emergency Contacts</h2>
          <p className="text-sm text-muted-foreground">For urgent medical assistance</p>
        </div>
      </div>

      <div className="space-y-3">
        {emergencyContacts.map((contact) => (
          <Button
            key={contact.name}
            variant="outline"
            className="w-full justify-start h-auto py-4 px-4 border-destructive/30 hover:bg-destructive/10 hover:border-destructive"
            onClick={handleEmergencyCall}
          >
            <contact.icon className="w-5 h-5 mr-3 text-destructive flex-shrink-0" />
            <div className="flex-1 text-left">
              <div className="font-semibold text-foreground">{contact.name}</div>
              <div className="text-sm text-muted-foreground">{contact.number}</div>
            </div>
          </Button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-muted rounded-lg">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-xs text-muted-foreground">
            In case of emergency, always call your local emergency services immediately. This app is for informational purposes only.
          </p>
        </div>
      </div>
    </Card>
  );
}
