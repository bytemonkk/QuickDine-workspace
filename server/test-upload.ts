import "dotenv/config";
import cloudinary from "./config/cloudinary.js";

try {
  const result = await cloudinary.uploader.upload("./test.jpeg", {
    folder: "QuickDine",
  });

  console.log("UPLOAD SUCCESS:");
  console.log(result.secure_url);
} catch (error: any) {
  console.error("UPLOAD FAILED");
  console.dir(error, { depth: 10 });
}