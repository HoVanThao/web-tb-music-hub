import { Router } from 'express';
import { memoryUpload } from '../middleware/multerMiddleware.js';
import { getCurrentUser, updateUser, } from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.get('/current-user', getCurrentUser);

router.patch(
    '/update-user',
    memoryUpload.single('avatar'),
    validateUpdateUserInput,
    updateUser
);

export default router;