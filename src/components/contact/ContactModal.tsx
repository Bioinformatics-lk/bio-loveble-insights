import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, User, Calendar } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load Calendly script when modal opens
  useEffect(() => {
    if (isOpen) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

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
        });

      if (error) throw error;

      toast({ title: "Message sent successfully!" });
      onClose();
      setName('');
      setEmail('');
      setMessage('');
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
      <DialogContent className="bg-gradient-to-br from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-md border border-purple-300/30 text-white max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-purple-100">
            Contact Us
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Contact Form */}
          <div className="space-y-4">
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
              
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>

            {/* Supervisor Contact Details */}
            <div className="mt-8">
              <Label className="text-purple-200 mb-4 block flex items-center gap-2">
                <User className="h-5 w-5" />
                Contact Our Supervisors
              </Label>
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

          {/* Right Column - Calendly Widget */}
          <div className="space-y-4">
            <Label className="text-purple-200 mb-4 block flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Schedule a Meeting
            </Label>
            <div className="bg-white/10 rounded-lg p-4 border border-purple-300/30">
              <div 
                className="calendly-inline-widget" 
                data-url="https://calendly.com/anuththaragamage45/30min" 
                style={{ minWidth: '320px', height: '600px' }}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
