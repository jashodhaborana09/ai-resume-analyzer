const ResumeHistory = require('../models/ResumeHistory');

const getHistory = async (req, res, next) => {
  try {
    const entries = await ResumeHistory.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

const getHistoryById = async (req, res, next) => {
  try {
    const entry = await ResumeHistory.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) {
      res.status(404);
      throw new Error('History entry not found');
    }
    res.json(entry);
  } catch (error) {
    next(error);
  }
};

const PDFDocument = require('pdfkit');

const deleteHistory = async (req, res, next) => {
  try {
    const entry = await ResumeHistory.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!entry) {
      res.status(404);
      throw new Error('History entry not found');
    }
    res.json({ message: 'History deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const downloadReport = async (req, res, next) => {
  try {
    const entry = await ResumeHistory.findOne({ _id: req.params.id, user: req.user.id });
    if (!entry) {
      res.status(404);
      throw new Error('History entry not found');
    }

    const doc = new PDFDocument({ margin: 40 });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="resume-report-${entry._id}.pdf"`);

    doc.pipe(res);
    doc.fontSize(22).text('AI Resume Analyzer Report', { align: 'center' });
    doc.moveDown();
    doc.fontSize(14).text(`Name: ${entry.parsedData.name || 'N/A'}`);
    doc.text(`Email: ${entry.parsedData.email || 'N/A'}`);
    doc.text(`Phone: ${entry.parsedData.phone || 'N/A'}`);
    doc.moveDown();
    doc.fontSize(16).text('ATS Analysis', { underline: true });
    doc.moveDown(0.5);
    doc.fontSize(12).text(`Score: ${entry.analysis.atsScore || 'N/A'}`);
    doc.text(`Resume Summary: ${entry.analysis.resumeSummary || 'N/A'}`);
    doc.moveDown();
    doc.text('Missing Skills:');
    (entry.analysis.missingSkills || []).forEach((skill) => doc.list([skill]));
    doc.moveDown();
    doc.text('Recruiter Feedback:');
    doc.text(entry.analysis.recruiterFeedback || 'N/A');
    doc.moveDown();
    doc.text('Job Match', { underline: true });
    doc.moveDown(0.5);
    doc.text(`Match Percentage: ${entry.jobMatch.matchPercentage || 'N/A'}`);
    doc.text('Matching Skills:');
    (entry.jobMatch.matchingSkills || []).forEach((skill) => doc.list([skill]));
    doc.text('Missing Skills:');
    (entry.jobMatch.missingSkills || []).forEach((skill) => doc.list([skill]));

    doc.end();
  } catch (error) {
    next(error);
  }
};

module.exports = { getHistory, getHistoryById, deleteHistory, downloadReport };
