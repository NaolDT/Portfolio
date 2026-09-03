const Education  = require('../models/Education');
const cloudinary = require('../utils/cloudinary');

const getEducation = async (req, res) => {
  try {
    let doc = await Education.findOne();
    if (!doc) doc = await Education.create({});
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateEducation = async (req, res) => {
  try {
    const { degree, university, faculty, period, courses, certNote, certifications } = req.body;

    let parsedCourses = [];
    if (courses) {
      try { parsedCourses = JSON.parse(courses); }
      catch { parsedCourses = courses.split('\n').map((c) => c.trim()).filter(Boolean); }
    }

    let parsedCerts = [];
    if (certifications) {
      try { parsedCerts = JSON.parse(certifications); }
      catch { parsedCerts = []; }
    }

    if (req.files) {
      for (const key of Object.keys(req.files)) {
        const match = key.match(/^certFile_(\d+)$/);
        if (!match) continue;
        const idx  = parseInt(match[1]);
        const file = req.files[key][0];
        if (!file || !parsedCerts[idx]) continue;

        const isPdf = file.mimetype === 'application/pdf';

        const result = await uploadToCloudinary(file, isPdf);

        parsedCerts[idx].fileUrl  = result.url;
        parsedCerts[idx].fileType = isPdf ? 'pdf' : 'image';
        parsedCerts[idx].fileName = file.originalname;
      }
    }

    let doc = await Education.findOne();
    if (!doc) {
      doc = await Education.create({
        degree, university, faculty, period,
        courses: parsedCourses,
        certifications: parsedCerts,
        certNote: certNote || '',
      });
    } else {
      doc.degree         = degree         || doc.degree;
      doc.university     = university     || doc.university;
      doc.faculty        = faculty        || doc.faculty;
      doc.period         = period         || doc.period;
      doc.courses        = parsedCourses;
      doc.certifications = parsedCerts;
      doc.certNote       = certNote       || '';
      await doc.save();
    }

    res.json(doc);
  } catch (err) {
    console.log('Education update error:', err.message);
    res.status(400).json({ message: err.message });
  }
};

async function uploadToCloudinary(file, isPdf) {
  return new Promise((resolve, reject) => {
    const options = isPdf
      ? {
          resource_type: 'raw',
          folder:        'portfolio/certificates',
          use_filename:  true,
          unique_filename: true,
          format:        'pdf',
        }
      : {
          resource_type: 'image',
          folder:        'portfolio/certificates',
          use_filename:  true,
          unique_filename: true,
        };

    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) {
          console.log('Cloudinary cert upload error:', error.message);
          return reject(new Error(`Upload failed: ${error.message}`));
        }
        if (!result?.secure_url) {
          return reject(new Error('No URL returned from Cloudinary'));
        }

        let url = result.secure_url;

        if (isPdf && !url.endsWith('.pdf')) {
          url = url + '.pdf';
        }

        console.log(`Cert uploaded (${isPdf ? 'PDF' : 'image'}):`, url);
        resolve({ url, publicId: result.public_id });
      }
    );

    stream.on('error', (err) => reject(new Error(`Stream error: ${err.message}`)));
    stream.end(file.buffer);
  });
}

module.exports = { getEducation, updateEducation };