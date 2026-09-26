import cloudinary from "../config/cloudinary.js";

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "mecha-core",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(req.file.buffer);
    });

    return res.status(200).json({
      message: "Upload image successfully",
      file: {
        path: result.secure_url,
        public_id: result.public_id,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Upload image failed",
    });
  }
};

export default uploadImage;