import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import User from '../models/UserModel.js';
import songModel from '../models/SongModel.js';
import mongoose from 'mongoose';
import albumModel from '../models/albumModel.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('Không có bài hát')) {
                    throw new NotFoundError(errorMessages);
                }
                if (errorMessages[0].startsWith('không được ủy quyền')) {
                    throw new UnauthorizedError('không được phép truy cập');
                }

                throw new UnauthorizedError(errorMessages);
            }
            next();
        },
    ];
};




export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('Tên không được để trống'),
    body('email')
        .notEmpty()
        .withMessage('Email không được để trống')
        .isEmail()
        .withMessage('Sai định dạng email')
        .custom(async (email) => {
            const user = await User.findOne({ email });
            if (user) {
                throw new BadRequestError('Email đã tồn tại');
            }
        }),
    body('password')
        .notEmpty()
        .withMessage('Mật khẩu không được để trống')
        .isLength({ min: 8 })
        .withMessage('Mật khẩu tối thiểu 8 kí tự'),
    body('location').notEmpty().withMessage('Địa chỉ không được để trống'),
    body('lastName').notEmpty().withMessage('Họ không được để trống'),
]);

export const validateUpdateUserInput = withValidationErrors([
    body('name').notEmpty().withMessage('Tên không được để trống'),
    body('email')
        .notEmpty()
        .withMessage('email không được để trống')
        .isEmail()
        .withMessage('email sai định dạng')
        .custom(async (email, { req }) => {
            const user = await User.findOne({ email });
            if (user && user._id.toString() !== req.user.userId) {
                throw new Error('email đã tồn tại');
            }
        }),
    body('lastName').notEmpty().withMessage('họ không được để trống'),
    body('location').notEmpty().withMessage('vị trí không được để trống'),
]);

export const validateLoginInput = withValidationErrors([
    body('email')
        .notEmpty()
        .withMessage('email không được để trống')
        .isEmail()
        .withMessage('Email không đúng định dạng'),
    body('password').notEmpty().withMessage('Mật khẩu không được để trống'),
]);

export const validateSongInput = withValidationErrors([
    body('name').notEmpty().withMessage('Tên bài hát không được để trống'),
    body('desc').notEmpty().withMessage('Mô tả không được để trống'),
    body('album').notEmpty().withMessage('Album không được để trống'),

    // Xác thực các file không bị bỏ qua
    (req, res, next) => {
        // Xử lý lỗi từ express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map((error) => error.msg);
            throw new BadRequestError(errorMessages);
        }

        // Kiểm tra sự tồn tại của các file
        if (!req.files || !req.files.image || !req.files.audio) {
            throw new BadRequestError('Ảnh và âm thanh không được để trống');
        }

        // Đảm bảo có ít nhất một ảnh và một âm thanh
        if (req.files.image.length === 0) {
            throw new BadRequestError('Ảnh không được để trống');
        }

        if (req.files.audio.length === 0) {
            throw new BadRequestError('File âm thanh không được để trống');
        }

        next();
    },
]);






export const validateAlbumInput = withValidationErrors([
    body('name').notEmpty().withMessage('Tên album không được để trống'),
    body('desc').notEmpty().withMessage('Mô tả không được để trống'),
    body('bgColour').notEmpty().withMessage('Màu nền không được để trống'),

    // Custom validation to check the presence of the file
    (req, res, next) => {
        if (!req.file) {
            throw new BadRequestError('Ảnh không được để trống');
        }
        next();
    }
]);



export const validateIdParamSong = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidIdMongo = mongoose.Types.ObjectId.isValid(value);
        if (!isValidIdMongo) throw new BadRequestError(`id MongoDB không hợp lệ`);
        const song = await songModel.findById(value);
        if (!song) throw new NotFoundError(`không có bài hát nào có id: ${value} `);
        const isAdmin = req.user.role === 'admin';
        if (!isAdmin) throw new UnauthorizedError('không được phép truy cập');
    }),
]);

export const validateIdParamAlbum = withValidationErrors([
    param('id').custom(async (value, { req }) => {
        const isValidIdMongo = mongoose.Types.ObjectId.isValid(value);
        if (!isValidIdMongo) throw new BadRequestError(`id MongoDB không hợp lệ`);
        const album = await albumModel.findById(value);
        if (!album) throw new NotFoundError(`không có album nào có id: ${value} `);
        const isAdmin = req.user.role === 'admin';
        if (!isAdmin) throw new UnauthorizedError('không được phép truy cập');
    }),
]);
