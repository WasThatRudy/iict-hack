"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Users, 
  Calendar, 
  FileText, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Globe,
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  Building
} from 'lucide-react';

interface Participant {
  name: string;
  email: string;
  age: number;
  phone: string;
  student_or_professional: string;
  college_or_company_name: string;
  linkedin_profile: string;
  github_profile: string;
  devfolio_profile: string;
  _id: string;
}

interface Team {
  _id: string;
  team_name: string;
  team_size: number;
  idea_title: string;
  participants: Participant[];
  status: 'registered' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface Submission {
  _id: string;
  team_id: string;
  submission_url: string;
  github_repo_url: string;
  demo_video_url: string;
  submission_text: string;
  submission_date: string;
  __v: number;
}

interface DashboardData {
  status: boolean;
  message: string;
  team: Team;
  submission?: Submission;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('/api/teamDetails', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      
      if (data.status) {
        setDashboardData(data);
      } else {
        setError(data.message);
        if (response.status === 401) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    } catch (err) {
      setError('Failed to fetch dashboard data');
      console.error('Dashboard fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-400';
      case 'rejected':
        return 'text-red-400';
      case 'registered':
        return 'text-yellow-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    const iconSize = 18;
    switch (status) {
      case 'approved':
        return <CheckCircle size={iconSize} className="text-green-400" />;
      case 'rejected':
        return <XCircle size={iconSize} className="text-red-400" />;
      case 'registered':
        return <Clock size={iconSize} className="text-yellow-400" />;
      default:
        return <FileText size={iconSize} className="text-gray-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Loader2 size={48} className="text-[#C540AB] animate-spin" />
          <p className="text-white">Loading dashboard...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </motion.div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">No data available</p>
      </div>
    );
  }

  const { team, submission } = dashboardData;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <motion.div
        className="bg-gray-900/50 border-b border-gray-700/50 backdrop-blur-sm sticky top-0 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gradient-magenta">Team Dashboard</h1>
              <p className="text-gray-400 text-sm">Welcome back, {team.team_name}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Team Overview */}
          <motion.div
            className="lg:col-span-2 h-full"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users size={24} className="text-[#C540AB]" />
                  <h2 className="text-xl font-semibold text-white">Team Information</h2>
                </div>
                <div className={`flex items-center gap-2 ${getStatusColor(team.status)}`}>
                  {getStatusIcon(team.status)}
                  <span className="font-medium capitalize">{team.status}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300">Team Name</Label>
                  <p className="text-white font-medium mt-1">{team.team_name}</p>
                </div>
                <div>
                  <Label className="text-gray-300">Team Size</Label>
                  <p className="text-white font-medium mt-1">{team.team_size} members</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-gray-300">Idea Title</Label>
                  <p className="text-white font-medium mt-1">{team.idea_title}</p>
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Calendar size={14} />
                    Registration Date
                  </Label>
                  <p className="text-white font-medium mt-1">{formatDate(team.createdAt)}</p>
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Clock size={14} />
                    Last Updated
                  </Label>
                  <p className="text-white font-medium mt-1">{formatDate(team.updatedAt)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Status Card */}
          <motion.div
            className="lg:col-span-1 h-full"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm h-full">
              <div className="flex items-center gap-3 mb-4">
                <FileText size={20} className="text-[#C540AB]" />
                <h3 className="text-lg font-semibold text-white">Status Overview</h3>
              </div>
              <div className="space-y-4 h-full justify-between flex flex-col py-8 pb-12">
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Registration
                  </span>
                  <span className="text-green-400 font-medium">Complete</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center gap-2">
                    {getStatusIcon(team.status)}
                    Team Review
                  </span>
                  <span className={`${getStatusColor(team.status)} font-medium capitalize`}>
                    {team.status === 'registered' ? 'Pending' : team.status}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-300 flex items-center gap-2">
                    {submission ? 
                      <CheckCircle size={16} className="text-green-400" /> : 
                      <Clock size={16} className="text-gray-400" />
                    }
                    Submission
                  </span>
                  <span className={`${submission ? 'text-green-400' : 'text-gray-400'} font-medium`}>
                    {submission ? 'Submitted' : 'Not Submitted'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Members */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <Users size={24} className="text-[#C540AB]" />
              <h3 className="text-xl font-semibold text-white">Team Members</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {team.participants.map((participant, index) => (
                <motion.div
                  key={participant._id}
                  className="bg-gray-800/50 border border-gray-600/50 rounded-lg p-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <div className="space-y-3">
                    <div>
                      <Label className="text-gray-300 text-xs">Name</Label>
                      <p className="text-white font-medium">{participant.name}</p>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs flex items-center gap-1">
                        <Mail size={12} />
                        Email
                      </Label>
                      <p className="text-white text-sm">{participant.email}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-gray-300 text-xs">Age</Label>
                        <p className="text-white text-sm">{participant.age}</p>
                      </div>
                      <div>
                        <Label className="text-gray-300 text-xs">Type</Label>
                        <p className="text-white text-sm capitalize">{participant.student_or_professional}</p>
                      </div>
                    </div>
                    <div>
                      <Label className="text-gray-300 text-xs flex items-center gap-1">
                        <Building size={12} />
                        {participant.student_or_professional === 'student' ? 'College' : 'Company'}
                      </Label>
                      <p className="text-white text-sm">{participant.college_or_company_name}</p>
                    </div>
                    <div className="flex gap-3 pt-3">
                      {participant.linkedin_profile && (
                        <a
                          href={participant.linkedin_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#C540AB] hover:text-[#E055C3] text-sm transition-colors"
                        >
                          <Linkedin size={16} />
                          <span>LinkedIn</span>
                        </a>
                      )}
                      {participant.github_profile && (
                        <a
                          href={participant.github_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#C540AB] hover:text-[#E055C3] text-sm transition-colors"
                        >
                          <Github size={16} />
                          <span>GitHub</span>
                        </a>
                      )}
                      {participant.devfolio_profile && (
                        <a
                          href={participant.devfolio_profile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-[#C540AB] hover:text-[#E055C3] text-sm transition-colors"
                        >
                          <Globe size={16} />
                          <span>Devfolio</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Submission Section */}
        {submission && (
          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <FileText size={24} className="text-[#C540AB]" />
                <h3 className="text-xl font-semibold text-white">Project Submission</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Calendar size={14} />
                    Submission Date
                  </Label>
                  <p className="text-white font-medium mt-1">{formatDate(submission.submission_date)}</p>
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <ExternalLink size={14} />
                    Project URL
                  </Label>
                  {submission.submission_url ? (
                    <a
                      href={submission.submission_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C540AB] hover:text-[#E055C3] font-medium mt-1 flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={16} />
                      View Project
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1">Not provided</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Github size={14} />
                    GitHub Repository
                  </Label>
                  {submission.github_repo_url ? (
                    <a
                      href={submission.github_repo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C540AB] hover:text-[#E055C3] font-medium mt-1 flex items-center gap-2 transition-colors"
                    >
                      <Github size={16} />
                      View Repository
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1">Not provided</p>
                  )}
                </div>
                <div>
                  <Label className="text-gray-300 flex items-center gap-2">
                    <Globe size={14} />
                    Demo Video
                  </Label>
                  {submission.demo_video_url ? (
                    <a
                      href={submission.demo_video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C540AB] hover:text-[#E055C3] font-medium mt-1 flex items-center gap-2 transition-colors"
                    >
                      <ExternalLink size={16} />
                      Watch Demo
                    </a>
                  ) : (
                    <p className="text-gray-400 mt-1">Not provided</p>
                  )}
                </div>
                {submission.submission_text && (
                  <div className="md:col-span-2">
                    <Label className="text-gray-300">Project Description</Label>
                    <p className="text-white mt-1 leading-relaxed">{submission.submission_text}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="bg-gray-900/50 border border-gray-700/50 rounded-lg p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={20} className="text-[#C540AB]" />
              <h3 className="text-lg font-semibold text-white">Need Help?</h3>
            </div>
            <p className="text-gray-300 mb-4">
              If you have any questions or need assistance, feel free to reach out to our support team.
            </p>
            <Button variant="outline" onClick={() => window.location.href = 'mailto:support@example.com'}>
              <Mail size={16} className="mr-2" />
              Contact Support
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
