import { v2 as cloudinary } from 'cloudinary';

const upload = async(file) => {
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET 
    });

    try {
        const result = await cloudinary.uploader.upload(file);
        return result;
    } catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}