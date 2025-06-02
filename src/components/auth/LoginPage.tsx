import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";

export const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGoogleLogin = useCallback(async () => {
    if (isLoading) return; // Prevent multiple clicks

    try {
      setIsLoading(true);
      toast({
        title: "Connecting to Google...",
        description: "Please wait while we redirect you.",
        duration: 2000,
      });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Error logging in with Google:', error);
      toast({
        title: "Error connecting to Google",
        description: "Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }, [isLoading, toast]);

  return (
    <div className={`
      min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 
      flex items-center justify-center p-4 transition-all duration-500
      ${isLoading ? 'opacity-75 scale-98' : 'opacity-100 scale-100'}
    `}>
      <Card className="w-full max-w-md bg-slate-900/90 border-purple-800">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Welcome to Bioinformatics.lk
          </CardTitle>
          <CardDescription className="text-lg text-gray-300">
            Sign in to access your courses and resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className={`
              w-full bg-slate-800 hover:bg-slate-700 text-gray-200
              border border-purple-800 shadow-lg hover:shadow-purple-900/20
              transition-all duration-300 transform hover:scale-105
              active:scale-95 space-x-2
              ${isLoading ? 'opacity-50 cursor-not-allowed translate-y-1' : ''}
            `}
            size="lg"
          >
            <svg className={`
              w-5 h-5 transition-all duration-300
              ${isLoading ? 'rotate-180 animate-spin' : ''}
            `} viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>{isLoading ? 'Connecting...' : 'Continue with Google'}</span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}; 