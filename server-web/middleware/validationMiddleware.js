import { body, param, validationResult } from 'express-validator';

import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors/customErrors.js';
import User from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('no job')) {
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

