const util = require('util');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const config = require('config');

const db = config.get('mongoURI');

const storage = new GridFsStorage({
  url: `${db}`,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ['image/png', 'image/jpeg'];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-product-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'photos',
      filename: `${Date.now()}-product-${file.originalname}`,
    };
  },
});

const uploadFile = multer({ storage: storage }).single('file');
const uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
