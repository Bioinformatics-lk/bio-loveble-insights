
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { User, BookOpen, Award, Upload } from 'lucide-react';
import LMSDashboard from './LMSDashboard';

interface UserProfile {
  id: string;
  username: string | null;
  full_name: string | null;
  organization: string | null;
  description: string | null;
  profile_picture_url: string | null;
}

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showLMS, setShowLMS] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    organization: '',
    description: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      await getProfile(user.id);
    }
  };

  const getProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    } else if (data) {
      // Ensure all required fields are present
      const profileData: UserProfile = {
        id: data.id,
        username: data.username || null,
        full_name: data.full_name || null,
        organization: data.organization || null,
        description: data.description || null,
        profile_picture_url: data.profile_picture_url || null
      };
      setProfile(profileData);
      setFormData({
        username: data.username || '',
        full_name: data.full_name || '',
        organization: data.organization || '',
        description: data.description || ''
      });
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    const { error } = await supabase
      .from('profiles')
      .upsert({
        id: user.id,
        ...formData,
        updated_at: new Date().toISOString()
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully"
      });
      setIsEditing(false);
      await getProfile(user.id);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (showLMS) {
    return <LMSDashboard user={user} profile={profile} onBack={() => setShowLMS(false)} />;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/lovable-uploads/c030abde-25c2-45ab-9c8f-0e9257ee88f6.png')"
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white/90"></div>
      
      {/* Decorative background image */}
      <div 
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-64 h-64 opacity-30 bg-contain bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/c030abde-25c2-45ab-9c8f-0e9257ee88f6.png')"
        }}
      ></div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
          <Button onClick={handleSignOut} variant="outline">
            Sign Out
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold flex items-center gap-2">
                    <User className="w-5 h-5" />
                    User Profile
                  </h2>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    size="sm"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </Button>
                </div>

                <div className="space-y-4">
                  {/* Profile Picture */}
                  <div className="flex flex-col items-center mb-4">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                      {profile?.profile_picture_url ? (
                        <img
                          src={profile.profile_picture_url}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    {isEditing && (
                      <Button variant="outline" size="sm">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Photo
                      </Button>
                    )}
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Username</label>
                    {isEditing ? (
                      <Input
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        placeholder="Enter username"
                      />
                    ) : (
                      <p className="text-gray-700">{profile?.username || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    {isEditing ? (
                      <Input
                        value={formData.full_name}
                        onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                        placeholder="Enter full name"
                      />
                    ) : (
                      <p className="text-gray-700">{profile?.full_name || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Organization</label>
                    {isEditing ? (
                      <Input
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        placeholder="Enter organization"
                      />
                    ) : (
                      <p className="text-gray-700">{profile?.organization || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    {isEditing ? (
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        placeholder="Enter description"
                        rows={3}
                      />
                    ) : (
                      <p className="text-gray-700">{profile?.description || 'Not set'}</p>
                    )}
                  </div>

                  {isEditing && (
                    <Button onClick={updateProfile} className="w-full">
                      Save Changes
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Action Buttons */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer" onClick={() => setShowLMS(true)}>
                <CardContent className="p-8 text-center">
                  <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                  <h3 className="text-2xl font-bold mb-2">Our Courses</h3>
                  <p className="text-gray-600">Access our comprehensive learning management system and explore available courses</p>
                </CardContent>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
                <CardContent className="p-8 text-center">
                  <Award className="w-16 h-16 mx-auto mb-4 text-green-600" />
                  <h3 className="text-2xl font-bold mb-2">Our Services</h3>
                  <p className="text-gray-600">Discover our professional services and consulting offerings</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
