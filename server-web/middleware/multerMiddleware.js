import multer from 'multer';
import DataParser from 'datauri/parser.js';
import path from 'path';

// Cấu hình để lưu trữ trên đĩa
const diskStorage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});

export const diskUpload = multer({ storage: diskStorage });

// Cấu hình để lưu trữ trong bộ nhớ
const memoryStorage = multer.memoryStorage();
export const memoryUpload = multer({ storage: memoryStorage });
const parser = new DataParser();

// Hàm để xử lý ảnh thành data URI
export const formatImage = (file) => {
    const fileExtension = path.extname(file.originalname).toString();
    return parser.format(fileExtension, file.buffer).content;
};

// Middleware chọn phương pháp xử lý file dựa trên yêu cầu
export const selectUpload = (type) => {
    return type === 'image' ? memoryUpload : diskUpload;
};