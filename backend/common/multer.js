const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const type = file.mimetype.split("/")[0];
    if (type == "image") cb(null, "public/images");
    else if (type == "video") cb(null, "public/videos");
    else cb(null, "public/others");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});
const upload = multer({storage})
const ckeditorUpload = upload.single('upload')
const uploadSingle = upload.single('file')
const uploadMany = upload.array('files')

module.exports = {ckeditorUpload, uploadSingle, uploadMany}