// import { v2 as cloudinary } from 'cloudinary';
// import streamifier from 'streamifier';
// import dotenv from 'dotenv';
// dotenv.config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });


// export const uploadFileToCloudinary = (fileBuffer, publicId, resourceType) => {
//   return new Promise((resolve, reject) => {
//     console.log("Uploading file to Cloudinary:", publicId, resourceType);
//     const uploadStream = cloudinary.uploader.upload_stream(
//       { public_id: publicId, resource_type: resourceType },
//       (error, result) => {
//         if (error) {
//           console.error("Cloudinary upload error:", error);
//           reject(error);
//         } else {
//           resolve(result.secure_url);
//         }
//       }
//     );

//     streamifier.createReadStream(fileBuffer).pipe(uploadStream);
//   });
// };


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// filePath is the path from diskStorage
export const uploadFileToCloudinary = (filePath, publicId, resourceType) => {
  return new Promise((resolve, reject) => {
    console.log("Uploading file to Cloudinary:", publicId, resourceType);

    cloudinary.uploader.upload(
      filePath, // pass the file path instead of buffer
      { public_id: publicId, resource_type: resourceType },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          resolve(result.secure_url);
          // Optional: delete local file after upload
          fs.unlink(filePath, (err) => {
            if (err) console.error("Failed to delete temp file:", err);
          });
        }
      }
    );
  });
};
