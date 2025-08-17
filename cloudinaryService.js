import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image to Cloudinary
export const uploadImageToCloudinary = async (file, publicId) => {
  try {
    const result = await cloudinary.uploader.upload(file, { public_id: publicId });
    return result.secure_url;
  } catch (err) {
    console.error('Cloudinary Upload Error:', err);
    throw err;
  }
};








// // cloudinaryService.js
// import { v2 as cloudinary } from 'cloudinary';
// import dotenv from 'dotenv';
// dotenv.config(); // load .env

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// // Function to upload an image
// export const uploadImage = async (imageUrl, publicId) => {
//   try {
//     const result = await cloudinary.uploader.upload(imageUrl, { public_id: publicId });
//     return result;
//   } catch (err) {
//     console.error(err);
//     throw err;
//   }
// };

// // Function to generate optimized URL
// export const optimizeUrl = (publicId) => {
//   return cloudinary.url(publicId, { fetch_format: 'auto', quality: 'auto' });
// };

// // Function to generate auto-cropped URL
// export const autoCropUrl = (publicId, width = 500, height = 500) => {
//   return cloudinary.url(publicId, { crop: 'auto', gravity: 'auto', width, height });
// };






// import { v2 as cloudinary } from 'cloudinary';

// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: 'dut3jvfet', 
//         api_key: '376267995936923', 
//         api_secret: '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
//     });
    
//     // Upload an image
//     export const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     export const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     export const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();