import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChatInterface } from '@/components/ChatInterface';
import { EmergencyCard } from '@/components/EmergencyCard';
import { DoctorSearch } from '@/components/DoctorSearch';
import { FeedbackForm } from '@/components/FeedbackForm';
import { Heart, MessageCircle, AlertTriangle, Search, MessageSquare } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-accent/5">
      <header className="bg-card border-b shadow-sm sticky top-0 z-10 backdrop-blur-sm bg-card/95">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                HealthCare Assistant
              </h1>
              <p className="text-sm text-muted-foreground">Your AI-powered health companion</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 h-auto p-1">
            <TabsTrigger value="chat" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Chat</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <AlertTriangle className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Emergency</span>
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <Search className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Doctors</span>
            </TabsTrigger>
            <TabsTrigger value="feedback" className="flex flex-col sm:flex-row items-center gap-2 py-3">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs sm:text-sm">Feedback</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <div className="max-w-4xl mx-auto">
              <ChatInterface />
            </div>
          </TabsContent>

          <TabsContent value="emergency" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <EmergencyCard />
            </div>
          </TabsContent>

          <TabsContent value="doctors" className="mt-0">
            <DoctorSearch />
          </TabsContent>

          <TabsContent value="feedback" className="mt-0">
            <div className="max-w-2xl mx-auto">
              <FeedbackForm />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-16 py-6 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>HealthCare Assistant &copy; 2025. For informational purposes only.</p>
          <p className="mt-1">Always consult healthcare professionals for medical advice.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
