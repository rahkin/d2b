const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload file to Cloudinary
 */
async function uploadFile(filePath, options = {}) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: options.folder || 'd2b',
      resource_type: options.resourceType || 'auto',
      ...options
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw error;
  }
}

/**
 * Upload from buffer
 */
async function uploadFromBuffer(buffer, options = {}) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: options.folder || 'd2b',
        resource_type: options.resourceType || 'auto',
        ...options
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes
          });
        }
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Delete file from Cloudinary
 */
async function deleteFile(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

/**
 * Generate image URL with transformations
 */
function getImageUrl(publicId, transformations = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    ...transformations
  });
}

module.exports = {
  uploadFile,
  uploadFromBuffer,
  deleteFile,
  getImageUrl,
  cloudinary
};




