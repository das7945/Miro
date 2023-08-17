const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Miro", // Cloudinary에서의 프로젝트 저장소 폴더이름
    allowedFormats: ["jpeg", "png", "jpg"], // 업로드허용 형식
  },
});

module.exports = {
  cloudinary,
  storage,
};
