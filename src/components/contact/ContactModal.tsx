import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, User } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name,
          email,
          message,
          meeting_date: selectedDate?.toISOString(),
        });

      if (error) throw error;

      toast({ title: "Message sent successfully!" });
      onClose();
      setName('');
      setEmail('');
      setMessage('');
      setSelectedDate(undefined);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md border border-purple-300/30 text-white max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-100">
            Contact Us
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-purple-200">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200/70"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-purple-200">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200/70"
                placeholder="Your email"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message" className="text-purple-200">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="bg-white/10 border-purple-300/30 text-white placeholder:text-purple-200/70"
              placeholder="Your message"
              rows={4}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Label className="text-purple-200">Select Meeting Date (Optional)</Label>
              <div className="bg-white/10 rounded-md p-3 border border-purple-300/30">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="text-white [&_.rdp-button]:text-white [&_.rdp-button]:hover:bg-purple-600/30 [&_.rdp-button]:rounded-md [&_.rdp-button]:p-2 [&_.rdp-button]:transition-colors [&_.rdp-head_cell]:text-purple-200 [&_.rdp-nav_button]:text-white [&_.rdp-nav_button]:hover:bg-purple-600/30 [&_.rdp-nav_button]:rounded-md [&_.rdp-nav_button]:p-2 [&_.rdp-nav_button]:transition-colors"
                  disabled={(date) => date < new Date()}
                />
              </div>
            </div>
            
            <div>
              <Label className="text-purple-200 mb-4 block">Contact Our Supervisors</Label>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-lg p-4 border border-purple-300/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="h-5 w-5 text-purple-300" />
                    <span className="font-semibold text-purple-100">Mr. Anuththara Gamage</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-purple-300" />
                    <span className="text-purple-200">0765617680</span>
                  </div>
                </div>
                
                <div className="bg-white/10 rounded-lg p-4 border border-purple-300/30">
                  <div className="flex items-center space-x-3 mb-2">
                    <User className="h-5 w-5 text-purple-300" />
                    <span className="font-semibold text-purple-100">Dr. Lakmal Ranathunga</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-purple-300" />
                    <span className="text-purple-200">0775207615</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
