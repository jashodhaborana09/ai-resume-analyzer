const mongoose = require("mongoose");

const resumeHistorySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  fileName: {
    type: String,
    required: true,
  },

  fileUrl: {
    type: String,
    required: true,
  },

  parsedData: {
    type: Object,
    required: true,
  },

  analysis: {
    type: Object,
    default: {
      atsScore: 0,
      resumeSummary: "",
      missingSkills: [],
      recruiterFeedback: "",
    },
  },

  jobMatch: {
    type: Object,
    default: {},
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model(
  "ResumeHistory",
  resumeHistorySchema
);
