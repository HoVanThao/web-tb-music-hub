import { Router } from 'express';
import { diskUpload } from '../middleware/multerMiddleware.js';
import { addSong, listSong, deleteSong, updateSong } from '../controllers/songController.js';
import { validateIdParamSong, validateSongInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/add', diskUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), validateSongInput, addSong);
router.get('/list', listSong);
router.delete('/:id', validateIdParamSong, deleteSong);
router.patch('/:id', diskUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), validateIdParamSong, validateSongInput, updateSong);

export default router;