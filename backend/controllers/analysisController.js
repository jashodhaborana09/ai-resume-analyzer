const ResumeHistory = require("../models/ResumeHistory");

const {
  analyzeResumeWithAI,
  analyzeJobDescriptionWithAI,
} = require("../services/geminiService");

const analyzeResume = async (req, res, next) => {
  try {
    const { historyId } = req.body;

    const history = await ResumeHistory.findOne({
      _id: historyId,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        message: "Resume history not found",
      });
    }

    const aiResponse = await analyzeResumeWithAI(
      history.parsedData
    );

    const text =
      aiResponse?.choices?.[0]?.message?.content || "{}";

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let analysis;

    try {
      analysis = JSON.parse(cleanText);
    } catch {
      analysis = {
        atsScore: 75,
        resumeSummary: cleanText,
        missingSkills: [],
        recruiterFeedback: cleanText,
      };
    }

    history.analysis = analysis;

    await history.save();

    res.json({
      history,
      analysis,
    });
  } catch (error) {
    console.error("RESUME ANALYSIS ERROR:", error);
    next(error);
  }
};

const analyzeJobDescription = async (
  req,
  res,
  next
) => {
  try {
    const { historyId, jobDescription } = req.body;

    if (
      !jobDescription ||
      jobDescription.trim().length < 20
    ) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    const history = await ResumeHistory.findOne({
      _id: historyId,
      user: req.user.id,
    });

    if (!history) {
      return res.status(404).json({
        message: "Resume history not found",
      });
    }

    if (!history.analysis) {
      history.analysis = {
        atsScore: 0,
        resumeSummary: "",
        missingSkills: [],
        recruiterFeedback: "",
      };
    }

    const aiResponse =
      await analyzeJobDescriptionWithAI(
        history.parsedData.rawText,
        jobDescription
      );

    const text =
      aiResponse?.choices?.[0]?.message?.content || "{}";

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let jobMatch;

    try {
      jobMatch = JSON.parse(cleanText);
    } catch {
      jobMatch = {
        matchPercentage: 70,
        matchingSkills: [],
        missingSkills: [],
        recommendedKeywords: [],
        optimizationTips: cleanText,
      };
    }

    history.jobMatch = jobMatch;

    await history.save();

    res.json({ jobMatch });
  } catch (error) {
    console.error("JOB MATCH ERROR:", error);
    next(error);
  }
};

module.exports = {
  analyzeResume,
  analyzeJobDescription,
};