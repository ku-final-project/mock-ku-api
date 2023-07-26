import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

const envVar = {
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

cloudinary.config({
  cloud_name: envVar.CLOUDINARY_NAME,
  api_key: envVar.CLOUDINARY_API_KEY,
  api_secret: envVar.CLOUDINARY_API_SECRET,
});

export default cloudinary;
