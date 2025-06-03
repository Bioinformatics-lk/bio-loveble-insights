'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Briefcase, LogOut, User, Brain, CheckCircle, Clock, Settings, Home, Book, MessageSquare, BarChart } from "lucide-react";
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

interface UserDashboardProps {
  user: SupabaseUser;
}

export const UserDashboard = ({ user }: UserDashboardProps) => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'courses', label: 'Courses', icon: Book },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'analytics', label: 'Analytics', icon: BarChart },
  ];

  const recentActivity = [
    { title: 'Completed Module 3 of Bioinformatics Basics', time: '2 hours ago', icon: CheckCircle },
    { title: 'Started New Course: Molecular Docking', time: '1 day ago', icon: BookOpen },
    { title: 'Received Certificate for Python in Bioinformatics', time: '3 days ago', icon: Book },
  ];

  const courseProgress = [
    { title: 'Bioinformatics Basics', progress: 75 },
    { title: 'Molecular Docking', progress: 30 },
    { title: 'Python in Bioinformatics', progress: 100 },
  ];

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  const handleExploreSlhaif = () => {
    navigate('/slhaif');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1a] via-[#1a1a2e] to-[#16213e] text-white animate-fade-in">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-[#1a1a2e]/80 backdrop-blur-md border-r border-white/10 transition-all-smooth">
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-8 animate-fade-in">
            <Brain className="w-6 h-6 text-white animate-pulse-slow" />
            <span className="text-xl font-bold">SLHAIF</span>
          </div>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center space-x-2 p-3 rounded-lg transition-all-smooth ${
                  activeSection === item.id
                    ? 'bg-[#16213e] text-white'
                    : 'text-white/70 hover:bg-[#16213e]/50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 transition-all-smooth"
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10 transition-all-smooth"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <div className="bg-[#1a1a2e]/50 rounded-xl p-6 border border-white/10 card-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Total Courses</h3>
                <BookOpen className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-3xl font-bold">12</p>
            </div>

            <div className="bg-[#1a1a2e]/50 rounded-xl p-6 border border-white/10 card-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Completed</h3>
                <CheckCircle className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-3xl font-bold">4</p>
            </div>

            <div className="bg-[#1a1a2e]/50 rounded-xl p-6 border border-white/10 card-hover">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">In Progress</h3>
                <Clock className="w-5 h-5 text-white/70" />
              </div>
              <p className="text-3xl font-bold">3</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 bg-[#1a1a2e]/50 rounded-xl p-6 border border-white/10 card-hover">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-3 rounded-lg bg-[#16213e]/50 transition-all-smooth hover:bg-[#16213e]"
                >
                  <activity.icon className="w-5 h-5 text-white/70" />
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-white/50">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Course Progress */}
          <div className="mt-8 bg-[#1a1a2e]/50 rounded-xl p-6 border border-white/10 card-hover">
            <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
            <div className="space-y-4">
              {courseProgress.map((course, index) => (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-[#16213e]/50 transition-all-smooth hover:bg-[#16213e]"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{course.title}</h3>
                    <span className="text-sm text-white/70">{course.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all-smooth"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
