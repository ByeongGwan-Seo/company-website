const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const fileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024,
  },
});

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "認証されてないリクエストです" });
  }
  next();
};

router.post(
  "/image",
  verifyToken,
  imageUpload.single("image"),
  async (req, res) => {
    try {
      const file = req.file;
      const fileExtension = file.originalname.split(".").pop();
      const fileName = `${uuidv4()}.${fileExtension}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `post-images/${fileName}`,
        Body: file.buffer,
        Content,
      };
    } catch (error) {}
  }
);
