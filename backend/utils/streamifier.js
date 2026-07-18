import streamifier from 'streamifier';
import { cloudinary } from '../config/cloudinary.js';

const uploadToCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "vingo" },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
        console.log("UPLOAD STREAM***")
        console.log(uploadStream)
        console.log("BUFFER***")
        console.log(buffer)
    });
};

export  {uploadToCloudinary};