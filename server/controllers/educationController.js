const Education  = require('../models/Education');
const cloudinary = require('../utils/cloudinary');
const crypto     = require('crypto');

const getEducation = async (req, res) => {
  try {
    let doc = await Education.findOne();
    if (!doc) doc = await Education.create({});
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSignedUrl = (req, res) => {
  try {
    const { public_id, resource_type = 'raw' } = req.query;
    if (!public_id) return res.status(400).json({ message: 'public_id required' });

    const timestamp  = Math.round(Date.now() / 1000);
    const apiSecret  = process.env.CLOUDINARY_API_SECRET;
    const apiKey     = process.env.CLOUDINARY_API_KEY;
    const cloudName  = process.env.CLOUDINARY_CLOUD_NAME;

    const toSign     = `public_id=${public_id}&timestamp=${timestamp}${apiSecret}`;
    const signature  = crypto.createHash('sha1').update(toSign).digest('hex');

    const url = `https://res.cloudinary.com/${cloudName}/${resource_type}/upload/v1/${public_id}?timestamp=${timestamp}&signature=${signature}&api_key=${apiKey}`;

    res.json({ url });
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

        parsedCerts[idx].fileUrl   = result.url;
        parsedCerts[idx].publicId  = result.publicId;
        parsedCerts[idx].fileType  = result.fileType;
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
    const folder    = 'portfolio/certificates';
    const publicId  = `${folder}/cert_${timestamp}`;

    cloudinary.uploader.upload_stream(
      {
        resource_type: isPdf ? 'raw' : 'image',
        public_id:     publicId,
        type:          'upload',
        access_mode:   'public',
        timeout:       60000,
      },
      (error, result) => {
        if (error) {
          console.log('Cloudinary upload error:', error.message);
          return reject(new Error(`Upload failed: ${error.message}`));
        }
        if (!result?.secure_url) return reject(new Error('No URL returned'));

        console.log('Uploaded:', result.secure_url);
        console.log('Public ID:', result.public_id);
        console.log('Resource type:', result.resource_type);

        resolve({
          url:      result.secure_url,
          publicId: result.public_id,
          fileType: isPdf ? 'pdf' : 'image',
        });
      }
    ).end(file.buffer);
  });
}

module.exports = { getEducation, updateEducation, getSignedUrl };