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
        const { url, fileType } = await uploadToCloudinary(file, isPdf);

        parsedCerts[idx].fileUrl  = url;
        parsedCerts[idx].fileType = fileType;
      }
    }

    let doc = await Education.findOne();
    if (!doc) {
      doc = await Education.create({
        degree, university, faculty, period,
        courses:        parsedCourses,
        certifications: parsedCerts,
        certNote:       certNote || '',
      });
    } else {
      doc.degree         = degree         || doc.degree;
      doc.university     = university     || doc.university;
      doc.faculty        = faculty        || doc.faculty;
      doc.period         = period         || doc.period;
      doc.courses        = parsedCourses;
      doc.certifications = parsedCerts;
      doc.certNote       = certNote || '';
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
    const timestamp = Date.now();

    if (isPdf) {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder:        'portfolio/certificates',
          public_id:     `cert_${timestamp}`,
          format:        'pdf',
          type:          'upload',
          access_mode:   'public',
          timeout:       60000,
        },
        (error, result) => {
          if (error) {
            console.log('Cloudinary PDF error:', error.message);
            return reject(new Error(`PDF upload failed: ${error.message}`));
          }
          if (!result?.secure_url) return reject(new Error('No URL returned'));

          const url = result.secure_url;
          console.log('PDF uploaded:', url);
          resolve({ url, fileType: 'pdf' });
        }
      ).end(file.buffer);

    } else {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'image',
          folder:        'portfolio/certificates',
          public_id:     `cert_${timestamp}`,
          type:          'upload',
          access_mode:   'public',
          timeout:       60000,
        },
        (error, result) => {
          if (error) return reject(new Error(`Image upload failed: ${error.message}`));
          if (!result?.secure_url) return reject(new Error('No URL returned'));
          resolve({ url: result.secure_url, fileType: 'image' });
        }
      ).end(file.buffer);
    }
  });
}

module.exports = { getEducation, updateEducation };