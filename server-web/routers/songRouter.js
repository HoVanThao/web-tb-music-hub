import { Router } from 'express';
import { diskUpload } from '../middleware/multerMiddleware.js';
import { addSong, listSong, deleteSong } from '../controllers/songController.js';
import { validateIdParamSong, validateSongInput } from '../middleware/validationMiddleware.js';

const router = Router();

router.post('/add', diskUpload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), validateSongInput, addSong);
router.get('/list', listSong);
router.delete('/:id', validateIdParamSong, deleteSong);


export default router;