import { v2 as cloudinary } from "cloudinary";
export const cloudinaryConn = async () => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    console.log("Cloudinary Connected.");
  } catch (error) {
    console.error("Db Connection Error:", error);
    process.exit(1); // Exit the process if cloudinary connection fails
  }
};
