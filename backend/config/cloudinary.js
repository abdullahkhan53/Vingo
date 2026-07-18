import "dotenv/config";
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
    timeout: 60000
});
// console.log(cloudinary.config())
cloudinary.api.ping()
  .then(res => console.log("PING OK:", res))
  .catch(err => console.log("PING FAILED:", err));

console.log("Cloudinary initialized successfully.");

cloudinary.uploader.upload("./config/frame.jpg")
  .then(res => console.log("UPLOAD SUCCESS:", res.secure_url))
  .catch(err => console.log("UPLOAD ERROR FULL:", JSON.stringify(err, null, 2)));

  
export {
    cloudinary
}