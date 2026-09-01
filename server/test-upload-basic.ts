import "dotenv/config";
import fs from "fs";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME!;
const apiKey = process.env.CLOUDINARY_API_KEY!;
const apiSecret = process.env.CLOUDINARY_API_SECRET!;

const file = fs.readFileSync("./test.jpeg");

const form = new FormData();

form.append(
  "file",
  new Blob([file], { type: "image/jpeg" }),
  "test.jpeg"
);

const credentials = Buffer
  .from(`${apiKey}:${apiSecret}`)
  .toString("base64");

const response = await fetch(
  `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
  {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
    },
    body: form,
  }
);

const text = await response.text();

console.log("STATUS:", response.status);
console.log("RESPONSE:");
console.log(text);