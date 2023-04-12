import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (image: string) => {
  const { public_id } = await cloudinary.uploader.upload(image, {
    width: 256,
    height: 256,
    crop: 'fill',
    gravity: 'auto',
  });

  const url = cloudinary.url(public_id, {
    width: 256,
    height: 256,
    Crop: 'fill',
  });
  return url;
};
