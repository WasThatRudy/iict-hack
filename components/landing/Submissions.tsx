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
    college_or_company_name?: string;
  }>;
  submission?: {
    submission_document_url: Array<Record<string, string>>;
    createdAt: string;
    abstract?: string;
    status?: string;
  };
}

interface SubmissionsProps {
  submissions: TeamSubmission[];
}

const Submissions: React.FC<SubmissionsProps> = ({ submissions }) => {
  const [loading, setLoading] = useState(true);
  const [showOtherSubmissions, setShowOtherSubmissions] = useState(false);

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Separate finalist and non-finalist teams, then sort alphabetically by team name
  const finalistTeams = submissions
    .filter(team => team.submission?.status === 'finalist')
    .sort((a, b) => a.team_name.localeCompare(b.team_name));
  const otherTeams = submissions
    .filter(team => team.submission?.status !== 'finalist')
    .sort((a, b) => a.team_name.localeCompare(b.team_name));

  if (loading) {
    return (
      <section className="py-20" id="submissions">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
              Submissions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
          </div>
          <div className="bg-white/5 backdrop-blur-md rounded-lg border border-white/10 p-6 animate-pulse">
            <div className="h-6 bg-white/20 rounded mb-4"></div>
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-4 bg-white/10 rounded mb-2"></div>
            <div className="h-4 bg-white/10 rounded w-3/4"></div>
          </div>
        </div>
      </section>
    );
  }

  const renderTeamCard = (team: TeamSubmission, isFinalist: boolean = false) => (
    <motion.div
      key={team._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-white/10 backdrop-blur-md rounded-lg border border-white/10 shadow-lg hover:shadow-xl hover:shadow-[#C83DAD]/30 hover:border-[#C83DAD]/60 hover:bg-white/20 transition-all duration-300 p-6 ${
        isFinalist ? 'ring-2 ring-[#C83DAD]/50' : ''
      }`}
    >
      {/* Team Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isFinalist && (
            <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] text-white text-sm font-bold rounded-full">
              ★
            </div>
          )}
          <div>
            <h3 className="text-xl font-bold text-white">{team.team_name}</h3>
            <p className="text-[#C83DAD] text-sm font-medium">{team.idea_title}</p>
          </div>
        </div>
      </div>

      {/* Abstract Section */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-[#C83DAD] mb-2">Abstract</h4>
        <p className="text-white/80 text-sm leading-relaxed">
          {team.submission?.abstract || 'No abstract provided'}
        </p>
      </div>

      {/* Team Members */}
      <div className="mb-6">
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
              {member.college_or_company_name && (
                <span className="text-[10px] text-white/40"> — {member.college_or_company_name}</span>
              )}
              {(member.github_profile || member.linkedin_profile) && (
                <span className="flex items-center gap-1 ml-1">
                  {member.github_profile && (
                    <a
                      href={member.github_profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} GitHub`}
                      className="text-white/60 hover:text-[#C83DAD] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.565 21.796 24 17.309 24 12 24 5.373 18.627 0 12 0z"/>
                      </svg>
                    </a>
                  )}
                  {member.linkedin_profile && (
                    <a
                      href={member.linkedin_profile}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} LinkedIn`}
                      className="text-white/60 hover:text-[#C83DAD] transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.451 20.451h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.944v5.662H9.355V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.368-1.852 3.603 0 4.268 2.372 4.268 5.456v6.286zM5.337 7.433a2.064 2.064 0 110-4.129 2.064 2.064 0 010 4.129zM7.114 20.451H3.558V9h3.556v11.451zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                      </svg>
                    </a>
                  )}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Project Links */}
      <div>
        <h4 className="text-sm font-semibold text-[#C83DAD] mb-2">Project Links</h4>
        <div className="flex flex-wrap gap-3">
          {/* Demo Link */}
          {team.submission?.submission_document_url?.find(sub => sub.demo) && (
            <a
              href={team.submission.submission_document_url.find(sub => sub.demo)?.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Live Demo</span>
            </a>
          )}

          {/* PPT Link */}
          {team.submission?.submission_document_url?.find(sub => sub.ppt) && (
            <a
              href={team.submission.submission_document_url.find(sub => sub.ppt)?.ppt}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Presentation</span>
            </a>
          )}

          {/* GitHub Link */}
          {team.submission?.submission_document_url?.find(sub => sub.github) && (
            <a
              href={team.submission.submission_document_url.find(sub => sub.github)?.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>GitHub Repository</span>
            </a>
          )}

          {/* Other Links */}
          {team.submission?.submission_document_url && team.submission.submission_document_url
            .filter(sub => !sub.demo && !sub.ppt && !sub.github)
            .map((sub, idx) => (
              <a
                key={idx}
                href={Object.values(sub)[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-white/80 hover:text-[#C83DAD] transition-colors duration-200 text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span className="capitalize">{Object.keys(sub)[0]}</span>
              </a>
            ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20" id="submissions">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-[#C83DAD] via-[#DE5FB9] to-[#F481C9] bg-clip-text text-transparent font-corsiva italic">
            Submissions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-white/80 max-w-3xl mx-auto">
            Discover the innovative solutions from our participating teams
          </p>
        </div>

        {submissions.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-white/40 text-lg mb-4">No submissions available yet</div>
            <p className="text-white/20">Check back later to see the amazing projects!</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Finalist Teams */}
            {finalistTeams.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">★</span>
                    </div>
                    <span>Finalist Teams</span>
                  </h3>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {finalistTeams.map(team => renderTeamCard(team, true))}
                </div>
              </div>
            )}

            {/* Other Teams Toggle */}
            {otherTeams.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">Other Submissions</h3>
                  <button
                    onClick={() => setShowOtherSubmissions(!showOtherSubmissions)}
                    className="px-6 py-2 bg-gradient-to-r from-[#C83DAD] to-[#F481C9] text-white rounded-lg hover:from-[#C83DAD]/80 hover:to-[#F481C9]/80 transition-all duration-300 font-medium"
                  >
                    {showOtherSubmissions ? 'Hide' : `Show ${otherTeams.length} Other Submissions`}
                  </button>
                </div>
                
                {showOtherSubmissions && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {otherTeams.map(team => renderTeamCard(team, false))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Submissions;


