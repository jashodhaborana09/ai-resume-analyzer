const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const ResumeHistory = require('../models/ResumeHistory');

const parseText = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();
  if (extension === '.pdf') {
    const fileBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(fileBuffer);
    return data.text;
  }

  if (extension === '.docx') {
    const result = await mammoth.extractRawText({ path: filePath });
    return result.value;
  }

  return '';
};

const extractResumeFields = (text) => {
  const lines = text.split(/\r?\n/).map((line) => line.trim());
  const cleaned = lines.filter(Boolean);

  const emailMatch = text.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
  const phoneMatch = text.match(/\+?[0-9][0-9 \-()]{7,}[0-9]/);
  const name = cleaned[0] || '';

  const education = cleaned.filter((line) => /Bachelor|Master|B\.Sc|M\.Sc|MBA|Ph\.D|University|College/i.test(line));
  const skills = cleaned.filter((line) => /JavaScript|React|Node|Python|Java|SQL|MongoDB|AWS|Docker|Kubernetes|C\+\+|Machine Learning/i.test(line));
  const certifications = cleaned.filter((line) => /Certification|Certified|AWS|Google Cloud|Azure|Scrum|PMP/i.test(line));
  const experience = cleaned.filter((line) => /Experience|Internship|Worked at|Senior|Lead|Associate/i.test(line));
  const projects = cleaned.filter((line) => /Project|Application|Platform|Tool|System/i.test(line));

  return {
    name,
    email: emailMatch ? emailMatch[0] : '',
    phone: phoneMatch ? phoneMatch[0] : '',
    education: education.slice(0, 4),
    skills: [...new Set(skills)].slice(0, 12),
    certifications: certifications.slice(0, 6),
    experience: experience.slice(0, 10),
    projects: projects.slice(0, 8),
    rawText: text,
  };
};

const uploadResume = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error('Resume file is required');
    }

    const sourcePath = path.join(process.cwd(), req.file.path);
    const text = await parseText(sourcePath);
    if (!text.trim()) {
      res.status(400);
      throw new Error('Uploaded resume contains no text');
    }

    const parsedData = extractResumeFields(text);

    const history = await ResumeHistory.create({
      user: req.user.id,
      fileName: req.file.originalname,
      fileUrl: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
      parsedData,
      analysis: {},
    });

    res.status(201).json({ history, parsedData });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadResume, extractResumeFields };
