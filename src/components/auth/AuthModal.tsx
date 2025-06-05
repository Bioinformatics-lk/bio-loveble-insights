import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from 'react-router-dom';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast({ title: "Successfully logged in!" });
        onClose();
        navigate('/dashboard');
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username,
              full_name: username,
            }
          }
        });
        if (error) throw error;
        toast({ title: "Account created successfully!" });
        onClose();
      }
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
      <DialogContent className="bg-gradient-to-br from-[#000A33] to-[#363B6B] backdrop-blur-md border border-[#EAE3F5]/20 text-[#EAE3F5]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-[#EAE3F5]">
            {isLogin ? 'Welcome Back' : 'Join Us'}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {!isLogin && (
            <div>
              <Label htmlFor="username" className="text-[#EAE3F5]">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={!isLogin}
                className="bg-[#000A33]/40 border-[#EAE3F5]/20 text-[#EAE3F5] placeholder:text-[#EAE3F5]/70"
                placeholder="Enter your username"
              />
            </div>
          )}
          
          <div>
            <Label htmlFor="email" className="text-[#EAE3F5]">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#000A33]/40 border-[#EAE3F5]/20 text-[#EAE3F5] placeholder:text-[#EAE3F5]/70"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <Label htmlFor="password" className="text-[#EAE3F5]">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#000A33]/40 border-[#EAE3F5]/20 text-[#EAE3F5] placeholder:text-[#EAE3F5]/70"
              placeholder="Enter your password"
            />
          </div>
          
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#54366B] hover:bg-[#410056] text-[#EAE3F5] border border-[#EAE3F5]/20 transition-all transform hover:scale-105"
          >
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </Button>
          
          <Button
            type="button"
            variant="ghost"
            onClick={() => setIsLogin(!isLogin)}
            className="w-full text-[#EAE3F5]/90 hover:text-[#EAE3F5] hover:bg-[#000A33]/40"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
