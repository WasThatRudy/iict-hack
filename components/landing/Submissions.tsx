'use client'
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TeamSubmission {
  _id: string;
  team_name: string;
  idea_title: string;
  idea_document_url: string;
  submission_document_url: Array<Record<string, string>>;
  participants: Array<{
    name: string;
    github_profile?: string;
    linkedin_profile?: string;
  }>;
}

interface SubmissionsProps {
  submissions: TeamSubmission[];
}

const Submissions: React.FC<SubmissionsProps> = ({ submissions }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-black" id="submissions">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
              Top Submissions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 animate-pulse">
                <div className="h-6 bg-white/20 rounded mb-4"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded mb-2"></div>
                <div className="h-4 bg-white/10 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-black" id="submissions">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
            Top Submissions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">
            Discover the innovative solutions from our top-performing teams
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {submissions.map((team, index) => (
            <motion.div
              key={team._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-lg border border-white/10 shadow-lg hover:shadow-xl hover:shadow-[#C83DAD]/30 hover:border-[#C83DAD]/60 hover:bg-white/20 transition-all duration-300 p-6"
            >
              {/* Team Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{team.team_name}</h3>
                  <p className="text-[#C83DAD] text-sm font-medium">{team.idea_title}</p>
                </div>
                <div className="flex items-center justify-center w-8 h-8 bg-[#C83DAD] text-white text-sm font-bold rounded-full">
                  {index + 1}
                </div>
              </div>

              {/* Team Description */}
              <div className="mb-6">
                <p className="text-white/80 text-sm leading-relaxed">
                  {team.idea_document_url ? 
                    `An innovative solution focused on ${team.idea_title.toLowerCase()}. This project demonstrates cutting-edge approaches to compiler technology and programming language design.` :
                    'A creative solution showcasing innovative thinking in compiler technology and programming language development.'
                  }
                </p>
              </div>

              {/* Links Section */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-[#C83DAD] mb-2">Project Links</h4>
                
                {/* Demo Link */}
                {team.submission_document_url?.find(sub => sub.demo) && (
                  <a
                    href={team.submission_document_url?.find(sub => sub.demo)?.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm">Live Demo</span>
                  </a>
                )}

                {/* PPT Link */}
                {team.submission_document_url?.find(sub => sub.ppt) && (
                  <a
                    href={team.submission_document_url?.find(sub => sub.ppt)?.ppt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm">Presentation</span>
                  </a>
                )}

                {/* GitHub Link */}
                {team.submission_document_url?.find(sub => sub.github) && (
                  <a
                    href={team.submission_document_url?.find(sub => sub.github)?.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span className="text-sm">GitHub Repository</span>
                  </a>
                )}

                {/* Other Links */}
                {team.submission_document_url && team.submission_document_url
                  .filter(sub => !sub.demo && !sub.ppt && !sub.github)
                  .map((sub, idx) => (
                    <a
                      key={idx}
                      href={Object.values(sub)[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      <span className="text-sm capitalize">{Object.keys(sub)[0]}</span>
                    </a>
                  ))}
              </div>

              {/* Team Members */}
              <div className="mt-6 pt-4 border-t border-white/10">
                <h4 className="text-sm font-semibold text-[#C83DAD] mb-2">Team Members</h4>
                <div className="flex flex-wrap gap-2">
                  {team.participants?.map((member, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#C83DAD] rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-white">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <span className="text-xs text-white/70">{member.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-white/40 text-lg mb-4">No submissions available yet</div>
            <p className="text-white/20">Check back later to see the amazing projects!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Submissions;

