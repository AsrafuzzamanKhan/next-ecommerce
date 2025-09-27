import { v2 as cloudinary } from "cloudinary";
import { getAuth } from "@clerk/nextjs/server";
// configure coludinary with env variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { name, description, price, images } = await request.json();
  } catch (error) {}
}
