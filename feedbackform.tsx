import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Star, MessageSquare, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const feedbackSchema = z.object({
  name: z.string().trim().max(100).optional(),
  email: z.string().trim().email({ message: "Invalid email address" }).max(255).optional(),
  message: z.string().trim().min(1, { message: "Message cannot be empty" }).max(1000, { message: "Message must be less than 1000 characters" }),
  rating: z.number().min(1).max(5),
});

export function FeedbackForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    try {
      feedbackSchema.parse({ name, email, message, rating });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from('feedback').insert({
        name: name || null,
        email: email || null,
        message,
        rating,
      });

      if (error) throw error;

      toast.success('Thank you for your feedback!');
      
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="p-6 shadow-lg">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-accent" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Send Us Feedback</h2>
          <p className="text-sm text-muted-foreground">We'd love to hear from you</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name">Name (Optional)</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            maxLength={100}
          />
        </div>

        <div>
          <Label htmlFor="email">Email (Optional)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your.email@example.com"
            maxLength={255}
          />
        </div>

        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you think..."
            required
            rows={4}
            maxLength={1000}
          />
          <p className="text-xs text-muted-foreground mt-1">
            {message.length}/1000 characters
          </p>
        </div>

        <div>
          <Label>Rating *</Label>
          <div className="flex gap-2 mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                className="transition-transform hover:scale-110"
              >
                <Star
                  className={`w-8 h-8 ${
                    star <= (hoveredRating || rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={submitting} className="w-full">
          <Send className="w-4 h-4 mr-2" />
          {submitting ? 'Sending...' : 'Send Feedback'}
        </Button>
      </form>
    </Card>
  );
}
