import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

type Options = {
  width?: number;
  height?: number;
};
export const uploadImage = async (image: string, { width = 256, height = 256 }: Options = {}) => {
  const { public_id } = await cloudinary.uploader.upload(image, {
    width,
    height,
    crop: 'fill',
    gravity: 'auto',
  });

  const url = cloudinary.url(public_id, {
    width,
    height,
    Crop: 'fill',
  });
  return url;
};
