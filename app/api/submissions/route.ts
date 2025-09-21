import { NextResponse } from "next/server";
import { connectDB, TeamRegistration, Submission } from "@/lib/database";

export async function GET() {
  try {
    await connectDB();

    // Fetch teams and submissions separately
    const teams = await TeamRegistration.find({});
    const submissions = await Submission.find({}).sort({});

    // Match submissions with teams using team_id
    const teamsWithSubmissions = teams.map(team => {
      const teamSubmissions = submissions.filter(submission => 
        submission.team_id.toString() === team._id.toString()
      );

      return {
        _id: team._id,
        team_name: team.team_name,
        idea_title: team.idea_title,
        idea_document_url: team.idea_document_url,
        participants: team.participants.map((participant: any) => ({
          name: participant.name,
          github_profile: participant.github_profile,
          linkedin_profile: participant.linkedin_profile
        })),
        submissions: teamSubmissions.map(submission => ({
          submission_document_url: submission.submission_document_url,
          createdAt: submission.createdAt
        }))
      };
    });

    return NextResponse.json({ submissions: teamsWithSubmissions }, { status: 200 });

  } catch (error) {
    console.error("Error fetching submissions:", error);
    return NextResponse.json({ error: "Failed to fetch submissions" }, { status: 500 });
  }
}

