import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { initialResumes, initialJobs, localResumeMatcher } from '@/lib/recruiterData';
import { mockStudents } from '@/lib/admin-data';

export async function POST(request: Request) {
  try {
    const { studentId, jobId, customResume, customJobDesc } = await request.json();

    // 1. Resolve student profile and resume
    let candidateName = 'Candidate';
    let candidateSkills: string[] = [];
    let studentObj = mockStudents.find(s => s.id === studentId);
    let resume = initialResumes[studentId];

    if (customResume) {
      resume = {
        studentId: studentId || 'custom',
        name: customResume.name || 'Candidate',
        email: customResume.email || '',
        phone: customResume.phone || '',
        location: customResume.location || '',
        summary: customResume.summary || '',
        education: customResume.education || [],
        experience: customResume.experience || [],
        projects: customResume.projects || [],
        skills: customResume.skills || [],
      };
      candidateSkills = customResume.skills || [];
      candidateName = customResume.name || 'Candidate';
    } else if (resume) {
      candidateSkills = resume.skills;
      candidateName = resume.name;
    }

    // 2. Resolve job description
    let job = initialJobs.find(j => j.id === jobId);
    let jobSkills: string[] = [];
    let jobDescText = '';

    if (customJobDesc) {
      jobDescText = customJobDesc.description || '';
      jobSkills = customJobDesc.skills || [];
    } else if (job) {
      jobDescText = `${job.title} - ${job.description}. Requirements: ${job.requirements.join('. ')}`;
      jobSkills = job.skills;
    }

    // 3. Fallback check for API key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your-gemini-api-key') {
      // Run the high-fidelity local matcher
      const localResult = localResumeMatcher(
        candidateSkills,
        jobSkills,
        studentObj || {
          id: 'custom',
          name: candidateName,
          email: '',
          avatar: '',
          role: 'support_agent',
          status: 'active',
          joinedAt: '',
          lastActive: '',
          country: '',
          coursesEnrolled: 5,
          coursesCompleted: 2,
          xpPoints: 1200,
          level: 4,
          plan: 'Pro',
          certificates: 1,
        }
      );
      return NextResponse.json({ ...localResult, isDemoMode: true });
    }

    // 4. Initialize Gemini AI Client
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-1.5-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const systemPrompt = `You are an expert technical recruiter and AI matching assistant.
Analyze the candidate's resume/portfolio against the job requirements.
Compare technical skills, experience levels, project depths, and educational background.
Calculate an overall fit score (0 to 100).
Identify technical gaps and recommend specific training topics or courses on our platform.
Our courses include: 'React & Next.js Complete Guide', 'Machine Learning Mastery', 'Python for Data Analysis', 'UI/UX Design Fundamentals', 'Cloud Architecture on AWS', 'Ethical Hacking & Penetration Testing'.

You MUST return a JSON object matches the schema below exactly:
{
  "score": number,
  "technicalFit": "string summarizing technical alignment",
  "experienceFit": "string summarizing experience alignment",
  "skillGaps": ["gap1", "gap2", ...],
  "courseRecommendations": [{"title": "Course Title matching our list", "link": "/courses"}]
}`;

    const prompt = `
Candidate Resume Data:
${JSON.stringify(resume || { skills: candidateSkills, name: candidateName })}

Job Description & Requirements:
${jobDescText || JSON.stringify({ skills: jobSkills })}

Analyze and return the structured match evaluation JSON:`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemPrompt + '\n\n' + prompt }] }]
    });

    const text = result.response.text();
    const parsedData = JSON.parse(text);

    return NextResponse.json({ ...parsedData, isDemoMode: false });
  } catch (error: any) {
    console.error('Gemini Resume Matching API Error:', error);
    return NextResponse.json(
      { error: 'Failed to evaluate resume matching', details: error.message },
      { status: 500 }
    );
  }
}
