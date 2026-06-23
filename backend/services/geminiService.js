const axios = require("axios");

const callAI = async (prompt) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.5-flash",
        max_tokens: 1000,
        temperature: 0.3,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("OPENROUTER SUCCESS");

    return response.data;
  } catch (error) {
    console.log("===== OPENROUTER ERROR =====");
    console.log("STATUS:", error.response?.status);
    console.log(
      "DATA:",
      JSON.stringify(error.response?.data, null, 2)
    );

    throw error;
  }
};

const analyzeResumeWithAI = async (parsedData) => {
  const prompt = `
Analyze this resume and return ONLY valid JSON.

{
  "atsScore": 0,
  "resumeSummary": "",
  "missingSkills": [],
  "recruiterFeedback": ""
}

Resume:
${parsedData.rawText}
`;

  return await callAI(prompt);
};

const analyzeJobDescriptionWithAI = async (
  resumeText,
  jobDescription
) => {
  const prompt = `
Compare this resume and job description.

Return ONLY valid JSON.

{
  "matchPercentage": 0,
  "matchingSkills": [],
  "missingSkills": [],
  "recommendedKeywords": [],
  "optimizationTips": ""
}

Resume:
${resumeText}

Job Description:
${jobDescription}
`;

  return await callAI(prompt);
};

module.exports = {
  analyzeResumeWithAI,
  analyzeJobDescriptionWithAI,
};